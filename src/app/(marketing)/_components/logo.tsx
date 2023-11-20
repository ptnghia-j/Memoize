import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import Link from "next/link";

const font = Poppins ( {
  subsets: [ "latin" ],
  weight: ["400", "600"]

});

export const Logo = () => {
  return (
    <div className="hidden md:flex items-center gap-x-2">
      <Image
         src="/logo_light.png"
         height="60"
         width="60"
         alt="Logo"
         className="dark:hidden"
      />

      <Image
         src="/logo_dark.png"
         height="60"
         width="60"
         alt="Logo"
         className="hidden dark:block"
      />
      <Link href="/" className="flex items-center gap-2">
        <p className={cn("font-thin rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 transition-all hover:translate-y-[2px] md:block dark:border-white", font.className)}>
          Memoize
        </p>
      </Link>

    </div>
  )
}