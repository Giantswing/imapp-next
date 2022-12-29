import { Space_Grotesk } from "@next/font/google";
import { Dancing_Script } from "@next/font/google";

const font_primary = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-primary",
});

const font_secondary = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-secondary",
});

import styles from "/styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <main className={`${font_primary.variable} ${font_secondary.variable}`}>
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;
