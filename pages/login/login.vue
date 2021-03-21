<template>
	<view>
		<view class="back_img u-flex u-row-right u-padding-right-50">
			<u-image src="/static/img/background.png" width="240rpx" height="240rpx" alt=""></u-image>
		</view>
		<view class="wrap">
			<u-form :model="form" ref="uForm">
				<view v-if="!phoneLogin">
					<u-form-item>
						<u-input v-model="form.username" placeholder="请输入账户" :clearable="false" />
					</u-form-item>
					<u-form-item>
						<u-input v-model="form.password" type="password" :password-icon="true" placeholder="请输入密码"
							:clearable="false" />
					</u-form-item>
				</view>
				<view v-else>
					<u-form-item>
						<u-input v-model="form.userPhone" placeholder="请输入手机号" :clearable="false" />
					</u-form-item>
					<u-form-item>
						<u-input v-model="form.phoneCode" placeholder="请输入验证码" :clearable="false" />
						<u-button class="code" size="mini" round @click="getCode">获取验证码</u-button>
					</u-form-item>
				</view>
			</u-form>
			<view class="attention u-flex u-row-between">
				<view v-if="!phoneLogin" @click="logWay">用手机号码验证登录</view>
				<view v-else @click="logWay">用密码验证登录</view>
				<view>忘记密码</view>
			</view>
			<view>
				<u-button class="login" @click="submit">登录</u-button>
			</view>
			<view class="register" @click="doRegister"> 注册</view>
		</view>
	</view>
</template>

<script>
	// import {
	//   setToken
	// } from '@/utils/auth'
	// import {
	//   phoneLogin,
	//   login,
	//   getCode
	// } from '@/api/user'
	export default {
		components: {

		},
		data() {
			return {
				phoneLogin: false,
				loading: false,
				form: {}
			}
		},
		created() {

		},
		methods: {
			submit() {
				// this.loading = true
				// if (this.phoneLogin) {
				//   phoneLogin(this.form).then(res => {
				//     const token = res.result.tokenHead + ' ' + res.result.token
				//     this.loading = false
				//     setToken(token)
				//     setTimeout(() => {
				//       this.$router.push({
				//         path: '/'
				//       })
				//     }, 1000)
				//   }).catch(() => {
				//     this.loading = false
				//   })
				// } else {
				//   login(this.form).then(res => {
				//     const token = res.result.tokenHead + ' ' + res.result.token
				//     this.loading = false
				//     setToken(token)
				//     setTimeout(() => {
				//       this.$router.push({
				//         path: '/'
				//       })
				//     }, 1000)
				//   }).catch(() => {
				//     this.loading = false
				//   })
				// }
			},
			getCode() {
				// if (this.form.userPhone) {
				//   this.loading = true
				//   const data = {}
				//   data.phone = this.form.userPhone
				//   getCode(data).then(res => {
				//     this.$message({
				//       message: '发送成功',
				//       type: 'success'
				//     })
				//     this.loading = false
				//   }).catch(() => {
				//     this.loading = false
				//   })
				// } else {
				//   this.$message({
				//     message: '请先输入手机号',
				//     type: 'error'
				//   })
				//   return false
				// }
			},
			doRegister() {
				uni.navigateTo({
					url:'./registered'
				})
			},
			logWay() {
				if (this.phoneLogin) {
				  this.phoneLogin = false
				} else {
				  this.phoneLogin = true
				}
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
		color: #008489;
		line-height: 32rpx;
	}

	.login {
		width: 100%;
		height: 76rpx;
		background: #008489;
		font-size: 28rpx;
		font-weight: 600;
		color: #FFFFFF;
		margin-top: 170rpx;
	}

	.register {
		font-size: 24rpx;
		font-weight: 400;
		color: #008489;
		text-align: center;
		line-height: 80rpx;
	}

	.code {
		position: absolute;
		right: 0;
		top: 12rpx;
		background: #008489;
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
