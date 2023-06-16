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
    export default {
    components: {
        Icon,
    },
    data() {
        return {
        homeIcon,
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
        console.log(this.$route.query.categoryName);
        return this.$route.query.categoryName || "";
        },
        crumbs() {
        const crumbs = [
            { path: "/", name: "Home" },
            { path: "/", name: "Food", classes: "" },
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

        if (this.categoryName) {
            crumbs.push({
            path: "",
            name: this.categoryName,
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
    },
    };
    </script>
