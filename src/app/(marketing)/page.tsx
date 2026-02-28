import { Heading } from "./_components/heading"
import { Heroes } from "./_components/heroes"
import { Footer } from "./_components/footer"

import { getAuthSession } from "@/lib/nextauth"

const MarketingPage = async () => {
  const session = await getAuthSession()

  return (
    <div className="min-h-full flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 md:pt-32 md:pb-24">
        <Heading session={session}/>
      </section>

      {/* Features Section */}
      <section className="px-6 pb-20 md:pb-28">
        <Heroes/>
      </section>

      <Footer />
    </div>
  )
}

export default MarketingPage
