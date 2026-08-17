import TopBarNav from "@/components/employeeDashboard/navbar/navbar";
interface EmployeeLayout {
  children: React.ReactNode;
}

export default function RootLayout({ children }: EmployeeLayout) {
  return (
    <body>
      <TopBarNav />
      {children}
    </body>
  );
}
