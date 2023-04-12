import { createSchema, defaultModel } from '../../models/baseModel.model';

export default createSchema({
  id: defaultModel.stringUnique,
  version: defaultModel.number,
  type: defaultModel.string,
  createdUser: defaultModel.string,
  bonusValue: defaultModel.object,
  isActive: defaultModel.boolean,
}, 'Favorite', null, null);
