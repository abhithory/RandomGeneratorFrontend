import React,{useEffect} from 'react'
import { Select } from '@mantine/core';
import i18n from "i18next";
import cookies from 'js-cookie'
import { useState } from 'react';

const langs = [
    { value: 'en', label: 'English',dir:"ltr" },
    { value: 'he', label: 'עִברִית', dir:"rtl" }
]

export default function ChangeLang() {
    const currentLangCode = cookies.get("i18next") || "en";
    const currentLang = langs.find(l=>l.value===currentLangCode);

    const lanChangeHander = (e) => {
        console.log('====================================');
        console.log(e);
        console.log('====================================');
        i18n.changeLanguage(e)
    }

    useEffect(() => {
      document.body.dir = currentLang.dir || "ltr "
    }, [currentLang])
    
    
    return (
        <div className="">
        <p><span className={currentLang.value ==="en"?'active-text':''} onClick={()=>lanChangeHander('en')}>English</span>|<span className={currentLang.value !=="en"?'active-text':''} onClick={()=>lanChangeHander('he')}>עִברִית</span></p>
        </div>
        )}

