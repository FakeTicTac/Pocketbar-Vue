import { defineStore } from "pinia";
import type { IAmountUnit } from "@/domain/IAmountUnit";


/**
 * Defines Storage Of Amount Unit Data.
 */
const useAmountUnitStore = defineStore({

    id: "amountUnit",  // Store Identifier
    
    state: () => ({
        amountUnits: [] as IAmountUnit[]
    }),

    getters: {},
    actions: {}

});

export default useAmountUnitStore;