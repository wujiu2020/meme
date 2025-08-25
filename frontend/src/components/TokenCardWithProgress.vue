<template>
  <div class="token-card">
    <div class="token-header">
      <div class="token-info">
        <div class="token-avatar">{{ token.avatar }}</div>
        <div class="token-name-symbol">
          <div class="token-name">{{ token.name }}</div>
          <div class="token-symbol">{{ token.symbol }}</div>
        </div>
      </div>
      <div class="token-percentage">
        <div class="percentage-display">
          <div 
            class="percentage-container" 
            :style="{ '--progress-angle': (parseFloat(token.percentage) / 100) * 360 + 'deg' }"
          >
            <div class="percentage-inner">
              <div class="percentage-text">{{ token.percentage }}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TokenCardWithProgress',
  props: {
    token: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="less">
.token-card {
  background: #0e0e0e;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  transition: all 0.3s ease;
  min-height: 88px;
  display: flex;
  align-items: center;
  
  &:hover {
    background: #1a1a1a;
    transform: translateY(-2px);
  }
}

.token-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.token-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.token-avatar {
  font-size: 24px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #2a2a2a;
  border-radius: 8px;
}

.token-name-symbol {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.token-name {
  color: #fff;
  font-weight: 600;
  font-size: 16px;
}

.token-symbol {
  color: #888;
  font-size: 14px;
}

.token-percentage {
  display: flex;
  align-items: center;
}

.percentage-display {
  display: flex;
  align-items: center;
}

.percentage-container {
  width: 70px;
  height: 34px;
  border-radius: 8px;
  padding: 2px;
  background: conic-gradient(
    from 0deg,
    #22c55e 0deg,
    #22c55e var(--progress-angle, 0deg),
    transparent var(--progress-angle, 0deg),
    transparent 360deg
  );
  display: flex;
  align-items: center;
  justify-content: center;
}

.percentage-inner {
  width: 100%;
  height: 100%;
  background: #0E0E0E;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.percentage-text {
  color: white;
  font-size: 14px;
  font-weight: 500;
}


</style>