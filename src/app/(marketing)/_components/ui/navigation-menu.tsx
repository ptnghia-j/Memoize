import Image from "next/image"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@radix-ui/react-navigation-menu"

export function NavigationMenuTab() {
  return (
    <NavigationMenu>
      <NavigationMenuList>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="hover:bg-blue-200 border-2 rounded-md"> 
            Enter Dashboard 
          </NavigationMenuTrigger>
          
          <NavigationMenuContent>
            <NavigationMenuLink className="grid w-[400px] md:w-[500px] gap-3 p-4" href="/dashboard">
              <p className="p-2 pb-4">
                Enter your dashboard to create flashcards and quizzes
              </p>
              
              <Image 
                src="/dashboard.png"
                width={500}
                height={500}
                alt="Dashboard"
              />
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="hover:bg-green-200 border-2 rounded-md"> 
            Enter Game World 
          </NavigationMenuTrigger>
          
          <NavigationMenuContent>
            <NavigationMenuLink className="grid w-[400px] md:w-[500px] lg:w-[600px] p-2" href="/games">
              <div className="p-2 pb-4">
                Enter the game world to play with your flashcards and quizzes
              </div>
              
              <div className="grid grid-cols-2">
                <Image 
                  src="/game_world_day.png"
                  width={500}
                  height={500}
                  alt="Dashboard"
                />
                <Image 
                  src="/game_world_night.png"
                  width={500}
                  height={500}
                  alt="Dashboard"
                />
              </div>
              
            </NavigationMenuLink>
            
          </NavigationMenuContent>
        </NavigationMenuItem>

      </NavigationMenuList>
    </NavigationMenu>
  )
}