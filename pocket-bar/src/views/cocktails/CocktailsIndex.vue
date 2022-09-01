
<template>

  <!-- Navigation Bar -->
  <NavBar />

  <div class="d-flex">

    <!-- Cocktails Section -->
    <section class="gallery container-fluid">
      <div class="header-section">
        
        <!-- Search Bar -->
        <AdminSearchBar @searchInvoked="search" />

      </div>

      <!-- Wrong Response From Backend -->
      <div v-if="errorLoad || errorDelete" class="alert alert-danger text-center mb-5">{{ errorLoad ? 'Resource Loading Went Wrong.' : 'Cocktail Deletion Went Wrong.' }} Please Try Again!</div>

      <!-- Cocktails Cards -->
      <div class="row card-row">
        <div v-for="cocktail in showCocktails" v-bind:key="cocktail.id" class="card-data col-lg-2 mb-4">

          <div class="card h-100">
            <div class="card-body">
             <img v-if="cocktail.coverImagePath" class="card-img-top" :src="cocktail.coverImagePath" alt="Card image cap">
             <img v-else class="card-img-top" src="@/assets/icons/no-image.png" alt="Card image cap">

              <!-- Cocktail Data -->
              <h5 class="card-title fs-4 text-center">{{ cocktail.name["en-GB"] }}</h5>
              <hr class="hr-top" />
              <p class="card-text">{{ cocktail.description !== undefined ? cocktail.description["en-GB"] : "Drink Type Doesn't Have Description." }}</p>

              <!-- Actions To Modify Data -->
              <div class="card-btn-container text-center" style="width: 90%;">
                <RouterLink :to="{ name: 'cocktail-details-page', params: { id: cocktail.id } }" href="" class="btn btn-details fs-5 btn-sm">Details</RouterLink>
                <a v-if="identityStore.$state.jwt?.role === 'Admin' || identityStore.$state.jwt?.role === 'Bartender'" @click="deleteClicked($event, cocktail.id)" href="" class="btn btn-delete fs-5 btn-sm">Delete</a>
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

  import NavBar from "@/components/NavBar.vue";
  import useCocktailStore from "@/stores/Cocktail";
  import type { ICocktail } from "@/domain/ICocktail";
  import useIdentityStore from "@/stores/identity/Identity";
  import AdminSearchBar from "@/components/AdminSearchBar.vue";
  import { CocktailService } from "@/services/CocktailService";


    @Options({
      components: { AdminSearchBar, NavBar },
      props: {},
      emits: {},
    })


    export default class CocktailsIndex extends Vue {

      /**
      * Identity Related Data Storage Connection Definition.
      */
      identityStore = useIdentityStore();

      /**
      * Cocktail Related Data Storage Connection Definition.
      */
      cocktailStore = useCocktailStore();

      /**
      * Cocktail Related Service Connection Definition.
      */
      cocktailService = new CocktailService();

      /**
       * Defines Drink Type Storage To Be Shown.
       */
      showCocktails: ICocktail[] = [];

      /**
       * Indicator of Delete Error.
       */
      errorDelete: boolean = false;

      /**
       * Indicator of Loading Erorr.
       */
      errorLoad: boolean = false;

      /**
       * Defines Searched Name By User.
       */
      searchName: string = "";


      /**
       * Handle Security Options. (Really Dummy.)
       */
      created(): void {

        if (!this.identityStore.$state.jwt) this.$router.push("/");

      }

      /**
        * Need To Load Cocktails From Backend.
      */
      async mounted(): Promise<void> {

        // Load To Storage
        let result = await this.cocktailService.getAll();

        // Check if Data Loaded.
        if (result.statusCode !== 200) {
          
          this.errorLoad = true;
          return;

        }

        this.cocktailStore.$state.cocktails = result.data!;

        // Define To Show Storage.
        this.showCocktails = this.cocktailStore.$state.cocktails;

      }

      /**
       * Method Deletes Cocktail From Backend.
       * @param {Event} event Defines Event Happened In Front End.
       * @param {string} id Defines ID Of The Cocktail To Be Deleted. 
       */
      async deleteClicked(event: Event, id: string | undefined): Promise<void> {

        // Perevent Redirect.
        event.preventDefault();

        if (id === undefined) return;

        let result = await this.cocktailService.remove(id);

        // Check If Operation Succeded.
        if (result.statusCode !== 204) this.errorDelete = true;

        // Load To Storage
        let resultLoad = await this.cocktailService.getAll();

        // Check if Data Loaded.
        if (resultLoad.statusCode !== 200) {
          
          this.errorLoad = true;
          return;

        }

        this.errorLoad = false;

        this.cocktailStore.$state.cocktails = resultLoad.data!;

        this.showCocktails = this.cocktailStore.$state.cocktails.filter(x => x.name["en-GB"].toUpperCase().includes(this.searchName.toUpperCase()));

      }

      /**
       * Method Filters Out Data Based On User Search.
       * @param {string} searchName Name As A Search Criteria.
       */
      search(searchName: string) : void {

        // Save Searched Name.
        this.searchName = searchName;
        
        // Load All Data.
        if (searchName === "") {
        
          this.showCocktails = this.cocktailStore.$state.cocktails
          return;
        } 

        this.showCocktails = this.cocktailStore.$state.cocktails.filter(x => x.name["en-GB"].toUpperCase().includes(searchName.toUpperCase()))

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
    position:relative;
    padding-bottom: 100px;
    background-color: #151515;
    min-height: 100vh;

  }

      .card-img-top {

    height: 250px;

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

  .btn-details {

    border-color: rgb(255, 191, 71);
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

  .btn-details:hover {

    background-color: rgb(255, 191, 71);
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