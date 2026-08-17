import "./globals.css";

interface RootProp {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootProp) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>OVERFLOW-OS</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
