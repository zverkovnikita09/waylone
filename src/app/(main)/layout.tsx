import { Header } from "@/widgets/Header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen overflow-auto">
      <Header isAutorized />
      <div className="flex-1 bg-secondary-bg transition-all duration-base overflow-auto">{children}</div>
    </div>
  );
}

