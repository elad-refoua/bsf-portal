import type { Bilingual } from "@/lib/types";

/** UI chrome strings (navigation, buttons, labels) — not clinical content. */
export const UI = {
  brand: { he: "CATAN", en: "CATAN" } as Bilingual,
  brandSub: {
    he: "התערבות ממוקדת-צרכים בפגישה אחת",
    en: "Need-Focused Single-Session Intervention",
  } as Bilingual,

  nav: {
    home: { he: "בית", en: "Home" } as Bilingual,
    understand: { he: "רגשות וצרכים", en: "Emotions & Needs" } as Bilingual,
    needs: { he: "ששת הצרכים", en: "The Six Needs" } as Bilingual,
    practice: { he: "אזור תרגול", en: "Practice" } as Bilingual,
    myspace: { he: "המרחב שלי", en: "My Space" } as Bilingual,
    calm: { he: "רוגע והאזנה", en: "Calm & Audio" } as Bilingual,
    therapist: { he: "אזור מטפלים", en: "For Therapists" } as Bilingual,
  },

  doors: {
    patientTitle: { he: "אני כאן לתרגל", en: "I'm here to practice" } as Bilingual,
    patientDesc: {
      he: "ידע מונגש על רגשות וצרכים, וכלים אינטראקטיביים לתרגול בקצב שלך.",
      en: "Accessible knowledge about emotions and needs, plus interactive tools to practice at your own pace.",
    } as Bilingual,
    therapistTitle: { he: "אני מטפל/ת", en: "I'm a therapist" } as Bilingual,
    therapistDesc: {
      he: "הפרוטוקול המלא, סקריפטים, פגישות מעקב וחומרים להורדה.",
      en: "The complete protocol, scripts, check-ins, and downloadable materials.",
    } as Bilingual,
  },

  actions: {
    enter: { he: "כניסה", en: "Enter" } as Bilingual,
    start: { he: "התחלה", en: "Start" } as Bilingual,
    open: { he: "פתיחה", en: "Open" } as Bilingual,
    save: { he: "שמירה", en: "Save" } as Bilingual,
    saved: { he: "נשמר", en: "Saved" } as Bilingual,
    clear: { he: "ניקוי", en: "Clear" } as Bilingual,
    print: { he: "הדפסה / PDF", en: "Print / PDF" } as Bilingual,
    download: { he: "הורדה", en: "Download" } as Bilingual,
    back: { he: "חזרה", en: "Back" } as Bilingual,
    unlock: { he: "כניסה", en: "Unlock" } as Bilingual,
    newEntry: { he: "רשומה חדשה", en: "New entry" } as Bilingual,
  },

  a11y: {
    primaryNav: { he: "ניווט ראשי", en: "Primary" } as Bilingual,
    menuNav: { he: "תפריט", en: "Menu" } as Bilingual,
    openMenu: { he: "פתיחת התפריט", en: "Open menu" } as Bilingual,
    closeMenu: { he: "סגירת התפריט", en: "Close menu" } as Bilingual,
  },

  misc: {
    skipToContent: { he: "דילוג לתוכן", en: "Skip to content" } as Bilingual,
    languageName: { he: "עברית", en: "English" } as Bilingual,
    switchTo: { he: "English", en: "עברית" } as Bilingual,
    minutes: { he: "דק׳", en: "min" } as Bilingual,
    tools: { he: "כלים", en: "Tools" } as Bilingual,
    privacy: {
      he: "כל מה שתכתבו נשמר רק במכשיר שלכם ואינו נשלח לשום מקום.",
      en: "Everything you write is stored only on your device and is never sent anywhere.",
    } as Bilingual,
    madeBy: {
      he: "פותח במעבדת ARLAB, אוניברסיטת בר-אילן · פרופ׳ אשכול רפאלי",
      en: "Developed in the ARLAB, Bar-Ilan University · Prof. Eshkol Rafaeli",
    } as Bilingual,
    builtBy: {
      he: "האתר נבנה על ידי אלעד רפואה",
      en: "Website built by Elad Refoua",
    } as Bilingual,
    accessibility: {
      he: "הצהרת נגישות",
      en: "Accessibility statement",
    } as Bilingual,
    privacyStatement: {
      he: "פרטיות ואחסון מקומי",
      en: "Privacy & local storage",
    } as Bilingual,
    citation: {
      he: "מבוסס על מודל הצרכים של Dweck (2017).",
      en: "Based on Dweck's (2017) needs model.",
    } as Bilingual,
  },
} as const;
