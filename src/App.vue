<template>
  <div id="app">
    <component :is="activeComponent"></component>
  </div>
</template>

<script>

import Login from './components/Login'
import Game from './components/Game'
import Finish from './components/Finish'

export default {
  name: 'App',
  components: {
    Login,
    Game,
    Finish
  },
  beforeCreated() {
    
  },
  computed:{
    activeComponent(){
      return this.$store.getters['settingsModule/getActiveComponent']
    }
  }
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
body {
  background-color: #282828;
}
#app {
  font-family: Roboto, sans-serif;
}
</style>
