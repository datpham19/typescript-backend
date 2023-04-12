// /* eslint-disable max-len */
// import redis from 'redis';
// import MailChecker from 'mailchecker';
// import bigdecimal from 'bigdecimal';
// import converter from 'hex2dec';
// import slug from 'slug';
// import mongoose from 'mongoose';
// import get from 'lodash/get';
//
// const clientRedis = redis.createClient();
// const BLOCKED_DOMAIN = ['tadipexs.com', 'minimail.gq', 'freeml.net', '1655mail.com', 'iperfectmail.com', 'inboxkitten.com', 'altpano.com', 'anlubi.com', 'catdogmail.live',
//   'tadipexs.com', 'teml.net', 'drmail.in', 'revdex.ga', 'btzyud.tk', 'wifaide.ml', 'tagjus.cf', 'donymails.com',
//   'ofanda.com', 'odeask.com', 'woopros.com', 'ewebrus.com', 'googlemail.com', 'spymail.one', 'flymail.tk',
//   'mail1s.edu.vn',
//   'emailfree.cyou',
//   'emailao.cyou',
//   'email10p.cyou',
//   'tempmail1s.cyou',
//   'tempmail1s.icu',
//   'mail1s.icu',
//   'mail1s.cyou',
//   'coina.cyou',
//   'mail1s.top',
//   'mail10p.cyou',
//   '1smail.ga',
//   '1smail.cf',
//   '1smail.tk',
//   'conca.cf',
//   'conca.ga',
//   'cuoly.cf',
//   'cuoly.tk',
//   'ersteme.ml',
//   'ersteme.tk',
//   'googlevn.ga',
//   'googlevn.gq',
//   'hotemail.gq',
//   'sayohze.ga',
//   'sayohze.ml',
//   'skyoi.cf',
//   'skyoi.ml',
//   'skyoi.tk',
//   'tikktok.tk',
//   'tikktok.ga',
//   'yeuinta.ga',
//   'lovemark.ga',
//   'picachu.ga',
//   'sayohze.ga',
//   'skyoi.ga',
//   'hotmail.com',
// ];
// let emailWhitelist;
// let expiredTimeEmail;
//
// export const getLength = (value:any): number => (value ? value.length : 0);
// export const genUpdate = (data, arrValue):any => {
//   const genObject = {};
//   arrValue.map((itm) => {
//     if (data[itm] !== undefined && data[itm] !== null) {
//       genObject[itm] = data[itm];
//     }
//     return itm;
//   });
//   return Object.keys(genObject)[0] ? genObject : false;
// };
//
// export const genSkipNum = (page: string, size: string): number => (parseInt(page, 10) - 1) * parseInt(size, 10);
// export const upperCase = (value) => (value ? value.toUpperCase() : value);
// export const lowerCase = (value) => (value && typeof (value) === 'string' ? value.toLowerCase() : '');
// export const onlyUnique = (value, index, self) => self.indexOf(value) === index;
// export const createSlug = (text) => slug(text);
//
// export const genSortStateMongo = (sortString:string = ''):any => {
//   if (getLength(sortString) === 0) return { createdAt: -1 };
//   const isDesc = sortString[0] === '-';
//   const key = isDesc ? sortString.substring(1) : sortString;
//   const sortData = { ...(isDesc ? { [key]: -1 } : { [key]: 1 }) };
//   return sortData;
// };
//
// // eslint-disable-next-line no-promise-executor-return
// export const sleep = (ms:any) => new Promise((resolve) => setTimeout(resolve, ms));
// export const getStorage = async (key) => {
//   try {
//     return await clientRedis.get(key);
//   } catch (error) {
//     return null;
//   }
// };
// export const saveStorage = (key, value) => {
//   clientRedis.set(key, JSON.stringify(value));
// };
// export const deleteStore = (key) => {
//   clientRedis.del(key);
// };
// // eslint-disable-next-line default-param-last
// // export const fetchCacheRedis = async (key, req, next, time = 30000, func) => {
// //   const currentTime = Date.now();
// //
// //   const getData = await getStorage(key);
// //   if (getData && getData.data && ((currentTime - getData.time) <= time)) {
// //     req.response = getData.data;
// //     return next();
// //   }
// //   const isCacheData = get(getData, 'data');
// //   if (isCacheData) {
// //     req.response = getData.data;
// //     next();
// //   }
// //   func().then((payload) => {
// //     saveStorage(key, { data: payload, time: currentTime });
// //     if (!isCacheData) {
// //       req.response = payload;
// //       next();
// //     }
// //   }).catch(() => {
// //     next();
// //   });
// // };
//
// export const splitAddress = (address, isVersion2, numSplit) => {
//   if (address) {
//     return address.substring(0, isVersion2 ? 4 : (numSplit || 10)) + (isVersion2 ? ' **** **** ' : ' ... ') + address.substring(getLength(address) - (isVersion2 ? 4 : (numSplit || 10)), getLength(address));
//   }
//   return '';
// };
// export const checkInvalidRequireField = (arrKey, object) => arrKey.find((key) => getLength(object[key]) === 0);
// export const updateCacheRedislocal = async (key, func, currentTime) => {
//   const payload = await func();
//   saveStorage(key, JSON.stringify({ data: payload, time: currentTime }));
// };
// // eslint-disable-next-line default-param-last
// export const fetchCacheRedisLocal = async (key, time = 30000, func) => {
//   try {
//     const currentTime = Date.now();
//
//     let getData = await getStorage(key);
//     let parsedResult = JSON.parse(getData);
//     parsedResult = { data: parsedResult, time: Date.now() };
//     if (parsedResult && parsedResult.data) {
//       if ((currentTime - parsedResult.time) > time) {
//         updateCacheRedislocal(key, func, currentTime);
//       }
//
//       return parsedResult.data;
//     }
//
//     const payload = await func();
//     saveStorage(key, JSON.stringify({ data: payload, time: currentTime }));
//     return payload;
//   } catch (error) {
//     return null;
//   }
// };
//
// export const getEmailWhitelist = (isUpdateWhiteList) => {
//   const current = Date.now();
//   const isOverTime = (current - expiredTimeEmail) > 60000 * 10;
//
//   if (isUpdateWhiteList || isOverTime) {
//     expiredTimeEmail = Date.now();
//     getStorage('WHITELIST_EMAIL').then((res) => {
//       emailWhitelist = res;
//     });
//     return true;
//   }
//
//   if (!emailWhitelist) {
//     getStorage('WHITELIST_EMAIL').then((res) => {
//       emailWhitelist = res;
//     });
//   }
//   return emailWhitelist || [];
// };
// export const countDots = (strString, strLetter) => {
//   const string = strString.toString();
//   return (string.match(RegExp(strLetter, 'g')) || []).length;
// };
// export const validateEmailRule = (sEmail) => {
//   const whiteListEmail = getEmailWhitelist(false);
//
//   if (whiteListEmail.includes(sEmail)) {
//     return true;
//   }
//
//   const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   const email = String(sEmail).toLowerCase();
//
//   const isValidCheck = re.test(email);
//
//   // Email first
//   if (isValidCheck) {
//     const reDomain = /[@](?=(?:[a-zA-Z0-9.]{5})){1}(?=(?:\D*\d){4})(.*)/;
//
//     // Domain second
//     const isInvalidDomain = reDomain.test(email);
//     if (isInvalidDomain) return false;
//
//     const splitEmail = email.split('@')[0];
//     const splitEmailDomain = email.split('@')[1];
//
//     if (countDots(splitEmail, '\\.') > 1) {
//       return false;
//     }
//
//     if (BLOCKED_DOMAIN.indexOf(splitEmailDomain) >= 0) return false;
//
//     if (!MailChecker.isValid(email)) {
//       return false;
//     }
//
//     return true;
//   }
//   return true;
// };
//
// export const convertToMongoID = (id) => {
//   try {
//     return new mongoose.Types.ObjectId(id);
//   } catch (err) {
//     return new mongoose.Types.ObjectId();
//   }
// };
//
// export const convertBalanceToWei = (strValue, iDecimal = 18) => {
//   const multiplyNum = new bigdecimal.BigDecimal(10 ** iDecimal);
//   const convertValue = new bigdecimal.BigDecimal(String(strValue));
//   return multiplyNum.multiply(convertValue).toString().split('.')[0];
// };
// export const convertWeiToBalance = (strValue, iDecimal = 18) => {
//   try {
//     if (strValue) {
//       const multiplyNum = new bigdecimal.BigDecimal(10 ** iDecimal);
//       const convertValue = new bigdecimal.BigDecimal(String(strValue));
//
//       return convertValue.divide(multiplyNum).toString();
//     }
//     return 0;
//   } catch (error) {
//     return 0;
//   }
// };
//
// export const convertHexToDecimal = (hexNum) => converter.hexToDec(hexNum);
// export const convertDecimalToHex = (number) => converter.decToHex(number.toString());
// export default {};
