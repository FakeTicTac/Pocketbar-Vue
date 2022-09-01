
<template>
  <div class="d-flex">

     <!-- Navigation -->
     <AdminNavBar />

     <!-- Intro View -->
      <section class="d-flex d-flex justify-content-center align-items-center text-white intro-section">
          <div>

              <h1 class="text-section display-4">Hello, {{ identityStore.$state.jwt?.username }}, It's A Great Day For Work!</h1>
              <div class="d-flex d-flex justify-content-center align-items-center">
                <div class="digital-clock d-flex justify-content-center align-items-center">{{ clock }}</div>
              </div>
          </div>
      </section>

  </div>

</template>


<script lang="ts">
  import { Options, Vue } from "vue-class-component";

  import useIdentityStore from "@/stores/identity/Identity";
  import AdminNavBar from "@/components/AdminNavBar.vue";

    @Options({
      components: { AdminNavBar },
      props: {},
      emits: {}
    })


    export default class AdminPanel extends Vue {

     /**
      * Identity Related Data Storage Connection Definition.
      */
      identityStore = useIdentityStore();

      /**
       * Defines Clock Value.
       */
      clock: string = "00:00:00";


      /**
       * Handle Security Options. (Really Dummy.)
       */
      created(): void {

        if (!this.identityStore.$state.jwt) this.$router.push("/");

        if (this.identityStore.$state.jwt?.role != "Admin") this.$router.push("/home");

      }

      /**
       * Handle Clock Addition In Life Cycle.
       */
      mounted(): void {

        this.clockUpdate();

      }

      /**
       * Create Timer For Intro Section.
       */
      clockUpdate() {
        
        const today = new Date();
      
        let hours = today.getHours().toString();
        let minutes = this.checkTime(today.getMinutes());
        let seconds = this.checkTime(today.getSeconds());

        this.clock = `${hours}:${minutes}:${seconds}`;

        setTimeout(this.clockUpdate, 1000);

    }

      /**
       * Methods Handles One Number Values. Adds 0 At The Beginning.
       * @param {number} time Defines Number To Check Its' Length.
       * @returns {string} Number With Zero At Beginning.
       */
      checkTime(time: number) : string {
        
        return time < 10 ? "0" + time.toString() : time.toString();

      }
  }
</script>


<style scoped>



  .intro-section {

    width: 100%;
    height: 100vh;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url(@/assets/photos/admin-panel-background.jpg);

  }

  .text-section {

    background-color: white; 
    border-radius: 20px;
    padding: 30px;
    color:black;

  }

  .digital-clock {
    width: 300px;
    height: 100px;
    color: black;
    border: 2px solid black;
    border-radius: 4px;
    text-align: center;
    font: 50px/60px 'DIGITAL', Helvetica;
    background: white;
}

</style>