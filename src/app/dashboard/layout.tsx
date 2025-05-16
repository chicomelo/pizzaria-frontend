import { OrderProvider } from "@/providers/orders";
import { Header } from "./components/header";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <Header />
        <OrderProvider>
          {children}
        </OrderProvider>
    </>
  );
}