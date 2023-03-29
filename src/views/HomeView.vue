<template>
  <div class="home">
    <form action="">
      <p>Message from server: "{{socketMessage}}"</p>
      <input type="text" name="" id="" />
      <input type="button" value="send" />
    </form>
  </div>
</template>

<script>
export default {
  name: "homeView",
  data(){
    return{
      socketMessage: ''
    }
  },
  sockets:{
    connect() {
      console.log("socket connected...")
    },
    disconnected() {
      console.log("socket disconnected...")
    }
  }
}
</script>