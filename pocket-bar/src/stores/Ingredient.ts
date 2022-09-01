import { defineStore } from "pinia";
import type { IIngredient } from "@/domain/IIngredient";


/**
 * Defines Storage Of Ingredient Data.
 */
const useIngredientStore = defineStore({

    id: "ingredient",  // Store Identifier
    
    state: () => ({
        ingredients: [] as IIngredient[]
    }),

    getters: {},
    actions: {}

});

export default useIngredientStore;