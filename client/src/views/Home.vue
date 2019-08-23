<template>
  <div class="home">
    

    <div style="display:flex;justify-content:center;flex-direction:column;">
    <div style="margin-top:20px;">
     <b-button size="is-medium"  @click="isCreateModalActive = true" type="is-warning">Create New Room</b-button>
    </div>

    <div >
      <b-button style="margin-top:20px;"  @click="isJoinModalActive = true" size="is-medium" type="is-warning">Join Room</b-button>
    </div>
    </div>
      <b-modal :active.sync="isCreateModalActive" :width=400  >
                <form  >
                <div  class="modal-card" style="width: auto">
                    <header class="modal-card-head" >
                        <p class="modal-card-title">Create Room</p>
                    </header>
                    <section class="modal-card-body">
                        <b-field label="Room Name">
                            <b-input
                                type="text"
                                :value="email"
                                placeholder="Your email"
                                required>
                            </b-input>
                        </b-field>

                        <b-field label="Room master ">
                            <b-input
                                type="text"
                                :value="password"
                                password-reveal
                                placeholder="Your name"
                                required>
                            </b-input>
                        </b-field>

                           <b-field label="Money">
                            <b-input
                                type="number"
                                
                                password-reveal
                                required>
                            </b-input>
                        </b-field>
                        

                        <b-checkbox>Remember me</b-checkbox>
                    </section>
                    <footer class="modal-card-foot">
                        <button class="button" type="button" @click="isCreateModalActive = false">Close</button>
                        <button class="button is-warning" >Login</button>
                    </footer>
                </div>
            </form>
        </b-modal>

    <!-- Form untuk Join room -->
      <b-modal :active.sync="isJoinModalActive" :width=400  >
                <form  >
                <div  class="modal-card" style="width: auto">
                    <header class="modal-card-head" >
                        <p class="modal-card-title">Join Room</p>
                    </header>

                    <section class="modal-card-body">
                        <b-field label="Room Name">
                            <b-input
                                type="text"
                                :value="email"
                                placeholder="Your email"
                                required>
                            </b-input>
                        </b-field>

                           <b-field label="Money">
                            <b-input
                                type="number"
                                
                                password-reveal
                                required>
                            </b-input>
                        </b-field>
    
                    </section>
                    <footer class="modal-card-foot">
                        <button class="button" type="button" @click="isJoinModalActive = false">Close</button>
                        <button class="button is-warning" >Login</button>
                    </footer>
                </div>
            </form>
        </b-modal>


    
  </div>
</template>

<script>
import navbar from "../components/navbar";
import createRoom from "../components/createRoom";
// @ is an alias to /src
export default {
  name: "home",
  components: {
    navbar,
    createRoom
  },
  data(){
    return{
      isJoinModalActive:false,
      isCreateModalActive:false,
      roomName : "",
      roomMaster:"",
      money:Number
    }
  }
};
</script>

<style scoped>
/* .home{
  background-color:darkyr;
  min-height: 100vh;
} */
</style>
