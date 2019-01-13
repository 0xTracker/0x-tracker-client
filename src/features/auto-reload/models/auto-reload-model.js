import uuid from 'uuid/v1';

const autoReloadModel = {
  reducers: {
    trigger() {
      return { key: uuid() };
    },
  },
  state: {
    key: null,
  },
};

export default autoReloadModel;
