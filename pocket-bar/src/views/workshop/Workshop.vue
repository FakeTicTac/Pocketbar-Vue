
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
                    <h2 class="fw-bold mb-2 text-uppercase">Show Your Bartender Skills!</h2>

                    <!-- Wrong Input Response From Backend -->
                    <div v-if="errorFlag" class="alert alert-danger text-center mb-5">Something Went Wrong. Please Try Again!</div>

                    <!-- Cocktail Name Field -->
                    <div class="form-outline form-white mb-4">
                      <input v-model="name" type="text" class="form__field" placeholder="Cocktail Name" />
                    </div>

                    <!-- Descriotion Field -->
                    <textarea  v-model="description" class="form__field description" id="textAreaExample" rows="4" placeholder="Describe Your Masterpiece">
                    </textarea>

                    <button @click="toggle()" :class="[isAlcoholic ? 'toggle-active' : 'toggle-unactive']" class="button-toggle">{{ isAlcoholic ? "Alcoholic" : "Non Alcoholic"}}</button>

                    <!-- Image Field -->
                    <div class="form-outline form-white mt-5 mb-4">
                      <input v-model="coverImageFile" type="text" class="form__field" placeholder="Your Cocktail Image URL" />
                    </div>
                             
                    <!-- Action Button -->
                    <button @click="create($event)" class="left-btn btn btn-outline-light btn-lg px-5 mt-5">Next</button>
                    <button @click="$router.go(-1)" class="right-btn btn btn-outline-light btn-lg px-5 mt-5">Back</button>

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

  import useCocktailStore from "@/stores/Cocktail";
  import useIdentityStore from "@/stores/identity/Identity";
  import { CocktailService } from "@/services/CocktailService";

    @Options({
      components: {},
      props: {

        id: String

      },
      emits: {}
    })

    export default class Workshop extends Vue {

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
     * Cocktail ID For Modification.
     */
    id!: string;

    /**
    * CocktailRelated Name Information.
    */
    name: string = '';

    /**
    * Cocktail Related Description Information.
    */
    description: string = '';

    /**
     * Cocktail Alcoholic Definition.
     */
    isAlcoholic: boolean = false;

    /**
    * Cocktail Related Cover Image Information.
    */
    coverImageFile: string = '';

    /**
    * Indicator Of Error Occured During Backend Access Operation.
    */
    errorFlag: boolean = false;


    /**
    * Handle Security Options. (Really Dummy.)
    */
    async created(): Promise<void> {

      if (!this.identityStore.$state.jwt) this.$router.push("/");

      if (this.identityStore.$state.jwt?.role != "Admin" && this.identityStore.$state.jwt?.role != "Bartender") this.$router.push("/home");

    }


    /**
    * Method Creates Records Of Cocktail In Backend Side.
    * @param {Event} event Defines Event Happenned To Lead To This Action. 
     */
    async create(event: Event) : Promise<void> {

      event.preventDefault();

      // Try To Insert Record In Database.
      var result = await this.cocktailService.add({

        name: {"en-GB": this.name, "ee-ET": "", "ru-RU": ""},
        description: {"en-GB": this.description, "ee-ET": "", "ru-RU": ""},
        isAlcoholic: this.isAlcoholic,
        coverImagePath: this.coverImageFile

      });


      // Check If Operation Succeded.
      if (result.statusCode === 200) {
        this.errorFlag = true;
        return;
      }


      // Return To Drink Types View.
      this.$router.push({ name: 'workshop-ingredient-page', params: { id: result.data!.id! } })
    }

    toggle() {
      this.isAlcoholic = !this.isAlcoholic;
    }
  }
</script>


<style scoped>

    /* Fancy Bartender Video On Background */

    .button-toggle {

      margin-top: 50px;
      border-radius: 20px;
      width: 250px;
      font-size: 30px;
      border: solid 2px black;

    }


    .toggle-active {

      background-color: greenyellow;

    }

    .toggle-unactive {

      background-color: grey;

    }

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

    .left-btn {

      font-size: 40px;
      margin-right: 50px;

    }

    .left-btn:hover {
      
      border: none;
      background-color: greenyellow;

    }

    .right-btn {

      font-size: 40px;
      margin-left: 50px;

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
    color: white;
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