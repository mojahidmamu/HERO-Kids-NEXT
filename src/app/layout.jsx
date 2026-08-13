// app/layout.jsx
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/src/Components/Layouts/Navbar";
import Footer from "@/src/Components/Layouts/Footer";
// import localFont from "next/font/local";
 

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});
 
// const solaimanLipi = localFont({
//   src: "./fonts/SolaimanLipi.ttf", 
//   weight: "400",
//   variable: "--font-bangla",
// });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable}  `}>
      <body className="min-h-screen flex flex-col">
        <header className="py-2 md:w-11/12 mx-auto">
          <Navbar />
        </header>
        <main className="flex-1 w-11/12 mx-auto">{children}</main>
        <footer className="bg-white border-t border-gray-200">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
