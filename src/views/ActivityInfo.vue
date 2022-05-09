<script>
import axios from 'axios';


// import $ from 'jquery';

export default {
  data: function () {
    return {
      message: "Welcome to Vue.js!",
      activity: []
    };
  },
  created: function () {
    axios.get(`http://localhost:3000/activities/${this.$route.params.id}.json`).then(response => {
      console.log(response.data);
      this.activity = response.data;
    })
  },
  methods: {
    tryMe: function () {
      console.log("Me is be trying tried")
    }
  },
};
</script>

<template>
  <div class="home">
    <h1> {{ activity.name }}</h1>
    <img v-bind:src="activity.image_url" />
    <!-- <router-link class="card-link" v-bind:to="`/activities/${recipe.id}`">More Info</router-link> -->
  </div>
</template>
  

<style>
img {
  width: 250px;
}
</style>