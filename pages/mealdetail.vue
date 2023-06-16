<template>
  <Navbar />
  <body>
    <div
      v-for="data in mainData"
      :key="data.id"
      class="container mx-auto px-52 py-10"
    >
    <Breadcrumbs />
      <div class="h-20 grid gap-y-5 text-left border-b-2">
        <h1 class="text-5xl font-poppins font-regular">{{ data.strMeal }}</h1>
      </div>
      <div class="">
        <p class="text-red-500 font-poppins my-3">
          {{ data.strArea }} Culinary
        </p>
        <div class="image-container w-full flex justify-between">
          <img
            :src="data.strMealThumb"
            alt="image"
            class="object-contain h-[550px] rounded-3xl"
          />
          <div class="details grid gap-y-4 ml-4">
            <div class="instructions grid gap-y-2">
              <h1 class="text-3xl font-poppins font-medium">Instruction</h1>
              <div
                v-for="(line, index) in formattedText"
                :key="index"
                class="mb-2"
              >
                {{ line }}
              </div>
            </div>
            <div class="receipt grid gap-y-2">
              <h1 class="text-3xl font-poppins font-medium">Receipt</h1>
              <ul class="list-outside my-2">
                <li
                  v-for="(ingredient, index) in reformatData(data).ingredients"
                  :key="index"
                >
                  {{ reformatData(data).measures[index] }} {{ ingredient }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="tutorial">
        <h1 class="text-3xl font-poppins font-medium text-center mt-12">
          Tutorial
        </h1>
        <div class="youtube-video flex justify-center mt-3">
          <iframe
            class=""
            width="560"
            height="315"
            :src="embedURL"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import { convertToEmbedURL } from "@/utils/youtube";

export default {
  components: {},
  data() {
    return {
      mainData: [],
      rawText: "",
      videoURL: "",
      embedURL: "",
    };
  },
  async mounted() {
    await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${this.$route.query.meal_id}`
    )
      .then((response) => response.json()) // Convert the response to JSON
      .then((res) => {
        this.mainData = res.meals;
        this.rawText = res.meals[0].strInstructions;
        this.videoURL = res.meals[0].strYoutube;
      });
    console.log(this.mainData);
  },

  computed: {
    formattedText() {
      return this.rawText.split(/[\r\n]+/);
    },
    embedURL() {
      return convertToEmbedURL(this.videoURL);
    },
  },
  methods: {
    reformatData(receipt) {
      const ingredients = [];
      const measures = [];

      for (let i = 1; i <= 15; i++) {
        const ingredient = receipt[`strIngredient${i}`];
        const measure = receipt[`strMeasure${i}`];

        if (ingredient && measure) {
          ingredients.push(ingredient);
          measures.push(measure);
        }
      }

      return {
        ingredients,
        measures,
      };
    },
  },
};
</script>
