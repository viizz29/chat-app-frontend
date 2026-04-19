import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcome: "Welcome",
        select_chat_handle: "Kindly select a chat handle.",
      },
    },
    hi: {
      translation: {
        welcome: "स्वागत है",
        select_chat_handle: "कृपया चैट हैंडल चुनें",
      },
    },
    bn: {
      translation: {
        welcome: "স্বাগতম",
        select_chat_handle: "অনুগ্রহ করে একটি চ্যাট হ্যান্ডেল নির্বাচন করুন।",
      },
    },
  },
  fallbackLng: "en",
});

export default i18n;
