<template>
  <div class="header-wrapper">
    <!-- 导航栏 -->
    <header class="navbar">
      <div class="container">
        <div class="navbar-content">
          <div class="logo-section">
            <div class="logo">
              <span class="logo-text">OKAYFUN</span>
            </div>
            <nav class="nav-links">
              <a href="https://x.com/okaydotfun" class="nav-link">X</a>
              <a href="https://t.me/okaydotfun" class="nav-link">Telegram</a>
              <a href="https://x.com/okaydotfun/status/1956703796589211696?s=46&t=sKCMgE2u8cDlKJdlNM2zWQ" class="nav-link">运行机制</a>
            </nav>
          </div>
          
          <div class="user-section">
            <div class="wallet-info">
              <span class="balance">0x18...C508</span>
            </div>
          </div>
        </div>
      </div>
    </header>
    
    <!-- 协议信息区域 -->
    <section class="protocol-section">
      <div class="container">
        <div class="protocol-content">
          <div class="protocol-info">
            <div class="stars">✦ ✦ ✦ ✦</div>
            <h1 class="title">100% FAIR ⚡ Layer Token Distribution Protocol</h1>
            <div class="stars">✦ ✦ ✦ ✦</div>
          </div>
          <div class="action-buttons">
            <a-button type="primary" class="create-btn">创建代币</a-button>
            <a-button class="swap-btn">OKO Swap</a-button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Header'
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

.logo-section {
  display: flex;
  align-items: center;
  gap: 30px;
  flex: 1;
}

.logo {
  .logo-text {
    font-size: 24px;
    font-weight: bold;
    color: #ffffff;
    letter-spacing: 1px;
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

.user-section {
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: flex-end;
}

.wallet-info {
  .balance {
    color: #999;
    font-size: 14px;
    font-family: monospace;
  }
}

@media (max-width: 768px) {
  .navbar-content {
    flex-direction: column;
    gap: 15px;
  }
  
  .logo-section,
  .user-section {
    flex: none;
  }
  
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