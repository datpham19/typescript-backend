import { createSchema, defaultModel } from '../../models/baseModel.model';

export default createSchema({
  from: defaultModel.string,
  to: defaultModel.string,
  hash: defaultModel.string,
  chain: defaultModel.string,
  amount: defaultModel.number,
  source: defaultModel.string,
  message: { type: String },
  memo: { type: String },
  timestamp: defaultModel.string,
  createdUser: { type: String },
  contract: defaultModel.object,
  options: defaultModel.object,
}, 'Record', null, null);
