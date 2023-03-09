<script>
import { useStore } from "vuex";
import { ref } from "vue";

export default {
  setup() {
    const store = useStore();
    const mainCategory = ["Na ziemi", "Na drzewie"];
    const selectMainHandler = ref("");
    const selectMainHandlerError = ref("");
    const newAniamal = ref("");
    const newAnimalError = ref("");
    const newPrice = ref("");
    const newPriceError = ref("");

    const submit = () => {
      newAnimalError.value = "";
      newPriceError.value = "";
      selectMainHandlerError.value = "";
      if (selectMainHandler.value != "") {
        if (newAniamal.value != "") {
          if (!isNaN(newPrice.value) && newPrice.value != "") {
            const animal = {
              category: selectMainHandler.value,
              name: newAniamal.value,
              price: newPrice.value.toFixed(2),
            };
            store.commit("add", animal);
            selectMainHandler.value = "";
            newAniamal.value = "";
            newPrice.value = "";
          } else {
            newPriceError.value = "Wpisz cenę";
          }
        } else {
          newAnimalError.value = "Wybierz zwierzaczka!";
        }
      } else {
        selectMainHandlerError.value = "Wybierz kategorię!";
      }
    };
    return {
      submit,
      mainCategory,
      selectMainHandler,
      selectMainHandlerError,
      newAniamal,
      newAnimalError,
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
      <div class="newAnimal">
        <input
          type="text"
          v-model="newAniamal"
          placeholder="Wpisz nazwę nowego zwierzaczka"
          :class="newAnimalError ? 'error-input' : ''"
        />
        <span v-if="newAnimalError" class="error">{{ newAnimalError }}</span>
      </div>
    </div>

    <!-- cena -->
    <div class="price">
      <input
        type="text"
        v-model.number.lazy="newPrice"
        placeholder="wpisz cenę domku"
        :class="newPriceError ? 'error-input' : ''"
      />
      <span v-if="newPriceError" class="error">{{ newPriceError }}</span>
    </div>

    <input type="submit" value="dodaj" class="button" />
  </form>
</template>
<style lang="scss">
form {
  display: flex;
  width: max-content;
  margin: 20px auto;
  .error {
    display: block;
    color: red;
    &-input {
      background-color: #fce4e4;
      border: 1px solid #cc0033;
    }
  }
  .button {
    color: #fff;
    background-color: #198754;
    border-color: #198754;

    outline: none;
    display: inline-block;
    font-weight: 400;
    line-height: 1.5;
    text-align: center;
    text-decoration: none;
    vertical-align: middle;
    user-select: none;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    cursor: pointer;
    height: 40px;
  }
}
.selectMain,
.select,
.price {
  margin: 10px;
  position: relative;
}
</style>
