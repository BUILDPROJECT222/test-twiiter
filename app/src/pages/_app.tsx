// src/pages/_app.tsx
import "@/styles/globals.css";
import "@solana/wallet-adapter-react-ui/styles.css";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

import { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import PromoBar from "@/components/PromoBard";
import React from "react";
import TheSidebar from "@/components/Sidebar";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/sonner";

function MyApp({ Component, pageProps }: AppProps) {
  const RPC_ENDPOINT = process.env.NEXT_PUBLIC_SOLANA_RPC_URL as string;

  return (
    <ThemeProvider
      defaultTheme="light"
      disableTransitionOnChange
    >
      <ConnectionProvider
        endpoint={RPC_ENDPOINT}
        config={{ commitment: "processed" }}
      >
        <WalletProvider autoConnect wallets={[]}>
          <WalletModalProvider>
            <DefaultSeo
              title="SOLX"
              description="X Powered By SOL"
              canonical="https://solx-dev.vercel.app"
              openGraph={{
                type: "website",
                locale: "en_US",
                url: "https://solx-dev.vercel.app",
                site_name: "SOLX",
                images: [
                  {
                    url: "https://solx-dev.vercel.app/logo.png",
                  },
                ],
              }}
              twitter={{
                handle: "@SOLX",
                site: "https://solx-dev.vercel.app",
                cardType: "summary_large_image",
              }}
            />

            <div className="max-w-5xl justify-between mx-auto flex lg:px-10">
              <div className="md:w-1/6 pt-10">
                <TheSidebar />
              </div>
              <main className="w-full md:w-4/6 flex flex-col">
                <div className="md:hidden fixed top-2 right-2">
                  <WalletMultiButton />
                </div>
                <Component {...pageProps} />
              </main>
              <div className="hidden md:flex w-1/6 pt-10">
                <PromoBar />
              </div>
            </div>
            <Toaster />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </ThemeProvider>
  );
}

export default MyApp;
