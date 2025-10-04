import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevStore",
  description: "The official store.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" type="text/css" href="https://themes.fourthwall.com/themes-library/assets/b98f1a45-9e58-4f65-991f-7aae0d689c9f/assets/vendor.css?v=b7fdac61a90ad1e625b76fc6f1342182af70842cac88754be5a33627c4de548e" media="all" />
        <link rel="stylesheet" type="text/css" href="https://themes.fourthwall.com/themes/assets/74253f59-c16d-4728-9ad6-803da8ffdc5e/assets/styles/css-variables.scss.css?v=959031563c7eea1d7c7bc9e6cbb458015be4621a778060c1a95e9f9de325e24c" media="all" />
        <link rel="stylesheet" type="text/css" href="https://themes.fourthwall.com/themes/assets/74253f59-c16d-4728-9ad6-803da8ffdc5e/assets/styles/theme.scss.css?v=13de889f34f43138e7475ae72c66004b124f2d63a8fa4bae175ed760c40c2be7" media="all" />
        <link rel="shortcut icon" href="https://dev-store.square.site/uploads/b/5be120f6a9db3eb7fcdc3f63d4a67c636c87e9a17be9a5053d00038fa032d57e/Store%20Logo%20Square_1649792197.png?width=400" type="image/png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}