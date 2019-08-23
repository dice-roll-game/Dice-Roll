<template>
  <div class="column is-3">
    <div class="box">
      <div class="columns is-multiline">
        <div class="column is-half">
          <div>
            <h2>Room Game</h2>
          </div>
        </div>
        <div class="column is-half">
          <b-button type="is-warning" @click="isJoinModalActive = true">Join Room</b-button>
        </div>
      </div>

      <div class="columns is-multiline">
        <div class="column is-half" style="text-align:left">
          <div class="player-list">player player</div>
          <div class="player-list">player player</div>
          <div class="player-list">player player</div>
          <div class="player-list">player player</div>
          <div class="player-list">player player</div>
          <div class="player-list">player player</div>
        </div>
        <div class="column is-half">
          <div class="player-list">status</div>
          <div class="player-list">status</div>
          <div class="player-list">status</div>
          <div class="player-list">status</div>
          <div class="player-list">status</div>
          <div class="player-list">status</div>
        </div>
      </div>
    </div>

    <!-- Form untuk Join room -->
    <b-modal :active.sync="isJoinModalActive" :width="400">
      <form v-on:submit.prevent="gotoRoomSpace">
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
            <p class="modal-card-title">Join Room</p>
          </header>

          <section class="modal-card-body">
            <b-field label="Your Name">
              <b-input type="text" v-model="playerName" placeholder="Your name" required></b-input>
            </b-field>
          </section>
          <footer class="modal-card-foot">
            <button class="button" type="button" @click="isJoinModalActive = false">Close</button>
            <button class="button">Submit</button>
          </footer>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isJoinModalActive: false
    };
  },
  props : ["room"],
  methods: {
    gotoRoomSpace() {
      this.$router.push({ path: "/" });
    }
  },
  created (){
    console.log(this.room)
  }
};
</script>

<style>
</style>
