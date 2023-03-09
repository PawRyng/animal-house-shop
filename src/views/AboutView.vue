<script>
import { useStore } from "vuex";
import { ref, reactive } from "vue";

export default {
  setup() {
    const store = useStore();
    const mainCategory = ["na ziemi", "na drzewie"];
    const selectMainHandler = ref("");
    const selectMainHandlerError = ref("");
    const categoryAnimals = reactive(["Foka", "Łoś"]);
    const newAniamal = ref("");
    const newAnimalError = ref("");
    const selectedHandleAnimals = ref("");
    const selectedHandleError = ref("");
    const newPrice = ref("");
    const newPriceError = ref("");

    const submit = () => {
      newAnimalError.value = "";
      newPriceError.value = "";
      selectedHandleError.value = "";
      selectMainHandlerError.value = "";
      if (selectedHandleAnimals.value == "dodaj") {
        if (newAniamal.value != "") {
          categoryAnimals.push(newAniamal.value);
          newAniamal.value = "";
        } else {
          newAnimalError.value = "Wpisz nazwę zwierzaczka ";
        }
      } else {
        if (selectMainHandler.value != "") {
          if (selectedHandleAnimals.value != "") {
            if (!isNaN(newPrice.value) && newPrice.value != "") {
              const animal = {
                category: selectMainHandler.value,
                name: selectedHandleAnimals.value,
                price: newPrice.value.toFixed(2),
              };
              store.commit("add", animal);
              selectMainHandler.value = "";
              selectedHandleAnimals.value = "";
              newPrice.value = "";
            } else {
              newPriceError.value = "wpisz cene";
            }
          } else {
            selectedHandleError.value = "wybierz zwierzaczka!";
          }
        } else {
          selectMainHandlerError.value = "wybierz kategorię!";
        }
      }
    };
    return {
      submit,
      mainCategory,
      selectMainHandler,
      selectMainHandlerError,
      categoryAnimals,
      newAniamal,
      newAnimalError,
      selectedHandleAnimals,
      selectedHandleError,
      newPrice,
      newPriceError,
    };
  },
};
</script>

<template>
  <form @submit.prevent="submit">
    <!-- main category -->
    <div class="selectMain" v-if="!(selectedHandleAnimals == 'dodaj')">
      <select v-model="selectMainHandler">
        <option value="">Wybierz</option>
        <option
          v-for="category in mainCategory"
          :key="category"
          :value="category"
        >
          {{ category }}
        </option>
      </select>
      <span v-if="selectMainHandlerError" class="error">{{
        selectMainHandlerError
      }}</span>
    </div>
    <!-- animal select -->
    <div class="select">
      <select v-model="selectedHandleAnimals">
        <option value="">Wybierz</option>
        <option v-for="animal in categoryAnimals" :key="animal" :value="animal">
          {{ animal }}
        </option>
        <option value="dodaj">Dodaj</option>
      </select>
      <span class="error" v-if="selectedHandleError != ''">
        {{ selectedHandleError }}</span
      >

      <div class="newAnimal" v-if="selectedHandleAnimals == 'dodaj'">
        <input
          type="text"
          v-model="newAniamal"
          placeholder="wpisz nazwę nowego zwierzadka"
        />
        <span v-if="newAnimalError" class="error">{{ newAnimalError }}</span>
      </div>
    </div>

    <!-- cena -->
    <div class="price" v-if="!(selectedHandleAnimals == 'dodaj')">
      <input
        type="text"
        v-model.number.lazy="newPrice"
        placeholder="wpisz cenę domku"
      />
      <span v-if="newPriceError" class="error">{{ newPriceError }}</span>
    </div>

    <input type="submit" value="dodaj" />
  </form>
</template>
