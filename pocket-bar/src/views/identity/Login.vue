
<template>

  <section class="vh-100 wrapper">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card bg-dark text-white data-box">
            <div class="card-body p-5 text-center">
              <div class="mb-md-5 mt-md-4 pb-5">

                <!-- Action -->
                <h2 class="fw-bold mb-2 text-uppercase">Login</h2>

                <!-- Action Description -->
                <p class="text-white mt-5 mb-5">Please Enter Your Login and Password!</p>

                <!-- Wrong Input Response From Backend -->
                <div v-if="errorFlag" class="alert alert-danger text-center mb-5">Wrong Email or Password. Try Again!</div>

                <!-- Email Field -->
                <div class="form-outline form-white mb-4">
                  <input v-model="email" type="email" id="typeEmailX" class="form-control form-control-lg" placeholder="Email" />
                </div>

                <!-- Password Field -->
                <div class="form-outline form-white mb-4">
                  <input v-model="password" type="password" id="typePasswordX" class="form-control form-control-lg" placeholder="Password" />
                </div>
              
                <!-- Login Button -->
                <button @click="logInClicked()" class="btn btn-outline-light btn-lg px-5 mt-5">Login</button>
                
            </div>

            <div>

                <!-- Create New Account Button -->
                <p class="mb-0">Don't Have an Account? 
                    <router-link to="/register" class="fw-bold p-1">Sign Up</router-link>
                </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

</template>


<script lang="ts">
  import { Options, Vue } from "vue-class-component";

  import useIdentityStore from "@/stores/identity/Identity";
  import { IdentityService } from "@/services/Identity/IdentityService";


    @Options({
      components: {},
      props: {},
      emits: {}
    })

    export default class Login extends Vue {

      /**
       * Identity Related Data Storage Connection Definition.
       */
      identityStore = useIdentityStore();

      /**
       * Identity Related Service Connection Definition.
       */
      identityService = new IdentityService


      /**
       * Identity Login Related Email Information.
       */
      email: string = '';

      /**
       * Identity Login Related Password Information.
       */
      password: string = '';

      /**
       * Indicator Of Error Occured During Log In Operation.
       */
      errorFlag: boolean = false;


      /**
       * Method Tries To Login User Into System With Given Data.
       */
      async logInClicked(): Promise<void> {
        
        var result = await this.identityService.login({
          email: this.email,
          password: this.password
        })

        // Check If Operation Succeded.
        if (!result.data) {
            this.errorFlag = true;
            return;
        }

        this.identityStore.$state.jwt = result.data!;
        this.$router.push("/home");
      }
    }
</script>


<style scoped>

  .wrapper {

    background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(@/assets/photos/login-background.jpg);
    background-size: cover;
    background-blend-mode: darken;

  }

  .data-box {

    border-radius: 1rem;
    border-color: white;

  }

</style>
