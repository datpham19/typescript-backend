import redisService from '../../src/app';
import {mess401, mess404} from "../utils/constants/middleware";
// import {getLength} from "../utils/functions";
export default class Middlewares {
  private redisClient;

  constructor() {
    this.redisClient = redisService;
  }
  static async authorizationAPI(req, res, next) {
    const tokenAuthen = req.get('authorization').replace('Bearer ', '');

    if (!req.get('authorization')) return res.status(404).send(mess404);
    // Header bearer token just a random string greater than 10 characters
    if (tokenAuthen.length < 10) return res.status(401).send(mess401);
    return next();

    // const checkSignature = (user, userAddress) => {
    //   // const stringSignature = req.get('signature')
    //   //
    //   // let passwordHash
    //   //
    //   // if (req.method !== 'GET' && req.method !== 'DELETE') {
    //   //   passwordHash = JSON.stringify(req.body)
    //   // } else {
    //   //   const lengthObject = Object.keys(req.query).length
    //   //   passwordHash = lengthObject > 0 ? QueryString.stringify(req.query) : {}
    //   // }
    //   // var hashPassword = crypto.HmacSHA256(passwordHash, hashKey).toString()
    //   // if ((getLength(Object.keys(req.query)) === 0 && crypto.HmacSHA256(QueryString.stringify({}), hashKey).toString())) {
    //   req.user = user;
    //   req.userAddress = userAddress;
    //   return next();
    //   // } else {
    //   //   res.status(404).send(mess404)
    //   // }
    // };
    //
    // const tokenAuthen = req.get('authorization').replace('Bearer ', '');
    //
    // const decodeToken = CommonServices.decodeToken(tokenAuthen);
    //
    // // Expired token
    // if (moment().unix() > get(decodeToken, 'exp')) {
    //   return res.status(401).send(mess401);
    // }
    //
    // if (CommonServices.verifyToken(tokenAuthen, process.env.SECRET_TOKEN_APDATER)) {
    //   const user = lowerCase(decodeToken.id);
    //   const userAddress = decodeToken.id;
    //
    //   const getBlock = await this.redisClient.getStorage('BLOCK_USER');
    //   if (getLength(getBlock) > 0 && getBlock.includes(user)) return res.status(404).send(mess404);
    //
    //   if (!validateEmailRule(user)) return res.status(404).send(mess404);
    //   const userPayload: any = await User.findOne({id: user}, {role: 1}).lean();
    //   if (userPayload && userPayload.role !== 'member') {
    //     req.user = user;
    //     return next();
    //   }
    //   checkSignature(user, userAddress);
    // } else {
    //   res.status(404).send(mess404);
    // }
  }

  // static async validateUserOnchain(req, res, next) {
  //   const decodeData = req.user;
  //   if (!decodeData) return res.status(404).send(mess404);
  //
  //   const [address, chain] = decodeData.split('-');
  //
  //   if (getLength(address) === 0 || getLength(chain) === 0) return res.status(404).send(mess404);
  //
  //   next();
  // }

}