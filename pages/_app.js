import { useState } from "react";
import { Roboto_Condensed } from "@next/font/google";
import { Space_Grotesk } from "@next/font/google";

const font_primary = Roboto_Condensed({
  subsets: ["latin"],
  variable: "--font-primary",
  weight: ["300", "400", "700"],
});

const font_secondary = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-secondary",
});

import styles from "/styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const [currentUser, setCurrentUser] = useState("alex");

  return (
    <main className={`${font_primary.variable} ${font_secondary.variable}`}>
      <Component
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        {...pageProps}
      />
    </main>
  );
}

export default MyApp;
