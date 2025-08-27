<template>
 <div class="token-display">
    <div class="balance-info">
       <span class="form-label">{{ label }}</span>
       <div class="balance-right">
         <svg class="wallet-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
           <path d="M13.5 4H14C14.55 4 15 4.45 15 5V11C15 11.55 14.55 12 14 12H13.5V13C13.5 13.825 12.825 14.5 12 14.5H3C2.175 14.5 1.5 13.825 1.5 13V3C1.5 2.175 2.175 1.5 3 1.5H12C12.825 1.5 13.5 2.175 13.5 3V4ZM12 3H3V13H12V12H10C9.45 12 9 11.55 9 11V5C9 4.45 9.45 4 10 4H12V3ZM10.5 8.5C10.5 8.775 10.275 9 10 9C9.725 9 9.5 8.775 9.5 8.5C9.5 8.225 9.725 8 10 8C10.275 8 10.5 8.225 10.5 8.5Z" fill="currentColor"/>
         </svg>
         <span class="balance-amount">{{ token ? token.balance : '0.00' }}</span>
       </div>
     </div>
    <div class="main-row">
      <div class="token-info" v-if="token">
        <span class="token-avatar">{{ token.avatar }}</span>
        <span class="token-symbol">{{ token.symbol }}</span>
        <button v-if="selectable" type="button" class="select-btn" @click="$emit('select-token')">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
      <div v-else class="token-placeholder" @click="$emit('select-token')">
        <span class="placeholder-text">选择代币</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="amount-section">
        <span class="amount-display" v-if="!isEditable">{{ amount || '0.0' }}</span>
        <input
          v-else
          type="number"
          class="amount-input"
          :value="amount"
          @input="$emit('update:amount', $event.target.value)"
          placeholder="0.0"
        />
      </div>
    </div>
    <div class="value-section">
      <span class="value-display">${{ valueUSD }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TokenDisplay',
  props: {
    token: {
      type: Object,
      default: () => null
    },
    amount: {
      type: [String, Number],
      default: '0.0'
    },
    valueUSD: {
      type: [String, Number],
      default: '0.00'
    },
    isEditable: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    selectable: {
      type: Boolean,
      default: true
    }
  },
  emits: ['select-token', 'update:amount']
}
</script>

<style scoped>
.token-display {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background: #1a1a1a;
  border-radius: 12px;
}

.main-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
}

.token-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.token-avatar {
  font-size: 20px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #2a2a2a;
  border-radius: 50%;
}

.token-symbol {
  font-size: 16px;
  font-weight: 600;
  color: #fff;
}

.select-btn {
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
  margin-left: 8px;
}

.select-btn:hover {
  color: #fff;
  background: #333;
}

.token-placeholder {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: #2a2a2a;
  border: 1px dashed #555;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.token-placeholder:hover {
  background: #333;
  border-color: #777;
}

.placeholder-text {
  font-size: 14px;
  color: #888;
  font-weight: 500;
}

.token-placeholder svg {
  color: #888;
}

.balance-info {
   display: flex;
   align-items: center;
   justify-content: space-between;
 }

 .balance-right {
   display: flex;
   align-items: center;
   gap: 8px;
 }

 .form-label {
   font-size: 14px;
   font-weight: 500;
   color: #fff;
 }

.wallet-icon {
  color: #888;
  width: 16px;
  height: 16px;
}

.balance-amount {
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
  text-align: right;
}

.amount-section {
  display: flex;
  justify-content: flex-end;
}

.amount-display {
  font-size: 24px;
  font-weight: 600;
  color: #fff;
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
}

.amount-input {
  background: transparent;
  border: none;
  outline: none;
  color: #fff;
  font-size: 24px;
  font-weight: 600;
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
  text-align: right;
  width: 100%;
  padding: 0;
  -webkit-appearance: none;
  -moz-appearance: textfield;
  margin: 0;
}

.amount-input::-webkit-outer-spin-button,
.amount-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.amount-input::placeholder {
  color: #666;
}

.amount-input:focus {
  color: #4CAF50;
}

.value-section {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
}

.value-display {
  font-size: 14px;
  font-weight: 500;
  color: #888;
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
  text-align: right;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .main-row {
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
  }

  .amount-section {
    align-self: flex-end;
  }

  .amount-display,
  .amount-input {
    font-size: 20px;
  }
}
</style>