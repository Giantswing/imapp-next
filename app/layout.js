import "/styles/globals.scss";
import { Roboto_Condensed } from "next/font/google";
import { Space_Grotesk } from "next/font/google";

import { getServerSession } from "next-auth";
import SessionProvider from "../components/SessionProvider";

const font_primary = Roboto_Condensed({
  subsets: ["latin"],
  variable: "--font-primary",
  weight: ["300", "400", "700"],
});

const font_secondary = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-secondary",
});

export const metadata = {
  title: "Habit Journey",
  description: "App to help you build habits and achieve your goals.",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={`${font_primary.variable} ${font_secondary.variable}`}>
        <div>
          <SessionProvider session={session}>
            <main className="c-main">{children}</main>
          </SessionProvider>
        </div>
      </body>
    </html>
  );
}
