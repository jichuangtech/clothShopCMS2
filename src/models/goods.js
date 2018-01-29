import { queryGoods} from '../services/api';

export default {
  namespace: 'goods',

  state: {
    list: [],
    loading: true,
  },

  effects: {
    *queryGoods({ payload }, { call, put }) {
      const response = yield call(queryGoods, payload);
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
