import "./globals.css";

interface RootProp {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootProp) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Workflow-OS</title>
      <body>{children}</body>
    </html>
  );
}
