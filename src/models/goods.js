import { queryGoods, queryColor, addGoods } from '../services/api';
import { message } from 'antd';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'goods',

  state: {
    list: [],
    loading: true,
    colors: [],
    submitting: false,
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

    *addGoods({ payload }, { call, put }) {
      const response = yield call(addGoods, payload);
      // yield put({
      //   type: 'addGoods',
      //   payload: {
      //     submitting: false,
      //   },
      // });

      if(response.statusCode === 200) {
        message.success('商品添加成功.');
        yield put(routerRedux.push('/result/addGoodsSuccess'));
      } if(response.statusCode === 102 || response.statusCode === 101) {
        // yield put({ type: 'login/logout', payload: ''});
      }  else {
        message.error('商品添加失败: ' + response.statusCode);
        yield put(routerRedux.push('/result/fail'));
      }
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
    addGoods(state, action) {
      return {
        submitting: action.payload.submitting,
      };
    },
  },
};
