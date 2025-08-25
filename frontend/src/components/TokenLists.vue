<template>
  <div class="token-lists">
    <div class="lists-container">
      <!-- 新创建 -->
      <div class="token-column">
        <div class="column-header">
          <h3 class="column-title">新创建</h3>
        </div>
        <div class="token-list">
          <TokenCardWithProgress 
            v-for="token in newTokens" 
            :key="token.id"
            :token="token"
          />
        </div>
      </div>
      
      <!-- 高升 -->
      <div class="token-column">
        <div class="column-header">
          <h3 class="column-title">高升</h3>
        </div>
        <div class="token-list">
          <TokenCardWithProgress 
            v-for="token in risingTokens" 
            :key="token.id"
            :token="token"
          />
        </div>
      </div>
      
      <!-- 已发射 -->
      <div class="token-column">
        <div class="column-header">
          <h3 class="column-title">已发射</h3>
        </div>
        <div class="token-list">
          <TokenCardMemed 
            v-for="token in launchedTokens" 
            :key="token.id"
            :token="token"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TokenCardWithProgress from './TokenCardWithProgress.vue'
import TokenCardMemed from './TokenCardMemed.vue'

export default {
  name: 'TokenLists',
  components: {
    TokenCardWithProgress,
    TokenCardMemed
  },
  data() {
    return {
      newTokens: [
        {
          id: 1,
          name: 'BULL',
          symbol: 'BULL',
          percentage: '6.75',
          avatar: '🐂'
        },
        {
          id: 2,
          name: '哈士奇',
          symbol: '哈士奇',
          percentage: '0.00',
          avatar: '🐕'
        },
        {
          id: 3,
          name: 'F2',
          symbol: 'F2POOL',
          percentage: '2.00',
          avatar: '⚡'
        },
        {
          id: 4,
          name: 'MYO',
          symbol: 'Payback',
          percentage: '1.86',
          avatar: '💰'
        },
        {
          id: 5,
          name: 'XUDOGE',
          symbol: 'XUDoge',
          percentage: '0.00',
          avatar: '🐕'
        },
        {
          id: 6,
          name: 'MONEY DOG',
          symbol: 'money dog',
          percentage: '0.13',
          avatar: '💰'
        },
        {
          id: 7,
          name: 'NEZHA',
          symbol: 'NeZha',
          percentage: '0.00',
          avatar: '👹'
        },
        {
          id: 8,
          name: 'GM',
          symbol: 'GM',
          percentage: '0.00',
          avatar: '☀️'
        },
        {
          id: 9,
          name: 'FINN',
          symbol: 'FINN',
          percentage: '0.00',
          avatar: '🎭'
        },
        {
          id: 10,
          name: 'CRISTIANO RONAL...',
          symbol: 'Cristiano Ronal',
          percentage: '0.00',
          avatar: '⚽'
        },
        {
          id: 11,
          name: 'PAIN',
          symbol: 'PAIN',
          percentage: '0.00',
          avatar: '😢'
        }
      ],
      risingTokens: [
        {
          id: 12,
          name: 'OK',
          symbol: 'OK',
          percentage: '17.63',
          avatar: '✅'
        },
        {
          id: 13,
          name: 'okaydog',
          symbol: 'okaydog',
          percentage: '8.00',
          avatar: '🐕'
        },
        {
          id: 14,
          name: 'BULL',
          symbol: 'BULL',
          percentage: '6.88',
          avatar: '🐂'
        },
        {
          id: 15,
          name: 'Yaya',
          symbol: 'YY',
          percentage: '6.25',
          avatar: '👧'
        },
        {
          id: 16,
          name: 'Kong',
          symbol: '金刚',
          percentage: '6.13',
          avatar: '🦍'
        },
        {
          id: 17,
          name: '金卫兵',
          symbol: '金卫兵',
          percentage: '4.38',
          avatar: '🛡️'
        },
        {
          id: 18,
          name: 'LUCAS',
          symbol: 'Ronaldo Cat Nam',
          percentage: '4.00',
          avatar: '🐱'
        },
        {
          id: 19,
          name: 'FISH',
          symbol: '🐟',
          percentage: '3.50',
          avatar: '🐟'
        },
        {
          id: 20,
          name: '9595',
          symbol: '9595',
          percentage: '3.00',
          avatar: '🔢'
        },
        {
          id: 21,
          name: 'CWOIN',
          symbol: 'CWOIN',
          percentage: '2.88',
          avatar: '🪙'
        },
        {
          id: 22,
          name: 'WOF',
          symbol: 'WOF',
          percentage: '2.75',
          avatar: '🐺'
        }
      ],
      launchedTokens: [
        {
          id: 23,
          name: 'OKAY',
          symbol: 'OKAY',
          price: '0.0061',
          change: '+7.900',
          marketCap: '4.1M',
          avatar: '✅'
        },
        {
          id: 24,
          name: 'OOGG',
          symbol: 'OOGG',
          price: '0.6482',
          change: '+50.360',
          marketCap: '64.8M',
          avatar: '🦍'
        },
        {
          id: 25,
          name: 'XLAB',
          symbol: 'XLAB',
          price: '0.3154',
          change: '+20.657',
          marketCap: '315.4M',
          avatar: '🧪'
        },
        {
          id: 26,
          name: 'OKO',
          symbol: 'OKO',
          price: '0.1788',
          change: '+16.7546',
          marketCap: '178.8M',
          avatar: '👁️'
        },
        {
          id: 27,
          name: 'FUN',
          symbol: 'FUN',
          price: '0.4672',
          change: '+2.41',
          marketCap: '46.7M',
          avatar: '🎉'
        },
        {
          id: 28,
          name: 'whale',
          symbol: 'whale',
          price: '0.3985',
          change: '+27.120',
          marketCap: '39.8M',
          avatar: '🐋'
        },
        {
          id: 29,
          name: '钢铁',
          symbol: '钢铁',
          price: '0.3594',
          change: '-29.682',
          marketCap: '35.9M',
          avatar: '🔩'
        },
        {
          id: 30,
          name: 'ANI',
          symbol: 'ANI',
          price: '0.2266',
          change: '-12.715',
          marketCap: '22.6M',
          avatar: '🎭'
        },
        {
          id: 31,
          name: '王菲',
          symbol: '王菲',
          price: '0.1206',
          change: '+0.571',
          marketCap: '12.0M',
          avatar: '👩‍🎤'
        },
        {
          id: 32,
          name: 'NCAT',
          symbol: 'NCAT',
          price: '0.2003',
          change: '+70.330',
          marketCap: '20.0M',
          avatar: '🐱'
        },
        {
          id: 33,
          name: 'AYO',
          symbol: 'AYO',
          price: '0.1823',
          change: '',
          marketCap: '18.2M',
          avatar: '🎯'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.token-lists {
  width: 100%;
}

.lists-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  align-items: start;
  width: 100%;
  max-width: none;
}

.token-column {
  border-radius: 8px;
  overflow: hidden;
}

.column-header {
  padding: 15px 20px;
}

.column-title {
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
  text-align: center;
}

.token-list {
  padding: 10px;
  max-height: 80vh;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: transparent;
  }
  
  /* Firefox */
  scrollbar-width: none;
}

@media (max-width: 1024px) {
  .lists-container {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .token-list {
    max-height: 60vh;
  }
}

@media (max-width: 768px) {
  .token-list {
    max-height: 50vh;
  }
}
</style>