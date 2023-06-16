<template>
    <nav class="text-sm" aria-label="breadcrumbs">
      <ul class="flex">
        <li v-for="(item, i) in crumbs" :key="i" :class="item.classes">
          <nuxt-link :to="item.path" class="text-blue-600 hover:text-blue-900">
            {{ item.name }}
          </nuxt-link>
          <span v-if="!item.isLast" class="mx-2">/</span>
        </li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    props: {
      category: {
        type: Object,
        default: () => ({})
      }
    },
    computed: {
      crumbs() {
        const crumbs = [];
        this.$route.matched.forEach((item, i, { length }) => {
          const crumb = {};
          crumb.path = item.path;
          crumb.name = this.getCrumbName(item);
          crumb.isLast = i === length - 1;
  
          // is last item?
          if (crumb.isLast) {
            crumb.classes = 'font-bold';
          }
  
          crumbs.push(crumb);
        });
  
        return crumbs;
      }
    },
    methods: {
      getCrumbName(item) {
        if (this.category && item.name === 'categorydetail') {
          return this.category.name;
        }
        return item.name || item.path;
      }
    }
  }
  </script>
  