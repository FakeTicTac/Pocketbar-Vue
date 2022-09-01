
<template>

    <!-- Navigation Bar -->
    <NavBar />
    
    <div class="detail-container d-flex justify-content-center">

        <!-- Details -->
        <div class="col-lg-8 border p-3 main-section">

            <div v-for="cocktail in cocktailStore.$state.cocktails" :key="cocktail.id">
                <div class="row detail-section m-0">

                    <!-- Image Of Cocktail -->
                    <div class="col-lg-4 left-side-product-box">
                        <img :src="cocktail.coverImagePath" class="border p-3">
                    </div>

                    <!-- Ingredients And Drinks Of Cocktail -->
                    <div class="col-lg-8">
                        <div class="right-side-pro-detail border p-3 m-0" style="border-color: transparent !important;">
                            <div class="row">

                                <div class="col-lg-12">
                                    <p class="m-0 p-0 cocktail-name text-center" style="color: greenyellow !important;">{{ cocktail.name["en-GB"] }}</p>      
                                </div>

                            <div class="row">
                                <div class="col-lg-12 mt-3 mb-3 text-center">
                                    <p :class="cocktail.isAlcoholic ? 'alcohol-field-care' : 'alcohol-field-fine'" class="m-0 p-0 alcohol-field">{{ cocktail.isAlcoholic ? 'Not For Kids! Cocktail Contains Alcohol.' : 'Event Kids Can Drink It!' }}</p>

                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-lg-6 pt-2 ingredients">
                                    <h5 class="text-center">Ingredients You Need</h5>

                                    <div v-for="ingredient in cocktail.ingredientInCocktails" :key="ingredient.id" class="mt-3 mb-3">
                                        <span class="fs-5"> {{ cocktail.ingredientInCocktails?.indexOf(ingredient) !== undefined ? cocktail.ingredientInCocktails?.indexOf(ingredient) + 1 : "" }})  
                                            {{ ingredient.ingredientName !== undefined ? ingredient.ingredientName["en-GB"] : "" }} - 
                                            {{ ingredient.amount }} 
                                            {{ ingredient.amountUnitName !== undefined ? ingredient.amountUnitName["en-GB"] : "" }} 
                                        </span>
                                    </div>

                                </div>
                                <div class="col-lg-6 pt-2 ingredients">
                                    <h5 class="text-center">Drinks You Need</h5>

                                    <div v-for="drink in cocktail.drinksInCocktails" :key="drink.id" class="mt-3 mb-3">
                                        <span class="fs-5"> {{ cocktail.drinksInCocktails?.indexOf(drink) !== undefined ? cocktail.drinksInCocktails?.indexOf(drink) + 1 : "" }})  
                                            {{ drink.drinkName !== undefined ? drink.drinkName["en-GB"] : "" }} - 
                                            {{ drink.amount }} 
                                            {{ drink.amountUnitName !== undefined ? drink.amountUnitName["en-GB"] : "" }} 
                                        </span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                <div class="row mb-5">
                    <div class="col-lg-12 pt-2">
                        <h5 class="mt-5 text-center fs-4 mb-5" style="color: greenyellow;">Steps You Need To Do For Cocktail Preparation</h5>

                        <div v-for="step in cocktail.steps?.sort((a, b) => a.indexNumber - b.indexNumber)" :key="step.id" style="margin-left: 25%; margin-top: 10px;">
                            <span class="fs-5"> {{ step.indexNumber }}) - {{ step.description["en-GB"] }} </span>
                        </div>
    
                    </div>
                </div>

                <div class="row">
                    <div class="col-lg-12 mt-3">
                        <div class="row">
                            <div  class="d-flex justify-content-center col-lg-12 pb-2">
                                <RouterLink :to="{ name: 'favourite-add-page', params: { id: cocktail.id } }" href="" class="btn btn-danger button-details w-50">Add To Favourites</RouterLink>
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

    // Identity Related Information. (Security Checks and etc.)
    import useIdentityStore from "@/stores/identity/Identity";

    // Data Stores + Services
    import NavBar from "@/components/NavBar.vue";
    import useCocktailStore from "@/stores/Cocktail";
    import { CocktailService } from "@/services/CocktailService";


    @Options({
      components: { NavBar },
      props: { 

          id: String  // Defines ID of Cocktail To Load Details.

        },
      emits: {}
    })


    export default class CocktailDetails extends Vue {

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
        * Cocktail Related ID Information.
        */
        id!: string;

        /**
        * Indicator Of Error Occured During Backend Access Operation For Loading Cocktail.
        */
        loadErrorFlag: boolean = false;

        /**
        * Indicator Of Error Occured During Backend Access Operation For Addition Into Favourite Cocktails.
        */
        addErrorFlag: boolean = false;

        /**
        * Indicator Of Error Occured During Backend Access Operation For Deletion From Cocktails.
        */
        deleteErrorFlag: boolean = false;

        /**
        * Handle Security Options. (Really Dummy.)
        */
        created(): void {

            // Check If User Not Logged In.
            if (!this.identityStore.$state.jwt) this.$router.push("/");

            this.cocktailStore.$state.cocktails = [];
        }

        /**
        * Load Data For Cocktail Details Representation.
        */
        async mounted(): Promise<void> {

            // Load Cocktail From Database.
            var responce = await this.cocktailService.get(this.id);

            if (responce.statusCode !== 200) this.loadErrorFlag = true;

            this.cocktailStore.$state.cocktails = [responce.data!];
        
        }

        /**
        * Delete Data Of Cocktail From Backend.
        */
        async delete(): Promise<void> {

        }
    }
