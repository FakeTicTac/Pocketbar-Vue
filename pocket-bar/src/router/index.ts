import { createRouter, createWebHistory } from 'vue-router'

import Home from "@/views/home/Home.vue"
import Login from "@/views/identity/Login.vue";
import Landing from "@/views/landing/Landing.vue";
import Register from "@/views/identity/Register.vue";
import Workshop from '@/views/workshop/Workshop.vue';
import Drinks from '@/views/admin/drinks/Drinks.vue';
import AdminPanel from "@/views/admin/AdminPanel.vue";
import Ratings from '@/views/admin/ratings/Ratings.vue';
import DrinksAdd from '@/views/admin/drinks/DrinksAdd.vue';
import WorkshopStep from '@/views/workshop/WorkshopStep.vue';
import RatingsAdd from '@/views/admin/ratings/RatingsAdd.vue';
import WorkshopDrink from '@/views/workshop/WorkshopDrink.vue';
import DrinkTypes from '@/views/admin/drink-type/DrinkTypes.vue';
import CocktailsIndex from '@/views/cocktails/CocktailsIndex.vue';
import CocktailDetails from '@/views/cocktails/CocktailDetails.vue';
import Ingredients from '@/views/admin/ingredients/Ingredients.vue';
import AmountUnits from '@/views/admin/amount-units/AmountUnits.vue';
import DrinkTypesAdd from '@/views/admin/drink-type/DrinkTypesAdd.vue';
import WorkshopIngredient from '@/views/workshop/WorkshopIngredient.vue';
import FavouriteCocktails from '@/views/cocktails/FavouriteCocktails.vue';
import IngredientsAdd from '@/views/admin/ingredients/IngredientsAdd.vue';
import AmountUnitsAdd from '@/views/admin/amount-units/AmountUnitsAdd.vue';
import FavouriteCocktailAdd from '@/views/cocktails/FavouriteCocktailAdd.vue';


/**
 * Manage Routing In Web Application. (Path And Corresponding View Relation.)
 */
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),

    // Actual Routing Stuff.
    routes: [


        // Landing Page 
        { 
            path: "/",
            name: "landing-page",
            component: Landing,
        },     
        


        // Account Related
        {
            path: "/login",
            name: "login-page",
            component: Login,
        },
        {
            path: "/register",
            name: "register-page",
            component: Register,
        },



        // Home Page
        {
            path: "/home",
            name: "home-page",
            component: Home
        },


        
        // Cocktails Related
        {
            path: "/cocktails",
            name: "cocktails-page",
            component: CocktailsIndex
        },
        {
            path: "/cocktail/:id",
            name: "cocktail-details-page",
            component: CocktailDetails,
            props: true
        },
        {
            path: "/favourites",
            name: "favourite-page",
            component: FavouriteCocktails
        },
        {
            path: "/favourite/:id",
            name: "favourite-add-page",
            component: FavouriteCocktailAdd,
            props: true
        },
        


        // Admin Related
        {
            path: "/admin",
            name: "admin-page",
            component: AdminPanel
        },



        // Ratings Related
        {
            path: "/ratings",
            name: "ratings-page",
            component: Ratings
        },
        {
            path: "/ratings-add",
            name: "ratings-add-page",
            component: RatingsAdd
        },
        {
            path: "/ratings-add/:id",
            name: "ratings-edit-page",
            component: RatingsAdd,
            props: true
        },



        // Drink Related
        {
            path: "/drinks",
            name: "drinks-page",
            component: Drinks
        },
        {
            path: "/drinks-add",
            name: "drinks-add-page",
            component: DrinksAdd
        },
        {
            path: "/drinks-add/:id",
            name: "drinks-edit-page",
            component: DrinksAdd,
            props: true
        },

        

        // Drink Type Related
        {
            path: "/drink-types",
            name: "drink-types-page",
            component: DrinkTypes
        },
        {
            path: "/drink-type-add",
            name: "drink-type-add-page",
            component: DrinkTypesAdd
        },
        {
            path: "/drink-types-add/:id",
            name: "drink-types-edit-page",
            component: DrinkTypesAdd,
            props: true
        },



        // Ingredient Related
        {
            path: "/ingredients",
            name: "ingredients-page",
            component: Ingredients
        },
        {
            path: "/ingredients-add",
            name: "ingredients-add-page",
            component: IngredientsAdd
        },
        {
            path: "/ingredients-add/:id",
            name: "ingredients-edit-page",
            component: IngredientsAdd,
            props: true
        },



        // Amount Unit Related
        {
            path: "/amount-units",
            name: "amount-units-page",
            component: AmountUnits
        },
        {
            path: "/amount-units-add",
            name: "amount-units-add-page",
            component: AmountUnitsAdd
        },
        {
            path: "/amount-units-add/:id",
            name: "amount-units-edit-page",
            component: AmountUnitsAdd,
            props: true
        },



        // Bartender Related
        {
            path: "/workshop",
            name: "workshop-page",
            component: Workshop
        },
        {
            path: "/workshop/:id",
            name: "workshop-edit-page",
            component: Workshop,
            props: true
        },
        {
            path: "/workshop-ingredient/:id",
            name: "workshop-ingredient-page",
            component: WorkshopIngredient,
            props: true
        },
        {
            path: "/workshop-drink/:id",
            name: "workshop-drink-page",
            component: WorkshopDrink,
            props: true
        },
        {
            path: "/workshop-step/:id",
            name: "workshop-step-page",
            component: WorkshopStep,
            props: true
        }
    ]
 
});


export default router;