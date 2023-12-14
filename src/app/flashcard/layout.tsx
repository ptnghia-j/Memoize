import { Navbar } from "@/components/navbar"
import { getAuthSession } from "@/lib/nextauth"
import { redirect } from "next/navigation"
import { Sidebar } from "@/components/sidebar"

const FlashcardLayout = async ({ children } : {children : React.ReactNode}) => {
  const session = await getAuthSession()
  const sidebarVisible = true;

  if (!session?.user) {
    return redirect('/')
  }
  
  return (
    <div className="h-full">
      <div className="h-full md:pl-56">
        <Navbar session = {session} sidebarVisible= {sidebarVisible}/>
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>

     
      
      <main className="md:pl-56 h-full pt-20">
        {children}

      </main>
      
    </div>
  )
}

export default FlashcardLayout