import React from 'react';
import { AuthContextProvider } from '../hooks/AuthContext';
import { I18nextProvider } from 'react-i18next';
import { ColorModeProvider } from '../hooks/ThemeContext';

import language from '../Utils/language';

import '../styles/globals.scss';
import '../styles/watch.css';
import "react-phone-input-2/lib/style.css";

import '../styles/globals.scss';

import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// NProgress Customization
NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: false,
});

// Show a loading bar when changing routes
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
        <I18nextProvider i18n={language}>
          <ColorModeProvider>
            <Component {...pageProps} />
          </ColorModeProvider>
        </I18nextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
