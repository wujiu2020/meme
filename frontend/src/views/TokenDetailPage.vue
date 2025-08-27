<template>
  <div class="token-detail-page">
    <Header />

    <!-- Token Detail Content -->
    <div class="detail-container">
      <div class="token-detail-content">
      <!-- Action Buttons -->
      <div class="action-buttons">
        <button class="back-button" @click="goBack">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button class="share-button" @click="showShareModal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <!-- Token Header -->
      <div class="token-header">
        <div class="token-avatar">{{ token.avatar }}</div>
        <div class="token-info">
          <h2 class="token-name">{{ token.name }}</h2>
          <p class="token-symbol">{{ token.symbol }}</p>
        </div>
        <div class="token-progress">
          <div class="progress-circle" :style="{ '--progress': token.percentage + '%' }">
            <span class="progress-text">{{ token.percentage }}%</span>
          </div>
        </div>
      </div>

      <!-- About Section -->
      <div class="about-section">
        <h3>关于</h3>
        <p class="about-text">
          这个代币专为Count内测发布，可以支持多种操作用户操作
          的代币，角色是基于合约Creator，可以在Solydxfun上开启代币
          挖矿，更重要的是用户可以在Creator建立流动性池，解锁科技，
          投资方案，收益，在任何时候，你都可以在下个月的任何
          meme。
        </p>
      </div>

      <!-- Token Statistics -->
      <div class="stats-section">
        <div class="stat-item">
          <span class="stat-label">代币总量</span>
          <span class="stat-value">1,000,000,000</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">价格</span>
          <span class="stat-value">$0</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Mint 总量</span>
          <span class="stat-value">800,000,000</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">每次 Mint 数量</span>
          <span class="stat-value">1,000,000</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Mint 进度</span>
          <span class="stat-value">0%</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">合约地址</span>
          <span class="stat-value">0x23_9595</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">创建者</span>
          <span class="stat-value">0x5e_6748</span>
        </div>
      </div>

      <!-- Recent Beneficiaries -->
      <div class="beneficiaries-section">
        <h3>最近受益人</h3>
        <div class="beneficiary-item">
          <span class="beneficiary-avatar">🏠</span>
          <span class="beneficiary-address">liangxi20250818</span>
          <button class="remove-btn">×</button>
        </div>
      </div>

      <!-- Mint Button -->
      <div class="mint-section">
        <button class="mint-button">
          铸造
        </button>
        <p class="mint-info">
          铸造消耗 0.1 OKB<br>
          铸造成功后25%为铸造者获得，剩余75%为随机用户获得，在绿色
          完成后系统会自动创建流动性池。
        </p>
        <p class="disclaimer">
          平台提供的不是投资建议，不承担，请谨慎投资 0.1 OKB Meme 币的风险
        </p>
      </div>
      </div>
    </div>

    <!-- Share Modal -->
    <div v-if="isShareModalVisible" class="modal-overlay" @click="hideShareModal">
      <div class="share-modal" @click.stop>
        <div class="share-header">
          <h3>分享代币</h3>
          <button class="close-button" @click="hideShareModal">×</button>
        </div>
        <div class="share-content">
          <div class="share-token-info">
            <div class="share-token-avatar">{{ token.avatar }}</div>
            <div class="share-token-details">
              <h4>${{ token.symbol }}</h4>
              <p>{{ token.name }}</p>
              <span class="share-token-tag">Our Token</span>
            </div>
            <div class="share-token-image">
              <!-- Placeholder for token image -->
              <div class="token-placeholder"></div>
            </div>
          </div>
          <div class="share-actions">
            <button class="share-action-btn primary">复制链接</button>
            <button class="share-action-btn secondary">分享到 X</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'

