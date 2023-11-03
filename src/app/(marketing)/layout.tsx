import { getAuthSession } from "@/lib/nextauth"
import { Navbar } from "../../components/navbar"

const MarketingLayout = async ({ children } : { children: React.ReactNode }) => {
  const session = await getAuthSession()
   return (
    <div className="h-full dark:bg-[#1F1F1F]">
        {/* Pass session information to the navbar to print out user name */}
        <Navbar session={session} />
        <main className="h-full pt-40">
          {children}
        </main>
      </div>
   )
 }

 export default MarketingLayout 