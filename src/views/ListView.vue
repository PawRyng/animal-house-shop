<template>
  <input type="text" v-model="searchText" placeholder="Wyszukaj..." />
  <table class="styled-table">
    <thead>
      <tr>
        <td class="head">
          <a class="head__item head__item--asc" @click="sortAscendingCategory">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
              <path
                d="M182.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"
              />
            </svg>
          </a>
          <a class="head__title" @click="sortNoneCategory"> Kategoria </a>

          <a
            class="head__item head__item--desc"
            @click="sortDescendingCategory"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
              <path
                d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z"
              />
            </svg>
          </a>
        </td>
        <td class="head">
          <a class="head__item head__item--asc" @click="sortAscendingText">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
              <path
                d="M182.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"
              />
            </svg>
          </a>
          <a class="head__title" @click="sortNoneText"> Zwierze </a>

          <a class="head__item head__item--desc" @click="sortDescendingText">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
              <path
                d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z"
              />
            </svg>
          </a>
        </td>
        <td class="head">
          <a class="head__item head__item--asc" @click="sortAscending">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
              <path
                d="M182.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"
              />
            </svg>
          </a>
          <a class="head__title" @click="sortNonePrice"> Cena </a>

          <a class="head__item head__item--desc" @click="sortDescending">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
              <path
                d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z"
              />
            </svg>
          </a>
        </td>
      </tr>
      <tr v-for="(animal, index) in filteredItems" class="home" :key="index">
        <td>{{ animal.category }}</td>
        <td>{{ animal.name }}</td>
        <td>{{ animal.price }} zł</td>
      </tr>
    </thead>
  </table>
  <footer>
    <a href="https://github.com/PawRyng/animal-house-shop " target="_blank"
      >Repo GitHub</a
    >
  </footer>
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
      sortOrderPrice: "",
      sortOrderText: "",
      sortOrderCategory: "",
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
      filteredItems = filteredItems.sort((a, b) => {
        if (this.sortOrderPrice === "asc") {
          return a.price - b.price;
        } else if (this.sortOrderPrice === "desc") {
          return b.price - a.price;
        } else {
          return;
        }
      });

      if (this.sortOrderText == "asc") {
        filteredItems = filteredItems
          .sort((a, b) => a.name.localeCompare(b.name))
          .reverse();
      } else if (this.sortOrderText == "desc") {
        filteredItems = filteredItems.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      } else {
        return filteredItems;
      }
      if (this.sortOrderCategory == "asc") {
        filteredItems = filteredItems
          .sort((a, b) => a.category.localeCompare(b.category))
          .reverse();
      } else if (this.sortOrderCategory == "desc") {
        filteredItems = filteredItems.sort((a, b) =>
          a.category.localeCompare(b.category)
        );
      } else {
        return filteredItems;
      }
      return filteredItems;
    },
  },
  methods: {
    sortAscending() {
      this.sortOrderPrice = "asc";
    },
    sortDescending() {
      this.sortOrderPrice = "desc";
    },
    sortNonePrice() {
      this.sortOrderPrice = "";
    },
    sortAscendingText() {
      this.sortOrderText = "asc";
    },
    sortDescendingText() {
      this.sortOrderText = "desc";
    },
    sortNoneText() {
      this.sortOrderText = "";
    },
    sortAscendingCategory() {
      this.sortOrderCategory = "asc";
    },
    sortDescendingCategory() {
      this.sortOrderCategory = "desc";
    },
    sortNoneCategory() {
      this.sortOrderCategory = "";
    },
  },
};
</script>

<style lang="scss">
footer {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  padding-bottom: 30px;
  font-size: 20px;
}
.styled-table {
  border-collapse: collapse;
  margin: 25px auto;
  font-size: 0.9em;
  font-family: sans-serif;
  min-width: 400px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  thead {
    tr {
      background-color: #009879;
      color: #ffffff;
      text-align: left;
      border-bottom: 1px solid #dddddd;
      &:nth-of-type(even) {
        background-color: #f3f3f3;
        color: black;
      }
      &:last-of-type {
        border-bottom: 2px solid #009879;
      }
    }
  }
  th,
  td {
    // color: black;
    padding: 12px 15px;
  }
}

.head {
  width: 100px;
  height: 25px;
  position: relative;
  &__item {
    position: absolute;
    height: max-content;
    &--asc {
      left: 10px;
      bottom: 5px;
    }
    &--desc {
      right: 10px;
      top: 5px;
    }

    svg {
      fill: white;
      cursor: pointer;
      width: 15px;
    }
  }
  &__title {
    font-weight: bold;
    cursor: pointer;
    width: 100%;
    text-align: center;
    display: block;
  }
}
</style>
