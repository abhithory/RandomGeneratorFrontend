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

 

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs:["en","he"],
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator','htmlTag', 'path', 'subdomain'],
      caches: ['localStorage', 'cookie'],
      
    },
    fallbackLng: "en",
    backend:{
      loadPath: 'assests/locales/languages/{{lng}}.json',
    },
    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
    react:{useSuspense:false}
  });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);


