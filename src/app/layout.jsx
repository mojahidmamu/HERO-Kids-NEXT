// app/layout.jsx
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/src/Components/Layouts/Navbar";
import Footer from "@/src/Components/Layouts/Footer";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "../Components/context/CartContext";
import SessionProvider from "../Components/providers/SessionProvider";
// import localFont from "next/font/local";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata = {
  title: {
    default: "HERO Kidz",
    template: "%s | HERO Kidz",
  },
};

// const solaimanLipi = localFont({
//   src: "./fonts/SolaimanLipi.ttf",
//   weight: "400",
//   variable: "--font-bangla",
// });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable}  `}>
      <body className="min-h-screen flex flex-col">
        <SessionProvider>
          <CartProvider>
            {/* // CartProvider দিয়ে পুরো অ্যাপকে কার্ট কনটেক্সটের আওতায় আনা হয়েছে, যাতে কার্টের তথ্য যেকোনো কম্পোনেন্ট থেকে অ্যাক্সেস করা যায়। */}
            {/* Header / Navbar */}
            <header className="py-2 md:w-11/12 mx-auto">
              <Navbar />
            </header>
            {/* Main Content */}
            <main className="flex-1 w-11/12 mx-auto">
              {children}
              <Toaster />
            </main>
            {/* Footer   */}
            <footer className="bg-white border-t border-gray-200">
              <Footer />
            </footer>
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
