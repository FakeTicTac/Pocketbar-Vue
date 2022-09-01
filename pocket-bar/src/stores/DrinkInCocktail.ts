import { defineStore } from "pinia";
import type { IDrinkInCocktail } from "@/domain/IDrinkInCocktail";


/**
 * Defines Storage Of Drink In Cocktail Data.
 */
const useDrinkInCocktailStore = defineStore({

    id: "drinkInCocktails",  // Store Identifier
    
    state: () => ({
        drinkInCocktails: [] as IDrinkInCocktail[]
    }),

    getters: {},
    actions: {}

});

export default useDrinkInCocktailStore;