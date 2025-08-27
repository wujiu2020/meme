<template>
  <div class="header-wrapper">
    <!-- 导航栏 -->
    <header class="navbar">
      <div class="container">
        <div class="navbar-content">
          <div class="logo-section">
            <div class="logo" @click="goToHome">
              <img src="/src/assets/images/logo.jpg" alt="OKAYFUN" class="logo-image" />
            </div>
            <nav class="nav-links">
              <a href="https://x.com/okaydotfun" class="nav-link">X</a>
              <a href="https://t.me/okaydotfun" class="nav-link">Telegram</a>
              <a href="https://x.com/okaydotfun/status/1956703796589211696?s=46&t=sKCMgE2u8cDlKJdlNM2zWQ" class="nav-link">运行机制</a>
            </nav>
          </div>
          
          <div class="user-section">
            <!-- 搜索框 -->
            <div class="search-section">
              <div class="search-box">
                <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <input 
                  type="text" 
                  class="search-input" 
                  placeholder="搜索代币..."
                  v-model="searchQuery"
                  @input="onSearchInput"
                  @keyup.enter="onSearchEnter"
                />
              </div>
            </div>
            <div class="wallet-info">
              <button v-if="!isConnected" class="connect-wallet-btn" @click="connectWallet">
                连接钱包
              </button>
              <div v-else class="wallet-connected" @click="showWalletDetails">
                <svg class="wallet-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 7H3C2.45 7 2 7.45 2 8V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V8C22 7.45 21.55 7 21 7ZM20 18H4V9H20V18ZM16 13.5C16 12.67 16.67 12 17.5 12S19 12.67 19 13.5S18.33 15 17.5 15S16 14.33 16 13.5Z" fill="currentColor"/>
                  <path d="M18 4H6C4.9 4 4 4.9 4 6V7H20V6C20 4.9 19.1 4 18 4Z" fill="currentColor"/>
                </svg>
                <span class="balance">{{ formatAddress(walletAddress) }}</span>
                <span class="disconnect-hint">查看详情</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    
    <!-- 钱包详情弹窗 -->
    <div v-if="showWalletModal" class="wallet-modal-overlay" @click="closeWalletModal">
      <div class="wallet-modal" @click.stop>
        <div class="modal-header">
          <h3>我的钱包</h3>
          <button class="close-btn" @click="closeWalletModal">×</button>
        </div>
        <div class="modal-content">
          <div class="balance-section">
            <div class="balance-label">余额</div>
            <div class="balance-amount">0 OKB</div>
          </div>
          <div class="address-section">
            <div class="address-row">
              <svg class="wallet-icon-small" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M21 7H3C2.45 7 2 7.45 2 8V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V8C22 7.45 21.55 7 21 7ZM20 18H4V9H20V18ZM16 13.5C16 12.67 16.67 12 17.5 12S19 12.67 19 13.5S18.33 15 17.5 15S16 14.33 16 13.5Z" fill="currentColor"/>
              </svg>
              <span class="address-text">{{ formatAddress(walletAddress) }}</span>
              <button class="copy-btn" @click="copyAddress">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z" fill="currentColor"/>
                </svg>
              </button>
              <button class="disconnect-btn" @click="disconnectWallet" title="断开连接">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="none" class="cursor-pointer">
                  <path d="M10 2.25C10.9665 2.25 11.75 3.0335 11.75 4V7.25H10.25V4C10.25 3.86193 10.1381 3.75 10 3.75H4C3.86193 3.75 3.75 3.86193 3.75 4V16C3.75 16.1381 3.86193 16.25 4 16.25H10C10.1381 16.25 10.25 16.1381 10.25 16V12.75H11.75V16C11.75 16.9665 10.9665 17.75 10 17.75H4C3.0335 17.75 2.25 16.9665 2.25 16V4C2.25 3.0335 3.0335 2.25 4 2.25H10ZM17.9766 10L15.0762 13.4805L13.9238 12.5195L15.3984 10.75H7V9.25H15.3984L13.9238 7.48047L15.0762 6.51953L17.9766 10Z" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </div>
          <div class="tokens-section">
            <div class="section-title">收益代币</div>
            <div class="empty-state">
              <div class="empty-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="#666"/>
                </svg>
              </div>
              <div class="empty-text">暂无数据</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      isConnected: false,
      walletAddress: '',
      showWalletModal: false,
      searchQuery: ''
    }
  },
  mounted() {
    this.checkConnection()
    this.setupAccountListener()
  },
  methods: {
    async connectWallet() {
      try {
        // 检查是否安装了 MetaMask 或其他 Web3 钱包
        if (typeof window.ethereum !== 'undefined') {
          // 请求连接钱包
          const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
          })
          
          if (accounts.length > 0) {
            this.isConnected = true
            this.walletAddress = accounts[0]
            
            // 保存连接状态到 localStorage
            localStorage.setItem('walletConnected', 'true')
            localStorage.setItem('walletAddress', accounts[0])
            
            console.log('钱包连接成功:', accounts[0])
          } else {
            alert('未找到可用的钱包账户，请确保钱包已解锁')
          }
        } else {
          alert('未检测到 Web3 钱包，请安装 MetaMask 或其他兼容钱包')
        }
      } catch (error) {
        console.error('连接钱包失败:', error)
        if (error.code === 4001) {
          alert('用户取消了连接请求')
        } else if (error.code === -32002) {
          alert('钱包连接请求已在处理中，请检查钱包弹窗')
        } else if (error.code === -32603) {
          alert('钱包内部错误，请重试或重启钱包')
        } else {
          alert(`连接钱包失败: ${error.message || '未知错误'}`)
        }
      }
    },
    async disconnectWallet() {
      try {
        this.isConnected = false
        this.walletAddress = ''
        
        // 清除本地存储
        localStorage.removeItem('walletConnected')
        localStorage.removeItem('walletAddress')
        
        // 关闭钱包弹窗
        this.showWalletModal = false
        
        console.log('钱包已断开连接')
      } catch (error) {
        console.error('断开钱包连接失败:', error)
        alert('断开钱包连接时发生错误，请刷新页面重试')
      }
    },
    async checkConnection() {
      try {
        // 检查本地存储中的连接状态
        const wasConnected = localStorage.getItem('walletConnected')
        const savedAddress = localStorage.getItem('walletAddress')
        
        if (wasConnected && savedAddress && typeof window.ethereum !== 'undefined') {
          // 验证钱包是否仍然连接
          const accounts = await window.ethereum.request({
            method: 'eth_accounts'
          })
          
          if (accounts.length > 0 && accounts[0] === savedAddress) {
            this.isConnected = true
            this.walletAddress = accounts[0]
          } else {
            // 清除过期的连接状态
            localStorage.removeItem('walletConnected')
            localStorage.removeItem('walletAddress')
          }
        }
      } catch (error) {
        console.error('检查钱包连接状态失败:', error)
      }
    },
    setupAccountListener() {
      // 监听账户变化
      if (typeof window.ethereum !== 'undefined') {
        window.ethereum.on('accountsChanged', (accounts) => {
          if (accounts.length === 0) {
            // 用户断开了所有账户
            this.disconnectWallet()
          } else {
            // 用户切换了账户
            this.walletAddress = accounts[0]
            localStorage.setItem('walletAddress', accounts[0])
          }
        })
        
        // 监听网络变化
        window.ethereum.on('chainChanged', (chainId) => {
          console.log('网络已切换到:', chainId)
          // 可以在这里处理网络切换逻辑
        })
      }
    },
    formatAddress(address) {
      if (!address) return ''
      return `${address.slice(0, 4)}...${address.slice(-4)}`
    },
    goToHome() {
      this.$router.push('/')
    },
    showWalletDetails() {
      this.showWalletModal = true
    },
    closeWalletModal() {
      this.showWalletModal = false
    },
    async copyAddress() {
      try {
        await navigator.clipboard.writeText(this.walletAddress)
        alert('钱包地址已复制到剪贴板')
      } catch (error) {
        console.error('复制失败:', error)
        // 降级方案
        const textArea = document.createElement('textarea')
        textArea.value = this.walletAddress
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        alert('钱包地址已复制到剪贴板')
      }
    },
    onSearchInput() {
      // 搜索输入处理逻辑
      console.log('搜索内容:', this.searchQuery)
      // 这里可以添加实时搜索逻辑
    },
    onSearchEnter() {
      // 回车搜索处理逻辑
      if (this.searchQuery.trim()) {
        console.log('执行搜索:', this.searchQuery)
        // 这里可以添加搜索跳转或搜索结果处理逻辑
        // 例如: this.$router.push(`/search?q=${encodeURIComponent(this.searchQuery)}`)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.header-wrapper {
  position: sticky;
  top: 0;
  z-index: 100;
  background: #0a0a0a;
}

.navbar {
  background: #0a0a0a;
  padding: 15px 0;
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}



.logo-section {
  display: flex;
  align-items: center;
  gap: 30px;
  flex: 0 0 auto;
}

.search-section {
  display: flex;
  align-items: center;
}

.search-box {
  position: relative;
  width:300px;
}

.search-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  pointer-events: none;
  z-index: 1;
}

