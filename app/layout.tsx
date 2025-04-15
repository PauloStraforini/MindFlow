import type { Metadata } from "next";
import "./globals.css";
import {Poppins} from "next/font/google";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "MindFlow - Empoderando Mentes",
  description: "MindFlow: Seu portal para atenção plena e produtividade.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${Poppins} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
