<template>
  <nav class="text-sm mb-10" aria-label="breadcrumbs">
    <ul class="flex">
      <li v-for="(item, i) in breadcrumbs" :key="i" :class="item.classes">
        <nuxt-link :to="item.path" class="text-blue-600 hover:text-blue-900">
          <Icon v-if="item.icon" :icon="item.icon" class="icon" />
          <span v-else>{{ item.name }}</span>
        </nuxt-link>
        <span
          v-if="!item.isLast && breadcrumbs[i + 1] && breadcrumbs[i + 1].path"
          class="mx-2"
        >
          /
        </span>
      </li>
    </ul>
  </nav>
</template>

<script>
import { Icon } from "@iconify/vue";
import homeIcon from "@iconify/icons-mdi/home";
export default {
  components: {
    Icon,
  },
  data() {
    return {
      homeIcon,
      mealDetails: {},
      breadcrumbs: [], // Add this new data property
    };
  },
  props: {
    category: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    categoryName() {
      return this.$route.query.categoryName || "";
    },
  },
  methods: {
    getCrumbName(item) {
      if (this.category && item.name === "categorydetail") {
        return this.category.name;
      }
      if (
        item.name === "mealdetail" &&
        this.mealDetails &&
        this.mealDetails.name
      ) {
        return this.mealDetails.name;
      }
      return item.name || item.path;
    },

    async fetchMealDetails(mealId) {
      let mealDetails = {};
      await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
      )
        .then((response) => response.json())
        .then((res) => {
          mealDetails = {
            id: res.meals[0].idMeal,
            name: res.meals[0].strMeal,
            // Other properties of the meal
          };
        });
      return mealDetails;
    },
  },
  async created() {
    if (this.$route.query.meal_id) {
      const mealId = this.$route.query.meal_id;
      const mealData = await this.fetchMealDetails(mealId);
      this.mealDetails = mealData;

      const crumbs = [
        { path: "/", name: "Home" },
        { path: "/food", name: "Food", classes: "" },
      ];

      this.$route.matched.forEach((item, i, { length }) => {
        const crumb = {};
        crumb.path = item.path;
        crumb.name = this.getCrumbName(item);
        crumb.isLast = i === length - 1;

        if (crumb.isLast) {
          crumb.classes = "font-bold";
        }

        crumbs.push(crumb);
      });

      // Add categoryname breadcrumb
      if (this.categoryName) {
        crumbs.push({
          path: "/food/" + this.categoryName,
          name: this.categoryName,
          classes: "font-bold",
        });
      }

      // Remove the meal name addition from here

      this.breadcrumbs = crumbs;
    }
  },
};
</script>
