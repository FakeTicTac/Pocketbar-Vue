import { defineStore } from "pinia";
import type { IRating } from "@/domain/IRating";


/**
 * Defines Storage Of Rating Data.
 */
const useRatingStore = defineStore({

    id: "rating",  // Store Identifier
    
    state: () => ({
        ratings: [] as IRating[]
    }),

    getters: {},
    actions: {}

});

export default useRatingStore;