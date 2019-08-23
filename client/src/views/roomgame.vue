<template>
  <div id="room" class="columns" style="height: 100vh">
    <div id="playerList" class="column is-one-fifth" style="border-radius:10px">
      <b-menu style="padding-left:30px; padding-top:50px">
        <b-menu-list>
          <b-menu-item style="color:white" label="Bet: $200  "></b-menu-item>
          <b-menu-item style="color:white" label="Player List:"></b-menu-item>
          <b-menu-item
            class="card"
            style="color:white"
            v-for="player in this.room.players"
            :key="player.id"
            :label="player.username"
          ></b-menu-item>
        </b-menu-list>
        <b-button v-if="room.playing == false" @click="play()">PLAY</b-button>
        <b-button v-if="room.playing == true" @click="play()" disabled>PLAY</b-button>
      </b-menu>
    </div>
    <div class="column" style="height: 100vh">
      <gamespace></gamespace>
    </div>
  </div>
</template>

<script>
import db from "@/db.js";
import firebase from "firebase/app";
import gamespace from "@/components/gamespace";
export default {
  //   data() {
  //     return {
  //       tes: "",
  //       data: []
  //     };
  //   },
  //   methods: {
  //     pencet() {
  //       let obj;
  //       db.collection("room")
  //         .doc(this.$route.params.id)
  //         .get()
  //         .then(data => {
  //           obj = { ...data.data() };
  //         //   let arr = data.data().players;
  //           obj.players =  obj.players.map(el=>{
  //               if(el.userId == localStorage.getItem("userId")){
  //                   console.log(el , ' di rooom game')
  //                   el.score +=10;
  //               }
  //               return el
  //           })
  //           console.log(obj)
  //           return db
  //             .collection("room")
  //             .doc(this.$route.params.id)
  //             .set(obj);
  //         })
  //         .then(res => {
  //           console.log( ' sukses yaaaa')
  //         })
  //         .catch(err => {
  //           console.log(err);
  //         });

  data() {
    return {};
  },
  components: {
    gamespace
  },
  methods: {
    play() {
      if (localStorage.userId == this.room.roomMaster.userId) {
        db.collection("room")
          .doc(this.room.id)
          .update({
            playing: true
          });
        console.log("triggered");
        db.collection("room")
          .doc(this.room.id)
          .update({
            stage: firebase.firestore.FieldValue.increment(1)
          });
      }
    }
  },
  computed: {
    room() {
      return this.$store.state.listRoom.find(
        room => room.id == this.$route.params.id
      );
    },
    playing() {
      return this.room.playing;
    }
  },
  watch: {
    playing(newVal, oldVal) {
      if (newVal == true) {
        // this.$store.commit('nextStage', this.room.id)
        if (localStorage.userId == this.room.roomMaster.id) {
          db.collection("rooms")
            .doc(this.room.id)
            .update({
              stage: firebase.fireStore.FieldValue.increment(1)
            });
          // this.$store.commit('nextStage', this.room.id)
        }
      }
    }
  }
};
</script>

<style>
#room {
  background-image: url("https://s3.envato.com/files/246903643/Preview%20Image.jpg");
  min-height: 100vh;
  background-attachment: fixed;
}
#playerList {
  background-color: white;
  opacity: 0.7;
  color: white;
}
</style>