import { defineStore } from "pinia";
import type { IStep } from "@/domain/IStep";


/**
 * Defines Storage Of Step Data.
 */
const useStepStore = defineStore({

    id: "step",  // Store Identifier
    
    state: () => ({
        steps: [] as IStep[]
    }),

    getters: {},
    actions: {}

});

export default useStepStore;