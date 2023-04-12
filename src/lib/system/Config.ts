import { createSchema, defaultModel } from '../../models/baseModel.model';

export default createSchema({
  isActiveCheatFinwhale: defaultModel.boolean,

  whitelistDapps: defaultModel.array,
  dappsForward: defaultModel.string,
  rewardHubs: defaultModel.array,

  whiteListAMM: defaultModel.array,
  standardGwei: defaultModel.object,
  banner: defaultModel.array,
  dappGame: defaultModel.object,
  extraFunction: defaultModel.object,
  blackListKeyword: defaultModel.array,
  chainConfigV2: defaultModel.object,
  chainConfig: defaultModel.object,

  //* DAGORACONFIG
  // home screen
  dagoraHomeBanner: defaultModel.array,
  // explore Screen
  dagoraExploreConfig: defaultModel.array,
  dagoraExploreBanner: defaultModel.array,
  dagoraExploreType: defaultModel.array,
  // Profile
  dagoraProfileConfig: defaultModel.array,
  dagoraProfileType: defaultModel.array,
  // Collection
  dagoraCollectionConfig: defaultModel.array,
  dagoraCollectionType: defaultModel.array,
}, 'Configurable', null, null);
