import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { UI } from "@/lib/ui-strings";
import { Container } from "@/components/ui/primitives";
import LanguageToggle from "@/components/LanguageToggle";
import Logo from "@/components/Logo";

const NAV = [
  { to: "/understand", label: UI.nav.understand },
  { to: "/needs", label: UI.nav.needs },
  { to: "/practice", label: UI.nav.practice },
  { to: "/calm", label: UI.nav.calm },
  { to: "/my-space", label: UI.nav.myspace },
];

export default function Header() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-full px-3 py-2 text-sm font-medium transition ${
      isActive ? "bg-brand-50 text-brand-700" : "text-ink-700 hover:bg-sand-100"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-sand-200 bg-sand-50/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <NavLink to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Logo className="h-9 w-9" />
          <span className="flex flex-col leading-tight">
            <span className="font-heading text-xl font-bold text-brand-700">{t(UI.brand)}</span>
            <span className="hidden text-xs text-ink-500 sm:block">{t(UI.brandSub)}</span>
          </span>
        </NavLink>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} className={linkClass}>
              {t(n.label)}
            </NavLink>
          ))}
          <NavLink
            to="/therapist"
            className={({ isActive }) =>
              `ms-2 rounded-full border px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? "border-brand-600 bg-brand-600 text-white"
                  : "border-brand-600 text-brand-700 hover:bg-brand-50"
              }`
            }
          >
            {t(UI.nav.therapist)}
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle className="hidden sm:inline-flex" />
          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-700 hover:bg-sand-100 lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </Container>

      {open && (
        <nav className="border-t border-sand-200 bg-sand-50 lg:hidden" aria-label="Mobile">
          <Container className="flex flex-col gap-1 py-3">
            {[...NAV, { to: "/therapist", label: UI.nav.therapist }].map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                {t(n.label)}
              </NavLink>
            ))}
            <LanguageToggle className="mt-2 self-start sm:hidden" />
          </Container>
        </nav>
      )}
    </header>
  );
}
