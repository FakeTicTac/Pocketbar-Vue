
<template>

  <!-- Navigation Bar -->
  <NavBar />

  <div class="d-flex">



    <!-- Ingredients Section -->
    <section class="gallery container-fluid">
      <div class="header-section">
        
        <!-- Search Bar -->
        <AdminSearchBar @searchInvoked="search" />
        <div class="d-flex justify-content-center">
          <button @click="nextStep()" class="btn button-next btn-lg px-5 mt-5">Next</button>
        </div>

      </div>


      <!-- Wrong Response From Backend -->
      <div v-if="errorLoad" class="alert alert-danger text-center mb-5">Resource Loading Went Wrong. Please Try Again!</div>

      <h1 class="text-center mt-5 mb-4" style="color: white;">Select Ingredients And Their Amounts For Cocktail!</h1>

      <!-- Ingredients Cards -->
      <div class="row card-row">
        <div v-for="ingredient in showIngredients" v-bind:key="ingredient.id" class="card-data col-lg-3 mb-4">

          <div :class="ingredient.isSelected ? 'bordrening' : 'card-unactive'" class="card h-100">
             <img v-if="ingredient.coverImagePath" class="card-img-top" :src="ingredient.coverImagePath" alt="Card image cap" @click="choose(ingredient)">
             <img v-else class="card-img-top" src="@/assets/icons/no-image.png" alt="Card image cap" @click="choose(ingredient)">
            <div class="card-body">

              <!-- Ingredient Data -->
              <h5 class="card-title fs-4 text-center">{{ ingredient.name["en-GB"] }}</h5>
              <hr class="hr-top" />
              <p class="card-text">{{ ingredient.description !== undefined ? ingredient.description["en-GB"] : "Drink Type Doesn't Have Description." }}</p>

              <div v-if="ingredient.isSelected">

                  <div class="mb-4">
                    <input :id="`${ingredient.id}amount`" @input="inputBinder(ingredient, $event)" type="number" class="form__field" placeholder="Ingredient Amount" />
                  </div>
                                      <!-- Drink Type Field -->
                  <select @input="selectBinder(ingredient, $event)" class="form-select mt-4">
                    <option value="" disabled selected>Chose Amount Unit</option>
                    <option v-for="amountUnit in amountUnitStore.$state.amountUnits" :key="amountUnit.id" v-bind:value="amountUnit.id" >{{ amountUnit.name["en-GB"] }}</option>
                  </select>
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
  import AdminSearchBar from "@/components/AdminSearchBar.vue";

  import useCocktailStore from "@/stores/Cocktail";
  import useIngredientStore from "@/stores/Ingredient";
  import useAmountUnitStore from "@/stores/AmountUnit";
  import useIdentityStore from "@/stores/identity/Identity";

  import { CocktailService } from "@/services/CocktailService";
  import { AmountUnitService } from "@/services/AmountUnitService";
  import { IngredientService } from "@/services/IngredientService";
  import { IngredientInCocktailService } from "@/services/IngredientInCocktailService";

  import type { IIngredient } from "@/domain/IIngredient";
  import type { IIngredientInCocktail } from "@/domain/IIngredientInCocktail";


    @Options({
      components: { NavBar, AdminSearchBar },
      props: {

        id: String

      },
      emits: {},
    })


    export default class WorkshopIngredient extends Vue {


      /**
      * Identity Related Data Storage Connection Definition.
      */
      identityStore = useIdentityStore();

      /**
      * Ingredient Related Data Storage Connection Definition.
      */
      ingredientStore = useIngredientStore();

      /**
      * Ingredient Related Data Storage Connection Definition.
      */
      cocktailStore = useCocktailStore();
      
      /**
      * Ingredient Related Data Storage Connection Definition.
      */
      amountUnitStore = useAmountUnitStore();



      /**
      * Ingredient Related Service Connection Definition.
      */
      amountUnitService = new AmountUnitService();

      /**
      * Ingredient Related Service Connection Definition.
      */
      cocktailService = new CocktailService();

      /**
      * Ingredient Related Service Connection Definition.
      */
      ingredientService = new IngredientService();

      /**
      * Ingredient Related Service Connection Definition.
      */
      ingredientInCocktailService = new IngredientInCocktailService();



      /**
       * Defines ID Of Cocktail.
       */
      id!: string;

      /**
       * Defines Ingredient Storage To Be Shown.
       */
      showIngredients: IIngredient[] = [];

      /**
       * Defines Storage For Chosen Ingredients In Cocktails.
       */
      ChosenIngredients: IIngredientInCocktail[] = [];

      /**
       * Indicator of Loading Erorr.
       */
      errorLoad: boolean = false;

      /**
       * Indicator of Fill Erorr.
       */
      errorFill: boolean = false;

      /**
       * Defines Searched Name By User.
       */
      searchName: string = "";



      /**
       * Handle Security Options. (Really Dummy.)
       */
      created(): void {

        if (!this.identityStore.$state.jwt) this.$router.push("/");

        if (this.identityStore.$state.jwt?.role !== "Bartender" && this.identityStore.$state.jwt?.role !== "Admin") this.$router.push("/home");

      }

      /**
      * Need To Load Data From Backend.
      */
      async mounted(): Promise<void> {

        // Load To Storage  
        let ingredientResult = await this.ingredientService.getAll();
        let amountUnitResult = await this.amountUnitService.getAll();
        let cocktailResult = await this.cocktailService.get(this.id);

        // Check if Data Loaded.
        if (ingredientResult.statusCode !== 200 ||
            amountUnitResult.statusCode !== 200 ||
            cocktailResult.statusCode !== 200) {
          
          this.errorLoad = true;
          return;

        }

        this.ingredientStore.$state.ingredients = ingredientResult.data!;

        this.amountUnitStore.$state.amountUnits = amountUnitResult.data!;

        this.cocktailStore.$state.cocktails = [cocktailResult.data!]

        this.ChosenIngredients = this.cocktailStore.$state.cocktails[0].ingredientInCocktails!


        // Show Already Chosen Ones.
        this.ChosenIngredients.forEach(x => {

          let chosenIngredient = this.ingredientStore.$state.ingredients.find(y => y.id === x.ingredientId);

          chosenIngredient!.isSelected = true;

        })

        // Define To Show Storage.
        this.showIngredients = this.ingredientStore.$state.ingredients;

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
        
          this.showIngredients = this.ingredientStore.$state.ingredients
          return;
        } 

        this.showIngredients = this.ingredientStore.$state.ingredients.filter(x => x.name["en-GB"].toUpperCase().includes(searchName.toUpperCase()))

      }

      /**
       * Method Binds Data To Ingredient In Cocktail Object.
       * @param {IIngredient} ingredient Defines Ingredient To Be Binded
       * @param {Event} event Defines Event Invoked. 
       */
      inputBinder(ingredient: IIngredient, event: Event) {

          let ingredientInCocktail = this.ChosenIngredients.find(x => x.ingredientId == ingredient.id)!;
          ingredientInCocktail.amount = Number.parseInt((event.target as HTMLInputElement).value);

      }

      /**
       * Method Binds Data To Ingredient In Cocktail Object.
       * @param {IIngredient} ingredient Defines Ingredient To Be Binded
       * @param {Event} event Defines Event Invoked. 
       */
      selectBinder(ingredient: IIngredient, event: Event) {

        let ingredientInCocktail = this.ChosenIngredients.find(x => x.ingredientId == ingredient.id)!;
        ingredientInCocktail.amountUnitId = (event.target as HTMLInputElement).value;

      }

      /**
       * Method Chooses Ingredient To Be Added Into Cocktail Receipe.
       * @param {IIngredient} ingredient Defines Ingredient To Be Added.
       */
      choose(ingredient: IIngredient){

        ingredient.isSelected = !ingredient.isSelected;

        if (ingredient.isSelected) {

          this.ChosenIngredients.push({

            amount: 0,
            ingredientId: ingredient.id!,
            amountUnitId: "",
            cocktailId: this.id

        })

        } else {

          let ingredientInCocktail = this.ChosenIngredients.indexOf(this.ChosenIngredients.find(x => x.ingredientId == ingredient.id)!);
          this.ChosenIngredients.splice(ingredientInCocktail, 1);

        }
      }

      /**
       * Method Saves/Removes/Updates Data And Invokes Next View.
       */
      async nextStep() {

        let error = false;

        this.ChosenIngredients.forEach(x => {

            if (x.amountUnitId == "") error = true;

        });

        if(!error) {

          this.ChosenIngredients.forEach(x => {

            this.ingredientInCocktailService.add(x);

          });

        
          this.$router.push({ name: 'workshop-drink-page', params: { id: this.id } })

        }
      }
    }
