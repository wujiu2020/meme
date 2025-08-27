<template>
  <div class="token-card" @click="handleClick">
    <div class="token-header">
      <div class="token-avatar">
        <span class="avatar-emoji">{{ token.avatar }}</span>
      </div>
      <div class="token-info">
        <div class="token-name">{{ token.name }}</div>
        <div class="token-symbol">市值 ${{ token.marketCap }}</div>
      </div>
      <!-- 百分比显示 -->
      <div class="percentage-display" v-if="token.percentage">
          <div class="percentage-container" :style="{ background: `conic-gradient(rgb(154, 237, 44) 0deg, rgb(154, 237, 44) ${token.percentage * 3.6}deg, rgb(30, 30, 30) ${token.percentage * 3.6}deg, rgb(30, 30, 30) 360deg)` }">
            <div class="percentage-inner">
          </div>
          </div>
        </div>
    </div> 
   
    
    <div class="token-details" v-if="token.price">
      <div class="price-info">
        <div class="price">${{ token.price }}</div>
      </div>
      <div class="change-info" v-if="token.change">
        <span 
          class="change-value" 
          :class="{
            'positive': isPositiveChange(token.change),
            'negative': isNegativeChange(token.change)
          }"
        >
          {{ token.change }}%
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TokenCardMemed',
  props: {
    token: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleClick() {
      const tokenData = encodeURIComponent(JSON.stringify(this.token))
      this.$router.push(`/token/${tokenData}`)
    },
    isPositiveChange(change) {
      return change && change.startsWith('+')
    },
    isNegativeChange(change) {
      return change && change.startsWith('-')
    }
  }
}
</script>

<style lang="less" scoped>
.token-card {
  background-color: #0e0e0e;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 88px;
  
  &:hover {
    background: #1a1a1a;
    transform: translateY(-2px);
  }
}

.token-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.token-avatar {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #2a2a2a;
  border-radius: 8px;
  
  .avatar-emoji {
    font-size: 20px;
    line-height: 1;
  }
}

.token-info {
  flex: 1;
  min-width: 0;
  
  .token-name {
    font-size: 14px;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .token-symbol {
    font-size: 12px;
    color: #999;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.token-percentage {
  .percentage-value {
    font-size: 12px;
    color: #999;
    font-weight: 500;
  }
}

.percentage-display {
  margin-left: auto;
}

.percentage-container {
  width: 70px;
  height: 34px;
  border-radius: 8px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
}

.percentage-inner {
  width: calc(100% - 4px);
  height: calc(100% - 4px);
  background-color: #0E0E0E;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.percentage-text {
  font-size: 14px;
  color: #fff;
  font-weight: 500;
}

.token-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-end;
}

.price-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  .price {
    font-size: 14px;
    font-weight: 600;
    color: #ffffff;
  }
  
  .market-cap {
    font-size: 11px;
    color: #666;
  }
}

.change-info {
  .change-value {
    font-size: 12px;
    font-weight: 600;
    padding: 2px 6px;
    border-radius: 4px;
    
    &.positive {
      color: #52c41a;
      background: rgba(82, 196, 26, 0.1);
    }
    
    &.negative {
      color: #ff4d4f;
      background: rgba(255, 77, 79, 0.1);
    }
  }
}

@media (max-width: 768px) {
  .token-card {
    padding: 16px;
  }
  
.token-avatar {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #2a2a2a;
  border-radius: 8px;
}

  .token-info {
    .token-name {
      font-size: 13px;
    }
    
    .token-symbol {
      font-size: 11px;
    }
  }
  
  .price-info {
    .price {
      font-size: 13px;
    }
    
    .market-cap {
      font-size: 10px;
    }
  }
}
</style>