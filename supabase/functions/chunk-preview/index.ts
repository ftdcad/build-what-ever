
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Simple tokenizer estimator (cl100k_base approximation)
function estimateTokens(text: string, tokenizer = 'cl100k'): number {
  // Rough approximation: ~4 chars per token for English text
  const avgCharsPerToken = tokenizer === 'gpt-4o' ? 3.8 : 4.0;
  return Math.ceil(text.length / avgCharsPerToken);
}

function chunkRecursive(text: string, params: any): any[] {
  const { size = 800, overlap = 80, separators = ['\n\n', '\n', '. ', ' '] } = params;
  const chunks: any[] = [];
  
  let remaining = text;
  let startChar = 0;
  let ordinal = 0;

  while (remaining.length > 0) {
    let chunkText = remaining.substring(0, size);
    
    if (chunkText.length < remaining.length) {
      // Find the best separator to split on
      let splitIndex = -1;
      for (const separator of separators) {
        const lastIndex = chunkText.lastIndexOf(separator);
        if (lastIndex > size * 0.5) { // Don't split too early
          splitIndex = lastIndex + separator.length;
          break;
        }
      }
      
      if (splitIndex > 0) {
        chunkText = chunkText.substring(0, splitIndex);
      }
    }

    chunks.push({
      ordinal,
      start_char: startChar,
      end_char: startChar + chunkText.length,
      text: chunkText.trim(),
      token_count: estimateTokens(chunkText.trim(), params.tokenizer)
    });

    const moveBy = Math.max(1, chunkText.length - overlap);
    remaining = remaining.substring(moveBy);
    startChar += moveBy;
    ordinal++;
  }

  return chunks;
}

function chunkFixed(text: string, params: any): any[] {
  const { unit = 'tokens', size = 700, overlap = 70 } = params;
  const chunks: any[] = [];
  
  if (unit === 'chars') {
    let startChar = 0;
    let ordinal = 0;

    while (startChar < text.length) {
      const endChar = Math.min(startChar + size, text.length);
      const chunkText = text.substring(startChar, endChar);

      chunks.push({
        ordinal,
        start_char: startChar,
        end_char: endChar,
        text: chunkText,
        token_count: estimateTokens(chunkText)
      });

      startChar += size - overlap;
      ordinal++;
    }
  } else {
    // Token-based chunking (approximate)
    const avgCharsPerToken = 4;
    const targetChars = size * avgCharsPerToken;
    const overlapChars = overlap * avgCharsPerToken;
    
    let startChar = 0;
    let ordinal = 0;

    while (startChar < text.length) {
      const endChar = Math.min(startChar + targetChars, text.length);
      const chunkText = text.substring(startChar, endChar);

      chunks.push({
        ordinal,
        start_char: startChar,
        end_char: endChar,
        text: chunkText,
        token_count: estimateTokens(chunkText)
      });

      startChar += targetChars - overlapChars;
      ordinal++;
    }
  }

  return chunks;
}

function chunkSentence(text: string, params: any): any[] {
  const { size = 750, overlap = 75 } = params;
  const chunks: any[] = [];
  
  // Simple sentence splitting
  const sentences = text.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 0);
  
  let currentChunk = '';
  let currentTokens = 0;
  let startChar = 0;
  let ordinal = 0;

  for (let i = 0; i < sentences.length; i++) {
    const sentence = sentences[i] + (i < sentences.length - 1 ? '. ' : '');
    const sentenceTokens = estimateTokens(sentence);

    if (currentTokens + sentenceTokens > size && currentChunk.length > 0) {
      // Finalize current chunk
      chunks.push({
        ordinal,
        start_char: startChar,
        end_char: startChar + currentChunk.length,
        text: currentChunk.trim(),
        token_count: currentTokens
      });

      // Start new chunk with overlap
      const overlapSentences = Math.floor(overlap / (currentTokens / currentChunk.split('.').length));
      const startIndex = Math.max(0, i - overlapSentences);
      
      currentChunk = sentences.slice(startIndex, i).join('. ') + '. ';
      currentTokens = estimateTokens(currentChunk);
      startChar = text.indexOf(sentences[startIndex]);
      ordinal++;
    }

    currentChunk += sentence;
    currentTokens += sentenceTokens;
  }

  // Add final chunk
  if (currentChunk.length > 0) {
    chunks.push({
      ordinal,
      start_char: startChar,
      end_char: startChar + currentChunk.length,
      text: currentChunk.trim(),
      token_count: currentTokens
    });
  }

  return chunks;
}

function chunkStructure(text: string, params: any): any[] {
  const { headerDepth = 3, keepLists = true, maxSectionTokens = 1000, overlap = 80 } = params;
  
  // Simple structure-based chunking
  const lines = text.split('\n');
  const chunks: any[] = [];
  let currentSection = '';
  let startChar = 0;
  let ordinal = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const isHeader = /^#{1,6}\s/.test(line.trim());
    const isList = keepLists && /^[\s]*[-*+]\s/.test(line);
    
    if (isHeader || (currentSection.length > 0 && estimateTokens(currentSection) > maxSectionTokens)) {
      if (currentSection.trim().length > 0) {
        chunks.push({
          ordinal,
          start_char: startChar,
          end_char: startChar + currentSection.length,
          text: currentSection.trim(),
          token_count: estimateTokens(currentSection.trim())
        });
        ordinal++;
      }
      
      // Start new section
      startChar = text.indexOf(line, startChar);
      currentSection = line + '\n';
    } else {
      currentSection += line + '\n';
    }
  }

  // Add final section
  if (currentSection.trim().length > 0) {
    chunks.push({
      ordinal,
      start_char: startChar,
      end_char: startChar + currentSection.length,
      text: currentSection.trim(),
      token_count: estimateTokens(currentSection.trim())
    });
  }

  return chunks;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, strategy_key, params } = await req.json();

    if (!text || !strategy_key) {
      return new Response(JSON.stringify({ error: 'Missing text or strategy_key' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let chunks: any[] = [];

    switch (strategy_key) {
      case 'recursive':
        chunks = chunkRecursive(text, params);
        break;
      case 'fixed':
        chunks = chunkFixed(text, params);
        break;
      case 'sentence':
        chunks = chunkSentence(text, params);
        break;
      case 'structure':
        chunks = chunkStructure(text, params);
        break;
      case 'semantic':
        return new Response(JSON.stringify({ error: 'Semantic chunking requires embedding API key' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      default:
        return new Response(JSON.stringify({ error: 'Unknown strategy' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }

    // Calculate metrics
    const totalTokens = chunks.reduce((sum, chunk) => sum + chunk.token_count, 0);
    const avgTokensPerChunk = totalTokens / chunks.length;
    const maxTokens = Math.max(...chunks.map(c => c.token_count));
    const minTokens = Math.min(...chunks.map(c => c.token_count));

    const metrics = {
      total_chunks: chunks.length,
      total_tokens: totalTokens,
      avg_tokens_per_chunk: Math.round(avgTokensPerChunk),
      max_tokens: maxTokens,
      min_tokens: minTokens
    };

    return new Response(JSON.stringify({ chunks, metrics }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chunk-preview function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
