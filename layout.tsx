import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PataLimpa - Pare de Limpar Xixi de Cachorro Para Sempre",
  description:
    "Método cientificamente comprovado para ensinar seu cão a fazer xixi no lugar certo. Transforme sua casa e sua relação com seu pet.",
  keywords: "adestramento, cachorro, xixi, treinamento, pet, cão",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Pixel UTMify */}
        <Script id="utmify-pixel" strategy="afterInteractive">
          {`
            window.pixelId = "68130f6cc9bb2ef21857e031";
            var a = document.createElement("script");
            a.setAttribute("async", "");
            a.setAttribute("defer", "");
            a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
            document.head.appendChild(a);
          `}
        </Script>

        {/* UTMify Tracking */}
        <Script
          src="https://cdn.utmify.com.br/scripts/utms/latest.js"
          data-utmify-prevent-xcod-sck
          data-utmify-prevent-subids
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
