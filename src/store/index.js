import { createStore } from "vuex";

const animals = {
  namespased: true,
  state: {
    list: [
      {
        category: "Na ziemi",
        name: "Kuna",
        price: 10,
      },
      {
        category: "Na ziemi",
        name: "Alpaka",
        price: 121,
      },
      {
        category: "Na ziemi",
        name: "Słoń",
        price: 122.92,
      },
    ],
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
