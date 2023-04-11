import { createSchema, defaultModel } from '../baseModel.model';

export default createSchema({
  id: defaultModel.string,
  token0: defaultModel.object,
  token1: defaultModel.object,
  isActive: defaultModel.boolean,
  owner: defaultModel.string,
  totalLiquidity: defaultModel.number,
  volume24h: defaultModel.number,
  tx24h: defaultModel.number,
  volume7d: defaultModel.number,
  feeAPR: defaultModel.number,
  poolAccountInfo: defaultModel.object,
  token0Price: defaultModel.number,
  token1Price: defaultModel.number,
  volume24hToken0: defaultModel.number,
  volume24hToken1: defaultModel.number,
  isVerified: defaultModel.booleanFalse,
}, 'SarosPool', null, null);
