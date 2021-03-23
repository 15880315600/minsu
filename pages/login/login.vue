<template>
	<view>
		<view class="back_img u-flex u-row-right u-padding-right-50">
			<u-image src="/static/img/background.png" width="240rpx" height="240rpx" alt=""></u-image>
		</view>
		<view class="wrap">
			<u-form :model="form" ref="uForm">
				<view>
					<u-form-item>
						<u-input v-model="form.account" placeholder="请输入手机号" :clearable="false" />
					</u-form-item>
					<u-form-item>
						<u-input v-model="form.password" placeholder="请输入验证码" :clearable="false" />
						<u-button class="code" size="mini" round @click="getCode">获取验证码</u-button>
					</u-form-item>
				</view>
			</u-form>
			<view>
				<u-button class="login" @click="submit">登录</u-button>
			</view>
			<view class="register" @click="doRegister"> 注册</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				phoneLogin: false,
				loading: false,
				form: {
					password: ''
				}
			}
		},
		created() {

		},
		methods: {
			submit() {
				this.$u.api.login(this.form).then(res => {

					let token = res.data.tokenHead + ' ' + res.data.token
					uni.setStorageSync("token", token)
					this.$u.api.getUserInfo().then(res2 => {
						let userInfo = res2.data
						uni.setStorageSync("userInfo", JSON.stringify(userInfo))
						uni.showToast({
							title: '登录成功',
							icon: 'none'
						})
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1000)

					})


				})
			},
			getCode() {
				if (!this.form.account) {
					uni.showToast({
						title: '请先输入手机号',
						icon: 'none'
					})
					return
				}
				let setData = {
					phone: this.form.account
				}
				this.$u.api.getCode(setData).then(res => {
					uni.showToast({
						title: '发送成功',
						icon: 'success'
					})
					console.log(res)
					this.form.password = res.data
				})
			},
			doRegister() {
				uni.navigateTo({
					url: './registered'
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
