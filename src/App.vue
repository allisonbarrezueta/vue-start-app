<script>
import NavBar from "./components/Navbar.vue";

export default {
  components: {
    NavBar,
  },

  methods: {
    pageCreated(parseObj) {
      this.pages.push(parseObj);
    },
  },
};
</script>

<template>
  <NavBar />
  <router-view />
</template>

<style></style>
