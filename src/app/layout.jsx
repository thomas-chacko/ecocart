import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EcoCart - Choose Better. Live Greener.",
  description: "Explore eco-friendly alternatives for daily life",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          {children}
          <WhatsAppButton />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  );
}
