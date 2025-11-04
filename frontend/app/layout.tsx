import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/Footer"
import Script from "next/script"
import "./globals.css"

// KSEF.EXPERT Design System Fonts
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
})

export const metadata: Metadata = {
  title: "KSEF.EXPERT - Przewodnik wdrożenia KSeF dla polskich firm",
  description: "Kompleksowy przewodnik, interaktywne narzędzia i wsparcie 50 ekspertów SKwP dla 3.1 miliona polskich firm wdrążących Krajowy System e-Faktur",
  keywords: [
    "KSeF",
    "Krajowy System e-Faktur",
    "faktury elektroniczne",
    "wdrożenie KSeF",
    "księgowość online",
    "e-faktury",
    "Ministerstwo Finansów",
    "SKwP",
    "2026"
  ],
  authors: [{ name: "KSEF.EXPERT" }],
  openGraph: {
    type: "website",
    locale: "pl_PL",
    title: "KSEF.EXPERT - Przewodnik wdrożenia KSeF",
    description: "Kompleksowy przewodnik wdrożenia KSeF dla 3.1 miliona polskich firm",
    siteName: "KSEF.EXPERT",
  },
  twitter: {
    card: "summary_large_image",
    title: "KSEF.EXPERT - Przewodnik wdrożenia KSeF",
    description: "Kompleksowy przewodnik wdrożenia KSeF dla polskich firm",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl" className={`${inter.variable} ${playfairDisplay.variable}`}>
      <head>
        {/* Preconnect to Google Fonts for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS prefetch for better performance */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />

        {/* ElevenLabs Voice Assistant Widget - Polski */}
        <elevenlabs-convai
          agent-id="agent_8701k9457dr9etwsjrj1rg55rwj1"
        ></elevenlabs-convai>
        <Script
          src="https://unpkg.com/@elevenlabs/convai-widget-embed"
          strategy="afterInteractive"
        />

        {/* Custom Polish texts for widget */}
        <Script id="elevenlabs-polish-texts" strategy="afterInteractive">
          {`
            function polishizeWidget() {
              const widget = document.querySelector('elevenlabs-convai');
              if (!widget || !widget.shadowRoot) return false;

              let changed = false;

              // Find all text nodes recursively
              function walkTextNodes(node) {
                if (node.nodeType === 3) { // Text node
                  if (node.textContent.includes('Need help')) {
                    node.textContent = node.textContent.replace(/Need help\\?/g, 'Potrzebujesz pomocy?');
                    changed = true;
                  }
                  if (node.textContent.includes('Start a call') || node.textContent.includes('Start call')) {
                    node.textContent = 'Rozmowa z Twoim KSef.EXPERT AI';
                    changed = true;
                  }
                  // Terms and Conditions dialog translations
                  if (node.textContent.includes('Terms and conditions')) {
                    node.textContent = node.textContent.replace(/Terms and conditions/g, 'Regulamin i warunki');
                    changed = true;
                  }
                  if (node.textContent.trim() === 'Cancel' && node.parentElement?.tagName === 'BUTTON') {
                    node.textContent = 'Anuluj';
                    changed = true;
                  }
                  if (node.textContent.trim() === 'Accept' && node.parentElement?.tagName === 'BUTTON') {
                    node.textContent = 'Akceptuję';
                    changed = true;
                  }
                  // Translate the full terms text
                  if (node.textContent.includes('By clicking') && node.textContent.includes('Agree')) {
                    node.textContent = 'Klikając "Akceptuję" i za każdym razem, gdy korzystam z tego asystenta AI, wyrażam zgodę na nagrywanie, przechowywanie i udostępnianie moich komunikatów dostawcom usług zewnętrznych, zgodnie z opisem w Polityce Prywatności. Jeśli nie chcesz, aby Twoje rozmowy były nagrywane, nie korzystaj z tej usługi.';
                    changed = true;
                  }
                  // Chat interface translations
                  if (node.textContent.includes('You ended the conversation')) {
                    node.textContent = node.textContent.replace(/You ended the conversation/g, 'Zakończyłeś rozmowę');
                    changed = true;
                  }
                  if (node.textContent.trim() === 'Send a message') {
                    node.textContent = 'Wyślij wiadomość';
                    changed = true;
                  }
                  if (node.textContent.trim() === 'New call') {
                    node.textContent = 'Nowe połączenie';
                    changed = true;
                  }
                  if (node.textContent.includes('Send a message')) {
                    node.textContent = node.textContent.replace(/Send a message/g, 'Wyślij wiadomość');
                    changed = true;
                  }
                  // During call texts
                  if (node.textContent.includes('Talk to interrupt')) {
                    node.textContent = node.textContent.replace(/Talk to interrupt/g, 'Powiedz aby przerwać');
                    changed = true;
                  }
                } else if (node.shadowRoot) {
                  walkTextNodes(node.shadowRoot);
                } else if (node.childNodes) {
                  node.childNodes.forEach(child => walkTextNodes(child));
                }
              }

              walkTextNodes(widget.shadowRoot);

              // Change placeholders in input elements
              const inputs = widget.shadowRoot.querySelectorAll('input, textarea');
              inputs.forEach(input => {
                if (input.placeholder === 'Send a message') {
                  input.placeholder = 'Kliknij słuchawkę żeby zapytać';
                  changed = true;
                }
              });

              return changed;
            }

            // Check every 200ms for 15 seconds
            let attempts = 0;
            const maxAttempts = 75;
            const checker = setInterval(() => {
              if (polishizeWidget() || attempts++ > maxAttempts) {
                clearInterval(checker);
              }
            }, 200);

            // Also observe DOM changes
            setTimeout(() => {
              const widget = document.querySelector('elevenlabs-convai');
              if (widget && widget.shadowRoot) {
                const observer = new MutationObserver(() => polishizeWidget());
                observer.observe(widget.shadowRoot, {
                  childList: true,
                  subtree: true,
                  characterData: true
                });
              }
            }, 1000);
          `}
        </Script>

        <Analytics />
      </body>
    </html>
  )
}
