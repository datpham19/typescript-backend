import { createSchema, defaultModel } from '../baseModel.model';
import { userRole, userRoleINS } from '@src/utils/constants/common';

const defaultWidget = [
  {
    key: 'favOptimalBand',
    isActive: false,
  },
  {
    key: 'marketSimple',
    isActive: true,
  },
  {
    key: 'marketFully',
    isActive: false,
  },
  {
    key: 'marketStackedChart',
    isActive: false,
  },
  {
    key: 'marketPieChart',
    isActive: false,
  },
  {
    key: 'marginVolumeStas',
    isActive: false,
  },
  {
    key: 'terminalShortcut',
    isActive: false,
  },
  {
    key: 'favBasic',
    isActive: false,
  },
  {
    key: 'favAdvance',
    isActive: false,
  },
  {
    key: 'favOptimal',
    isActive: true,
  },
  {
    key: 'vietnamOTC',
    isActive: false,
  },
];
export default createSchema({
  id: defaultModel.stringUnique,
  avatar: defaultModel.string,
  quote: defaultModel.string,

  status: defaultModel.booleanFalse,

  lastChangePassword: defaultModel.number,

  requestIP: defaultModel.string,
  phone: defaultModel.string,
  name: defaultModel.string,
  userNameProfile: defaultModel.string,
  userName: defaultModel.string,
  refId: defaultModel.string,
  tempRefBy: defaultModel.object,
  refBy: defaultModel.object,

  password: defaultModel.string,
  image: defaultModel.string,
  background: defaultModel.string,
  locale: defaultModel.string,

  partnerDate: defaultModel.number,
  partnerRole: { type: String, default: '' },
  insRole: { type: String, default: userRoleINS.member },
  role: { type: String, default: userRole.member },
  permission: defaultModel.string,

  uriVerifyCode: defaultModel.string,

  // List
  favoriteGame: defaultModel.array,
  favoriteCoinList: defaultModel.array,
  invisibleTokenList: defaultModel.array,

  isActive: defaultModel.boolean,
  isHideFromSearch: defaultModel.booleanFalse,

  lastSendEmail: defaultModel.date,
  lastCallOtp: defaultModel.number,
  lastCallServiceCall: defaultModel.number,
  settingWidget: {
    type: Array,
    default: defaultWidget,
  },
  settingNoti: { type: Object, default: { news: true } },
  emailCode: defaultModel.string,
  rewardWalletAddress: defaultModel.string,
  walletAddress: defaultModel.string,
}, 'User', null, null);
