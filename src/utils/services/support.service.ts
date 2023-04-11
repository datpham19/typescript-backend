import QueryString from 'query-string';
import get from 'lodash/get';
import { REQUEST_TYPE } from '@src/utils/constants/common';

export default class SupportAPI {
  static async postGetCommonPair(typeTrade, currencyIn, currencyOut, isForceReload) {
    const body = {
      typeTrade,
      currencyIn: {
        symbol: get(currencyIn, 'symbol'),
        address: get(currencyIn, 'address'),
        decimals: get(currencyIn, 'decimals'),
        name: get(currencyIn, 'name'),
      },
      currencyOut: {
        symbol: get(currencyOut, 'symbol'),
        address: get(currencyOut, 'address'),
        decimals: get(currencyOut, 'decimals'),
        name: get(currencyOut, 'name'),
      },
      isForceReload,
    };

    return this.postGateWay('ammPairV2', REQUEST_TYPE.POST, body, false);
  }

  static async getSetting() {
    return this.getData('settingV6');
  }

  static async getCoinLocal() {
    return this.getData('coinLocal');
  }

  static async getCoinGecko() {
    return this.getData('coinGecko');
  }

  static async postCoinGecko(body) {
    return this.postGateWay('coinGecko', REQUEST_TYPE.POST, body);
  }

  static async getData(type, queryBody = false) {
    return this.postGateWay(type, REQUEST_TYPE.GET, undefined, queryBody);
  }

  static async postData(type, body) {
    return this.postGateWay(type, REQUEST_TYPE.POST, body);
  }

  static async putData(type, body) {
    return this.postGateWay(type, REQUEST_TYPE.PUT, body);
  }

  // eslint-disable-next-line
  static async postGateWay(url, method = REQUEST_TYPE.GET, body:any=false, queryBody:any = false) {
    try {
      let queryStr = '';
      let queryFly;

      if (queryBody) {
        queryFly = QueryString.stringify(queryBody);
        queryStr = `?${queryFly}`;
      }

      const params = {
        method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Version: '10.0.0',
          Authorization: 'Bearer token c26340d5243d802f03de751b9cbc049557ad0a14296aacf4a37dc7399adbe65c',
          Signature: 'c26340d5243d802f03de751b9cbc049557ad0a14296aacf4a37dc7399adbe65c',
        },
        body: '',
      };

      if (body) {
        params.body = JSON.stringify(body);
      }

      const response = await fetch(`https://information.coin98.com/api/${url}${queryStr}`, params);

      const responJson = await response.json();

      if (response.status === 200) {
        return responJson;
      }

      if (response.status === 400) {
        return responJson;
      }

      return null;
    } catch (error) {
      return null;
    }
  }
}
