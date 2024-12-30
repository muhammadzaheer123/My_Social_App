import localFont from "next/font/local";
import "../globals.css";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
   <ClerkProvider>
     <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="h-screen flex justify-between p-3">
          <div className="font-sans font-extrabold w-[25%] text-3xl">
            <LeftSidebar/>
          </div>
          <div className="font-mono font-semibold flex-1 w-[50%]">
            {children}
          </div>
          <div className="w-[25%] p-2">
            <RightSidebar/>
          </div>
        </div>
        
      </body>
    </html>
   </ClerkProvider>
  );
}
