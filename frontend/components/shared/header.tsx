"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavLink {
  label: string
  href: string
  badge?: string
  badgeColor?: string
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  const navLinks: NavLink[] = [
    { label: "Baza wiedzy", href: "/baza-wiedzy" },
    { label: "Mapa wiedzy", href: "/mapa-wiedzy", badge: "WKRÓTCE", badgeColor: "bg-red-500" },
    { label: "Centrum pytań", href: "/", badge: "WKRÓTCE", badgeColor: "bg-red-500" },
    { label: "Quiz gotowości", href: "/", badge: "WKRÓTCE", badgeColor: "bg-red-500" },
    { label: "Kalkulator NIE wdrożenia", href: "/kalkulator" },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white shadow-lg"
            : "bg-[#1E2A5E]"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3 group flex-shrink-0">
              <img
                src={isScrolled ? "/logo-navy.svg" : "/logo-white.svg"}
                alt="KSEF.EXPERT"
                className="h-[90px] w-auto transition-all duration-500"
              />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 mx-8 flex-1 justify-center">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className={`relative inline-flex flex-col items-center gap-1 px-4 py-2 text-[15px] font-semibold transition-all duration-300 rounded-lg hover:bg-white/10 group ${
                    isScrolled
                      ? "text-[#1E2A5E] hover:text-[#C7A83B]"
                      : "text-white hover:text-[#C7A83B]"
                  }`}
                >
                  <span className="whitespace-nowrap">{link.label}</span>
                  {link.badge && (
                    <span className={`${link.badgeColor || 'bg-[#C7A83B]'} text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap uppercase tracking-wide shadow-md`}>
                      {link.badge}
                    </span>
                  )}
                </a>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
              <Button
                className={`transition-all duration-500 shadow-lg px-6 py-5 text-base font-bold rounded-xl ${
                  isScrolled
                    ? "bg-[#C7A83B] text-white hover:bg-[#B8992C] hover:shadow-xl hover:scale-105"
                    : "bg-[#C7A83B] text-white hover:bg-[#B8992C] hover:shadow-xl hover:scale-105"
                }`}
              >
                Rozpocznij →
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg transition-colors text-white hover:bg-white/10"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />

          {/* Menu Panel */}
          <div className="absolute top-20 left-0 right-0 bg-white shadow-2xl animate-in slide-in-from-top-2 duration-300">
            <div className="max-w-7xl mx-auto px-6 py-8">
              {/* Mobile Navigation */}
              <nav className="space-y-1 mb-8">
                {navLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3 text-[#1E2A5E] hover:bg-[#1E2A5E]/5 rounded-lg transition-colors group"
                  >
                    <span className="font-medium">{link.label}</span>
                    {link.badge && (
                      <span className={`${link.badgeColor || 'bg-[#C7A83B]'} text-white text-xs px-2 py-1 rounded-full`}>{link.badge}</span>
                    )}
                  </a>
                ))}
              </nav>

              {/* Mobile CTAs */}
              <div className="space-y-3 pt-6 border-t border-gray-200">
                <Button
                  className="w-full bg-[#C7A83B] text-[#1E2A5E] hover:bg-[#C7A83B]/90"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Rozpocznij →
                </Button>
              </div>

              {/* Mobile Footer Info */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-ksef-muted">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>Aktualizowane codziennie</span>
                </div>
                <p className="text-xs text-ksef-muted mt-2">3.1M firm | 50 ekspertów | 12 modułów</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
