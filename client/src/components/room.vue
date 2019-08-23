<template>
  <div class="column is-3">
    <div class="box">
      <div class="columns is-multiline">
        <div class="column is-half" style="text-align:left">
          <div>
            <h2>{{room.name}}</h2>
          </div>
        </div>
        <div class="column is-half">
          <b-button type="is-warning" @click="isJoinModalActive = true">Join Room</b-button>
        </div>
      </div>

      <div class="columns is-multiline">
        <div class="column is-half" style="text-align:left">
          <div
            class="player-list"
            v-for="player in room.players"
            :key="player.id"
          >{{player.username}}</div>
        </div>
        <div class="column is-half">
          <div class="player-list" v-for="player in room.players" :key="player.id">
            <i class="fas fa-id-badge"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Form untuk Join room -->
    <b-modal :active.sync="isJoinModalActive" :width="400">
      <form v-on:submit.prevent="gotoRoomSpace">
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
            <h2>Join Room</h2>
          </header>

          <section class="modal-card-body">
            <b-field label="Your Name">
              <b-input type="text" v-model="playerName" placeholder="Your name" required></b-input>
            </b-field>
          </section>
          <footer class="modal-card-foot">
            <button class="button" type="button" @click="isJoinModalActive = false">Close</button>
            <form v-on:submit.prevent="joinRoom">
              <!-- <button class="button" @click="joinRoom">Submit</button> -->
              <input type="submit" class="button" value="masuk" />
            </form>
          </footer>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  data() {
    return {
      isJoinModalActive: false,
      playerName: ""
    };
  },
  props: ["room"],
  methods: {
    gotoRoomSpace() {
      this.$router.push({ path: "/" });
    },
    joinRoom() {
      // console.log(room)
      if (this.playerName) {
        Vue.swal.fire({
          title: "Joining...",
          allowOutsideClick: () => !Vue.swal.isLoading()
        });
        Vue.swal.showLoading();

        this.$store.dispatch("joinAroom", {
          id: this.room.id,
          username: this.playerName
        });
      }
    }
  }
};
</script>

<style>
</style>
