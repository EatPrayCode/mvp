import React, { useState, useEffect } from "react";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from "firebase/auth"
import { auth } from "../lib/firebase/authentification";

import { useRouter } from 'next/router'
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import config from "../Utils/config";
import Link from "next/link";
import { withTranslation } from 'react-i18next';

function OtpVerify({ t }) {

  const [phoneNumber, setPhoneNumber] = useState("917382365275");
  const [confirmResult, setConfirmResult] = useState("");
  const [verficationCode, setVerificationCode] = useState("123456");
  const [userId, setUserId] = useState("");
  const [isSend, setIsSend] = useState(false);
  const [newUserScreen, setNewUserScreen] = useState(false);
  const [showReferCode, setShowReferCode] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    mobile: "",
    email: "",
    profile: "",
    all_time_rank: "",
    all_time_score: "",
    coins: "",
  });
  const [load, setLoad] = useState(false);
  const router = useRouter()

  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "captchaContainer",
        {
          size: "invisible",
          callback: () => {
            // ...
          }
          // other options
        },
        auth
      );
    }
  }, []);

  // Validation
  const validatePhoneNumber = (phone_number) => {
    var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/;
    return regexp.test(phone_number);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    var phone_number = "+" + phoneNumber;
    const appVerifier = window.recaptchaVerifier;
    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phone_number,
        appVerifier
      );
      // save auth result
      window.confirmationResult = confirmationResult;
      setIsSend(true);
      setLoad(false);
      setConfirmResult(confirmationResult);
    } catch (err) {
      if (window.captchaWidgetId) {
        window.grecaptcha.reset(window.captchaWidgetId);
      } else {
        window.recaptchaVerifier
          .render()
          .then(function (widgetId) {
            window.captchaWidgetId = widgetId;
            window.grecaptcha.reset(widgetId);
          })
          .catch((err) => {
            // ...
          });
        toast.error(err.message);
        setLoad(false);
      }
    }
  };

  const GoToHome = () => {
    router.push(`/`);
  };

  const AfterLoginFn = (result) => {
    https://www.reddit.com/r/Firebase/comments/mgd7x9/phone_authentication_in_nextjs/
    console.log("Starts here");
    GoToHome();
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setLoad(true);
    let phoneCredential;
    try {
      if (window.confirmationResult) {
        // verify code against auth result
        phoneCredential = PhoneAuthProvider.credential(
          window.confirmationResult.verificationId,
          verficationCode
        );
      } else {
        throw new Error('SMS code cannot be verified. Please try again.');
      }
      // sign in
      const result = await signInWithCredential(auth, phoneCredential);
      setLoad(false);
      AfterLoginFn(result);
    } catch (err) {
      setLoad(false);
    }
  };

  const resendOtp = async (e) => {
    e.preventDefault();
    setLoad(true);
    var phone_number = "+" + phoneNumber;
    const appVerifier = window.recaptchaVerifier;
    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phone_number,
        appVerifier
      );
      // save auth result
      window.confirmationResult = confirmationResult;
      setIsSend(true);
      setLoad(false);
      setConfirmResult(confirmationResult);
    } catch (err) {
      if (window.captchaWidgetId) {
        window.grecaptcha.reset(window.captchaWidgetId);
      } else {
        window.recaptchaVerifier
          .render()
          .then(function (widgetId) {
            window.captchaWidgetId = widgetId;
            window.grecaptcha.reset(widgetId);
          })
          .catch((err) => {
            // ...
          });
        toast.error(err.message);
        setLoad(false);
      }
    }
  };

  const onChangePhoneNumber = (e) => {
    e.preventDefault();
    setVerificationCode("");
    setConfirmResult(null);
    setIsSend(false);
  };
  return (
    <React.Fragment>
      <div className="px-5 py-7">
        {!isSend ? (
          <form className="" onSubmit={onSubmit}>
            <div>
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                {t("Enter your Mobile number")} :
              </label>
              <PhoneInput
                value={phoneNumber}
                country={config.DefaultCountrySelectedInMobile}
                countryCodeEditable={false}
                autoFocus={true}
                onChange={(phone) => setPhoneNumber(phone)}
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              />

              <button type="submit" className="transition duration-200 mt-5 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                <span className="inline-block mr-2">
                  {!load ? t("Request OTP") : t("Please Wait")}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>

              <label className="invisible font-semibold text-sm text-gray-600 pb-1 block">Password</label>
              <input type="text" className="invisible border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />

            </div>
          </form>
        ) : null}
        {isSend ? (
          <form className="" onSubmit={handleVerifyCode}>
            <div className="form">
              <label htmlFor="code" className="my-2">
                {t("Enter your OTP")} :
              </label>

              <input type="number" placeholder={t("Enter your OTP")} onChange={(e) => setVerificationCode(e.target.value)} className="form-control p-3" required />

              <div className="">
                <small>
                  <div onClick={resendOtp}>
                    {t("Resend OTP")}
                  </div>
                </small>
              </div>

              <div className="text-center">
                <button type="submit" className="">
                  {!load ? t("Submit") : t("Please Wait")}
                </button>
              </div>

              <div className="text-center">
                <button onClick={onChangePhoneNumber} className="">
                  {t("Back")}
                </button>
              </div>

            </div>
          </form>
        ) : null}
        <div id="captchaContainer"></div>
      </div>
    </React.Fragment>
  );
}

export default withTranslation()(OtpVerify);
