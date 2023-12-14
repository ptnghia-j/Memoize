"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { useRouter } from 'next/navigation'
import { Gamepad2 } from 'lucide-react'
import Typewriter from 'typewriter-effect'
import { Popover, PopoverTrigger, PopoverContent} from '@/components/ui/popover'
import Image from 'next/image'
type Props = {}

const GameWorld = (props: Props) => {
  const router = useRouter()

  return (
    <Card className="hover:cursor-pointer hover:opacity-70 bg-blue-100" onClick={() => {
      router.push('/games')
    } }>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0" >
        <CardTitle className="text-2xl font-bold text-blue-500">Enter the Game World </CardTitle>
        <Gamepad2 className="text-blue-500" />
      </CardHeader>
      <CardContent>
        <div className="text-blue-500">
          <Typewriter 
            options={ {
              loop: true,
            }}
            onInit={(typewriter) => {
              typewriter.typeString('Be prepared ...')
              .pauseFor(2000)
              .deleteAll()
              .typeString(' Dangers are lurking around ...')
              .start();
            }}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default GameWorld