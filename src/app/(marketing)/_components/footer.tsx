import { Logo } from "../../../components/logo"
import { Button } from "@/components/ui/button"

export const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-background/80 backdrop-blur-sm dark:bg-[#0f0f14]/80">
      <div className="max-w-6xl mx-auto flex items-center w-full p-6">
        <Logo />
        <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2
        text-muted-foreground">
          <Button variant="ghost" size="sm" className="text-xs">
            Privacy Policy
          </Button>
          <Button variant="ghost" size="sm" className="text-xs">
            Terms &amp; Conditions
          </Button>
        </div>
      </div>
    </footer>
  )
}