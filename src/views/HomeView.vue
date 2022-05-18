<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Welcome to Vue.js!",
      genres: [],
      subGenres: [],
      props: {
        genre: null,
        subGenre: null
      }
    };
  },
  created: function () {
    axios.get("http://localhost:3000/genres.json").then(response => {
      console.log(response.data.sub_genres);
      this.genres = response.data.genres;
      this.subGenres = response.data.sub_genres;
    })
  },
  methods: {
    selectGenre: function () {
      var myProp = this.props;
      this.$router.replace({ name: 'activities', params: { myProp } });
      console.log("Genre Selected");
      console.log(this.genre);
      console.log(this.subGenre);
    }
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <!-- <div v-for="subGenre in subGenres" v-bind:key="subGenre">
      {{ subGenre }}
    </div> -->
    <label for="genre">Choose a category:</label>

    <p><select name="genre" id="genre" v-model="this.genre">
        <option value="musicConcerts">Music/Concerts</option>
        <option value="theaterComedy">Theater/Comedy</option>
        <option value="sports">Sports</option>
        <option value="other">Other</option>
      </select></p>

    <label for="subGenre">Choose a sub category:</label>
    <p><select name="subGenre" id="subGenre" v-model="this.subGenre">
        <!-- <div v-for="subGenre in subGenres" v-bind:key="subGenre"> -->
        <option v-for="subGenre in subGenres" v-bind:key="subGenre" value="this.subGenre">{{ subGenre }}</option>
        <!-- </div> -->
      </select></p>
    <button v-on:click="selectGenre()">Confirm Category</button>


  </div>
</template>

<style>
</style>

<!-- <div v-for="product in products" v-bind:key="product.id">
      {{ product }}
    </div> -->