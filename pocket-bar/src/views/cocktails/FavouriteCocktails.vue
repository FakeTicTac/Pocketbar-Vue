
<template>
  
  <div class="favourite-wrapper">

  <!-- Navigation Bar -->
  <NavBar />
  <AdminSearchBar @searchInvoked="search" style="margin-top: 60px" />

  <div class="container mt-5 mb-5">
    <div class="d-flex justify-content-center row">

        <!-- Error Message Box -->
        <div v-if="errorLoad || errorDelete || userCocktailStore.$state.userCoctails.length == 0 " class="alert alert-danger mt-3 text-center"> 
          {{ errorLoad || userCocktailStore.$state.userCoctails.length == 0 ? 'You Do Not Have Any Cocktails Rated! Go To The "Cocktails" Section And Rate One.' : "Error Occured During Cocktail Deletion" }}
        </div>

        <div v-for="userCocktail in showUserCocktails" :key="userCocktail.id" class="col-md-10">
            <div class="row p-2 bg-white item-data border rounded" style="margin-top: 50px;">
                <div class="col-md-3 mt-1"><img class="img-fluid img-responsive rounded product-image" style="height: 200px" :src="userCocktail.coverImagePath"></div>
                <div class="col-md-6 mt-1">
                    <h5>{{ userCocktail.cocktailName !== undefined ? userCocktail.cocktailName["en-GB"] : "" }}</h5>

                    <div class="d-flex flex-row">
                        <span class="fs-5 mt-2" style="margin-left: 20px">{{ userCocktail.ratingValue }}</span>
                    </div>

                    <p class="text-justify para mt-4 mb-0">{{ userCocktail.comment }}<br><br></p>
                </div>
                
                <div class="align-items-center align-content-center col-md-3 border-left mt-1">
     
                    <div class="d-flex justify-content-center flex-column" style="height: 200px">

                        <RouterLink :to="{ name: 'cocktail-details-page', params: { id: userCocktail.cocktailId } }" href="" class="btn btn-danger btn-details w-100">Recepie</RouterLink>
                        <a @click="deleteClicked($event, userCocktail.id)" href="" class="btn btn-danger btn-delete w-100">Delete</a>

                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
</div>


</template>


<script lang="ts">
  import { Options, Vue } from "vue-class-component";

  import useUserCocktailStore from "@/stores/UserCocktail";
  import useIdentityStore from "@/stores/identity/Identity";
  import type { IUserCocktail } from "@/domain/IUserCocktail";
  import { UserCocktailService } from "@/services/UserCocktailService";

  import NavBar from "@/components/NavBar.vue";
  import AdminSearchBar from "@/components/AdminSearchBar.vue";


    @Options({
      components: { NavBar, AdminSearchBar },
      props: {},
      emits: {}
    })

    export default class FavouriteCocktails extends Vue {

      /**
      * Identity Related Data Storage Connection Definition.
      */
      identityStore = useIdentityStore();

      /**
      * User Cocktail Related Data Storage Connection Definition.
      */
      userCocktailStore = useUserCocktailStore();

      /**
      * User Cocktail Related Service Connection Definition.
      */
      userCocktailService = new UserCocktailService();

      /**
       * Defines User Cocktail Storage To Be Shown.
       */
      showUserCocktails: IUserCocktail[] = [];

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
        let result = await this.userCocktailService.getAll();

        // Check if Data Loaded.
        if (result.statusCode !== 200) {
          
          this.errorLoad = true;
          return;

        }

        this.userCocktailStore.$state.userCoctails = result.data!;

        // Define To Show Storage.
        this.showUserCocktails = this.userCocktailStore.$state.userCoctails;

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

        let result = await this.userCocktailService.remove(id);

        // Check If Operation Succeded.
        if (result.statusCode !== 204) this.errorDelete = true;

        // Load To Storage
        let resultLoad = await this.userCocktailService.getAll();

        // Check if Data Loaded.
        if (resultLoad.statusCode !== 200) {
          
          this.errorLoad = true;
          return;

        }

        this.errorLoad = false;

        this.userCocktailStore.$state.userCoctails = resultLoad.data!;

        this.showUserCocktails = this.userCocktailStore.$state.userCoctails.filter(x => x.cocktailName!["en-GB"].toUpperCase().includes(this.searchName.toUpperCase()));

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
        
          this.showUserCocktails = this.userCocktailStore.$state.userCoctails
          return;
        } 

        this.showUserCocktails = this.userCocktailStore.$state.userCoctails.filter(x => x.cocktailName!["en-GB"].toUpperCase().includes(searchName.toUpperCase()))

      }
    }
</script>


<style scoped>

  .favourite-wrapper {

    background-color: black; 
    min-height: 100vh;
    padding-bottom: 100px;
    background-image: url(@/assets/photos/cocktail-details.jpg);
    background-size: cover;
    background-repeat: no-repeat;

  }

  .item-data {

    background-color: rgba(0, 0, 0, 0.747) !important;
    color: white !important;

  }

  .btn-delete {

    border-color: red;
    color: black;
    background-color: white;
    width: 45%; 
    height: 40px; 
    margin-top: 8px; 
    margin-bottom: 20px;

  }

  .btn-details {

    border-color: rgb(255, 191, 71);
    color: black;
    background-color: white;
    width: 45%; 
    height: 40px; 
    margin-top: 20px; 
    margin-bottom: 8px;

    
  }

  .btn-delete:hover {

    background-color: red;
    color: white;

  }

  .btn-details:hover {

    border-color: rgb(255, 191, 71);
    background-color: rgb(255, 191, 71);
    color:black;

  }

  h5 {

    font-weight: 400;
    font-size: 40px;
    color: greenyellow;
  
  }

.ratings i{font-size: 16px;color: red}
.strike-text{color: red;text-decoration: line-through}
.product-image{width: 100%}
.dot{height: 7px;width: 7px;margin-left: 6px;margin-right: 6px;margin-top: 3px;background-color: blue;border-radius: 50%;display: inline-block}
.spec-1{color: #938787;font-size: 15px}

.para{font-size: 16px}
</style>