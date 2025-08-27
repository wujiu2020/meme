<template>
  <section class="protocol-section">
    <div class="container">
      <div class="protocol-content">
        <div class="protocol-info">
          <div class="stars">✦ ✦ ✦ ✦</div>
          <h1 class="title">100% FAIR ⚡ Layer Token Distribution Protocol</h1>
          <div class="stars">✦ ✦ ✦ ✦</div>
        </div>
        <div class="action-buttons">
          <a-button type="primary" class="create-btn" @click="goToCreate">创建代币</a-button>
          <a-button class="swap-btn" @click="goToSwap">OKO Swap</a-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ProtocolSection',
  methods: {
    goToCreate() {
      this.$router.push('/create')
    },
    goToSwap() {
      this.$router.push('/swap')
    }
  }
}
</script>

<style lang="less" scoped>
.protocol-section {
  background: #0a0a0a;
  padding: 20px 0;
}

.protocol-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.protocol-info {
  display: flex;
  align-items: center;
  gap: 15px;
  border-radius: 12px;
  padding: 20px 30px;
  position: relative;
  
  // 隐藏原来的星星
  .stars {
    display: none;
  }
  
  // 四个角的星星
  &::before {
    content: '✦';
    position: absolute;
    top: -8px;
    left: -8px;
    color: #52c41a;
    font-size: 16px;
    background: #0a0a0a;
    padding: 2px;
  }
  
  &::after {
    content: '✦';
    position: absolute;
    top: -8px;
    right: -8px;
    color: #52c41a;
    font-size: 16px;
    background: #0a0a0a;
    padding: 2px;
  }
  
  .title {
    font-size: 18px;
    font-weight: bold;
    color: #52c41a;
    margin: 0;
    text-align: center;
    letter-spacing: 0.5px;
    position: relative;
    
    &::before {
      content: '✦';
      position: absolute;
      bottom: -28px;
      left: -8px;
      color: #52c41a;
      font-size: 16px;
      background: #0a0a0a;
      padding: 2px;
    }
    
    &::after {
      content: '✦';
      position: absolute;
      bottom: -28px;
      right: -8px;
      color: #52c41a;
      font-size: 16px;
      background: #0a0a0a;
      padding: 2px;
    }
  }
}

.action-buttons {
  display: flex;
  gap: 12px;
  
  .create-btn {
    background: #52c41a;
    border-color: #52c41a;
    color: #000;
    font-weight: 500;
    height: 36px;
    padding: 0 20px;
    border-radius: 18px;
    
    &:hover {
      background: #73d13d;
      border-color: #73d13d;
    }
  }
  
  .swap-btn {
    background: #ffffff;
    border-color: #d9d9d9;
    color: #000;
    font-weight: 500;
    height: 36px;
    padding: 0 20px;
    border-radius: 18px;
    
    &:hover {
      background: #f5f5f5;
      border-color: #40a9ff;
      color: #1890ff;
    }
  }
}

@media (max-width: 768px) {
  .protocol-content {
    gap: 12px;
  }
  
  .protocol-info {
    flex-direction: column;
    gap: 8px;
    
    .title {
      font-size: 16px;
    }
  }
  
  .action-buttons {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
    
    .create-btn,
    .swap-btn {
      width: 100%;
    }
  }
}
</style>