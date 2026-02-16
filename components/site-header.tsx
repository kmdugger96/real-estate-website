"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Menu, X, ChevronDown } from "lucide-react"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-[#00FF84] flex items-center justify-center">
              <span className="text-black font-bold text-lg">S</span>
            </div>
            <span className="font-space-grotesk text-xl font-bold">SendKyleDeals</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/submit-deal">
              <Button variant="ghost">Submit Deal</Button>
            </Link>
            <Link href="/submit-deal">
              <Button variant="ghost">Find Deals</Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  Resources
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/protect-your-investment" className="cursor-pointer">
                    Protect Your Investment
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/resources" className="cursor-pointer">
                    Documents & Templates
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/submit-deal" className="cursor-pointer">
                    Underwriting Guides
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/submit-deal" className="cursor-pointer">
                    Market Resources
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/submit-deal" className="cursor-pointer">
                    Blog
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/contact">
              <Button variant="ghost">Contact</Button>
            </Link>
            <Link href="/book-appointment">
              <Button variant="ghost">Book Call</Button>
            </Link>
            <Link href="/submit-deal">
              <Button className="bg-[#00FF84] text-black hover:bg-[#00FF84]/90">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-accent rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2 space-y-2 border-t border-border/40 mt-4">
            <Link href="/submit-deal" className="block">
              <Button variant="ghost" className="w-full justify-start" onClick={() => setMobileMenuOpen(false)}>
                Submit Deal
              </Button>
            </Link>
            <Link href="/submit-deal" className="block">
              <Button variant="ghost" className="w-full justify-start" onClick={() => setMobileMenuOpen(false)}>
                Find Deals
              </Button>
            </Link>
            <div className="pl-4 space-y-1">
              <p className="text-sm font-medium text-muted-foreground py-2">Resources</p>
              <Link href="/protect-your-investment" className="block">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Protect Your Investment
                </Button>
              </Link>
              <Link href="/resources" className="block">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Documents & Templates
                </Button>
              </Link>
              <Link href="/submit-deal" className="block">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Underwriting Guides
                </Button>
              </Link>
              <Link href="/submit-deal" className="block">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Market Resources
                </Button>
              </Link>
              <Link href="/submit-deal" className="block">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Blog
                </Button>
              </Link>
            </div>
            <Link href="/contact" className="block">
              <Button variant="ghost" className="w-full justify-start" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </Button>
            </Link>
            <Link href="/book-appointment" className="block">
              <Button variant="ghost" className="w-full justify-start" onClick={() => setMobileMenuOpen(false)}>
                Book Call
              </Button>
            </Link>
            <Link href="/submit-deal" className="block">
              <Button
                className="w-full bg-[#00FF84] text-black hover:bg-[#00FF84]/90"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
