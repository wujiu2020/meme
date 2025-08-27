<template>
  <div class="swap-page">
    <Header />
    <div class="swap-container">
      <div class="swap-form">
        <div class="form-header">
          <button class="back-btn" @click="goBack">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <h1 class="form-title">OKO Swap</h1>
        </div>

        <form class="swap-form-content" @submit.prevent="executeSwap">
          <!-- 您发送 -->
          <div class="form-group">
            <TokenDisplay 
              :token="fromToken"
              v-model:amount="fromAmount"
              :value-u-s-d="fromValueUSD"
              :is-editable="true"
              :label="'您发送'"
              :selectable="true"
              @select-token="openFromTokenSelector"
            />
          </div>

          <!-- 交换按钮 -->
          <div class="swap-arrow">
            <button type="button" class="arrow-btn" @click="swapTokens">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2V14M3 9L8 14L13 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>

          <!-- 您接受 -->
          <div class="form-group">
            <TokenDisplay 
              :token="toToken"
              :amount="toAmount"
              :value-u-s-d="toValueUSD"
              :is-editable="false"
              :label="'您接受'"
              :selectable="false"
              @select-token="openToTokenSelector"
            />
          </div>

          <!-- 交易信息 -->
          <div class="trade-info" v-if="fromAmount && toAmount && fromToken && toToken">
            <div class="info-row">
              <span class="info-label">汇率</span>
              <span class="info-value">1 {{ fromToken.symbol }} = {{ exchangeRate }} {{ toToken.symbol }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">手续费</span>
              <span class="info-value">{{ fee }} {{ fromToken.symbol }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">滑点</span>
              <span class="info-value">{{ slippage }}%</span>
            </div>
          </div>

          <!-- 代币详情 -->
          <div class="token-details" v-if="toToken && toToken.price">
            <div class="details-header">
              <div class="token-info-header">
                <span class="token-avatar-large">{{ toToken.avatar }}</span>
                <div class="token-name-info">
                  <h3 class="token-name">{{ toToken.symbol }}</h3>
                  <span class="token-address">{{ toToken.creator }}</span>
                </div>
              </div>
            </div>
            
            <div class="details-grid">
              <div class="detail-item">
                <span class="detail-label">价格</span>
                <span class="detail-value">${{ toToken.price }}</span>
              </div>
              
              <div class="detail-item">
                <span class="detail-label">市值</span>
                <span class="detail-value">${{ toToken.marketCap }}</span>
              </div>
              
              <div class="detail-item">
                <span class="detail-label">24H交易量</span>
                <span class="detail-value">${{ toToken.volume24h }}</span>
              </div>
              
              <div class="detail-item">
                <span class="detail-label">流动性</span>
                <span class="detail-value">${{ toToken.liquidity }}</span>
              </div>
              
              <div class="detail-item">
                <span class="detail-label">总供应量</span>
                <span class="detail-value">{{ toToken.totalSupply }}</span>
              </div>
              
              <div class="detail-item">
                <span class="detail-label">创建者</span>
                <span class="detail-value creator-address">{{ toToken.creator }}</span>
              </div>
            </div>
          </div>

          <!-- 提交按钮 -->
          <button type="submit" class="submit-btn" :disabled="!isFormValid">
            {{ submitButtonText }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './Header.vue'
import TokenDisplay from './TokenDisplay.vue'

export default {
  components: {
    Header,
    TokenDisplay
  },
  name: 'SwapPage',
  data() {
    return {
      fromAmount: '100',
      toAmount: '17.88',
      fromToken: null,
      toToken: {
        symbol: 'NCAT',
        avatar: '🐱',
        balance: '0.00',
        price: '0.1328'
      },
      exchangeRate: '0.1788',
      fee: '0.003',
      slippage: '0.5',
      fromTokenPrice: '0.25',
      toTokenPrice: '0.1328',
      availableTokens: [
        {
          symbol: 'OKO',
          avatar: '👁️',
          balance: '1,234.56',
          price: '0.25'
        },
        {
          symbol: 'NCAT',
          avatar: '🐱',
          balance: '0.00',
          price: '0.1328'
        },
        {
          symbol: 'BULL',
          avatar: '🐂',
          balance: '500.00',
          price: '0.15'
        }
      ]
    }
  },
  computed: {
    isFormValid() {
      return this.fromToken && this.fromAmount && parseFloat(this.fromAmount) > 0
    },
    submitButtonText() {
      if (!this.fromToken) {
        return '选择代币'
      }
      if (!this.fromAmount) {
        return '输入金额'
      }
      if (parseFloat(this.fromAmount) > parseFloat(this.fromToken.balance.replace(',', ''))) {
        return '余额不足'
      }
      return '交换'
    },
    fromValueUSD() {
      if (!this.fromAmount || !this.fromToken) return '0.00'
      return (parseFloat(this.fromAmount) * parseFloat(this.fromTokenPrice)).toFixed(2)
    },
    toValueUSD() {
      if (!this.toAmount || !this.toToken) return '0.00'
      return (parseFloat(this.toAmount) * parseFloat(this.toTokenPrice)).toFixed(2)
    }
  },
  watch: {
    fromAmount(newVal) {
      if (newVal && !isNaN(newVal)) {
        this.toAmount = (parseFloat(newVal) * parseFloat(this.exchangeRate)).toFixed(6)
      } else {
        this.toAmount = ''
      }
    }
  },
  methods: {
    goBack() {
      this.$router.push('/')
    },
    setMaxAmount() {
      this.fromAmount = this.fromToken.balance.replace(',', '')
    },
    swapTokens() {
      const temp = this.fromToken
      this.fromToken = this.toToken
      this.toToken = temp
      this.fromAmount = ''
      this.toAmount = ''
    },
    openFromTokenSelector() {
      // 简单示例：选择第一个可用token
      if (this.availableTokens.length > 0) {
        this.fromToken = { ...this.availableTokens[0] }
        this.fromTokenPrice = this.fromToken.price
      }
      console.log('选择了fromToken:', this.fromToken)
    },
    openToTokenSelector() {
      // 简单示例：选择第二个可用token
      if (this.availableTokens.length > 1) {
        this.toToken = { 
          ...this.availableTokens[1],
          price: '0.1328',
          change: '-15.79',
          marketCap: '13.28K',
          volume24h: '3.89K',
          liquidity: '8.66K',
          totalSupply: '1,000,000,000',
          creator: '0x6e...237f'
        }
        this.toTokenPrice = this.toToken.price
      }
      console.log('选择了toToken:', this.toToken)
    },
    executeSwap() {
      if (!this.isFormValid) return
      
      // 执行交换逻辑
      console.log('执行交换:', {
        from: this.fromToken.symbol,
        to: this.toToken.symbol,
        amount: this.fromAmount
      })
    }
  }
}
</script>

<style lang="less" scoped>
.swap-page {
  min-height: 100vh;
  background: #000;
  color: #fff;
  display: flex;
  flex-direction: column;
}

.swap-container {
  flex: 1;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 40px;
  overflow-y: auto;
}

.swap-form {
  width: 100%;
  max-width: 500px;
  background: #111;
  border-radius: 12px;
  padding: 24px;
}

.form-header {
  display: flex;
  align-items: center;
  margin-bottom: 32px;
  
  .back-btn {
    background: none;
    border: none;
    color: #fff;
    cursor: pointer;
    padding: 8px;
    margin-right: 16px;
    border-radius: 6px;
    transition: background 0.2s;
    
    &:hover {
      background: #333;
    }
  }
  
  .form-title {
    font-size: 24px;
    font-weight: 600;
    color: #fff;
    margin: 0;
  }
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #ccc;
}



.swap-arrow {
  display: flex;
  justify-content: center;
  margin: 16px 0;
}

.arrow-btn {
  background: #1a1a1a;
  border: 1px solid #333;
  color: #fff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  
  &:hover {
    background: #333;
    transform: rotate(180deg);
  }
}

.trade-info {
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.info-label {
  font-size: 14px;
  color: #999;
}

.info-value {
  font-size: 14px;
  color: #fff;
  font-weight: 500;
}

.submit-btn {
  width: 100%;
  background: #52c41a;
  border: none;
  color: #000;
  padding: 16px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover:not(:disabled) {
    background: #73d13d;
  }
  
  &:disabled {
    background: #333;
    color: #666;
    cursor: not-allowed;
  }
}

.token-details {
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
}

.details-header {
  margin-bottom: 16px;
}

.token-info-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.token-avatar-large {
  font-size: 32px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #2a2a2a;
  border-radius: 12px;
}

.token-name-info {
  flex: 1;
}

.token-name {
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  margin: 0 0 4px 0;
}

.token-address {
  font-size: 12px;
  color: #999;
  font-family: monospace;
}

.details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.detail-label {
  font-size: 13px;
  color: #999;
}

.detail-value {
  font-size: 13px;
  color: #fff;
  font-weight: 500;
  
  &.creator-address {
    font-family: monospace;
    font-size: 12px;
  }
}

@media (max-width: 768px) {
  .swap-container {
    padding: 16px;
    padding-top: 20px;
  }
  
  .swap-form {
    padding: 20px;
  }
  
  .form-header {
    margin-bottom: 24px;
    
    .form-title {
      font-size: 20px;
    }
  }
  

  
  .details-grid {
    grid-template-columns: 1fr;
    gap: 8px;
  }
  
  .token-avatar-large {
    width: 40px;
    height: 40px;
    font-size: 24px;
  }
  
  .token-name {
    font-size: 16px;
  }
}
</style>