import { defineStore } from "pinia";
import type { ICocktail } from "@/domain/ICocktail";


/**
 * Defines Storage Of Cocktail Data.
 */
const useCocktailStore = defineStore({

    id: "cocktail",  // Store Identifier
    
    state: () => ({
        cocktails: [] as ICocktail[]
    }),

    getters: {},
    actions: {}

});

export default useCocktailStore;