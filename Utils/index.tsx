import cryptoJs from 'crypto-js';
import config from './config';
import * as api from './api';
function flatDeep(arr: any, d = 1) {
  return d > 0
    ? arr.reduce(
        (acc: any, val: any) =>
          acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val),
        [],
      )
    : arr.slice();
}

const slugify = function (text: any) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, `-`) // Replace spaces with -
    .replace(/[^\w-]+/g, ``) // Remove all non-word chars
    .replace(/--+/g, `-`) // Replace multiple - with single -
    .replace(/^-+/, ``) // Trim - from start of text
    .replace(/-+$/, ``); // Trim - from end of text
};

const getSiblings = function (elem: any) {
  const siblings = [];
  let sibling = elem.parentNode.firstChild;
  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== elem) {
      siblings.push(sibling);
    }
    sibling = sibling.nextSibling;
  }
  return siblings;
};

const getClosest = function (elem: any, selector: any) {
  for (; elem && elem !== document; elem = elem.parentNode) {
    if (elem.matches(selector)) return elem;
  }
  return null;
};

function slideUp(element: any, duration = 500) {
  return new Promise((resolve) => {
    element.style.height = `${element.offsetHeight}px`;
    element.style.transitionProperty = `height, margin, padding`;
    element.style.transitionDuration = `${duration}ms`;
    // element.offsetHeight;
    element.style.overflow = `hidden`;
    element.style.height = 0;
    element.style.paddingTop = 0;
    element.style.paddingBottom = 0;
    element.style.marginTop = 0;
    element.style.marginBottom = 0;
    window.setTimeout(() => {
      element.style.display = `none`;
      element.style.removeProperty(`height`);
      element.style.removeProperty(`padding-top`);
      element.style.removeProperty(`padding-bottom`);
      element.style.removeProperty(`margin-top`);
      element.style.removeProperty(`margin-bottom`);
      element.style.removeProperty(`overflow`);
      element.style.removeProperty(`transition-duration`);
      element.style.removeProperty(`transition-property`);
      resolve(false);
    }, duration);
  });
}

function slideDown(element: any, duration = 500) {
  return new Promise(() => {
    element.style.removeProperty(`display`);
    let { display } = window.getComputedStyle(element);

    if (display === `none`) display = `block`;

    element.style.display = display;
    const height = element.offsetHeight;
    element.style.overflow = `hidden`;
    element.style.height = 0;
    element.style.paddingTop = 0;
    element.style.paddingBottom = 0;
    element.style.marginTop = 0;
    element.style.marginBottom = 0;
    // element.offsetHeight;
    element.style.transitionProperty = `height, margin, padding`;
    element.style.transitionDuration = `${duration}ms`;
    element.style.height = `${height}px`;
    element.style.removeProperty(`padding-top`);
    element.style.removeProperty(`padding-bottom`);
    element.style.removeProperty(`margin-top`);
    element.style.removeProperty(`margin-bottom`);
    window.setTimeout(() => {
      element.style.removeProperty(`height`);
      element.style.removeProperty(`overflow`);
      element.style.removeProperty(`transition-duration`);
      element.style.removeProperty(`transition-property`);
    }, duration);
  });
}

function slideToggle(element: any, duration = 500) {
  if (window.getComputedStyle(element).display === `none`) {
    return slideDown(element, duration);
  }
  return slideUp(element, duration);
}

function containsObject(obj: any, list: any) {
  let i;
  for (i = 0; i < list.length; i++) {
    if (list[i].slug === obj.slug) {
      return i;
    }
  }
  return -1;
}

export function isLogin() {
  let user = localStorage.getItem(`user`);
  if (user) {
    try {
      user = JSON.parse(user);
      // if (user.api_token) {
      //   return true;
      // }
      return true;
    } catch (error) {
      return false;
    }
  }
  return false;
}

export function logout() {
  localStorage.clear();
  return true;
}

export function getUserData() {
  const user = localStorage.getItem(`user`);
  if (user) {
    return JSON.parse(user);
  }
  return false;
}