.search-input {
  width: 100%;
  padding: 8px 10px 8px 32px;
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 8px;
  color: #fff;
  font-size: 12px;
  outline: none;
  transition: all 0.3s;
  
  &::placeholder {
    color: #666;
  }
  
  &:focus {
    border-color: #52c41a;
    box-shadow: 0 0 0 2px rgba(82, 196, 26, 0.2);
  }
  
  &:hover {
    border-color: #555;
  }
}

.logo {
  cursor: pointer;
  transition: opacity 0.3s;
  
  &:hover {
    opacity: 0.8;
  }
  
  .logo-text {
    font-size: 24px;
    font-weight: bold;
    color: #ffffff;
    letter-spacing: 1px;
  }
  
  .logo-image {
    height: 24px;
    width: auto;
    object-fit: contain;
  }
}

.nav-links {
  display: flex;
  gap: 20px;
  
  .nav-link {
    color: white;
    text-decoration: none;
    font-size: 14px;
    transition: color 0.3s;
    
    &:hover {
      color: #ffffff;
    }
  }
}





.user-section {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  justify-content: flex-end;
}

.wallet-info {
  .connect-wallet-btn {
    background: #52c41a;
    color: #fff;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
    
    &:hover {
      background: #73d13d;
    }
  }
  
  .wallet-connected {
    cursor: pointer;
    padding: 8px 12px;
    border-radius: 6px;
    background: #1a1a1a;
    border: 1px solid #333;
    transition: background-color 0.2s;
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 140px;
    
    &:hover {
      background: #2a2a2a;
      
      .disconnect-hint {
        opacity: 1;
      }
    }
    
    .wallet-icon {
      color: #999;
      flex-shrink: 0;
      transition: color 0.2s;
    }
    
    .balance {
      color: #999;
      font-size: 14px;
      font-family: monospace;
      flex: 1;
      text-align: left;
    }
    
    &:hover .wallet-icon {
      color: #bbb;
    }
    
    .disconnect-hint {
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%) translateY(-8px);
      background: rgba(0, 0, 0, 0.9);
      color: #fff;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12px;
      white-space: nowrap;
      opacity: 0;
      transition: all 0.2s ease;
      pointer-events: none;
      z-index: 1000;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
      
      &::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border: 5px solid transparent;
        border-top-color: rgba(0, 0, 0, 0.9);
      }
    }
  }
}

