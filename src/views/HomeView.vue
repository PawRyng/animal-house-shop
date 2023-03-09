<template>
  <input type="text" v-model="searchText" placeholder="Wyszukaj..." />
  <ul v-for="(animal, index) in filteredItems" class="home" :key="index">
    <li>
      Nazwa: <strong>{{ animal.name }}</strong
      ><span>
        Cena: <strong>{{ animal.price }}</strong></span
      >
      <p>{{ animal.category }}</p>
    </li>
  </ul>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  data() {
    const { state } = useStore();
    return {
      items: computed(() => state.animals.list),
      searchText: "",
    };
  },
  computed: {
    filteredItems() {
      let filteredItems = this.items.filter((item) => {
        return (
          item.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
          item.category.toLowerCase().includes(this.searchText.toLowerCase())
        );
      });
      // filteredItems = filteredItems.sort((a, b) => {
      //   if (this.sortOrder === 'asc') {
      //     return a.price - b.price;
      //   } else {
      //     return b.price - a.price;
      //   }
      // });
      return filteredItems;
    },
  },
  methods: {
    sortAscending() {
      this.sortOrder = "asc";
    },
    sortDescending() {
      this.sortOrder = "desc";
    },
  },
};
</script>
