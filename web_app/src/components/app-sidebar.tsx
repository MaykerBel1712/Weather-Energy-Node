"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  ChartColumnBig,
  Database,
  FileText,
  Users,
  ClipboardCheck,
} from "lucide-react"
import Link from "next/link"
import Logo from "@/svgs/logo"
import Logo_Ufps from "@/svgs/logo-ufps"
import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarInset,
} from "@/components/ui/sidebar"
import { Avatar } from "@radix-ui/react-avatar"



const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: ChartColumnBig,
      isActive: true,
      items: [
        {
          title: "Estación Meteorológica",
          url: "/pages/estacion-meteorologica",
        },
        {
          title: "Estación Energética",
          url: "/pages/estacion-energetica",
        },
      ],
    },
    {
      title: "Datos Históricos",
      url: "/pages/datos-historicos",
      icon: Database,
    },    
  ],
  projects: [
    {
      name: "Información General",
      url: "/pages/resumen",
      icon: FileText,
    },
    {
      name: "Objetivos",
      url: "/pages/objetivos",
      icon: ClipboardCheck,
    },
    {
      name: "Créditos",
      url: "/pages/creditos",
      icon: Users,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex items-center justify-between px-2 h-12">
      <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
            >
              <Link href="/" className="flex items-center justify-left w-10 h-10">
                <Logo className="w-6 h-6"/>
                <span className="font-semibold">Weather Energy Node</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        {/*<NavUser user={data.user} />*/}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5 items-center"
            >
              <Link 
                href="https://ww2.ufps.edu.co/"
                target="_blank"
                rel="noopener noreferrer"
              >
              <Avatar className="h-5.5 w-5.5 aspect-square "><Logo_Ufps /></Avatar>
              <span>Todos los derechos reservados</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
