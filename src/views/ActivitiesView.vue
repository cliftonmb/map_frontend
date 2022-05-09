
<script>


import axios from 'axios';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
export default {
  data: function () {
    return {
      message: "Look At All The Activities!",
      markers: [],
      activitiesWithCurrentMarker: [],
      activities: [],
      marker: []
      // mapboxToken: []
      // popup: []
    };
  },
  mounted: function () {
    axios.get("http://localhost:3000/activities.json").then(response => {
      console.log(response.data);  // CONSOLE LOG HERE
      this.activities = response.data;

      // }),
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
          console.log(response.data); // CONSOLE LOG HERE
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
          //   // console.log(activity.name) // CONSOLE LOG HERE
          // )
          var y
          for (var i = 0, len = this.markers.length; i < len; i++) {
            this.marker = new mapboxgl.Marker()
              .setLngLat([this.markers[i].longitude, this.markers[i].latitude])

              .addTo(map);
            // // create the popup
            this.activitiesWithCurrentMarker = this.activities.filter(activity => activity.marker_id === this.markers[i].id);
            console.log(`Marker ID: ${this.markers[i].id}`) // CONSOLE LOG HERE
            // console.log(`all activities: ${this.activities}`) // CONSOLE LOG HERE
            // console.log(`marker ID: ${this.markers[i].activities_address} and marker_id: ${this.activitiesWithCurrentMarker[0].address}`); // CONSOLE LOG HERE
            const x = this.activitiesWithCurrentMarker;
            y = function showActivities() {
              var activities_object = []
              x.forEach(activityToShow =>
                activities_object.push(`${activityToShow.name}: ${activityToShow.date} ${activityToShow.address}, <br> <a href="http://localhost:8080/activity_info/${activityToShow.id}">More Info</a> <br>`)
              )
              return activities_object;
            }
            this.popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
              `${y()}`,
              this.activitiesWithCurrentMarker.forEach(activity => {
                console.log(activity); // CONSOLE LOG HERE
                // console.log(`marker ID: ${this.markers[i].activities_address} and marker_id: ${this.activitiesWithCurrentMarker[0].address}`); // CONSOLE LOG HERE
                console.log(this.markers[i].id); // CONSOLE LOG HERE
              }),
            )
            this.marker.setPopup(this.popup) // sets popup on this marker
            // console.log(activity.name) // CONSOLE LOG HERE

          }
        })
      })
    });


  },
  methods: {},
};

</script>



<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <a href="http://localhost:8080">Google</a>

    <div id='map' style='width: 800px; height: 500px;'></div>
    <!-- <div v-for="activity in activitiesWithCurrentMarker" v-bind:key="activity.id">
      {{ activty.name }}
    </div> -->
    <!-- <div v-for="product in products" v-bind:key="product.id">
      {{ product }}
    </div> -->

  </div>
</template>

<style>
</style>
