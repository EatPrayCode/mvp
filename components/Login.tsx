import React, { useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import {
  signInAnonymous,
  signInWithGoogle,
} from '../lib/firebase/authentification';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import OtpVerify from '../components/OtpVerify';
import SignInEmail from './SignInEmail';
import ForgotPassword from './ForgotPassword';

function Login() {
  const router = useRouter();
  const [showOTPScreen, setShowOTPScreen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const LoginWithGoogle = () => {
    signInWithGoogle()
      .then(() => {
        router.push(`/home`);
      })
      .catch((error) => {
        toast(error.message, {
          icon: `⛔️`,
        });
      });
  };

  const LoginWithPhone = () => {
    setCurrentPage(1);
  };

  const LoginWithEmail = () => {
    setCurrentPage(0);
  };

  const ResetPassword = () => {
    setCurrentPage(3);
  };

  const LoginFn = () => {
    setCurrentPage(0);
  };

  const LoginAnonymously = () => {
    signInAnonymous()
      .then(() => {
        router.push(`/home`);
      })
      .catch((error) => {
        toast(error.message, {
          icon: `⛔️`,
        });
      });
  };

  const GoToLanding = () => {
    router.push(`/`);
  };


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h1 className="font-bold text-center text-2xl mb-5">mr.com</h1>
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">

          {(currentPage == 1) &&
            <OtpVerify />}

          {(currentPage == 0) &&
            <SignInEmail />}

          {(currentPage == 3) &&
            <ForgotPassword />}

          <div className="p-5">
            <div className="grid grid-cols-3 gap-1">
              <button type="button" className="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block" onClick={LoginAnonymously}>Guest</button>
              <button type="button" className="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block" onClick={LoginWithGoogle}>Google</button>

              {(currentPage == 1) &&
                <button type="button" className="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block" onClick={LoginWithEmail}>E-Mail</button>
              }

              {(currentPage == 0) &&
                <button type="button" className="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block" onClick={LoginWithPhone}>Phone</button>
              }

              {(currentPage == 3) &&
                <button type="button" className="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block" onClick={LoginFn}>Login</button>
              }

            </div>
          </div>

          <div className="py-5">
            <div className="grid grid-cols-2 gap-1">
              <div className="text-center sm:text-left whitespace-nowrap">
                <button onClick={ResetPassword} className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block align-text-top">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                  <span className="inline-block ml-1">Forgot Password</span>
                </button>
              </div>
              <div className="text-center sm:text-right whitespace-nowrap">
                <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block align-text-bottom	">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span className="inline-block ml-1">Help</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="py-5">
          <div className="grid grid-cols-2 gap-1">
            <div className="text-center sm:text-left whitespace-nowrap">
              <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block align-text-top">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span onClick={GoToLanding} className="inline-block ml-1">Back to monthlyrepeat.com</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
