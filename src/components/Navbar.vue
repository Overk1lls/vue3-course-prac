<template>
  <div class="navbar">
    <div style="font-weight: bold">Vue 3 Course</div>
    <div class="navbar-btn">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/posts">Posts</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppNavbar",
});
</script>

<style scoped>
.navbar {
  padding: 30px;
  background-color: darkgray;
  display: flex;
}

.navbar-btn {
  margin-left: auto;
}

.navbar a {
  font-weight: bold;
  color: #2c3e50;
}

.navbar a.router-link-exact-active {
  color: green;
}
</style>
