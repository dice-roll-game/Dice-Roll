<template>
  <div class="container" style="margin-top:30px">
    <h1 style="margin-bottom:30px" class="is-size-4">Room List</h1>
    <div  class="columns is-multiline">

      <room v-for="room in rooms" :key="room.id" v-bind:room="room"></room>

        
    </div>
  </div>
</template>

<script>
import room from '../components/room'
export default {
  components: {
    room
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


};
</script>

<style>
</style>
