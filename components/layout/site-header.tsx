"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  const NavLinks = () => (
    <nav className="hidden md:flex gap-6 items-center">
      <Link href="/" className="hover:underline">Home</Link>
      <Link href="/services" className="hover:underline">Services</Link>
      <Link href="/team" className="hover:underline">Meet the Team</Link>
      <Link href="/resources" className="hover:underline">Resources</Link>
      <Link href="#contact" className="hover:underline">Contact</Link>
    </nav>
  )

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="container h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          <span className="text-[color:var(--brand-blue)]">Access</span>{" "}
          <span className="text-[color:var(--brand-red)]">Health</span>
        </Link>

        <NavLinks />

        <div className="hidden md:block">
          <Button asChild className="bg-[color:var(--brand-blue)] hover:bg-blue-700">
            <Link href="#contact">Book an Appointment</Link>
          </Button>
        </div>

        {/* Mobile */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="pt-12">
            <div className="flex flex-col gap-5 text-lg">
              <Link href="/" onClick={() => setOpen(false)}>Home</Link>
              <Link href="/services" onClick={() => setOpen(false)}>Services</Link>
              <Link href="/team" onClick={() => setOpen(false)}>Meet the Team</Link>
              <Link href="/resources" onClick={() => setOpen(false)}>Resources</Link>
              <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
              <Button asChild className="bg-[color:var(--brand-blue)] hover:bg-blue-700">
                <a href="#contact">Book an Appointment</a>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
