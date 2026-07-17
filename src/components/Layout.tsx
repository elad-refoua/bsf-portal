import { useEffect, Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import { UI } from "@/lib/ui-strings";
import { scrollToId } from "@/lib/scroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Layout() {
  const { t } = useLang();
  const { pathname } = useLocation();

  // Always start a new page at the top (guards against leftover scroll on route change).
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className="flex min-h-screen flex-col">
      <button
        type="button"
        onClick={() => scrollToId("content", { focus: true })}
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
      >
        {t(UI.misc.skipToContent)}
      </button>
      <Header />
      <main id="content" className="flex-1">
        <Suspense
          fallback={
            <div className="flex min-h-[50vh] items-center justify-center text-ink-300" aria-live="polite">
              <span className="h-8 w-8 animate-spin rounded-full border-2 border-brand-200 border-t-brand-600" />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
