"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Droplets,
  LayoutDashboard,
  MapPin,
  Bell,
  LineChart,
  MessageSquare,
  Info,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar"

const navItems = [
  {
    title: "Inicio",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Ver Mapa",
    url: "/rivers",
    icon: MapPin,
  },
  {
    title: "Alertas",
    url: "/alerts",
    icon: Bell,
  },
  {
    title: "Estadísticas",
    url: "/stats",
    icon: LineChart,
  },
  {
    title: "Consultar IA",
    url: "/chat",
    icon: MessageSquare,
  },
]

export function NovaSenseSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              size="lg"
              className="data-[slot=sidebar-menu-button]:h-16"
            >
              <Link href="/">
                <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
                  <Droplets className="size-6" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="text-base font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                    NovaSense
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="px-0 py-2">
            <SidebarMenu className="space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      size="lg"
                      className={
                        isActive
                          ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 shadow-md h-12 data-[slot=sidebar-menu-button]:justify-start group-data-[collapsible=icon]:!justify-center group-data-[collapsible=icon]:!px-0"
                          : "h-12 text-slate-700 hover:bg-slate-100 data-[slot=sidebar-menu-button]:justify-start group-data-[collapsible=icon]:!justify-center group-data-[collapsible=icon]:!px-0"
                      }
                    >
                      <Link href={item.url}>
                        <item.icon className="size-6 shrink-0" />
                        <span className="font-medium group-data-[collapsible=icon]:hidden">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              tooltip="Acerca de" 
              size="lg" 
              className="h-12 data-[slot=sidebar-menu-button]:justify-start group-data-[collapsible=icon]:!justify-center group-data-[collapsible=icon]:!px-0"
            >
              <Link href="/presentation">
                <Info className="size-6 shrink-0" />
                <span className="font-medium group-data-[collapsible=icon]:hidden">Acerca de</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        
        <div className="p-2 group-data-[collapsible=icon]:hidden">
          <div className="rounded-lg bg-gradient-to-br from-cyan-50 to-blue-50 p-4 border border-cyan-200">
            <p className="text-sm font-semibold text-slate-900 mb-2">
              💧 NovaSense
            </p>
            <p className="text-xs text-slate-600">
              Protegiendo la salud de las comunidades de Nayarit
            </p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}