</script>


<style scoped>

  .form__field {

    font-family: inherit;
    width: 100%;
    border: 0;
    border-bottom: 2px solid gray;
    outline: 0;
    font-size: 1rem;
    color: black;
    padding: 7px 0;
    background: transparent;
    transition: border-color 0.2s;
    height: 50px;

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
    color: black;  
    font-weight: 700;
    border-width: 3px;
    border-image: linear-gradient(to right, greenyellow, rgb(98, 160, 5));
    border-image-slice: 1;
  }

  .form__field:focus::-webkit-input-placeholder {

    color: transparent;

  }

  .header-section {

    padding-top: 50px;
    padding-bottom: 50px;
    background-image: url(@/assets/photos/drink-type-creation-background.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position-y: 20%;

  }

  .button-next {

    font-size: 30px;
    border-color: greenyellow !important;
    background-color: white !important;
    margin-right: 20px;
    width: 250px;

  }

  .button-next:hover {

    font-size: 30px;
    border-color: transparent;
    background-color: greenyellow !important;

  }

  .button-back {

    font-size: 30px;
    border-color: black !important;
    background-color: white !important;
    margin-left: 20px;
    width: 250px;

  }

  .button-back:hover {

    font-size: 30px;
    border-color: transparent;
    background-color: black !important;
    color: white;

  }

  .bordrening {

    border: solid 20px greenyellow;

  }

  .card-img-top {

    height: 250px;

  }

  .gallery {

    width: 100%; 
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

  .card-unactive:hover {

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