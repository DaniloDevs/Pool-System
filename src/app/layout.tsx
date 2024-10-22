import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eleições Loide Martha - 2024",
  description: "APP de Eleição desenvolvido pelo aluno do Projeto Geek Danilo Romão ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   
// biome-ignore lint/a11y/useValidLang: <explanation>
<html lang="pt-br">
      <body className={inter.className} >
        {children}
      </body>
    </html>
  );
}
