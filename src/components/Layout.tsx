import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({children}: LayoutProps) {
  return(<>
      <Header />
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      {children}
    </main>
  </>)
}