<template>
  <div class="home">
    <h1>{{rooms}}</h1>
    <!-- <input type="submit" @click="AddL"> -->
    <form v-on:submit.prevent="AddRoom">
      <input type="text" v-model="username" placeholder="enter your name">
      <input type="text" v-model="RoomName" placeholder="enter room Name">
      <input  type="submit" >
    </form>
  
    <table>
      <tr v-for="room in rooms" :key="room.id">
        <th>{{room.name}}</th>
        <th><input type="submit" value="Join Room" @click="renderJoin(room.id)"  ></th>
      </tr>
    </table>
    <form v-on:submit.prevent="JoinRoom(TempId)" v-if="TempId">
      <input type="text" placeholder="enter your name" v-model="username2">
      <input type="submit" value="Join" >
    </form>
    <input type="submit" value="cancel" @click="TempId = false" v-if="TempId">
  </div>
</template>

<script>
// @ is an alias to /src
import db from "../db";
import ModalUser from '../components/ModalUser'
export default {
  name: "home",
  data() {
    return {
      roomList: [],
      RoomName : '',
      username : '',
      username2 : '',
      TempId : false
    };
  },
  components: {
    ModalUser
  },
  mounted () {
    this.$store.dispatch("getRoom");
    console.log(this.$store.state.listRoom, " sfsdfdsf");
    },
  computed : {
    rooms (){
      return this.$store.state.listRoom
    },
    roomId (){
      return this.$store.state.RoomId
    } 
  },
  methods : {
    AddRoom (){
      let { username , RoomName } = this
      this.$store.dispatch("createRoom" , { username , RoomName })
      this.username = ''
      this.RoomName = ''
      // this.$router.push({ path: `/room/${this.roomId}` });
    },
    JoinRoom (id){
      // console.log(id  , this.username)
      this.$store.dispatch("joinAroom" , {id , username : this.username2})
    },
    renderJoin (id){
      console.log(id , ' ini ya')
      this.TempId = id
    }
  }
};
</script>
