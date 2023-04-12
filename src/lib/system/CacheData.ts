import { createSchema, defaultModel } from '../../models/baseModel.model';

export default createSchema({
  time: defaultModel.number,
  id: defaultModel.stringUnique,
  data: defaultModel.string,
  array: defaultModel.array,
  object: defaultModel.object,
}, 'CacheData', null, null);
