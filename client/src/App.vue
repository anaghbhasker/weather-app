<template>
    <main>
        <router-view />
    </main>
</template>

<script>
export default {
    name: "App",
    components: {},
    data() {
        return {
            isLoggedIn: false,
        };
    },
    created() {
        this.isLoggedIn = false;
    },
};
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
