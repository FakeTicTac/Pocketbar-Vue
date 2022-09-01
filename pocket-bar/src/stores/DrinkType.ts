import { defineStore } from "pinia";
import type { IDrinkType } from "@/domain/IDrinkType";


/**
 * Defines Storage Of Drink Type Data.
 */
const useDrinkTypeStore = defineStore({

    id: "drinkType",  // Store Identifier
    
    state: () => ({
        drinkTypes: [] as IDrinkType[]
    }),

    getters: {},
    actions: {}

});

export default useDrinkTypeStore;