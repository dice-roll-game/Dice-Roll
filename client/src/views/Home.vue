<template>
  <div class="home">
    

    <div style="display:flex;justify-content:center;flex-direction:column;">

       <!-- <center>
  <div class="box" width="25%" style="margin-top:20px;width:400px;background-color:hsl(48, 100%, 67%);">
    <p> Life is a gamble </p>
    <p> So why don't you roll the dice </p>
  </div>
</center> -->

    <div style="margin-top:20px;">
     <b-button size="is-medium"  @click="isCreateModalActive = true" type="is-warning">Create New Room</b-button>
    </div>

    <div >
      <b-button style="margin-top:20px;"  @click="gotoRoomList" size="is-medium" type="is-warning">Join Room</b-button>
    </div>

 

  <!-- Modal untuk Create Room -->
    </div>
      <b-modal :active.sync="isCreateModalActive" :width=400  >
                <form  v-on:submit.prevent="CreateRoom">
                <div  class="modal-card" style="width: auto">
                    <header class="modal-card-head" >
                        <p class="modal-card-title">Create Room</p>
                    </header>
                    <section class="modal-card-body">
                        <b-field label="Room Name">
                            <b-input
                                type="text"
                                placeholder="Room Name"
                                v-model="roomName"
                                required>
                            </b-input>
                        </b-field>

                        <b-field label="Room master ">
                            <b-input
                                type="text"
                                v-model="roomMaster"
                                password-reveal
                                placeholder="Your name"
                                required>
                            </b-input>
                        </b-field>

                           <b-field label="Money">
                            <b-input
                                type="number"
                                v-model="roomMasterMoney"
                                
                                required>
                            </b-input>
                        </b-field>
                        
                    </section>
                    <footer class="modal-card-foot">
                        <button class="button" type="button" @click="isCreateModalActive = false">Close</button>
                        <button class="button" >Create</button>
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
      roomMasterMoney:"",
      playerName : "",
      money:Number
    }
  },
  methods : {

    CreateRoom(){

      this.$router.push({path:"/roomlist"})

    },

    gotoRoomList(){

       this.$router.push({path:"/roomlist"})

    },

    JoinRoom(){

      this.$router.push({path:"/roomlist"})

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
