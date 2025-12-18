import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Simulador de Máquina de Turing",
  description: "Simulador web desenvolvido com Next.js e TypeScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      {/*'flex flex-col min-h-screen' para o rodapé ficar sempre embaixo */}
      <body className={`${inter.className} flex flex-col min-h-screen bg-gray-100`}>
        
        {/* O 'flex-1' faz o conteúdo principal empurrar o rodapé para o final */}
        <div className="flex-1 flex flex-col">
          {children}
        </div>

        <footer className="bg-white border-t border-gray-200 py-4 mt-auto">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-gray-500">
              &copy; 2025 Desenvolvido por <span className="font-bold text-blue-600">Matheus, Juan e Moises</span>
            </p>
          </div>
        </footer>

      </body>
    </html>
  );
}