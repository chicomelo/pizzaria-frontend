import type { Metadata } from "next";
import "./globals.scss";
import { ToastProvider } from "@/providers/ToastProvider";

export const metadata: Metadata = {
  title: "Pizza - O melhor app para o seu negócio",
  description: "O melhor app do Brasil para o seu negócio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
