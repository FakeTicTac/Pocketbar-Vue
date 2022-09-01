
<template>
  <div class="d-flex side-bar  flex-column flex-shrink-0 p-3 text-white bg-dark">
        <span class="fs-3 text-center section-title">Control Panel</span>
    <hr>

    <ul class="nav nav-pills mt-5 flex-column mb-auto">
      <li class="nav-item">

        <!-- Control Panel Home Page -->
        <router-link to="/admin" :class="{'active' : $route.path === '/admin'}" class="nav-link text-white">Control Panel Home</router-link>
  
        <!-- Control Panel Home Page -->
        <router-link to="/home" class="nav-link mt-1 text-white">Website Home</router-link>

      </li>


      <!-- Control Panel Data Management Pages -->
      <hr class="mt-5">
        <span class="fs-5 text-center section-title">Data Management</span>
      <hr>


      <li class="mt-2">

        <!-- Control Panel Drink Management System Page -->
        <router-link to="/drinks" :class="{'active' : $route.path === '/drinks'}" class="nav-link text-white">Drinks</router-link>

      </li>
      <li>

        <!-- Control Panel Drink Type Management System Page -->
        <router-link to="/drink-types" :class="{'active' : $route.path === '/drink-types'}" class="nav-link mt-1 text-white">Drink Types</router-link>

      </li>
      <li>

        <!-- Control Panel Ingredient Management System Page -->
        <router-link to="/ingredients" :class="{'active' : $route.path === '/ingredients'}" class="nav-link mt-1 text-white">Ingredients</router-link>

      </li>
      <li>

        <!-- Control Panel Amount Unit Management System Page -->
        <router-link to="/amount-units" :class="{'active' : $route.path === '/amount-units'}" class="nav-link mt-1 text-white">Amount Units</router-link>

      </li>
      <li>

        <!-- Control Panel Rating Management System Page -->
        <router-link to="/ratings" :class="{'active' : $route.path === '/ratings'}" class="nav-link mt-1 text-white">Ratings</router-link>

      </li>
    </ul>
    <hr>
    
        <!-- Control Panel Rating Management System Page -->
        <a class="nav-link logout text-center fs-4 text-white" @click="logOut($event)" href="">Logout</a>
    
  </div>
</template>


<script lang="ts">
  import { Options, Vue } from "vue-class-component";

  import useIdentityStore from "@/stores/identity/Identity";


    @Options({
      components: {},
      props: {},
      emits: {}
    })


    export default class AdminNavBar extends Vue {

     /**
      * Identity Related Data Storage Connection Definition.
      */
      identityStore = useIdentityStore();

      /**
       * Method Logs User Out Of System.
       * @param {Event} event Defines Event.
       */
      logOut(event: Event): void {

          event.preventDefault();
          this.identityStore.$state.jwt = null;
          this.$router.push("/");

      }
    }
</script>


<style scoped>

    .side-bar {

        width: 300px; 
        height: 100vh;
        background-color: #151515 !important ;
        overflow: auto;
        position: fixed;
    }

    .section-title {
        
        font-weight: bold;

    }

    .active {

      background-color: white !important ;
        color: black !important ;

    }

    .nav-link:hover {
        background-color: rgba(142, 243, 83, 0.774)
    }

    .logout:hover {
        background-color: white;
        color: black !important ;
    }

</style>