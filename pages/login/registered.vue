<template>
  <view>
    <view class="back_img u-flex u-row-right u-padding-right-50">
    	<u-image src="/static/img/background.png" width="240rpx" height="240rpx" alt=""></u-image>
    </view>
    <view class="wrap">
      <u-form v-loading="loading" ref="form" :model="form" :rules="rules">
        <view>
          <u-form-item prop="userPhone">
            <u-input v-model="form.userPhone" placeholder="请输入手机号" />
          </u-form-item>
          <u-form-item>
            <u-input v-model="form.phoneCode" placeholder="请输入验证码" />
            <u-button class="code" size="mini" round @click="getCode">获取验证码</u-button>
          </u-form-item>
          <u-form-item>
            <u-input v-model="form.userPassword" show-password placeholder="请输入密码" />
          </u-form-item>
        </view>
      </u-form>
      <view>
        <u-button class="login" @click="submit">注册</u-button>
      </view>
      <view class="register" @click="doLogin">使用已有账号登录</view>
    </view>
  </view>
</template>

<script>
// import {
//   registered,
//   getCode
// } from '@/api/user'
export default {
  components: {

  },
  data() {
    return {
      phoneLogin: false,
      form: {},
      rules: {
        userPhone: [{
          required: true,
          message: '请输入手机号',
          trigger: 'blur'
        }]
      },
      loading: false
    }
  },
  created() {

  },
  methods: {
    submit() {
      this.loading = true
      registered(this.form).then(res => {
        this.loading = false
        this.$message({
          message: '注册成功',
          type: 'success'
        })
        setTimeout(() => {
          this.$router.push({
            path: '/login'
          })
        }, 1000)
      }).catch(() => {
        this.loading = false
      })
    },
    getCode() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          const data = {}
          data.phone = this.form.userPhone
          getCode(data).then(res => {
            this.$message({
              message: '发送成功',
              type: 'success'
            })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    doLogin() {
      uni.navigateTo({
      	url:'./login'
      })
    }
  }

}
</script>

<style scoped>
  .back_img {
    padding: 160rpx 0;
  }

  .wrap {
    padding: 0 100rpx;
  }

  .attention {
    margin: 32rpx auto;
    font-size: 24rpx;
    font-weight: 400;
    color: #ef5964;
    line-height: 32rpx;
  }

  .login {
    width: 100%;
    height: 76rpx;
    background: #ef5964;
    font-size: 28rpx;
    font-weight: 600;
    color: #FFFFFF;
    margin-top: 46rpx;
  }

  .register {
    font-size: 24rpx;
    font-weight: 400;
    color: #ef5964;
    text-align: center;
    line-height: 80rpx;
  }

  .code {
    position: absolute;
    right: 0;
    background: #ef5964;
    color: #fff;
  }
</style>
<style>
  .wrap .u-input__inner {
    border-bottom: 2rpx solid #c9c9c9;
    border-top: none;
    border-left: none;
    border-right: none;
    border-radius: 0;
  }
</style>
