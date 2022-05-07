<script>
import axios from 'axios';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
export default {
  data: function () {
    return {
      message: "Look At All The Activities!",
      markers: [],
      activitiesWithCurrentMarker: [],
      activities: []
      // mapboxToken: []
      // popup: []
    };
  },
  mounted: function () {
    axios.get("http://localhost:3000/activities.json").then(response => {
      console.log(response.data);
      this.activities = response.data;
    }),
      axios.get("http://localhost:3000/mapbox_token.json").then(response => {
        const mapboxToken = response.data.message;
        mapboxgl.accessToken = mapboxToken;
        const map = new mapboxgl.Map({
          container: 'map', // container ID
          style: 'mapbox://styles/mapbox/streets-v11', // style URL
          center: [-87.6298, 41.8781], // starting position [lng, lat]
          zoom: 9 // starting zoom

        });
        map
        axios.get("http://localhost:3000/markers.json").then(response => {
          console.log(response.data);
          this.markers = response.data;
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
          var y
          for (var i = 0, len = this.markers.length; i < len; i++) {
            new mapboxgl.Marker()
              .setLngLat([this.markers[i].longitude, this.markers[i].latitude])
              .setPopup(this.popup) // sets popup on this marker
              .addTo(map);
            // // create the popup
            this.activitiesWithCurrentMarker = this.activities.filter(activity => activity.marker_id === this.markers[i].id);
            console.log(this.activitiesWithCurrentMarker);
            const x = this.activitiesWithCurrentMarker;
            y = function showActivities() {
              var activities_object = []
              x.forEach(activityToShow =>
                activities_object.push(`${activityToShow.name}: ${activityToShow.address}, <br> <a href="http://localhost:8080/activity_info/${activityToShow.id}">More Info</a> <br>`)
              )
              return activities_object;
            }
            this.popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
              `${y()}`,
              this.activitiesWithCurrentMarker.forEach(activity => {
                console.log(activity);
                console.log(this.markers[i].activities_address);
                console.log(this.markers[i].id);
              }),
            )
            // console.log(activity.name)

          }
        })
      });


  },
  methods: {
    indexActivities: function () {
      console.log("Show this big map with activities");
      // this.activities.forEach(activity =>
      //   new mapboxgl.Marker()
      //     .setLngLat([activity.longitude, activity.latitude])
      //     .addTo(this.map)
      // );
    }
  },
};

</script>



<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <a href="http://localhost:8080">Google</a>



    <p>hello</p>
    <button v-on:click="this.indexActivities()">Show Marker</button>
    <div id='map' style='width: 800px; height: 500px;'></div>
    <div v-for="activity in activitiesWithCurrentMarker" v-bind:key="activity.id">
      {{ activty.name }}
    </div>
    <!-- <div v-for="product in products" v-bind:key="product.id">
      {{ product }}
    </div> -->

  </div>
</template>

<style>
</style>
