<script>
import axios from 'axios';


// import $ from 'jquery';

export default {
  data: function () {
    return {
      message: "Welcome to Vue.js!",
      activity: [],
      favorites: [],
      youtube: null,
      favorited: false
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
      this.favorited = true
      console.log("adding to faves");  // CONSOLE LOG HERE
      var params = {
        activity_id: this.activity.id
      }
      axios.post("http://localhost:3000/favorites.json", params).then((response) => {
        console.log(response.data);  // CONSOLE LOG HERE
        this.favorites = response.data;
        // this.$router.push("/favorites");
      })
    },
    destroyFavorites: function () {
      this.favorited = false
      console.log("removing this favorite");  // CONSOLE LOG HERE
      // var params = this.favorites.id
      axios.delete(`http://localhost:3000/favorites/${this.activity.id}.json`).then((response) => {
        console.log(response)
      })
    },

  },
};

</script>

<template>
  <div class="home">

    <!-- <h1> {{ activity.name }}</h1>
    <div class="static"><img v-if="favorited" v-on:click="destroyFavorites()"
        src="https://crissov.github.io/unicode-proposals/img/pink-heart_twemoji.svg" height="35" width="35">
      <img v-else v-on:click="createFavorites()"
        src="https://crissov.github.io/unicode-proposals/img/gray-heart_emojitwo.svg" height="35" width="35">
    </div>
    <img v-bind:src="activity.image_url" />

    <button v-on:click="createFavorites()">Add to Favorites</button> -->
    <!-- <button v-on:click="destroyFavorites()">Remove From Favorites</button> -->
    <!-- <section><iframe width="640" height="360" v-bind:src="youtube" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe></section>


    <h2>Learn more about {{ activity.name }}</h2>
    <p>Date: {{ activity.date }}</p>
    <p><a v-if="activity.twitter !== null" v-bind:href="activity.twitter">Twitter</a></p>
    <p><a v-if="activity.homepage !== null" v-bind:href="activity.homepage">Homepage</a></p>
    <p><a v-if="activity.instagram !== null" v-bind:href="activity.instagram">Instagram</a></p>
    <p><a v-if="activity.ticketmaster !== null" v-bind:href="activity.ticketmaster">Ticketmaster</a></p> -->
    <!-- <router-link class="card-link" v-bind:to="`/activities/${recipe.id}`">More Info</router-link> -->

    <h1>Hello Shane!</h1>
    <!-- ======= Team Section ======= -->

    <head>
      <section id="team" class="team">
        <div class="container">

          <div class="section-title" data-aos="fade-in" data-aos-delay="100">
            <h2>Team</h2>
            <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint
              consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat
              sit
              in iste officiis commodi quidem hic quas.</p>
          </div>

          <div class="row">

            <div class="col-lg-4 col-md-6">
              <div class="member" data-aos="fade-up">
                <div class="pic"><img src="assets/img/team/team-1.jpg" class="img-fluid" alt=""></div>
                <div class="member-info">
                  <h4>Walter White</h4>
                  <span>Chief Executive Officer</span>
                  <div class="social">
                    <a href=""><i class="bi bi-twitter"></i></a>
                    <a href=""><i class="bi bi-facebook"></i></a>
                    <a href=""><i class="bi bi-instagram"></i></a>
                    <a href=""><i class="bi bi-linkedin"></i></a>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-4 col-md-6">
              <div class="member" data-aos="fade-up" data-aos-delay="150">
                <div class="pic"><img src="assets/img/team/team-2.jpg" class="img-fluid" alt=""></div>
                <div class="member-info">
                  <h4>Sarah Jhonson</h4>
                  <span>Product Manager</span>
                  <div class="social">
                    <a href=""><i class="bi bi-twitter"></i></a>
                    <a href=""><i class="bi bi-facebook"></i></a>
                    <a href=""><i class="bi bi-instagram"></i></a>
                    <a href=""><i class="bi bi-linkedin"></i></a>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-4 col-md-6">
              <div class="member" data-aos="fade-up" data-aos-delay="300">
                <div class="pic"><img src="assets/img/team/team-3.jpg" class="img-fluid" alt=""></div>
                <div class="member-info">
                  <h4>William Anderson</h4>
                  <span>CTO</span>
                  <div class="social">
                    <a href=""><i class="bi bi-twitter"></i></a>
                    <a href=""><i class="bi bi-facebook"></i></a>
                    <a href=""><i class="bi bi-instagram"></i></a>
                    <a href=""><i class="bi bi-linkedin"></i></a>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>
    </head>
    <!-- End Team Section -->
  </div>

</template>
  
<style>
h1 {
  text-align: center;
}

img {
  width: 250px;
}

div.static {
  position: static;
  text-align: left;

  /* border: 3px solid #73AD21; */
}
</style>

<!-- /* <img src="img/1f5a4_emojitwo.svg" alt="Black Heart"> */ -->