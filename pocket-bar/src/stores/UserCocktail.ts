import { defineStore } from "pinia";
import type { IUserCocktail } from "@/domain/IUserCocktail";


/**
 * Defines Storage Of User Cocktail Data.
 */
const useUserCocktailStore = defineStore({

    id: "userCocktail",  // Store Identifier
    
    state: () => ({
        userCoctails: [] as IUserCocktail[]
    }),

    getters: {},
    actions: {}

});

export default useUserCocktailStore;