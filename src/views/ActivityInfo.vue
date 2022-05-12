<script>
import axios from 'axios';


// import $ from 'jquery';

export default {
  data: function () {
    return {
      message: "Welcome to Vue.js!",
      activity: [],
      favorites: [],
      youtube: null
    };
  },
  created: function () {
    axios.get(`http://localhost:3000/activities/${this.$route.params.id}.json`).then(response => {
      console.log(response.data);  // CONSOLE LOG HERE
      this.activity = response.data;
      // html string
      const htmlStr = this.activity.youtube;
      console.log(htmlStr)
      // make a new parser
      const parser = new DOMParser();

      // convert html string into DOM
      const document = parser.parseFromString(htmlStr, "text/html");

      this.youtube = document.body.querySelector("iframe").src;
      console.log(this.youtube)  // CONSOLE LOG HERE
    })
  },
  methods: {
    createFavorites: function () {
      console.log("adding to faves");  // CONSOLE LOG HERE
      var params = {
        activity_id: this.activity.id
      }
      axios.post("http://localhost:3000/favorites.json", params).then((response) => {
        console.log(response.data);  // CONSOLE LOG HERE
        this.favorites = response.data;
        this.$router.push("/favorites");
      })
    },
    destroyFavorites: function () {
      console.log("removing this favorite");  // CONSOLE LOG HERE
      // var params = this.favorites.id
      axios.delete(`http://localhost:3000/favorites/${this.activity.id}.json`).then((response) => {
        console.log(response)
      })
    }
  },
};
</script>

<template>
  <div class="home">

    <h1> {{ activity.name }}</h1>
    <img v-bind:src="activity.image_url" />
    <button v-on:click="createFavorites()">Add to Favorites</button>
    <button v-on:click="destroyFavorites()">Remove From Favorites</button>
    <section><iframe width="640" height="360" v-bind:src="youtube" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe></section>
    <!-- <router-link class="card-link" v-bind:to="`/activities/${recipe.id}`">More Info</router-link> -->
  </div>
</template>
  <!-- <img v-bind:src="favorite[0].image_url" />
<router-link v-bind:to="`/activity_info/${favorite[0].id}`">More Info</router-link> -->
<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/qod03PVTLqk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->
<style>
img {
  width: 250px;
}
</style>

<!-- <iframe width="640" height="360"
        v-bind:src="youtube" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe> -->