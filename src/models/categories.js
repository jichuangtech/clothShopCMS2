import { queryRule, removeRule, addRule, queryGoodsCategories } from '../services/api';

export default {
  namespace: 'categories',

  state: {
    list: [],
    loading: true,
  },

  effects: {
    *queryCategories({ payload }, { call, put }) {
      const response = yield call(queryGoodsCategories, payload);
      // alert(' queryGoodsCategories response: ' + JSON.stringify(response));
      yield put({
        type: 'save',
        payload: response.data,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
        loading: false,
      };
    },
  },
};
