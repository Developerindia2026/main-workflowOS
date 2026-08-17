import TopBarNav from "@/components/employeeDashboard/navbar/navbar";
interface EmployeeLayout {
  children: React.ReactNode;
}

export default function RootLayout({ children }: EmployeeLayout) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>OVERFLOW-OS</title>
      </head>
      <body>
        <TopBarNav />
        {children}
      </body>
    </html>
  );
}
