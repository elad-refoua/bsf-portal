import { Outlet, ScrollRestoration } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import { UI } from "@/lib/ui-strings";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Layout() {
  const { t } = useLang();
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
      >
        {t(UI.misc.skipToContent)}
      </a>
      <Header />
      <main id="content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}
