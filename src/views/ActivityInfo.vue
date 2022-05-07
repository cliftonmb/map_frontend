<script>
import axios from 'axios';
export default {
  data: function () {
    return {
      message: "Welcome to Vue.js!",
    };
  },
  created: function () {
    axios.get(`http://localhost:3000/activities/${this.$route.params.id}.json`).then(response => {
      console.log(response.data);
      this.activities = response.data;
    })
  },
  methods: {},
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <!-- <router-link class="card-link" v-bind:to="`/activities/${recipe.id}`">More Info</router-link> -->
  </div>
</template>

<style>
</style>