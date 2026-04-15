import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: { welcome: "Welcome" } },
    hi: { translation: { welcome: "स्वागत है" } },
    bn: { translation: { welcome: "স্বাগতম" } },
  },
  fallbackLng: "en",
});

export default i18n;