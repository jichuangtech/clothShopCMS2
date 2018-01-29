import { queryGoods, queryColor } from '../services/api';

export default {
  namespace: 'goods',

  state: {
    list: [],
    loading: true,
    colors: [],
  },

  effects: {
    *queryGoods({ payload }, { call, put }) {
      const response = yield call(queryGoods, payload);
      yield put({
        type: 'save',
        payload: response.data,
      });
    },

    *queryColor({ payload }, { call, put }) {
      const response = yield call(queryColor, payload);
      yield put({
        type: 'saveColor',
        payload: response,
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

    saveColor(state, action) {
      return {
        ...state,
        colors: action.payload,
        loading: false,
      };
    },
  },
};
