import React from 'react'
import { Menu } from 'lucide-react'
import { Sidebar } from '@/components/sidebar'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import Link from "next/link";

const font = Poppins ( {
  subsets: [ "latin" ],
  weight: ["400", "600"]

});

type Props = {}

export const MobileSidebar = (props: Props) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>

      <SheetContent side="left" className="p-0">
      <Link href="/dashboard" className="flex items-center gap-2 justify-center">
        <p className={cn("font-thin rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 transition-all hover:translate-y-[2px] md:block dark:border-white", font.className)}>
          Memoize
        </p>
      </Link>
        <Sidebar />
      </SheetContent>
      
    </Sheet>
   
  )
}

