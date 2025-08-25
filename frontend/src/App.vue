<template>
  <div id="app">
    <Header />
    <main class="main-content">
      <div class="container">
        <TokenLists />
      </div>
    </main>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import TokenLists from './components/TokenLists.vue'

export default {
  name: 'App',
  components: {
    Header,
    TokenLists
  }
}
</script>

<style lang="less" scoped>
#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.main-content {
  flex: 1;
  overflow: hidden;
}
</style>