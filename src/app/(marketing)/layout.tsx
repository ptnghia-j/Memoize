import { getAuthSession } from "@/lib/nextauth"
import { Navbar } from "../../components/navbar"

const MarketingLayout = async ({ children } : { children: React.ReactNode }) => {
  const session = await getAuthSession()
   return (
    <div className="h-full dark:bg-[#0f0f14]">
        <Navbar session={session} sidebarVisible={false} />
        <main className="h-full pt-20 pattern-dots">
          {children}
        </main>
      </div>
   )
 }

 export default MarketingLayout 