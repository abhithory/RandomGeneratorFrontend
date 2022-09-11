import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import './css/Header.css';
import './css/RandomNames.css';
import App from './App';

import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';


const heLan = {
  "header_name": "מחולל שמות אקרא",
  "how_you_want_to_fill_data": "איך אתה רוצה למלא נתונים",
  "excel_file": "קובץ אקסל",
  "input_box": "תיבת קלט",
  "picked_file": "קובץ שנבחר",
  "drag_file_here": "גרור את הקובץ לכאן או לחץ כדי לבחור קבצים",
  "attach_excel": "צרף את קובץ האקסל שלך כאן",
  "some_names_from_file": "כמה שמות מהקובץ",
  "textarea_placeholder": "הדבק כאן שמות בצורה זו\nשם\nשם\nשם\nשם\nשם\nשם\n",
  "filters": "מסננים",
  "remove_duplicate_names": "הסר שמות כפולים",
  "process_data": "לעבד את הנתונים",
  "total_names": "סך השמות",
  "process_again": "לעבד נתונים שוב",
  "pick_ran_name": "בחר שם אקראי",
  "pick_winner": "לבחור מנצח",
  "not_allowed": "אסור לבחור מנצח",
  "connect_wallet": "לחבר ארנק",
  "result": "תוצאה",
  "random_winner": "זוכה אקראי",
  "check_code_smart_contract": "בדוק את החוזה החכם של מחולל שם/מספרים אקראיים",
  "click_to_check": "בדוק חוזה חכם",
  "loading": "טוען",
  "please_wait": "אנא המתן, אנו קוראים נתונים בקובץ זה",
  "verify_trans": "אמת את העסקה"
}

const enLan = {
  "header_name": "Random Name Generator",
  "how_you_want_to_fill_data": "How you want to fill data?",
  "excel_file": "Excel file",
  "input_box": "Input box",
  "picked_file": "Picked file:",
  "drag_file_here": "Drag file here or click to select files",
  "attach_excel": "Attach your excel File here",
  "some_names_from_file": "Some names from file",
  "textarea_placeholder": "Paste names here in this way\nname1\nname2\nname3\nname4\nname5\nname6\n",
  "filters": "Filters",
  "remove_duplicate_names": "Remove Duplicate Names",
  "process_data": "Process The data",
  "total_names": "Total Names:",
  "process_again": "Process data again",
  "pick_ran_name": "Pick random name",
  "pick_winner": "Pick Winner",
  "not_allowed": "Not allowed to pick Winner",
  "connect_wallet": "Connect Wallet",
  "result": "Result",
  "random_winner": "Random Winner",
  "check_code_smart_contract": "Check our Random Name/Number Generator Smart Contract",
  "click_to_check": "Check Smart contract",
  "loading": "Loading",
  "please_wait": "Please wait, We are reading data this file",
  "verify_trans": "Verify Transaction"
}



i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ["en", "he"],
    resources: {
      en: {
        translation: enLan
      },
      he: {
        translation:heLan
      }
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage', 'cookie'],

    },
    fallbackLng: "en",

    // backend:{
    //   loadPath: return enLan,
    // },
    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
    // react: { useSuspense: false }
  });

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


