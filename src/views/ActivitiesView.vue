<script>
import axios from 'axios';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
export default {
  data: function () {
    return {
      message: "Look At All The Activities!",
      activities: []
      // mapbox_token: []
      // popup: []
    };
  },
  mounted: function () {
    axios.get("http://localhost:3000/mapbox_token.json").then(response => {
      const mapbox_token = response.data.message;
      mapboxgl.accessToken = mapbox_token;
      const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [-87.6298, 41.8781], // starting position [lng, lat]
        zoom: 9 // starting zoom

      });
      map
      axios.get("http://localhost:3000/activities.json").then(response => {
        console.log(response.data);
        this.activities = response.data;
        // this.activities.forEach(activity =>
        //   new mapboxgl.Marker()
        //     .setLngLat([activity.longitude, activity.latitude])
        //     .setPopup(this.popup) // sets popup on this marker
        //     .addTo(map),
        //   // create the popup
        //   this.popup = new mapboxgl.Popup({ offset: 25 }).setText(
        //     `${this.activity.name}`
        //   )
        //   // console.log(activity.name)
        // )
        for (var i = 0, len = this.activities.length; i < len; i++) {
          new mapboxgl.Marker()
            .setLngLat([this.activities[i].longitude, this.activities[i].latitude])
            .setPopup(this.popup) // sets popup on this marker
            .addTo(map),
            // // create the popup
            this.popup = new mapboxgl.Popup({ offset: 25 }).setText(
              `${this.activities[i].name}
            ${this.activities[i].address}`
            )
          // console.log(activity.name)

        }
      })
    });


  },
  methods: {
    indexActivities: function () {
      console.log("Show this big map with activities");
      this.activities.forEach(activity =>
        new mapboxgl.Marker()
          .setLngLat([activity.longitude, activity.latitude])
          .addTo(this.map)
      );
    }
  },
};

</script>



<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <button v-on:click="this.indexActivities()">Show Marker</button>
    <div id='map' style='width: 800px; height: 500px;'></div>
    <!-- <p v-for="activity in activities" v-bind:key="activity.id">
      {{ activity.latitude }}, {{ activity.longitude }} -->
    <!-- </p> -->
  </div>
</template>

<style>
</style>
