import { defineStore } from "pinia";
import type { IIngredientInCocktail } from "@/domain/IIngredientInCocktail";


/**
 * Defines Storage Of Ingredient In Cocktail Data.
 */
const useIngredientInCocktailStore = defineStore({

    id: "ingredientInCocktail",  // Store Identifier
    
    state: () => ({
        ingredientInCocktails: [] as IIngredientInCocktail[]
    }),

    getters: {},
    actions: {}

});

export default useIngredientInCocktailStore;