export default {
  name: 'TokenDetailPage',
  components: {
    Header
  },
  data() {
    return {
      token: {
        avatar: '🐂',
        name: 'BULL',
        symbol: 'BULL',
        percentage: '25'
      },
      isShareModalVisible: false
    }
  },
  created() {
    // Get token data from route params or store
    if (this.$route.params.token) {
      this.token = JSON.parse(decodeURIComponent(this.$route.params.token))
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    showShareModal() {
      this.isShareModalVisible = true
    },
    hideShareModal() {
      this.isShareModalVisible = false
    }
  }
}
</script>

<style scoped>
.token-detail-page {
  min-height: 100vh;
  background: #000;
  color: #fff;
  display: flex;
  flex-direction: column;
}



.detail-container {
  flex: 1;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 40px;
  overflow-y: auto;
}

.token-detail-content {
  width: 100%;
  max-width: 500px;
  background: #111;
  border-radius: 12px;
  padding: 24px;
  position: relative;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.back-button,
.share-button {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: #333;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
}

.back-button:hover,
.share-button:hover {
  background: #444;
}

.token-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
  padding: 20px;
  background: #0e0e0e;
  border-radius: 12px;
}

.token-avatar {
  font-size: 48px;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #333;
  border-radius: 50%;
}

.token-info {
  flex: 1;
}

.token-name {
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 4px 0;
}

.token-symbol {
  font-size: 16px;
  color: #888;
  margin: 0;
}

.token-progress {
  position: relative;
}

.progress-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: conic-gradient(#4CAF50 var(--progress), #333 var(--progress));
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.progress-circle::before {
  content: '';
  position: absolute;
  width: 44px;
  height: 44px;
  background: #111;
  border-radius: 50%;
}

.progress-text {
  position: relative;
  z-index: 1;
  font-size: 12px;
  font-weight: 600;
}

.about-section {
  margin-bottom: 32px;
}

.about-section h3 {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 12px 0;
}

.about-text {
  font-size: 14px;
  line-height: 1.5;
  color: #ccc;
  margin: 0;
}

.stats-section {
  margin-bottom: 32px;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #333;
}

.stat-item:last-child {
  border-bottom: none;
}

.stat-label {
  font-size: 14px;
  color: #888;
}

.stat-value {
  font-size: 14px;
  font-weight: 500;
}

.beneficiaries-section {
  margin-bottom: 32px;
}

.beneficiaries-section h3 {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 16px 0;
}

.beneficiary-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #111;
  border-radius: 8px;
}

.beneficiary-avatar {
  font-size: 20px;
}

.beneficiary-address {
  flex: 1;
  font-size: 14px;
}

.remove-btn {
  background: none;
  border: none;
  color: #888;
  font-size: 18px;
  cursor: pointer;
  padding: 4px;
}

.mint-section {
  text-align: center;
}

.mint-button {
  width: 100%;
  padding: 16px;
  background: #fff;
  color: #000;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 16px;
  transition: background-color 0.2s;
}

.mint-button:hover {
  background: #f0f0f0;
}

.mint-info {
  font-size: 12px;
  color: #4CAF50;
  line-height: 1.4;
  margin: 0 0 12px 0;
}

.disclaimer {
  font-size: 11px;
  color: #666;
  line-height: 1.3;
  margin: 0;
}

/* Share Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.share-modal {
  background: #1a1a1a;
  border-radius: 16px;
  padding: 24px;
  width: 90%;
  max-width: 400px;
  border: 1px solid #333;
}

.share-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.share-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
}

.close-button {
  background: none;
  border: none;
  color: #888;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-button:hover {
  color: #fff;
}

.share-token-info {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: #111;
  border-radius: 12px;
  margin-bottom: 20px;
}

.share-token-avatar {
  font-size: 32px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #333;
  border-radius: 50%;
}

.share-token-details {
  flex: 1;
}

.share-token-details h4 {
  margin: 0 0 4px 0;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
}

.share-token-details p {
  margin: 0 0 8px 0;
  font-size: 14px;
  color: #ccc;
}

.share-token-tag {
  background: #4CAF50;
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.share-token-image {
  width: 60px;
  height: 60px;
}

.token-placeholder {
  width: 100%;
  height: 100%;
  background: #333;
  border-radius: 8px;
  border: 2px solid #555;
}

.share-actions {
  display: flex;
  gap: 12px;
}

.share-action-btn {
  flex: 1;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.share-action-btn.primary {
  background: #333;
  color: #fff;
}

.share-action-btn.primary:hover {
  background: #444;
}

.share-action-btn.secondary {
  background: #fff;
  color: #000;
}

.share-action-btn.secondary:hover {
  background: #f0f0f0;
}
</style>