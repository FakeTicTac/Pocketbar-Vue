
<template>
  <div class="d-flex">

     <!-- Navigation -->
     <AdminNavBar />

  <!-- Ingredient Edit Section -->
    <section class="gallery">
      
      <section class="vh-100 wrapper">
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
              <div class="card bg-dark text-white data-box">
                <div class="card-body p-5 text-center">
                  <div class="mb-md-5 mt-md-4 pb-5">

                  <!-- Action -->
                  <h2 class="fw-bold mb-2 text-uppercase">{{ id === undefined ? "Create" : "Modify" }} Ingredient</h2>

                  <!-- Action Description -->
                  <p class="text-white mt-5 mb-5">Please Enter Ingredient Information Below!</p>

                  <!-- Wrong Input Response From Backend -->
                  <div v-if="errorFlag" class="alert alert-danger text-center mb-5">Something Went Wrong. Please Try Again!</div>

                  <!-- Name Field -->
                  <div class="form-outline form-white mb-4">
                    <input v-model="name" type="text" class="form-control form-control-lg" placeholder="Name" />
                  </div>

                  <!-- Descriotion Field -->
                  <textarea  v-model="description" class="form-control" id="textAreaExample" rows="4" style="background: #fff; " placeholder="Describe Your Ingredient">
                  </textarea>

                  <!-- Image Field -->
                  <div class="form-outline form-white mt-5 mb-4">
                    <input v-model="coverImageFile" type="text" class="form-control" placeholder="Your Ingredient Image URL" />
                  </div>
                             
                  <!-- Action Button -->
                  <button v-if="id !== undefined" @click="edit($event)" class="left-btn btn btn-outline-light btn-lg px-5 mt-5">Edit</button>
                  <button v-else @click="create($event)" class="left-btn btn btn-outline-light btn-lg px-5 mt-5">Add</button>
                  <button @click="$router.push('/ingredients')" class="right-btn btn btn-outline-light btn-lg px-5 mt-5">Back</button>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>


<script lang="ts">
    import { Options, Vue } from "vue-class-component";

    import AdminNavBar from "@/components/AdminNavBar.vue";

    import useIngredientStore from "@/stores/Ingredient";
    import useIdentityStore from "@/stores/identity/Identity";
    import AdminSearchBar from "@/components/AdminSearchBar.vue";
    import { IngredientService } from "@/services/IngredientService";


    @Options({
      components: { AdminNavBar, AdminSearchBar },
      props: { id: String },
      emits: {}
    })


    export default class IngredientsAdd extends Vue {

    /**
    * Identity Related Data Storage Connection Definition.
    */
    identityStore = useIdentityStore();

    /**
    * Ingredient Related Data Storage Connection Definition.
    */
    ingredientStore = useIngredientStore();

    /**
    * Ingredient Related Service Connection Definition.
    */
    ingredientService = new IngredientService();

    /**
    * Ingredient Related Name Information.
    */
    name: string = '';

    /**
    * Ingredient Related Description Information.
    */
    description: string = '';

    /**
     * Defines Ingredient Cover Image.
     */
    coverImageFile: string = "";

    /**
    * Ingredient Related ID Information.
    */
    id!: string;

    /**
    * Indicator Of Error Occured During Backend Access Operation.
    */
    errorFlag: boolean = false;


    /**
    * Handle Security Options. (Really Dummy.)
    */
    created(): void {

      if (!this.identityStore.$state.jwt) this.$router.push("/");

      if (this.identityStore.$state.jwt?.role != "Admin") this.$router.push("/home");

    }

    /**
    * Data Should Be Loaded If Thing About Record Update.
    */
    async mounted(): Promise<void> {
        
        // ID Key Is Passed To View.
        if (this.id !== undefined) {

          let data = (await this.ingredientService.get(this.id as string)).data;

          this.name = data?.name["en-GB"]!;
          this.description = data?.description!["en-GB"]!;
          this.coverImageFile = data?.coverImagePath!;

      }
    }


    /**
    * Method Creates Records Of Ingredient In Backend Side.
    * @param {Event} event Defines Event Happenned To Lead To This Action. 
     */
    async create(event: Event) : Promise<void> {

      event.preventDefault();
  
      // Try To Insert Record In Database.
      var result = await this.ingredientService.add({

        name: {"en-GB": this.name, "ee-ET": "", "ru-RU": ""},
        description: {"en-GB": this.description, "ee-ET": "", "ru-RU": ""},
        coverImagePath: this.coverImageFile

      });

      // Check If Operation Succeded.
      if (result.statusCode === 200) {
        this.errorFlag = true;
        return;
      }

      // Return To Ingredient View.
      this.$router.push("/ingredients");
    }

    /**
    * Method Edits Records Of Drink Type In Backend Side.
    * @param {Event} event Defines Event Happenned To Lead To This Action. 
    */
    async edit(event: Event): Promise<void> {

        event.preventDefault();

        // Try To Update Record In Database.
        var result = await this.ingredientService.update( this.id, { 

          id: this.id,
          name: {"en-GB": this.name, "ee-ET": "", "ru-RU": ""},
          description: {"en-GB": this.description, "ee-ET": "", "ru-RU": ""},
          coverImagePath: this.coverImageFile

        });

        // Check If Operation Succeded.
        if (result.statusCode !== 204) {
            this.errorFlag = true;
            return;
        }

        // Return To Drink Types View.
        this.$router.push("/ingredients");
    }
  }
</script>


<style scoped>

  .gallery {

    width: 100%; 
    margin-left:300px;
    position:relative;
    background-image: url(@/assets/photos/drink-type-creation-background.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position-y: 20%;

  }

  .data-box {

    border-radius: 1rem;
    border-color: white;

  }

  .card-body {

    border-radius: 1rem;
    background-color: rgb(51, 49, 49);

  }

  .left-btn{

    margin-right: 20px;

  }
  
  .right-btn {

    margin-left: 20px;

  }

</style>