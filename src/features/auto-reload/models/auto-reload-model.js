import uuid from 'uuid/v1';

const autoReloadModel = {
  state: {
    key: null,
  },
  reducers: {
    trigger() {
      return { key: uuid() };
    },
  },
};

export default autoReloadModel;
