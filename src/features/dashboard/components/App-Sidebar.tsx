"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { Home, LayoutTemplate, FileEdit, Globe, Bell, Settings, User,FileText } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const mainNavItems = [
  {
    title: "Trang chủ",
    url: "/home",
    icon: Home,
  },
  {
    title: "Biểu mẫu của tôi",
    url: "/my-form",
    icon: FileText,
  },
  {
    title: "Trình thiết kế",
    url: "/editor",
    icon: FileEdit,
  },
  {
    title: "Form mẫu",
    url: "/templates",
    icon: LayoutTemplate,
  },
  {
    title: "Kho cộng đồng",
    url: "/community",
    icon: Globe,
  },
]

const personalNavItems = [
  {
    title: "Thông báo",
    url: "/notifications",
    icon: Bell,
  },
  {
    title: "Cài đặt",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "Tài khoản",
    url: "/account",
    icon: User,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="h-16 flex items-center px-4 justify-start border-b">
        <Link href="/home" className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary">
          <span className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-extrabold text-sm">D</span>
          DragForm
        </Link>
      </SidebarHeader>

      <SidebarContent className="p-2 space-y-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Ứng dụng</SidebarGroupLabel>
          <SidebarGroupContent className="mt-2">
            <SidebarMenu>
              {mainNavItems.map((item) => {
                const isActive = pathname === item.url || pathname.startsWith(item.url + "/")
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link
                        href={item.url}
                        className={cn(
                          "flex items-center gap-3 px-3 py-6 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground",
                          isActive && "bg-accent text-accent-foreground font-medium"
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Cá nhân</SidebarGroupLabel>
          <SidebarGroupContent className="mt-2">
            <SidebarMenu>
              {personalNavItems.map((item) => {
                const isActive = pathname === item.url || pathname.startsWith(item.url + "/")
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link
                        href={item.url}
                        className={cn(
                          "flex items-center gap-3 px-3 py-6 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground",
                          isActive && "bg-accent text-accent-foreground font-medium"
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-slate-200 flex items-center justify-center font-bold text-sm text-slate-700">U</div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-semibold truncate leading-none">User1</p>
            <p className="text-xs text-muted-foreground truncate mt-1">user1@example.com</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}



