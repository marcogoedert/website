import { cn } from "@/lib/utils"

interface H3Props extends React.HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode
}

interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
    children: React.ReactNode
}

export function H3(props: H3Props) {
    return (
      <h3 className={cn("scroll-m-20 text-2xl font-semibold tracking-tight", props.className)} {...props}>
        {props.children}
      </h3>
    )
  }
  

export function Paragraph(props: ParagraphProps) {
    return (
      <p className={cn("leading-7 [&:not(:first-child)]:mt-6", props.className)} {...props}>
        {props.children}
      </p>
    )
  }