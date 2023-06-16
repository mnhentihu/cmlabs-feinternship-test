<template>
  <Navbar />
  <body>
    <div
      class="h-80 bg-slate-50 flex flex-col justify-center text-center gap-y-3"
    >
      <div class="flex flex-row justify-center gap-4 text-red-500">
        <Icon icon="bxs:bowl-hot" />
        <Icon icon="bxs:bowl-rice" />
        <Icon icon="ic:sharp-cookie" />
      </div>
      <p class="font-sans font-medium">mealapp API website</p>
      <h1 class="text-5xl font-poppins font-semibold">
        See All The Delicious Foods
      </h1>
    </div>
    <div class="container mx-auto px-52 py-10">
      <div class="grid grid-cols-4 gap-4">
        <div
          class="w-full cursor-pointer flex justify-center rounded relative group overflow-hidden"
          v-for="data in mainData"
          :key="data.id"
        >
          <nuxt-link
            class="link-video"
            :to="{
              path: '/categorydetail',
              query: { categoryName: data.strCategory },
            }"
          >
            <img
              :src="data.strCategoryThumb"
              alt="image"
              class="transition w-full h-auto duration-500 ease-in-out transform hover:scale-110"
            />
            <div
              class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out"
            >
              <p class="text-white text-2xl font-poppins">
                {{ data.strCategory }}
              </p>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import { Icon } from "@iconify/vue";
export default {
  name: "mainpage",
  components: {
    Icon,
  },
  data() {
    return {
      mainData: [],
    };
  },
  async mounted() {
    await $fetch("https://www.themealdb.com/api/json/v1/1/categories.php").then(
      (res) => {
        this.mainData = res.categories;
      }
    );
    // console.log(this.mainData)
  },
};
</script>
