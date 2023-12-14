"use client"
import React from 'react'
import { Compass, Image, Layout } from "lucide-react";
import { SidebarItem } from './sidebar-item'

type Props = {}

const guestRoutes = [
  {
    icon: Layout,
    label: "Card Dashboard",
    href: "/flashcard",
  },
  {
    icon: Compass,
    label: "Browse Cards",
    href: "/flashcard/search",
  },
  {
    icon: Image,
    label: "Image Gallery",
    href: "/flashcard/generatedImages",
  }
]

export const SidebarRoutes = (props: Props) => {
  const routes = guestRoutes;
  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem 
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
          />
        ))
      }

    </div>
  )
}
