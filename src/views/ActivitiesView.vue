
<script>
import axios from 'axios';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
export default {
  data: function () {
    return {
      message: "Happenings",
      markers: [],
      activitiesWithCurrentMarker: [],
      activities: [],
      marker: [],
      genres: [],
      subGenres: [],
      genre: "",
      subGenre: ""

      // mapboxToken: []
      // popup: []
    };
  },
  mounted: function () {
    axios.get("http://localhost:3000/genres.json").then(response => {
      console.log(response.data.sub_genres);
      this.genres = response.data.genres;
      this.subGenres = response.data.sub_genres;
    })
    // axios.get(`http://localhost:3000/activities?genre=${this.props.genre}&sub_genre=${this.props.subGenre}.json`).then(response => {
    //   console.log(response.data);  // CONSOLE LOG HERE
    //   this.activities = response.data;

    //   // }),
    //   axios.get("http://localhost:3000/mapbox_token.json").then(response => {
    //     const mapboxToken = response.data.message;
    //     mapboxgl.accessToken = mapboxToken;
    //     const map = new mapboxgl.Map({
    //       container: 'map', // container ID
    //       style: 'mapbox://styles/mapbox/streets-v11', // style URL
    //       center: [-87.6298, 41.8781], // starting position [lng, lat]
    //       zoom: 9 // starting zoom

    //     });
    //     map
    //     axios.get("http://localhost:3000/markers.json").then(response => {
    //       console.log(response.data); // CONSOLE LOG HERE
    //       this.markers = response.data;
    //       // this.activities.forEach(activity =>
    //       //   new mapboxgl.Marker()
    //       //     .setLngLat([activity.longitude, activity.latitude])
    //       //     .setPopup(this.popup) // sets popup on this marker
    //       //     .addTo(map),
    //       //   // create the popup
    //       //   this.popup = new mapboxgl.Popup({ offset: 25 }).setText(
    //       //     `${this.activity.name}`
    //       //   )
    //       //   // console.log(activity.name) // CONSOLE LOG HERE
    //       // )
    //       var y
    //       for (var i = 0, len = this.markers.length; i < len; i++) {
    //         this.marker = new mapboxgl.Marker()
    //           .setLngLat([this.markers[i].longitude, this.markers[i].latitude])

    //           .addTo(map);
    //         // // create the popup
    //         this.activitiesWithCurrentMarker = this.activities.filter(activity => activity.marker_id === this.markers[i].id);
    //         console.log(`Marker ID: ${this.markers[i].id}`) // CONSOLE LOG HERE
    //         // console.log(`all activities: ${this.activities}`) // CONSOLE LOG HERE
    //         // console.log(`marker ID: ${this.markers[i].activities_address} and marker_id: ${this.activitiesWithCurrentMarker[0].address}`); // CONSOLE LOG HERE
    //         const x = this.activitiesWithCurrentMarker;
    //         y = function showActivities() {
    //           var activities_object = []
    //           x.forEach(activityToShow =>
    //             activities_object.push(`${activityToShow.name}: ${activityToShow.date} <a href="http://localhost:8080/activity_info/${activityToShow.id}">More Info</a> <br>`)
    //           )
    //           return activities_object;
    //         }
    //         this.popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
    //           `${y()}`,
    //           this.activitiesWithCurrentMarker.forEach(activity => {
    //             console.log(activity); // CONSOLE LOG HERE
    //             // console.log(`marker ID: ${this.markers[i].activities_address} and marker_id: ${this.activitiesWithCurrentMarker[0].address}`); // CONSOLE LOG HERE
    //             console.log(this.markers[i].id); // CONSOLE LOG HERE
    //           }),
    //         )
    //         this.marker.setPopup(this.popup), // sets popup on this marker
    //           this.popup.setMaxWidth("600px")
    //         // console.log(activity.name) // CONSOLE LOG HERE

    //       }
    //     })
    //   })
    // });


  },
  methods: {
    selectGenre: function () {
      console.log("Genre Selected");
      console.log(this.genre);
      console.log(this.subGenre);
      this.showActivities();
    },
    showActivities: function () {
      axios.get(`http://localhost:3000/activities?genre=${this.genre}&sub_genre=${this.subGenre}`).then(response => {
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
                  activities_object.push(`${activityToShow.name}: ${activityToShow.date} <a href="http://localhost:8080/activity_info/${activityToShow.id}">More Info</a> <br>`)
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
              this.marker.setPopup(this.popup), // sets popup on this marker
                this.popup.setMaxWidth("600px")
              // console.log(activity.name) // CONSOLE LOG HERE

            }
          })
        })
      });
    }
  }
};

</script>



<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <label for="genre">Choose a category:</label>

    <p><select name="genre" id="genre" v-model="this.genre">
        <option value="Music/Concerts">Music/Concerts</option>
        <option value="Theater/Comedy">Theater/Comedy</option>
        <option value="Sports">Sports</option>
        <option value="Other">Other</option>
      </select></p>

    <label for="subGenre">Choose a sub category:</label>
    <p><select name="subGenre" id="subGenre" v-model="this.subGenre">
        <!-- <div v-for="subGenre in subGenres" v-bind:key="subGenre"> -->
        <option v-for="theSubGenre in subGenres" v-bind:key="theSubGenre.id">{{ theSubGenre }}</option>
        <!-- </div> -->
      </select></p>
    <button v-on:click="selectGenre()">See Happenings</button>
    <div id='map' style='width: 1000px; height: 800px;'></div>
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
