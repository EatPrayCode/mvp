var config = {
  // Set the Demo Version
  demo: false,

  //SEO Configurations
  appName: 'MRShop',
  metaDescription: 'Life Automation',
  metaKeyWords: 'MRShop,automation,Subscriptions,Earnings',
  //API Configurations
  apiAccessKey: 8525,
  apiUrl: 'https://mybackend.com/api/',

  //Language Configurations
  // Get Your Language Codes ---> https://developers.google.com/admin-sdk/directory/v1/languages
  supportedLanguages: ['en', 'hi', 'ur', 'malayalam'],
  defaultLanguage: 'en',

  // If your Default Language is not in supportedLanguages then add there first and after that set the defaultLanguage.

  //Quiz Configurations
  questionTimerSeconds: 15,
  levelWinCheckPoint: 30, // Above 30% is required to Clear the Quiz Level
  maxWinningCoins: 4, // This will give user the coins if user will clear the level
  deductReviewAnswerCoins: 10, // 10 coins will be deducted if user Review the Answer
  addCorrectAnswerScore: 2, // This will increase the user score after each correct answer
  deductIncorrectAnswerScore: 1, // This will deduct the points if user will give wrong answer
  deductLifeLineCoins: 1, // Deduct Coins when using Life Line

  DefaultCountrySelectedInMobile: 'in', //Default Country Selected in Mobile Login Screen

  //Firebase Configurations
  // apiKey: "XXXXXXXXXXXXXXXXXXXXX",
  // authDomain: "XXXXXXXXXXXXXXXXX",
  // projectId: "XXXXXXXXXXXXXXXXXX",
  // storageBucket: "XXXXXXXXXXXXXX",
  // messagingSenderId: "XXXXXXXXXX",
  // appId: "XXXXXXXXXXXXXXXXXXXXXX",
  // measurementId: "XXXXXXXXXXXXXX",
  apiKey: 'AIzaSyDr9iF87shHnvCOIsVT45_ABI_cBmpZ_BA',
  authDomain: 'beta-95455.firebaseapp.com',
  projectId: 'beta-95455',
  storageBucket: 'beta-95455.appspot.com',
  messagingSenderId: '148420292781',
  appId: '1:148420292781:web:674527e6be26565fdc9624',
  measurementId: 'G-108X9FEPWF',

  //footer area
  companytext: 'Connect with Netas.',
  addresstext:
    'Address: Floor 17, MRShop Co, Bengaluru - 560034 Karnataka India.',
  phonenumber: '+91 9999999999',
  email: 'support@company.com',
  facebooklink: 'https://www.facebook.com/company.com',
  instagramlink: 'https://www.instagram.com/company.com',
  linkedinlink: 'https://www.linkedin.com/company/companyco',
  weblink: 'https://company.com/',
  companyname: 'BlindingLightsCo.',
};

export default config;
