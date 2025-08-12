
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { AlertTriangle, Info, CheckCircle, XCircle } from "lucide-react"

const calloutVariants = cva(
  "relative w-full rounded-lg border p-4",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground border-border",
        info: "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-200",
        warning: "border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950/50 dark:text-yellow-200", 
        danger: "border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950/50 dark:text-red-200",
        success: "border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950/50 dark:text-green-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface CalloutProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof calloutVariants> {
  icon?: boolean
}

const icons = {
  info: Info,
  warning: AlertTriangle,
  danger: XCircle,
  success: CheckCircle,
}

const Callout = ({ className, variant = "default", icon = true, children, ...props }: CalloutProps) => {
  const IconComponent = variant && variant !== "default" ? icons[variant] : null

  return (
    <div
      className={cn(calloutVariants({ variant }), className)}
      {...props}
    >
      {icon && IconComponent && (
        <IconComponent className="h-5 w-5 mb-2" />
      )}
      <div>{children}</div>
    </div>
  )
}

export { Callout, calloutVariants }
