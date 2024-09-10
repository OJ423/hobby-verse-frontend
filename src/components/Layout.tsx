import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center px-4">
        {children}
      </main>
      <Footer />
    </>
  );
}
