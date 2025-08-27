<template>
  <div class="home">
    <Header />
    <ProtocolSection />
    <main class="main-content">
      <div class="container">
        <TokenLists />
      </div>
    </main>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import ProtocolSection from '../components/ProtocolSection.vue'
import TokenLists from '../components/TokenLists.vue'

export default {
  name: 'Home',
  components: {
    Header,
    ProtocolSection,
    TokenLists
  }
}
</script>

<style lang="less" scoped>
.home {
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