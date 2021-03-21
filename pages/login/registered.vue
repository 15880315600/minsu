<template>
	<view>
		<view class="back_img u-flex u-row-right u-padding-right-50">
			<u-image src="/static/img/background.png" width="240rpx" height="240rpx" alt=""></u-image>
		</view>
		<view class="wrap">
			<u-form ref="form" :model="form" :rules="rules">
				<view>
					<u-form-item prop="name">
						<u-input v-model="form.name" placeholder="请输入用户名" />
					</u-form-item>
					<u-form-item prop="phone">
						<u-input v-model="form.phone" placeholder="请输入手机号" />
					</u-form-item>
					<u-form-item>
						<u-input v-model="form.code" placeholder="请输入验证码" />
						<u-button class="code" size="mini" round @click="getCode">获取验证码</u-button>
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
	export default {
		components: {

		},
		data() {
			return {
				phoneLogin: false,
				form: {},
				rules: {
					name: [{
						required: true,
						message: '请输入用户名',
						trigger: 'blur'
					}],
					phone: [{
						required: true,
						message: '请输入手机号',
						trigger: 'blur'
					}],
					code: [{
						required: true,
						message: '验证码不能为空',
						trigger: 'blur'
					}]
				},
			}
		},
		created() {

		},
		methods: {
			submit() {
				this.$u.api.register(this.form).then(res => {
					this.$message({
						message: '注册成功',
						type: 'success'
					})
					setTimeout(() => {
						uni.navigateTo({
							url: './login'
						})
					}, 1000)
				})
			},
			getCode() {
				this.$u.api.getCode(this.form).then(res => {
					uni.showToast({
						title: '发送成功',
						icon: 'success'
					})
				})
			},
			doLogin() {
				uni.navigateTo({
					url: './login'
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
		margin-top: 46rpx;
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
