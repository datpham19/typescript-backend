/// Common Services for third-party library
/// Include for captcha, onesignal, sendgrid .....
import jwt from 'jsonwebtoken';
import get from 'lodash/get';
import moment from 'moment';
import redisService from '@src/app';

import OtherServices from './onchain.service';

export default class CommonServices {
  private redisClient;

  constructor() {
    this.redisClient = redisService;
  }
  static verifyToken(token, password) {
    return jwt.verify(token, password, (err) => !err);
  }

  static decodeToken(token) {
    const decodeToken = jwt.decode(token);
    return decodeToken;
  }

  static generateJWTLogin(email, source) {
    return jwt.sign({ id: email, source }, process.env.SECRET_TOKEN_APDATER, { expiresIn: 60 * 60 });
  }

  static generateJWTVerify(email, token, code) {
    return jwt.sign({ id: email, token }, code || process.env.SECRET_TOKEN_VERIFY, { expiresIn: '365d' });
  }

  async countSpam(id, time) {
    if (['115.78.227.213', process.env.WHITELIST_IP, process.env.WHITELIST_IP_2, '18.139.31.98'].includes(id)) {
      return true;
    }

    const current = moment().valueOf();
    const spamTime = await this.redisClient.getStorage(`SPAM_${id}`);

    // Validate time rate limit
    if (spamTime && (current - spamTime) < time) {
      return true;
    }
    await this.redisClient.saveStorage(`SPAM_${id}`, current);

    return false;
  }

  static getPriceByCgkIdLocal(cgkId) {
    const cgkData = OtherServices.getCoinGeckoLocal();
    const data = cgkData.find((it) => it.id === cgkId);
    return get(data, 'current_price', 0);
  }
}

export const fetchAPI = async (apiurl, headers) => {
  try {
    const response = await fetch(apiurl, headers);

    if (response.status === 200) {
      const responJson = await response.json();
      return responJson;
    }

    if (response.status === 429) {
      return await fetchAPI(apiurl, headers);
    }
    if (response.status === 500) {
      return false;
    }

    const responJson = await response.json();
    return responJson;
  } catch (error) {
    console.log('error', error);
    return false;
  }
};
