import "~/styles/globals.css";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { PostHogProvider } from "../app/_providers/posthog-provider";

export const metadata: Metadata = {
  title: "My Drive",
  description: "Store, sync, and share your files with the power and simplicity of My Drive. Access your content from anywhere, anytime",
  icons: [{ rel: "icon", url: "/google-drive.png" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${geist.variable}`}>
        <body>
          <PostHogProvider>
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
            {children}
          </PostHogProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
