
<template>
    <div class="row search-container d-flex justify-content-center align-items-center">
        <div class="col-md-6">
            <div class="form">

                <i class="fa fa-search"></i>
                <input @input="$emit('searchInvoked', sentData($event))" type="text" class="form-control form-input" placeholder="Search Anything...">
            
            </div>
        </div>
    </div>
</template>


<script lang="ts">

  import { Options, Vue } from "vue-class-component";

    @Options({
      components: {},
      props: {},
      emits: ['searchInvoked']
    })

    export default class AdminSearchBar extends Vue {

        /**
         * Method Sent Data To Parent Event. (Input Value)
         * @param {Event} event Defines Invoced Event,
         */
        sentData(event : Event) {

            return (event.target as HTMLInputElement).value
        }
    }
    
</script>


<style scoped>

.form{

    position: relative;

}

.form .fa-search{

    position: absolute;
    top:20px;
    left: 20px;
    color: #9ca3af;

}

.form span{

    position: absolute;
    right: 17px;
    top: 13px;
    padding: 2px;
    border-left: 1px solid #d1d5db;

}

.left-pan{

    padding-left: 7px;

}

.left-pan i{
   
   padding-left: 10px;

}

.form-input{

    height: 55px;
    text-indent: 33px;
    border-radius: 10px;

}

.form-input:focus{

    box-shadow: none;
    border: 2px solid  black;

}

</style>