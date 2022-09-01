
<template>
    <nav class=" d-flex justify-content-center navbar navbar-dark bg-dark">

        <router-link to="/home" class="navbar-brand mb-0 h1">Home</router-link>
        <span> | </span>
        <router-link to="/cocktails" class="navbar-brand mb-0 h1">Explore Cocktails</router-link>
        <span> | </span>
        <router-link to="/favourites" class="navbar-brand mb-0 h1">My Favourites</router-link>

        <a href="" @click="logOut($event)" class="navbar-brand logout mb-0 h1" style="position:absolute; right: 30px" >Logout</a>
    </nav>
</template>


<script lang="ts">

  import { Options, Vue } from "vue-class-component";
  import useIdentityStore from "@/stores/identity/Identity";

    @Options({
      components: {},
      props: {},
      emits: {}
    })

    export default class NavBar extends Vue {

      /**
      * Identity Related Data Storage Connection Definition.
      */
      identityStore = useIdentityStore();


      /**
       * Handle Security Options. (Really Dummy.)
       */
      created(): void {
        if (!this.identityStore.$state.jwt) this.$router.push("/");
      }


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

    .navbar-brand {

        margin: 0;

    }

    .navbar-brand:hover {

        color: greenyellow !important;

    }

    .h1 {

        font-size: 25px;

    }

    .logout:hover {

        color: red !important;

    }

    span {

        color: white;
        font-size: 30px;
        margin-left: 20px;
        margin-right: 20px;

    }

</style>