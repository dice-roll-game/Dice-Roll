<template>
  <div>
    <b-progress type="is-success" :value="progressComp"></b-progress>
    <div
      id="card"
      class="card columns is-multiline"
      style="height:85vh; margin:30px; padding: 20px"
    >
      <div class="column is-full">
        <div style="display: inline-block">
          <img
            :src="'../img/' + firstDice"
            height="100"
            style="margin-right:35px"
            width="100"
            alt="Placeholder image"
          />
        </div>
        <div style="display: inline-block">
          <img :src="'../img/' + secondDice " height="100" width="100" alt="Placeholder image" />
        </div>
        <div v-if="report" id="report">
          <p
            v-if="room.dices[room.stage-1]"
          >its {{room.dices[room.stage-1].firstDice + room.dices[room.stage-1].secondDice}}!</p>
        </div>
      </div>
      <div class="column is-full columns is-multiline">
        <!-- play       -->
        <div class="column is-full">
          <b-field v-if="playing" label="Guess a number between 2 - 12!">
            <b-tooltip label="guess between 2 - 12">
              <b-numberinput v-model="selected" min="2" max="12"></b-numberinput>
            </b-tooltip>
          </b-field>
          <b-button v-show="!disabled" @click.prevent="submit()" :disabled="disabled">submit</b-button>
          <b-button v-show="submitted" :loading="submitted">Loading</b-button>
        </div>
        <!-- result -->
        <div class="column is-full" v-if="over">
          <i id="result">Results:</i>
          <div class="card scores">
            <h1
              style="margin-bottom: 10px"
              v-for="player in room.players"
              :key="player.id"
            >{{player.username}} score: {{player.score}}</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/db.js";
import firebase from "firebase/app";

export default {
  data() {
    return {
      firstDice: "1.png",
      secondDice: "1.png",
      selected: null,
      fixSelected: null,
      disabled: true,
      submitted: false,
      playing: false,
      over: false,
      report: false
    };
  },
  methods: {
    rollDice(one, two) {
      this.playing = true;
      let audio = new Audio("../audio/dice-1.wav");
      audio.play();
      this.firstDice = "rolldice.gif";
      this.secondDice = "rolldice.gif";

      setTimeout(() => {
        if (this.submitted) {
          let result = Math.abs(
            this.fixSelected -
              (this.room.dices[this.room.stage - 1].firstDice +
                this.room.dices[this.room.stage - 1].secondDice)
          );
          let obj;
          db.collection("room")
            .doc(this.$route.params.id)
            .get()
            .then(data => {
              obj = { ...data.data() };
              //   let arr = data.data().players;
              obj.players = obj.players.map(el => {
                if (el.userId == localStorage.getItem("userId")) {
                  console.log(el, " di rooom game");
                  el.score += result;
                }
                return el;
              });
              console.log(obj);
              return db
                .collection("room")
                .doc(this.$route.params.id)
                .set(obj);
            })
            .then(res => {
              console.log(" sukses yaaaa");
            })
            .catch(err => {
              console.log(err);
            });
          this.$buefy.notification.open({
            duration: 3000,
            message: `you gained ${result} point(s)`,
            position: "is-bottom",
            type: "is-info",
            hasIcon: true
          });
        } else {
          this.$buefy.notification.open({
            duration: 3000,
            message: `you didn't answer, you gained ${11} point(s)`,
            position: "is-bottom",
            type: "is-danger",
            hasIcon: true
          });
          let obj;
          db.collection("room")
            .doc(this.$route.params.id)
            .get()
            .then(data => {
              obj = { ...data.data() };
              //   let arr = data.data().players;
              obj.players = obj.players.map(el => {
                if (el.userId == localStorage.getItem("userId")) {
                  console.log(el, " di rooom game");
                  el.score += 11;
                }
                return el;
              });
              console.log(obj);
              return db
                .collection("room")
                .doc(this.$route.params.id)
                .set(obj);
            })
            .then(res => {
              console.log(" sukses yaaaa");
            })
            .catch(err => {
              console.log(err);
            });
        }

        this.playing = false;
        this.firstDice = one + ".png";
        this.secondDice = two + ".png";
        this.disabled = true;
      }, 5000);
    },
    playSound(sound) {
      if (sound) {
        var audio = new Audio(sound);
        audio.play();
      }
    },
    submit() {
      this.fixSelected = this.selected;
      this.submitted = true;
      this.disabled = true;
    },
    playGame() {}
  },
  watch: {
    selected(newVal, oldVal) {
      if (newVal < 2 || newVal > 12 || newVal == null) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    },
    stage(newVal, oldVal) {
      if (oldVal < 3) {
        this.over = false;
        this.rollDice(
          this.room.dices[newVal - 1].firstDice,
          this.room.dices[newVal - 1].secondDice
        );
        setTimeout(() => {
          if (localStorage.userId == this.room.roomMaster.userId) {
            db.collection("room")
              .doc(this.room.id)
              .update({
                stage: firebase.firestore.FieldValue.increment(1)
              });
            // this.$store.commit('nextStage', this.room.id)
          }
          this.disabled = true;
          this.submitted = false;
        }, 7000);
      }
      if (newVal == 4) {
        this.over = true;
      }
    },
    playing(newVal, oldVal) {
      if (newVal == true) {
        this.report = false;
      } else {
        this.report = true;
      }
    }
  },
  created() {
    this.playGame();
  },
  computed: {
    room() {
      return this.$store.state.listRoom.find(
        room => room.id == this.$route.params.id
      );
    },
    stage() {
      return this.room.stage;
    },
    progressComp() {
      return (this.room.stage - 1) * 33 + 1;
    }
  }
};
</script>

<style scoped>
#card {
  background-image: url("https://us.123rf.com/450wm/2nix/2nix1302/2nix130200026/17887534-alfombra-verde-textura-de-fondo.jpg?ver=6");
  border-radius: 25px;
  border: solid #8b4513 5px;
  box-shadow: 5px 5px 5px black;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

#result {
  color: white;
  font-family: cursive;
  font-size: 20px;
}

.scores {
  padding: 10px;
  color: white;
  background-image: url("https://us.123rf.com/450wm/2nix/2nix1302/2nix130200026/17887534-alfombra-verde-textura-de-fondo.jpg?ver=6");
  opacity: 0.9;
  border: solid #8b4513 5px;
  border-radius: 25px;
  box-shadow: 5px 0px 5px black;
  font-style: italic;
  background-size: 100% 100%;
}

#report {
  color: white;
}
</style>