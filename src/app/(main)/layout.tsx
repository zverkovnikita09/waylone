import { Header } from "@/widgets/Header";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen overflow-auto">
      <Header />
      <div className="flex-1 bg-secondary-bg transition-all duration-base overflow-auto">
        {children}
      </div>
    </div>
  );
}

