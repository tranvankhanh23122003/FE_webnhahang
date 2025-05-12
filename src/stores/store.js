import { createStore } from 'vuex';

const store = createStore({
  state: {//*
    user: null,  // Lưu trữ thông tin người dùng sau khi đăng nhập
  },
  mutations: {//*
    setUser(state, userData) {
      state.user = userData;  // Lưu thông tin người dùng vào state
    },
    clearUser(state) {
      state.user = null;  // Xóa thông tin người dùng
    }
  },
  actions: {//*
    login({ commit }, userData) {
      // Giả sử bạn đã có thông tin người dùng từ API sau khi đăng nhập
      commit('setUser', userData);
    },
    logout({ commit }) {
      commit('clearUser');
    }
  },
  getters: {//*
    user: (state) => state.user  // Truy cập thông tin người dùng
  }
});

export default store;
