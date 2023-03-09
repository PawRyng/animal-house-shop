import { createStore } from "vuex";

const animals = {
  namespased: true,
  state: {
    list: [],
  },
  mutations: {
    add(state, animal) {
      state.list.push(animal);
    },
    set(state, animals) {
      state.list = animals;
    },
  },
};

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { animals },
});
