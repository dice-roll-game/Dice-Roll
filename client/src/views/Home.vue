<template>
  <div class="home">
    <!-- <input type="submit" @click="AddL"> -->
    <!-- <form v-on:submit.prevent="AddRoom">
      <input type="text" v-model="username" placeholder="enter your name" />
      <input type="text" v-model="RoomName" placeholder="enter room Name" />
      <input type="submit" />
    </form> -->
    <form v-on:submit.prevent="JoinRoom(TempId)" v-if="TempId">
      <input type="text" placeholder="enter your name" v-model="username2" />
      <input type="submit" value="Join" />
    </form>
    <input type="submit" value="cancel" @click="TempId = false" v-if="TempId" />

    <div style="display:flex;justify-content:center;flex-direction:column;">
      <!-- <center>
  <div class="box" width="25%" style="margin-top:20px;width:400px;background-color:hsl(48, 100%, 67%);">
    <p> Life is a gamble </p>
    <p> So why don't you roll the dice </p>
  </div>
      </center>-->

      <div style="margin-top:20px;">
        <b-button
          size="is-medium"
          @click="isCreateModalActive = true"
          type="is-warning"
        >Create New Room</b-button>
      </div>

      <div>
        <b-button
          style="margin-top:20px;"
          @click="gotoRoomList"
          size="is-medium"
          type="is-warning"
        >Join Room</b-button>
      </div>

      <!-- Modal untuk Create Room -->
    </div>
    <b-modal :active.sync="isCreateModalActive" :width="400">
      <form v-on:submit.prevent="CreateRoom">
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
            <p class="modal-card-title">Create Room</p>
          </header>
          <section class="modal-card-body">
            <b-field label="Room Name">
              <b-input type="text" placeholder="Room Name" v-model="RoomName" required></b-input>
            </b-field>

            <b-field label="Room master ">
              <b-input
                type="text"
                v-model="username"
                password-reveal
                placeholder="Your name"
                required
              ></b-input>
            </b-field>

            <!-- <b-field label="Money">
              <b-input type="number" v-model="username" required></b-input>
            </b-field> -->
          </section>
          <footer class="modal-card-foot">
            <button class="button" type="button" @click="isCreateModalActive = false">Close</button>
            <button class="button">Create</button>
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
import db from "../db";
import ModalUser from "../components/ModalUser";
export default {
  name: "home",
  data() {
    return {
      roomList: [],
      RoomName: "",
      username: "",
      username2: "",
      TempId: false,
      isJoinModalActive: false,
      isCreateModalActive: false,
      roomName: "",
      roomMaster: "",
      roomMasterMoney: "",
      playerName: "",
      money: Number
    };
  },
  components: {
    ModalUser,
    navbar,
    createRoom
  },
  mounted() {
    this.$store.dispatch("getRoom");
    console.log(this.$store.state.listRoom, " sfsdfdsf");
  },
  computed: {
    rooms() {
      return this.$store.state.listRoom;
    },
    roomId() {
      return this.$store.state.RoomId;
    }
  },
  methods: {
    AddRoom() {
      let { username, RoomName } = this;
      this.$store.dispatch("createRoom", { username, RoomName });
      this.username = "";
      this.RoomName = "";
      // this.$router.push({ path: `/room/${this.roomId}` });
    },
    JoinRoom(id) {
      // console.log(id  , this.username)
      this.$store.dispatch("joinAroom", { id, username: this.username2 });
    },
    renderJoin(id) {
      console.log(id, " ini ya");
      this.TempId = id;
    },
    CreateRoom() {
      let { username, RoomName } = this;
      this.$store.dispatch("createRoom", { username, RoomName });
      this.username = "";
      this.RoomName = "";
      // this.$router.push({ path: "/roomlist" });
    },
    gotoRoomList (){
       this.$router.push({ path: "/roomlist" });
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
