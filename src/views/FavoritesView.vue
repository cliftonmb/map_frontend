<script>
import axios from 'axios';

export default {
  data: function () {
    return {
      message: "Favorites",
      favorites: null
    };
  },
  created: function () {
    console.log("These are all the faves");
    axios.get("http://localhost:3000/favorites.json").then(response => {
      console.log(response.data);
      this.favorites = response.data;
    })

  },
  methods: {
    destroyFavorites: function () {
      console.log("Remove from favorites");
      console.log(this.favorites);
    }
  },
};


</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <li v-for="favorite in favorites" v-bind:key="favorite.id">
      {{ favorite[0].name }}
      <p><img v-bind:src="favorite[0].image_url" /></p>
      <p>
        <router-link v-bind:to="`/activity_info/${favorite[0].id}`">More Info</router-link>
      </p>
    </li>
  </div>
</template>
<style>
</style>

