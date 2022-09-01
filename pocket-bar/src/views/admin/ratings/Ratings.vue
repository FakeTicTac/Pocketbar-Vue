
<template>
  <div class="d-flex">

     <!-- Navigation -->
     <AdminNavBar />

    <!-- Ratings Section -->
    <section class="gallery container-fluid">
      <div class="header-section">
        
        <!-- Search Bar -->
        <AdminSearchBar @searchInvoked="search" />

        <!-- Add New Rating -->
        <div class="row add-card-row d-flex justify-content-center">
          <div class="col-lg-12 add-card-container mb-4">

            <router-link to="/ratings-add" class="card card-add-button h-100">
              <div class="card-body align-self-center d-flex justify-content-center">
          
                <!-- Add Button Image-->
                <img class="image-header align-self-center" src="@/assets/icons/add.png">

              </div>
            </router-link>

          </div>
        </div>
      </div>

      <!-- Wrong Response From Backend -->
      <div v-if="errorLoad || errorDelete" class="alert alert-danger text-center mb-5">{{ errorLoad ? "Resource Loading Went Wrong. " : "Delete Operation Not Succeded. " }} Please Try Again!</div>

      <!-- Ratings Cards -->
      <div class="row card-row">
        <div v-for="rating in showRatings" v-bind:key="rating.id" class="card-data col-lg-3 mb-4">

          <div class="card h-100">
            <div class="card-body">

              <!-- Drink Type Data -->
              <h5 class="card-title fs-4 text-center">{{ rating.gradeValue }} - {{ rating.usageCount }} Usages</h5>
              <hr class="hr-top" />
              <p class="card-text">{{ rating.description !== undefined ? rating.description["en-GB"] : "Rating Doesn't Have Description." }}</p>

              <!-- Actions To Modify Data -->
              <div class="card-btn-container text-center" style="width: 90%;">
                <RouterLink :to="{ name: 'ratings-edit-page', params: { id: rating.id } }" href="" class="btn btn-modify fs-5 btn-sm">Modify</RouterLink>
                <a v-if="rating.usageCount === 0" v-on:click="deleteClikced($event, rating.id)" href="" class="btn btn-delete fs-5 btn-sm">Delete</a>
              </div>

            </div>
          </div>
        </div>
      </div>

    </section>
  </div>
</template>


<script lang="ts">
  import { Options, Vue } from "vue-class-component";

  import AdminNavBar from "@/components/AdminNavBar.vue";

  import useRatingStore from "@/stores/Rating";
  import type { IRating } from "@/domain/IRating";
  import { RatingService } from "@/services/RatingService";
  import useIdentityStore from "@/stores/identity/Identity";
  import AdminSearchBar from "@/components/AdminSearchBar.vue";


    @Options({
      components: { AdminNavBar, AdminSearchBar },
      props: {},
      emits: {},
    })


    export default class Ratings extends Vue {

      /**
      * Identity Related Data Storage Connection Definition.
      */
      identityStore = useIdentityStore();

      /**
      * Rating Related Data Storage Connection Definition.
      */
      ratingsStore = useRatingStore();

      /**
      * Rating Related Service Connection Definition.
      */
      ratingService = new RatingService();

      /**
       * Indicator of Loading Erorr.
       */
      errorLoad: boolean = false;

      /**
       * Indicator of Delete Error.
       */
      errorDelete: boolean = false;

      /**
       * Defines Rating Storage To Be Shown.
       */
      showRatings: IRating[] = [];

      /**
       * Defines Searched Name By User.
       */
      searchName: string = "";


      /**
       * Handle Security Options. (Really Dummy.)
       */
      created(): void {

        if (!this.identityStore.$state.jwt) this.$router.push("/");

        if (this.identityStore.$state.jwt?.role != "Admin") this.$router.push("/home");

      }

      /**
        * Need To Load Ratings From Backend.
      */
      async mounted(): Promise<void> {

        // Load To Storage
        let result = await this.ratingService.getAll();

        // Check if Data Loaded.
        if (result.statusCode !== 200) {
          
          this.errorLoad = true;
          return;

        }

        this.ratingsStore.$state.ratings = result.data!;

        // Define To Show Storage.
        this.showRatings = this.ratingsStore.$state.ratings;

      }


      /**
       * Method Deletes Ratings From Backend.
       * @param {Event} event Defines Event Happened In Front End.
       * @param {string} id Defines ID Of The Ratings To Be Deleted. 
       */
      async deleteClikced(event: Event, id: string | undefined): Promise<void> {

        // Perevent Redirect.
        event.preventDefault();

        if (id === undefined) return;

        let result = await this.ratingService.remove(id);

        // Check If Operation Succeded.
        if (result.statusCode !== 204) this.errorDelete = true;

        // Load To Storage
        let resultLoad = await this.ratingService.getAll();

        // Check if Data Loaded.
        if (resultLoad.statusCode !== 200) {
          
          this.errorLoad = true;
          return;

        }

        this.errorLoad = false;

        this.ratingsStore.$state.ratings = resultLoad.data!;

        this.showRatings = this.ratingsStore.$state.ratings.filter(x => x.gradeValue.toUpperCase().includes(this.searchName.toUpperCase()));

      }

      /**
       * Method Filters Out Data Based On User Search.
       * @param {string} searchName Name As A Search Criteria.
       */
      search(searchName: string) : void {

        this.errorDelete = false;

        // Save Searched Name.
        this.searchName = searchName;
        
        // Load All Data.
        if (searchName === "") {
        
          this.showRatings = this.ratingsStore.$state.ratings;
          return;
        } 

        this.showRatings = this.ratingsStore.$state.ratings.filter(x => x.gradeValue.toUpperCase().includes(searchName.toUpperCase()))

      }
    }
</script>


<style scoped>

  .header-section {

    padding-top: 50px;
    padding-bottom: 50px;
    background-image: url(@/assets/photos/drink-type-creation-background.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position-y: 20%;

  }

  .gallery {

    width: 100%; 
    margin-left:300px;
    position:relative;
    padding-bottom: 100px;
    background-color: #151515;
    min-height: 100vh;

  }

  .alert {

    margin-top: 10px;
    font-size: 20px;

  }

  .card-row {

    margin-left: 50px; 
    margin-right: 50px;

  }

  .card {
    
    margin-top: 50px

  }

  .btn-delete {

    border-color: black;
    color: black;
    background-color: white;
    width: 45%; 
    height: 40px; 
    margin-top: 20px; 
    margin-bottom: 20px;

  }

  .btn-modify {

    border-color: rgba(0, 174, 255, 0.582);
    color: black;
    background-color: white;
    width: 45%; 
    height: 40px; 
    margin-top: 20px; 
    margin-bottom: 20px;
    
  }

  .btn-delete:hover {

    background-color: black;
    color: white;

  }

  .btn-modify:hover {

    background-color: rgba(0, 174, 255, 0.582);
    color:white;

  }

  .card-text {

    margin-top: 20px;
    text-justify: inter-word; 
    text-align: justify;
    margin-bottom: 50px

  }

  .card-btn-container {

    position: absolute;
    bottom: 0px;

  }

  .card:hover {

    border: 2px solid black;

  }

  .image-header {

    height: 50px;

  }

  .hr-top {

    margin-top: 5px;

  }

  .card-add-button:hover {

    background-color: greenyellow;

  }

  .card-add-button {

    border: 2px solid black;

  }

  .add-card-row {

    padding-top: 100px;
    padding-bottom: 150px;
    margin-bottom: 15px;
    height: 50px;

  }

  .add-card-container {

      width: 30%;
      height: 100px;

  }

</style>