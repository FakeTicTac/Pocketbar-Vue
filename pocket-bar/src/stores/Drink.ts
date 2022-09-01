import { defineStore } from "pinia";
import type { IDrink } from "@/domain/IDrink";


/**
 * Defines Storage Of Drink Data.
 */
const useDrinkStore = defineStore({

    id: "drink",  // Store Identifier
    
    state: () => ({
        drinks: [] as IDrink[]
    }),

    getters: {},
    actions: {}

});

export default useDrinkStore;