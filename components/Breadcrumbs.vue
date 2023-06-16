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
      breadcrumbs: [],
    };
  },

  props: {
    category: {
      type: Object,
      default: () => ({}),
    },
    breadcrumbName: {
      type: String,
      required: true,
    },
    mealDetails: {
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
      if (item.name === "mealdetail" && this.breadcrumbName) {
        return this.breadcrumbName;
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
          };
        });
      return mealDetails;
    },
  },

  async created() {
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

    // Add dynamic breadcrumb based on the route name
    if (this.$route.name === "categorydetail") {
      crumbs.push({
        path: "/food/" + this.categoryName,
        name: this.categoryName,
        classes: "font-bold",
      });
    } else if (this.$route.name === "mealdetail") {
      crumbs.push({
        path: "/food/" + this.mealDetails.name,
        name: this.mealDetails.name,
        classes: "font-bold",
      });
    }

    this.breadcrumbs = crumbs;
  },
};
</script>
