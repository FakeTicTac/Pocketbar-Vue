import { defineStore } from "pinia";
import type { IJWTResponse } from "@/domain/Identity/IJwtResponse";


/**
 * Defines Storage Of User Data - JWT Token For Authorization.
 */
const useIdentityStore = defineStore({

    id: "identity",  // Store Identifier
    
    state: () => ({
        jwt: null as IJWTResponse | null,
    }),

    getters: {},
    actions: {}

});

export default useIdentityStore;