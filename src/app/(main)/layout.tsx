import { Header } from "@/widgets/Header";
import { cookies } from 'next/headers'

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const cookieStore = await cookies()
    const authToken = cookieStore.get('auth-token')?.value;

  return (
    <div className="flex flex-col h-screen overflow-auto">
      <Header isAutorized={!!authToken} />
      <div className="flex-1 bg-secondary-bg transition-all duration-base overflow-auto">{children}</div>
    </div>
  );
}

