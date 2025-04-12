import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function AppHeader() {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-purple-600">
          TodoMaster
        </Link>
        <div>
          <Button asChild variant="ghost" className="mr-2">
            <Link href="/">Home</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/all-todos">All Todos</Link>
          </Button>
        </div>
      </nav>
    </header>
  )
}

