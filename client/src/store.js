import Vue from 'vue'
import Vuex from 'vuex'
import db from './db'
import router from './router'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    listRoom: [],
    listRoom2: 'wkwkwkwkkw',
    RoomId: ''
  },
  mutations: {
    tes(state, payload) {
      state.listRoom.push(payload)
    },
    cleans(state, payload) {
      state.listRoom = []
    },
    setId(state, payload) {
      state.RoomId = payload
    }
  },
  actions: {
    getRoom({ commit, state }) {
      db.collection("room").onSnapshot(doc => {
        commit('cleans')
        doc.forEach(el => {
          let obj = { ...el.data(), id: el.id };
          commit('tes', obj)
        })
      })
    },
    createRoom({ commit, state, dispatch }, payload) {
      let { username, RoomName } = payload
      let random1 =  Math.floor(Math.random() * 5 ) + 1
      let random2 =  Math.floor(Math.random() * 5 ) + 1
      let random3 =  Math.floor(Math.random() * 5 ) + 1
      let random4 =  Math.floor(Math.random() * 5 ) + 1
      let random5 =  Math.floor(Math.random() * 5 ) + 1
      let random6 =  Math.floor(Math.random() * 5 ) + 1
      db.collection("users")
      .add({
        username
      })
      .then(data=>{
        return db.collection("room")
        .add({
          players: [
            
            {  userId : data.id  , username , score : 0  }
          ],
          roomMaster : {  userId : data.id  , username , score : 0  },
          name: RoomName,
          stage : 0,
          playing : false,
          dices : [
            {
              firstDice : random1,
              secondDice : random2
            },
            {
              firstDice : random3,
              secondDice : random4
            },
            {
              firstDice : random5,
              secondDice : random6
            },

          ]
        })
      }).then(data => {
          localStorage.setItem('username', username)
          commit('setId' , data.id)
          router.push({ path: `/room/${data.id}` });
          console.log('Sukses Add Data', data.id)
        })
        .catch(err => {
          console.log(err)
        })
    },
    joinAroom({ commit, state, dispatch }, payload) {
      let obj;
      let { username, id } = payload
      db.collection("room").doc(id)
        .get()
        .then(data => {
          obj = { ...data.data() }
          let arr = data.data().players
          arr.push({
            username,
            score : 0
          })
          obj.players = arr
          console.log(obj)
          return db.collection("room").doc(id)
            .set(obj)
        })
        .then(res => {
          router.push({ path: `/room/${id}` })
          localStorage.setItem("username", username)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})
