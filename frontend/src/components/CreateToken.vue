<template>
  <div class="create-token-page">
    <Header />
    <div class="create-token-container">
      <div class="create-token-form">
        <div class="form-header">
          <button class="back-btn" @click="goBack">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <h1 class="form-title">创建代币</h1>
        </div>

      <form class="token-form" @submit.prevent="createToken">
        <!-- 图标 -->
        <div class="form-group">
          <label class="form-label">图标 <span class="required">*</span></label>
          <div class="icon-upload">
            <div class="upload-area" @click="triggerFileUpload">
              <input 
                ref="fileInput" 
                type="file" 
                accept="image/*" 
                @change="handleFileUpload" 
                style="display: none;"
              >
              <div class="upload-placeholder">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                  <path d="M12 8v8M8 12h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- 名称 -->
        <div class="form-group">
          <label class="form-label">名称 <span class="required">*</span></label>
          <input 
            v-model="formData.name" 
            type="text" 
            class="form-input" 
            placeholder="名称"
            required
          >
        </div>

        <!-- Ticker -->
        <div class="form-group">
          <label class="form-label">Ticker <span class="required">*</span></label>
          <input 
            v-model="formData.ticker" 
            type="text" 
            class="form-input" 
            placeholder="TICKER"
            required
          >
        </div>

        <!-- 描述 -->
        <div class="form-group">
          <label class="form-label">描述（可选）</label>
          <textarea 
            v-model="formData.description" 
            class="form-textarea" 
            placeholder="描述"
            rows="4"
          ></textarea>
        </div>

        <!-- 高级选项 -->
        <div class="form-group">
          <div class="advanced-options">
            <!-- 版权指定受益人 -->
            <div class="form-group">
              <label class="form-label">版权指定受益人</label>
              <input 
                v-model="formData.copyrightBeneficiary" 
                type="text" 
                class="form-input" 
                placeholder="版权指定受益人"
              >
            </div>

            <!-- 网站 -->
            <div class="form-group">
              <label class="form-label">网站（可选）</label>
              <input 
                v-model="formData.website" 
                type="url" 
                class="form-input" 
                placeholder="网站"
              >
            </div>

            <!-- X -->
            <div class="form-group">
              <label class="form-label">X（可选）</label>
              <input 
                v-model="formData.twitter" 
                type="text" 
                class="form-input" 
                placeholder="X"
              >
            </div>

            <!-- Telegram -->
            <div class="form-group">
              <label class="form-label">Telegram（可选）</label>
              <input 
                v-model="formData.telegram" 
                type="text" 
                class="form-input" 
                placeholder="Telegram"
              >
            </div>
          </div>
        </div>

        <!-- 提交按钮 -->
        <button type="submit" class="submit-btn" :disabled="!isFormValid">
          立即创建
        </button>
      </form>
    </div>
  </div>
  </div>
</template>

<script>
import Header from './Header.vue'

export default {
  components: {
    Header
  },
  name: 'CreateToken',
  data() {
    return {
      formData: {
        name: '',
        ticker: '',
        description: '',
        copyrightBeneficiary: '',
        website: '',
        twitter: '',
        telegram: '',
        icon: null
      }
    }
  },
  computed: {
    isFormValid() {
      return this.formData.name && this.formData.ticker
    }
  },
  methods: {
    goBack() {
      this.$router.push('/')
    },

    triggerFileUpload() {
      this.$refs.fileInput.click()
    },
    handleFileUpload(event) {
      const file = event.target.files[0]
      if (file) {
        this.formData.icon = file
        // 这里可以添加图片预览逻辑
      }
    },
    createToken() {
      if (!this.isFormValid) return
      
      // 这里处理创建代币的逻辑
      console.log('创建代币:', this.formData)
      // 可以调用API或其他处理逻辑
    }
  }
}
</script>

<style lang="less" scoped>
.create-token-page {
  min-height: 100vh;
  background: #000;
  color: #fff;
  display: flex;
  flex-direction: column;
}

.create-token-container {
  flex: 1;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 40px;
  overflow-y: auto;
}

.create-token-form {
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
    margin: 0;
    color: #fff;
  }
}

.token-form {
  .form-group {
    margin-bottom: 24px;
  }
  
  .form-label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 500;
    color: #ccc;
    
    .required {
      color: #ff4d4f;
    }
  }
  
  .form-input {
    width: 100%;
    padding: 12px 16px;
    background: #222;
    border: 1px solid #333;
    border-radius: 8px;
    color: #fff;
    font-size: 14px;
    transition: border-color 0.2s;
    
    &:focus {
      outline: none;
      border-color: #52c41a;
    }
    
    &::placeholder {
      color: #666;
    }
  }
  
  .form-textarea {
    width: 100%;
    padding: 12px 16px;
    background: #222;
    border: 1px solid #333;
    border-radius: 8px;
    color: #fff;
    font-size: 14px;
    resize: vertical;
    min-height: 100px;
    transition: border-color 0.2s;
    
    &:focus {
      outline: none;
      border-color: #52c41a;
    }
    
    &::placeholder {
      color: #666;
    }
  }
}

.icon-upload {
  .upload-area {
    width: 80px;
    height: 80px;
    border: 2px dashed #333;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: border-color 0.2s;
    
    &:hover {
      border-color: #52c41a;
    }
    
    .upload-placeholder {
      color: #666;
    }
  }
}



.advanced-options {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #333;
}

.submit-btn {
  width: 100%;
  padding: 14px;
  background: #52c41a;
  border: none;
  border-radius: 8px;
  color: #000;
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

@media (max-width: 768px) {
  .create-token-container {
    padding: 16px;
    padding-top: 20px;
  }
  
  .create-token-form {
    padding: 20px;
  }
  
  .form-header {
    margin-bottom: 24px;
    
    .form-title {
      font-size: 20px;
    }
  }
}
</style>