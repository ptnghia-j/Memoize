import { Heading } from "./_components/heading"
import { Heroes } from "./_components/heroes"
import { Footer } from "./_components/footer"
import { getAuthSession } from "@/lib/nextauth"

const MarketingPage = async () => {
  const session = await getAuthSession()
  return (
    <div className="min-h-full flex flex-col dark:bg-[#1F1F1F]">
      <div className="flex flex-col items-center justify-center
      md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
        <Heading session={session}/>
        <Heroes/>
      </div>
      <Footer />
    </div>
    
  )
}

export default MarketingPage
