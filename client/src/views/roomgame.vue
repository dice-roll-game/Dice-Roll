<template>
  <div>
    <h1>Welcome .....</h1>
    <h4>{{tes}}</h4>
    <input type="submit" @click="pencet" />

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in data.players" :key="user.username">
          <td>{{user.username}}</td>
          <td>{{user.score}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import db from "../db";
export default {
  data() {
    return {
      tes: "",
      data: []
    };
  },
  methods: {
    pencet() {
      let obj;
      db.collection("room")
        .doc(this.$route.params.id)
        .get()
        .then(data => {
          obj = { ...data.data() };
        //   let arr = data.data().players;
          obj.players =  obj.players.map(el=>{
              if(el.username == localStorage.getItem("username")){
                  el.score +=10;
              }
              return el
          })
          console.log(obj)  
          return db
            .collection("room")
            .doc(this.$route.params.id)
            .set(obj);
        })
        .then(res => {
          console.log( ' sukses yaaaa')
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    db.collection("room")
      .doc(this.$route.params.id)
      .onSnapshot(data => {
        this.data = data.data();
      });
  }
};
</script>

<style>
table,
th,
td {
  border: 1px solid black;
}
</style>