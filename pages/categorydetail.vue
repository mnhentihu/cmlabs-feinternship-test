<template>
  <Navbar />
  <body>
    <div class="container mx-auto px-52 py-10">
      <div class="h-20 grid gap-y-5 text-left border-b-2">
        <h1 class="text-5xl font-poppins font-semibold">{{ name }} Meals</h1>
      </div>
      <div class="grid grid-cols-4 gap-4 my-10">
        <div
          class="w-full cursor-pointer flex justify-center rounded relative group overflow-hidden"
          v-for="data in mainData"
          :key="data.id"
        >
          <nuxt-link
            class="link-video"
            :to="{
              path: '/mealdetail',
              query: { meal_id: data.idMeal },
            }"
          >
            <img
              :src="data.strMealThumb"
              alt="image"
              class="transition w-full h-auto duration-500 ease-in-out transform hover:scale-110"
            />
            <div
              class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out"
            >
              <p class="text-white text-lg">{{ data.strMeal }}</p>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

export default {
  components: {},
  data() {
    return {
      mainData: [],
      name: [],
    };
  },
  async mounted() {
    await $fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${this.$route.query.categoryName}`
    ).then((res) => {
      this.mainData = res.meals;
      this.name = this.$route.query.categoryName;
    });
    console.log(this.mainData);
  },
};
</script>
