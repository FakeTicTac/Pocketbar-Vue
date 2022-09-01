
<template>

    <!-- Fancy Bartender Video On Background -->
    <div class="intro bg-image vh-100 shadow-1-strong">
        <video playsinline autoplay muted loop>
          <source class="h-100" src="@/assets/videos/landing-bar.mp4" type="video/mp4" />
        </video>
    </div>

      <!-- Input Section -->
        <section class="container-workshop vh-100 wrapper">
          <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
              <div class="col-12 col-md-8 ">
                <div class="card bg-dark text-white data-box">
                  <div class="card-body p-5 text-center">
                    <div class="mb-md-5 mt-md-4 pb-5">

                    <!-- Action -->
                    <h2 class="fw-bold mb-2 text-uppercase">Mark Favourite Cocktail!</h2>

                    <!-- Wrong Input Response From Backend -->
                    <div v-if="errorFlag" class="alert alert-danger text-center mb-5">Something Went Wrong. Please Try Again!</div>

                    <!-- Comment Field -->
                    <textarea  v-model="comment" class="form__field description" id="textAreaExample" rows="4" placeholder="Leave Your Comment">
                    </textarea>

                    <!-- Rating Field -->
                    <select v-model="ratingId" class="form__field description mb-5  mt-4">
                      <option value="" disabled selected>What's Your Rating?</option>
                      <option v-for="rating in ratingStore.$state.ratings" :key="rating.id" v-bind:value="rating.id" >{{ rating.gradeValue }} - {{ rating.description !== undefined ? rating.description["en-GB"] : ""}}</option>
                    </select>

                    <!-- Action Button -->
                    <button @click="create($event)" class="left-btn btn btn-outline-light btn-lg px-5 mt-5">Rate</button>
                    <RouterLink :to="{ name: 'cocktail-details-page', params: { id: id } }" href="" class="right-btn btn btn-outline-light btn-lg px-5 mt-5">Back</RouterLink>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

</template>


<script lang="ts">
  import { Options, Vue } from "vue-class-component";

  import useRatingStore from "@/stores/Rating";
  import { RatingService } from "@/services/RatingService";
  import useUserCocktailStore from "@/stores/UserCocktail";
  import useIdentityStore from "@/stores/identity/Identity";
  import { UserCocktailService } from "@/services/UserCocktailService";

    @Options({
      components: {},
      props: { id: String },
      emits: {}
    })

    export default class FavouriteCocktailAdd extends Vue {

    /**
    * Identity Related Data Storage Connection Definition.
    */
    identityStore = useIdentityStore();

    /**
    * User Cocktail Related Data Storage Connection Definition.
    */
    userCocktailStore = useUserCocktailStore();

    /**
    * Rating Related Data Storage Connection Definition.
    */
    ratingStore = useRatingStore();

    /**
    * Rating Related Service Connection Definition.
    */
    ratingService = new RatingService();

    /**
    * User Cocktail Related Service Connection Definition.
    */
    userCocktailService = new UserCocktailService();

    /**
    * User Cocktail Related Comment Information.
    */
    comment: string = '';

    /**
     * Cocktail ID Definition.
     */
    id!: string;

    /**
    * UserCocktail Related Rating ID Information.
    */
    ratingId: string = '';

    /**
    * Indicator Of Error Occured During Backend Access Operation.
    */
    errorFlag: boolean = false;


    /**
    * Handle Security Options. (Really Dummy.)
    */
    async created(): Promise<void> {

      if (!this.identityStore.$state.jwt) this.$router.push("/");

      this.ratingStore.$state.ratings = await (await this.ratingService.getAll()).data!;

    }


    /**
    * Method Creates Records Of User Cocktail In Backend Side.
    * @param {Event} event Defines Event Happenned To Lead To This Action. 
     */
    async create(event: Event) : Promise<void> {

      event.preventDefault();

      console.log( `${this.comment},
        ${this.id},
        ${this.ratingId}`)

      // Try To Insert Record In Database.
      var result = await this.userCocktailService.add({
        
        comment: this.comment,
        cocktailId: this.id,
        ratingId: this.ratingId

      });

      // Check If Operation Succeded.
      if (result.statusCode === 200) {
        this.errorFlag = true;
        return;
      }

      // Return To Drink Types View.
      this.$router.push("/favourites");
    }

    }
</script>


<style scoped>

    /* Fancy Bartender Video On Background */

    h2 {

      color:  greenyellow;
      text-decoration: underline;
      margin-top: 50px;
      padding-bottom: 50px;

    }

    video {
        min-width: 100%;
        min-height: 100%;
    }

    .intro {
        height: 100vh;
        overflow: hidden;
    }

    .data-box {

      border-radius: 1rem;

    }

    .description {

      margin-top: 30px;

    }

    option {

        font-size: 20px;
        color: gray

    }

    .left-btn {

      font-size: 40px;
      margin-right: 50px;
      width: 30%;

    }

    .left-btn:hover {
      
      border: none;
      background-color: greenyellow;

    }

    .right-btn {

      font-size: 40px;
      margin-left: 50px;
      width: 30%;

    }

    .container-workshop {
        
      height: 100vh;
      font-family: 'Poppins', sans-serif; 
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      font-size: 1.5rem;
      position: fixed;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      color: #f1f1f1;
      height: 100vh;
      width: 100%;
      padding: 20px;

    }

  .form__field {

    font-family: inherit;
    width: 100%;
    border: 0;
    border-bottom: 2px solid gray;
    outline: 0;
    font-size: 2rem;
    color: gray !important;
    padding: 7px 0;
    background: transparent;
    transition: border-color 0.2s;
    height: 100px;

  }

  .form__field:focus {

    padding-bottom: 6px;  
    font-weight: 700;
    border-width: 3px;
    border-image: linear-gradient(to right, greenyellow, rgb(98, 160, 5));
    border-image-slice: 1;
    color: white !important;

  }

  .form__field:hover {

    padding-bottom: 6px;
    color: white;  
    font-weight: 700;
    border-width: 3px;
    border-image: linear-gradient(to right, greenyellow, rgb(98, 160, 5));
    border-image-slice: 1;
    
  }

  .form__field:focus::-webkit-input-placeholder {

    color: transparent;

  }

</style>