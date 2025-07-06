"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
      <SidebarTrigger className="-ml-1 shrink-0" />
      <div className="flex flex-1 items-center gap-2 min-w-0">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search stocks, news..." className="pl-8" />
        </div>
        <Button variant="outline" size="icon" className="shrink-0 bg-transparent">
          <Bell className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}
