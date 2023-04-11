import { get } from 'lodash';
// import { PublicKey } from '@solana/web3.js';
// import moment from 'moment';
import {
  getLength, upperCase, lowerCase, getStorage, fetchCacheRedisLocal
} from '@src/utils/functions';
import {
  chainType, SOLANA_TOKEN,
} from '@src/utils/constants/common';
import Coin from '@src/models/system/Coin';
import SupportAPI from '@src/utils/services/support.service';
import SarosPool from '@src/models/saros/SarosPool';
import redisService from '@src/app';

let timeCache;
let coinLocal;
let coinFetchData;

export default class OtherServices {
  private redisClient;
  constructor() {
    this.redisClient = redisService;
  }
  static getPriceByAddressToken(chain, address, symbol = '') {
    const stableCoin = ['USDC', 'USDT', 'BUSD', 'BUSD', 'USDT.E', 'USDC.E', 'HUSD', 'CUSD', 'MCUSD', 'FEI'];
    OtherServices.checkRefreshCoinLocal();
    const fmtSymbol = upperCase(symbol);
    const isAddress = getLength(address) > 0;
    if (stableCoin.includes(fmtSymbol)) return 1;
    const chainCoin = coinLocal[chain];
    if (!chainCoin) return 0;

    let findCoin;
    if (!isAddress) {
      findCoin = chainCoin.find((it) => upperCase(it.symbol) === fmtSymbol);
    } else {
      const fmtAddress = lowerCase(address);

      findCoin = chainCoin.find((it) => lowerCase(it.address) === fmtAddress);
    }

    if (!findCoin) return 0;

    const findPrice = coinFetchData.find((it) => it.id === findCoin.cgkId);
    return get(findPrice, 'current_price', 0);
  }

  static async fetchFirstCoin(req, res) {
    let coinFetch;
    let coinLocalFetch;

    if ((process.env.IS_DEV) === 'true') {
      coinFetch = await SupportAPI.getCoinGecko();
      coinLocalFetch = await SupportAPI.getCoinLocal();
    } else {
      coinFetch = await getStorage('coinGecko');
      coinLocalFetch = await getStorage('coinLocal');
    }

    if (coinFetch) {
      coinFetchData = coinFetch;
    }
    if (coinLocalFetch) {
      coinLocal = coinLocalFetch;

      coinLocal.solana = await OtherServices.getTokenSolanaLocal(false);
    }
    res.json(true);
  }

  static async fetchFirstCoinLocal() {
    let coinFetch;
    let coinLocalFetch;

    if ((process.env.IS_DEV) === 'true') {
      coinFetch = await SupportAPI.getCoinGecko();
      coinLocalFetch = await SupportAPI.getCoinLocal();
    } else {
      coinFetch = await getStorage('coinGecko');
      coinLocalFetch = await getStorage('coinLocal');
    }

    if (coinFetch) {
      coinFetchData = coinFetch;
    }
    if (coinLocalFetch) {
      coinLocal = coinLocalFetch;

      coinLocal.solana = await OtherServices.getTokenSolanaLocal(false);
    }
  }

  static async checkRefreshCoinLocal() {
    const dateNow = Date.now();
    if ((dateNow - timeCache) >= (60000 * 10)) {
      await OtherServices.fetchFirstCoin(false, false);
      timeCache = dateNow;
    }
  }

  static getCoinGeckoByAddress(address, chain) {
    const findCoin = get(coinLocal, chain, []).find((it) => lowerCase(it.address) === lowerCase(address));
    return get(findCoin, 'cgkId', false);
  }

  static getCoinGeckoLocal() {
    return coinFetchData;
  }

  static getSolanaLocal() {
    OtherServices.checkRefreshCoinLocal();

    return coinLocal.solana;
  }

  static getSolanaTokenDecimals(tokenAddress, isFull) {
    OtherServices.checkRefreshCoinLocal();

    const coinData = (coinLocal.solana || []).find((it) => lowerCase(it.mintAddress) === lowerCase(tokenAddress));
    if (isFull) {
      return coinData || {};
    }
    return coinData ? coinData.decimals : 9;
  }

  static async getEvmLocal(chain) {
    OtherServices.checkRefreshCoinLocal();

    if (coinLocal && coinLocal[chain]) {
      return coinLocal[chain];
    }
    const coinLocalFetch = await SupportAPI.getCoinLocal();
    return coinLocalFetch[chain];
  }

  static async getTokenLocal(address, chain = chainType.binanceSmart) {
    const tokenChain = await OtherServices.getEvmLocal(chain);

    const tokenData = tokenChain.find((it) => lowerCase(it.mintAddress || it.address) === lowerCase(address));
    const {
      image, name, symbol, id, cgkId,
    } = tokenData || {};
    return {
      address, image, cgkId: id || cgkId, chain, name, symbol,
    };
  }

  static async getTokenSolanaLocal(isV2:boolean) {
    const response = await fetchCacheRedisLocal(`SOLANA_TOKEN_DATA_NEW${isV2 ? '_V2' : ''}`, 60000, async () => {
      const dataCoin:any = await Coin.find({ isActive: true, chain: 'solana' }, {
        address: 1, cgkId: 1, name: 1, symbol: 1, image: 1, decimal: 1,
      });

      const filterFromSolanaChain = SOLANA_TOKEN.filter((data) => !dataCoin.find((item) => item.address === data.mintAddress));

      const finalData = filterFromSolanaChain;

      if (getLength(dataCoin) > 0) {
        const filterData = dataCoin.map((item:any) => {
          const isSolana = item.symbol === 'SOL';
          if (isSolana) return false;
          return {
            id: item.cgkId,
            mintAddress: isSolana ? 'So11111111111111111111111111111111111111112' : item.address,
            symbol: isV2 ? item.symbol : (isSolana ? 'wSOL' : item.symbol),
            name: item.name,
            icon: item.image,
            decimals: isSolana ? '9' : ((item.decimal !== null || item.decimal !== undefined) ? item.decimal.toString() : '6'),
          };
        }).filter((it) => it);
        Array.prototype.push.apply(finalData, filterData);
      }

      const sPool = await SarosPool.find({ isActive: true }, {
        _id: 0, token0: 1, token1: 1, poolAccountInfo: 1,
      });

      const sPoolMap = sPool.map((it:any) => ({
        id: '',
        mintAddress: it.poolAccountInfo.lpTokenMint,
        symbol: `${upperCase(it.token0.symbol)}-${upperCase(it.token1.symbol)}`,
        name: `Saros ${upperCase(it.token0.symbol)}-${upperCase(it.token1.symbol)} Saros LP`,
        icon: 'https://coin98.s3.ap-southeast-1.amazonaws.com/Coin/sarosLP.png',
        decimals: 2,
      }));

      return [...sPoolMap, ...finalData];
    });
    return response;
  }

  static async getSerumTokenDataV2(req, res) {
    const finalData = await OtherServices.getTokenSolanaLocal(true);
    res.json(finalData);
  }

  static async getSerumTokenData(req, res) {
    const finalData = await OtherServices.getTokenSolanaLocal(false);
    res.json(finalData);
  }
}
