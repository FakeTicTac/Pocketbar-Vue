
<template>

  <!-- Navigation Bar -->
  <NavBar />

  <div class="d-flex justify-content-center step-button bg-dark pb-5">
    <button @click="nextStep()" class="btn button-next btn-lg px-5 mt-5">Next</button>
  </div>

  <section class="d-flex justify-content-center align-items-center step-wrapper">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100 ">
        <div class="col col-xl-10">

          <div class="card bg-dark text-white">
            <div class="card-body p-5">

              <div class="d-flex justify-content-center align-items-center mb-4">
                <div class="form-outline flex-fill">
                    <textarea  v-model="description" class="form__field description" id="textAreaExample" rows="4" placeholder="Describe Steps Of Your Masterpiece">
                    </textarea>
                </div>
                <button @click="addStep()" class="btn button-next btn-info ms-2" style="width: 100px; font-size: 20px">Add</button>
              </div>

              <div class="tab-content" id="ex1-content">
                <div class="tab-pane fade show active" id="ex1-tabs-1" role="tabpanel" aria-labelledby="ex1-tab-1">

                  <ul v-for="step in stepStore.$state.steps" :key="step.id" class="list-group mb-0">
                    <li class="list-group-item d-flex align-items-center border-0 fs-5 mt-4 mb-0 rounded" style="background-color: transparent; color: white">
                      {{ step.indexNumber }}) {{ step.description["en-GB"] }}

                      <a href="#!" @click="deleteItem(step.indexNumber)" data-mdb-toggle="tooltip" title="Remove item" style="margin-left: 25px">
                        Delete
                    </a>
                    </li>
                  </ul>

                </div>
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

  import NavBar from "@/components/NavBar.vue";

  import useStepStore from "@/stores/Step";
  import { StepService } from "@/services/StepService";
  import useIdentityStore from "@/stores/identity/Identity";


    @Options({
      components: { NavBar },
      props: { id: String },
      emits: {}
    })

    export default class WorkshopStep extends Vue {

      /**
      * Identity Related Data Storage Connection Definition.
      */
      identityStore = useIdentityStore();

      /**
      * Step Related Data Storage Connection Definition.
      */
      stepStore = useStepStore();

      /**
      * Step Related Service Connection Definition.
      */
      stepService = new StepService();

      description: string = ""

      /**
       * Defines Cocktail ID.
       */
      id!: string;

      /**
       * Handle Security Options. (Really Dummy.)
       */
      created(): void {

        if (!this.identityStore.$state.jwt) this.$router.push("/");

        if (this.identityStore.$state.jwt?.role !== "Bartender" && this.identityStore.$state.jwt?.role !== "Admin") this.$router.push("/home");

        this.stepStore.$state.steps = [];
      }

      /**
       * Method Deletes Item From Step List.
       * @param {number} index Index Of Step In List.
       */
      deleteItem(index: number) {

        let stepIndex = this.stepStore.$state.steps.indexOf(this.stepStore.$state.steps.find(x => x.indexNumber == index)!);
        this.stepStore.$state.steps.splice(stepIndex, 1);

        // Recalculate Step Indexes.
        this.stepStore.$state.steps.forEach(x => {

          x.indexNumber = this.stepStore.$state.steps.indexOf(x) + 1;

        })
      }

      /**
       * Method Saves Steps In Backend.
       */
      async nextStep() {

        for(let step of this.stepStore.$state.steps) {

          await this.stepService.add(step);

        }
 
        this.$router.push({ name: 'cocktail-details-page', params: { id: this.id } })

      }

      /**
       * Method Adds Step To Cocktail.
       */
      addStep() {

        this.stepStore.$state.steps.push({

          description: {"en-GB": this.description, "ee-ET": "", "ru-RU": ""},
          cocktailId: this.id,
          indexNumber: this.stepStore.$state.steps.length + 1

        })

        this.description = ""

      }
    }
</script>


<style scoped>

  .step-wrapper {

    min-height: calc(100vh - 220px);
    background-image: url(@/assets/photos/drink-type-creation-background.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position-y: 20%;

  }

  .step-button {

    background-color: #151515;

  }

  .container-workshop {
        
    height: 100vh;
    font-family: 'Poppins', sans-serif; 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    font-size: 1.5rem;
    position: fixed;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    color: #f1f1f1;
    height: 100vh;
    width: 100%;
    padding: 20px;

  }

  .button-next {

    font-size: 30px;
    border-color: greenyellow !important;
    background-color: white !important;
    margin-right: 20px;
    width: 250px;

  }

  .button-next:hover {

    font-size: 30px;
    border-color: transparent;
    background-color: greenyellow !important;

  }

  .form__field {

    font-family: inherit;
    width: 100%;
    border: 0;
    border-bottom: 2px solid gray;
    outline: 0;
    font-size: 1.3rem;
    color: white;
    padding: 7px 0;
    background: transparent;
    transition: border-color 0.2s;

  }

  .form__field:focus {

    padding-bottom: 6px;  
    font-weight: 700;
    border-width: 3px;
    border-image: linear-gradient(to right, rgb(77, 214, 248) , blue);
    border-image-slice: 1;


  }

  .form__field:focus::-webkit-input-placeholder {

    color: transparent;

  }

</style>