export function updateUserData(updatedDataObj: any) {
  const user: any = localStorage.getItem(`user`);
  const data = { ...user };
  Object.keys(updatedDataObj).forEach((element) => {
    data[element] = updatedDataObj[element];
  });
  localStorage.setItem(`user`, JSON.stringify(data));
  return data;
}

export function decryptAnswer(encrypted_json_string: any, key: any) {
  const obj_json = encrypted_json_string;
  const encrypted = obj_json.ciphertext;
  const iv = cryptoJs.enc.Hex.parse(obj_json.iv);
  key += `0000`;
  key = cryptoJs.enc.Utf8.parse(key);
  try {
    const decrypted = cryptoJs.AES.decrypt(encrypted, key, {
      iv,
    }).toString(cryptoJs.enc.Utf8);
    return decrypted;
  } catch (error) {
    console.log(error);
  }
}

export function calculateCoins(score: any, totalQuestions: any) {
  // This method will determine how much coins will user get after
  // completing the quiz
  // if percentage is more than maxCoinsWinningPercentage then user will earn maxWinningCoins
  //
  // if percentage is less than maxCoinsWinningPercentage
  // coin value will deduct from maxWinning coins
  // earned coins = (maxWinningCoins - ((maxCoinsWinningPercentage - percentage)/ 10))
  // For example: if percentage is 70 then user will
  // earn 3 coins if maxWinningCoins is 4
  const percentage = (score * 100) / totalQuestions;
  let earnedCoins = 0;
  if (percentage >= config.levelWinCheckPoint) {
    earnedCoins = config.maxWinningCoins;
  } else {
    earnedCoins =
      config.maxWinningCoins - (config.levelWinCheckPoint - percentage) / 10;
  }
  if (earnedCoins < 0) {
    earnedCoins = 0;
  }
  return earnedCoins;
}

export function calculateScore(score: any, totalQuestions: any) {
  const correctAnswer = score;
  const incorrectAnswer = totalQuestions - score;
  const correctAnswerScore = correctAnswer * config.addCorrectAnswerScore;
  const incorrectAnswerScore =
    incorrectAnswer * config.deductIncorrectAnswerScore;
  const finalScore = correctAnswerScore - incorrectAnswerScore;
  return finalScore;
}

export function getAndUpdateBookmarkData() {
  api.getBookmark(1).then((response) => {
    if (!response.error) {
      localStorage.setItem(`bookmark`, JSON.stringify(response.data));
    }
  });
}

export function getBookmarkData() {
  const data = localStorage.getItem(`bookmark`);
  if (data) {
    return JSON.parse(data);
  }
  return false;
}

export function deleteBookmarkData(bookmark_id: any) {
  let data: any = localStorage.getItem(`bookmark`);
  if (data) {
    data = JSON.parse(data);
    data = Object.values(data).filter(
      (bookmark: any) => bookmark.id !== bookmark_id,
    );
    localStorage.setItem(`bookmark`, JSON.stringify(data));
    return data;
  }
  return false;
}

export function deleteBookmarkByQuestionID(question_id: any) {
  let data: any = localStorage.getItem(`bookmark`);
  if (data) {
    data = JSON.parse(data);
    data = Object.values(data).filter(
      (bookmark: any) => bookmark.question_id !== question_id,
    );
    localStorage.setItem(`bookmark`, JSON.stringify(data));
    return data;
  }
  return false;
}

export function setSystemSettings(data: any) {
  localStorage.setItem(`settings`, JSON.stringify(data));
}

export function getSystemSettings() {
  const data = localStorage.getItem(`settings`);
  if (data) {
    return JSON.parse(data);
  }
  return false;
}

// scrollhandler in mobile device
export function scrollhandler(top: any) {
  const scrollTohowItWorks = () =>
    window.scroll({
      top,
      left: 0,
      behavior: `smooth`,
    });
  if (window.innerWidth <= 600) {
    scrollTohowItWorks();
  }
  return false;
}

export {
  containsObject,
  flatDeep,
  slugify,
  getSiblings,
  getClosest,
  slideUp,
  slideDown,
  slideToggle,
};
