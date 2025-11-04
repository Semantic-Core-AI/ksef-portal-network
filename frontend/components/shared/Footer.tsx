"use client"

import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
} from "lucide-react"

interface FooterLink {
  label: string
  href: string
  external?: boolean
}

interface FooterColumn {
  title: string
  links: FooterLink[]
}

export function Footer() {
  const footerColumns: FooterColumn[] = [
    {
      title: "Produkty",
      links: [
        { label: "Baza wiedzy", href: "/baza-wiedzy" },
        { label: "Mapa wiedzy", href: "/mapa-wiedzy" },
        { label: "Quiz gotowości", href: "/" },
        { label: "Walidator faktur", href: "/" },
        { label: "Kalkulator terminów", href: "/" },
        { label: "Szablony dokumentów", href: "/" },
      ],
    },
    {
      title: "Dla kogo?",
      links: [
        { label: "Dla księgowych", href: "/" },
        { label: "Dla firm", href: "/" },
        { label: "Dla biur rachunkowych", href: "/" },
        { label: "Dla doradców podatkowych", href: "/" },
      ],
    },
    {
      title: "Wiedza",
      links: [
        { label: "Blog KSeF", href: "/" },
        { label: "Interpretacje prawne", href: "/" },
        { label: "FAQ", href: "/" },
        { label: "Webinary", href: "/" },
        { label: "Case studies", href: "/" },
      ],
    },
    {
      title: "Firma",
      links: [
        { label: "O nas", href: "/" },
        { label: "Nasi eksperci", href: "/" },
        { label: "Partnerzy", href: "/" },
        { label: "Kariera", href: "/" },
        { label: "Kontakt", href: "/" },
      ],
    },
  ]

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: "https://facebook.com", label: "Facebook" },
    { icon: <Twitter className="w-5 h-5" />, href: "https://twitter.com", label: "Twitter" },
    { icon: <Linkedin className="w-5 h-5" />, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: <Youtube className="w-5 h-5" />, href: "https://youtube.com", label: "YouTube" },
  ]

  const legalLinks = [
    { label: "Polityka prywatności", href: "/privacy" },
    { label: "Regulamin", href: "/terms" },
    { label: "RODO", href: "/rodo" },
    { label: "Cookies", href: "/cookies" },
  ]

  const stats = [
    { value: "3.1M", label: "Firm w Polsce" },
    { value: "500+", label: "Interpretacji" },
    { value: "50", label: "Ekspertów" },
  ]

  return (
    <footer className="bg-gradient-to-b from-[#1E2A5E] to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        {/* Top Section: Brand + Stats */}
        <div className="grid lg:grid-cols-[2fr_1fr] gap-12 pb-12 border-b border-white/10">
          {/* Brand Section */}
          <div>
            {/* Logo */}
            <div className="mb-6">
              <img
                src="/logo-white.svg"
                alt="KSEF.EXPERT"
                className="h-[80px] w-auto"
              />
            </div>

            {/* Description */}
            <p className="text-white/80 leading-relaxed mb-6 max-w-md">
              Kompleksowy portal edukacyjny pomagający polskim firmom we wdrożeniu Krajowego Systemu e-Faktur. Aktualna wiedza, narzędzia i wsparcie ekspertów - wszystko w jednym miejscu.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-white/80">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>Weryfikowane</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/80">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>Aktualizowane</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/80">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>W partnerstwie</span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="mt-8 space-y-3">
              <a
                href="mailto:kontakt@ksef.expert"
                className="flex items-center gap-3 text-white/80 hover:text-[#C7A83B] transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>kontakt@ksef.expert</span>
              </a>
              <a
                href="tel:+48123456789"
                className="flex items-center gap-3 text-white/80 hover:text-[#C7A83B] transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>+48 123 456 789</span>
              </a>
              <div className="flex items-start gap-3 text-white/80">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <div>Park Naukowo-Technologiczny</div>
                  <div>"TECHNOPARK GLIWICE"</div>
                  <div>ul. Konarskiego 18C</div>
                  <div>44-100 Gliwice</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="lg:text-right">
            <h3 className="text-lg font-bold text-white mb-6">W liczbach</h3>
            <div className="space-y-4">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-3xl font-bold text-[#C7A83B] font-mono mb-1">3.1M</div>
                <div className="text-sm text-white/60">firm objętych KSeF</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-3xl font-bold text-[#C7A83B] font-mono mb-1">500+</div>
                <div className="text-sm text-white/60">interpretacji prawnych</div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section: Links Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 py-12 border-b border-white/10">
          {footerColumns.map((column, index) => (
            <div key={index}>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-[#C7A83B] transition-colors text-sm flex items-center gap-2 group"
                    >
                      <span>{link.label}</span>
                      {link.external && (
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="py-12 border-b border-white/10">
          <div className="max-w-2xl">
            <h3 className="text-xl font-bold text-white mb-3">Bądź na bieżąco z KSeF</h3>
            <p className="text-white/70 mb-6">
              Otrzymuj cotygodniowy newsletter z najważniejszymi zmianami w przepisach, interpretacjami i praktycznymi
              poradami.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Twój adres email"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-[#C7A83B] transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#C7A83B] text-[#1E2A5E] font-semibold rounded-lg hover:bg-[#C7A83B]/90 transition-colors flex items-center justify-center gap-2"
              >
                Zapisz się
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            <p className="text-xs text-white/50 mt-3">
              Wysyłamy max 1 email tygodniowo. Możesz się wypisać w każdej chwili.
            </p>
          </div>
        </div>

        {/* Bottom Section: Social + Legal */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-white/60">Śledź nas:</span>
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-10 h-10 bg-white/10 hover:bg-[#C7A83B] rounded-lg flex items-center justify-center text-white hover:text-[#1E2A5E] transition-all"
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
            {legalLinks.map((link, index) => (
              <a key={index} href={link.href} className="hover:text-[#C7A83B] transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 text-center">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} KSEF.EXPERT. Wszystkie prawa zastrzeżone.
          </p>
          <p className="text-xs text-white/40 mt-2">
            Serwis nie jest powiązany z Ministerstwem Finansów ani KAS. Informacje mają charakter edukacyjny.
          </p>
        </div>
      </div>
    </footer>
  )
}