// 钱包详情弹窗样式
.wallet-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.wallet-modal {
  background: #1a1a1a;
  border-radius: 16px;
  width: 360px;
  height: 600px;
  max-width: 90vw;
  max-height: 80vh;
  border: 1px solid #333;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px 16px;
  border-bottom: 1px solid #333;
  
  h3 {
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    margin: 0;
  }
  
  .close-btn {
    background: none;
    border: none;
    color: #999;
    font-size: 24px;
    cursor: pointer;
    padding: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s;
    
    &:hover {
      color: #fff;
    }
  }
}

.modal-content {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.balance-section {
  text-align: left;
  margin-bottom: 20px;
  
  .balance-label {
    color: #999;
    font-size: 14px;
    margin-bottom: 8px;
  }
  
  .balance-amount {
    font-size: 36px;
    font-weight: bold;
    color: #fff;
    line-height: 1.2;
  }
}

.address-section {
  margin-bottom: 24px;
  
  .address-row {
     background: #2a2a2a;
     border-radius: 8px;
     padding: 8px 12px;
     display: flex;
     align-items: center;
     gap: 8px;
     
     .wallet-icon-small {
       color: #999;
       flex-shrink: 0;
       font-size: 14px;
     }
     
     .address-text {
       color: #fff;
       font-family: monospace;
       font-size: 12px;
       flex: 1;
       min-width: 0;
       overflow: hidden;
       text-overflow: ellipsis;
       white-space: nowrap;
     }
     
     .copy-btn, .disconnect-btn {
       background: none;
       border: none;
       color: #999;
       cursor: pointer;
       padding: 4px;
       border-radius: 4px;
       transition: all 0.2s;
       display: flex;
       align-items: center;
       justify-content: center;
       flex-shrink: 0;
       
       &:hover {
         background: #3a3a3a;
         color: #fff;
       }
     }
     
     .disconnect-btn {
       &:hover {
         background: #ff4d4f;
         color: #fff;
       }
     }
   }
}

.tokens-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  
  .section-title {
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 16px;
  }
  
  .empty-state {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    
    .empty-icon {
      margin-bottom: 12px;
      opacity: 0.5;
    }
    
    .empty-text {
      color: #666;
      font-size: 14px;
    }
  }
}



@media (max-width: 768px) {
  .navbar-content {
    flex-direction: column;
    gap: 15px;
  }
  
  .logo-section,
  .search-section,
  .user-section {
    flex: none;
  }
  
  .search-section {
    margin: 0;
  }
  
  .search-box {
    width: 150px;
  }
  
  .wallet-modal {
    width: 350px;
  }
}
</style>