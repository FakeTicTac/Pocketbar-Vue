
<template>
  <div class="d-flex">

     <!-- Navigation -->
     <AdminNavBar />

    <!-- Drink Types Section -->
    <section class="gallery container-fluid">
      <div class="header-section">
        
        <!-- Search Bar -->
        <AdminSearchBar @searchInvoked="search" />

        <!-- Add New Drink Type -->
        <div class="row add-card-row d-flex justify-content-center">
          <div class="col-lg-12 add-card-container mb-4">

            <router-link to="/drink-type-add" class="card card-add-button h-100">
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

      <!-- Drink Types Cards -->
      <div class="row card-row">
        <div v-for="drinkType in showDrinkTypes" v-bind:key="drinkType.id" class="card-data col-lg-3 mb-4">

          <div class="card h-100">
            <div class="card-body">

              <!-- Drink Type Data -->
              <h5 class="card-title fs-4 text-center">{{ drinkType.name["en-GB"] }} - {{ drinkType.drinksCount }} Usages</h5>
              <hr class="hr-top" />
              <p class="card-text">{{ drinkType.description !== undefined ? drinkType.description["en-GB"] : "Drink Type Doesn't Have Description." }}</p>

              <!-- Actions To Modify Data -->
              <div class="card-btn-container text-center" style="width: 90%;">
                <RouterLink :to="{ name: 'drink-types-edit-page', params: { id: drinkType.id } }" href="" class="btn btn-modify fs-5 btn-sm">Modify</RouterLink>
                <a v-if="drinkType.drinksCount === 0" v-on:click="deleteClikced($event, drinkType.id)" href="" class="btn btn-delete fs-5 btn-sm">Delete</a>
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

  import useDrinkTypeStore from "@/stores/DrinkType";
  import type { IDrinkType } from "@/domain/IDrinkType";
  import useIdentityStore from "@/stores/identity/Identity";
  import AdminSearchBar from "@/components/AdminSearchBar.vue";
  import { DrinkTypeService } from "@/services/DrinkTypeService";


    @Options({
      components: { AdminNavBar, AdminSearchBar },
      props: {},
      emits: {},
    })


    export default class DrinkTypes extends Vue {

      /**
      * Identity Related Data Storage Connection Definition.
      */
      identityStore = useIdentityStore();

      /**
      * Drink Type Related Data Storage Connection Definition.
      */
      drinkTypeStore = useDrinkTypeStore();

      /**
      * Cocktail Related Service Connection Definition.
      */
      drinkTypeService = new DrinkTypeService();

      /**
       * Defines Drink Type Storage To Be Shown.
       */
      showDrinkTypes: IDrinkType[] = [];

      /**
       * Indicator of Loading Erorr.
       */
      errorLoad: boolean = false;

      /**
       * Indicator of Delete Error.
       */
      errorDelete: boolean = false;

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
        * Need To Load Drink Types From Backend.
      */
      async mounted(): Promise<void> {

        // Load To Storage
        let result = await this.drinkTypeService.getAll();

        // Check if Data Loaded.
        if (result.statusCode !== 200) {
          
          this.errorLoad = true;
          return;

        }

        this.drinkTypeStore.$state.drinkTypes = result.data!;

        // Define To Show Storage.
        this.showDrinkTypes = this.drinkTypeStore.$state.drinkTypes;

      }


      /**
       * Method Deletes Drink Type From Backend.
       * @param {Event} event Defines Event Happened In Front End.
       * @param {string} id Defines ID Of The Drink Type To Be Deleted. 
       */
      async deleteClikced(event: Event, id: string | undefined): Promise<void> {

        // Perevent Redirect.
        event.preventDefault();

        if (id === undefined) return;

        let result = await this.drinkTypeService.remove(id);

        // Check If Operation Succeded.
        if (result.statusCode !== 204) this.errorDelete = true;

        // Load To Storage
        let resultLoad = await this.drinkTypeService.getAll();

        // Check if Data Loaded.
        if (resultLoad.statusCode !== 200) {
          
          this.errorLoad = true;
          return;

        }

        this.errorLoad = false;

        this.drinkTypeStore.$state.drinkTypes = resultLoad.data!;

        this.showDrinkTypes = this.drinkTypeStore.$state.drinkTypes.filter(x => x.name["en-GB"].toUpperCase().includes(this.searchName.toUpperCase()));

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
        
          this.showDrinkTypes = this.drinkTypeStore.$state.drinkTypes
          return;
        } 

        this.showDrinkTypes = this.drinkTypeStore.$state.drinkTypes.filter(x => x.name["en-GB"].toUpperCase().includes(searchName.toUpperCase()))

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