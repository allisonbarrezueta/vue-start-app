<script>
import NavbarLink from "./NavbarLink.vue";

export default {
  name: "NavBar",
  inject: ["$pages", "$bus"],
  components: {
    NavbarLink,
  },
  created() {
    this.getThemeSetting();
    this.pages = this.$pages.getAllPages();
    this.$bus.$on("page-update", () => {
      this.pages = [...this.$pages.getAllPages()];
    });
    this.$bus.$on("page-created", () => {
      this.pages = [...this.$pages.getAllPages()];
    });
    this.$bus.$on("page-deleted", () => {
      this.pages = [...this.$pages.getAllPages()];
    });
  },
  computed: {
    publishedPages() {
      return this.pages.filter((page) => page.published) || [];
    },
  },
  data() {
    return {
      theme: "dark",
      pages: [],
    };
  },
  methods: {
    changeTheme() {
      this.theme = this.theme === "light" ? "dark" : "light";
      this.storeThemeSetting();
    },
    storeThemeSetting() {
      localStorage.setItem("theme", this.theme);
    },
    getThemeSetting() {
      const theme = localStorage.getItem("theme");
      if (theme) {
        this.theme = theme;
      }
    },
  },
};
</script>

<template>
  <nav
    :class="[`navbar-${theme}`, `bg-${theme}`, `navbar`, `navbar-expand-lg`]"
  >
    <div class="container-fluid">
      <a class="navbar-brand">This is me.com</a>
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <NavbarLink
          v-for="(page, index) in publishedPages"
          :key="index"
          :page="page"
          :index="index"
        />
        <li>
          <router-link
            :to="`/pages`"
            class="nav-link"
            aria-current="page"
            active-class="active"
          >
            Pages
          </router-link>
        </li>
      </ul>
      <form class="d-flex">
        <button class="btn btn-primary" @click.prevent="changeTheme()">
          Toggle
        </button>
      </form>
    </div>
  </nav>
</template>
