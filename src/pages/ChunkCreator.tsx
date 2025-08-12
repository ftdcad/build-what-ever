
import { ChunkCreator as ChunkCreatorComponent } from "@/components/ChunkCreator";

const ChunkCreator = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Chunk Creator</h1>
        <p className="text-muted-foreground">
          Transform your documents into optimized chunks for AI processing
        </p>
      </div>
      <ChunkCreatorComponent />
    </div>
  );
};

export default ChunkCreator;