</script>


<style scoped>

    .detail-container {

        background-image: url(@/assets/photos/cocktail-details.jpg);
        background-size: cover;
        background-repeat: no-repeat;
        min-height: calc(100vh - 61px);
        
    }

    .button-modify {

        font-size: 30px;
        border-color: rgb(255, 174, 0) !important;
        background-color: black !important;

    }

    .button-modify:hover {

        font-size: 30px;
        border-color: transparent;
        background-color: rgb(255, 174, 0) !important;

    }

    .main-section {

        position: absolute;
        left: 50%;
        right: 50%;
        top: 250px;
        transform: translate(-50%);
        border-radius: 25px;
        background-color: rgba(0, 0, 0, 0.699);
        color: white;

    }

    .button-details {

        font-size: 30px;
        border-color: rgb(0, 204, 255) !important;
        background-color: black !important;

    }

    .button-details:hover {

        font-size: 30px;
        border-color: transparent;
        background-color: rgb(0, 204, 255) !important;

    }

    .detail-section {

        padding-top: 50px;

    }

    .left-side-product-box img {

        width: 100%;
        border-color: transparent !important;

    }

    .left-side-product-box .sub-img img {

        margin-top: 5px;
        width: 83px;
        height: 100px;
        
    }

    .cocktail-name {

        font-size: 40px !important;
        color: white !important;
        font-weight: bold;

    }

    .alcohol-field-fine {

        color: greenyellow !important;

    }

    .alcohol-field-care {

        color: red !important;

    }

    .right-side-pro-detail span {

        font-size: 15px;
        
    }

    .ingredients {

        background-color: white; 
        color: black;
        border-radius: 20px;
        border: solid 20px black; 

    }

    .right-side-pro-detail p {
        font-size: 25px;
        color: #a1a1a1;
        
    }

    .right-side-pro-detail .price-pro {
        color: #E45641;
    }

    .right-side-pro-detail .tag-section {
        font-size: 18px;
        color: #5D4C46;
    }

    .pro-box-section .pro-box img {
        width: 100%;
        height: 200px;
    }

    @media (min-width:360px) and (max-width:640px) {
        .pro-box-section .pro-box img {
            height: auto;
        }
    }
</style>