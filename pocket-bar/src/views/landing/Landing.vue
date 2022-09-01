
<template>

    <!-- Fancy Bartender Video On Background -->
    <div class="intro bg-image vh-100 shadow-1-strong">
        <video playsinline autoplay muted loop>
          <source class="h-100" src="@/assets/videos/landing-bar.mp4" type="video/mp4" />
        </video>
    </div>

    <!-- Logo, Introduction Text And Action Buttons -->
    <div class="wrapper">
        <h1 class="mb-3 text-center">Pocket Bar</h1>
        <div class="container d-flex align-items-center justify-content-center text-center h-100">
            <div class="text-white">
                <h5 class="mb-4">Choose From 130,000 Cockatails With New Additions</h5>
                <h5 class="mb-4 text-bottom">Published Every Month</h5>

                <router-link to="/login" class="btn btn-outline-light btn-action btn-lg m-2">Sign In</router-link>
                <router-link to="/register" class="btn btn-outline-light btn-action btn-lg m-2">Register</router-link>

            </div>
        </div>
    </div>
</template>


<script lang="ts">
  import { Options, Vue } from "vue-class-component";

    @Options({
      components: {},
      props: {},
      emits: {}
    })

    export default class Landing extends Vue {
        
    }
</script>


<style scoped>

    /* Fancy Bartender Video On Background */

    video {
        min-width: 100%;
        min-height: 100%;
    }

    .intro {
        height: 100vh;
        overflow: hidden;
    }

    /* Logo, Introduction Text And Action Buttons */
    h1 {
        top: 0;
        font-size: 60px;
        font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    }

    h5 {
       font-size: 30px;
    }

    .wrapper {
        position: fixed;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        color: #f1f1f1;
        height: 100vh;
        width: 100%;
        padding: 20px;
    }

    .btn-action {
        font-size:30px;
        border-radius: 20px;
        padding: 20px;
        width: 180px;
    }

    .text-bottom {
        padding-bottom: 150px;
    }
    
</style>