<template>
  <nav class="text-sm" aria-label="breadcrumbs">
    <ul class="flex">
      <li v-for="(item, i) in crumbs" :key="i" :class="item.classes">
        <nuxt-link :to="item.path" class="text-blue-600 hover:text-blue-900">
          <Icon v-if="item.icon" :icon="item.icon" class="icon" />
          <span v-else>{{ item.name }}</span>
        </nuxt-link>
        <span
          v-if="!item.isLast && crumbs[i + 1] && crumbs[i + 1].path"
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
import { ref } from "vue";
export default {
  components: {
    Icon,
  },
  data() {
    return {
      homeIcon,
      mealDetails: ref(null),
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

    mealName() {
      // Access the value of mealDetails ref
      return this.mealDetails.value ? this.mealDetails.value.strMeal : "";
    },

    crumbs() {
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

        // Only add the crumb if the name is not empty
        if (crumb.name) {
          crumbs.push(crumb);
        }
      });

      // Add categoryname breadcrumb
      if (this.categoryName) {
        crumbs.push({
          path: "/food/" + this.categoryName,
          name: this.categoryName,
          classes: "font-bold",
        });
      }

      // Add mealname breadcrumb
      if (this.mealName) {
        crumbs.push({
          path: "",
          name: this.mealName,
          classes: "font-bold",
        });
      }

      return crumbs;
    },
  },
  methods: {
    getCrumbName(item) {
      if (this.category && item.name === "categorydetail") {
        return this.category.name;
      }
      return item.name || item.path;
    },

    async fetchMealDetails(mealId) {
      // Use the provided API to fetch meal details using the mealId
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
      );
      const data = await response.json();

      // The API returns an array of meals, but we expect only one meal for a given ID
      const mealDetails =
        data.meals && data.meals.length > 0 ? data.meals[0] : null;

      return mealDetails;
    },
  },
  async created() {
    if (this.$route.query.meal_id) {
      const mealId = this.$route.query.meal_id;
      this.mealDetails = await this.fetchMealDetails(mealId);
    }
  },
};
</script>
