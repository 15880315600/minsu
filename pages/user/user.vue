<template>
	<view class="wrap">
		<view class="u-flex u-row-between top">
			<view class="topName" v-if="JSON.stringify(userInfo) == '{}'">
				<view class="phone">
					您还未登录
				</view>
			</view>
			<view class="topName" v-else>
				<view class="name">
					{{ userInfo.name }}
				</view>
				<view class="phone">
					{{ userInfo.phone }}
				</view>
				<view class="phone">
					余额：{{ userInfo.balance }}
				</view>
			</view>
			<view style="color: #18B566;" @click="jump('../login/login')" v-if="JSON.stringify(userInfo) == '{}'">
				立即登录
			</view>
		</view>
		<view class="orderList">
			<view class="title">
				我的房源订单
			</view>
			<view class="u-flex">
				<view class="item u-flex-1" @click="jump('./orderList?current='+ 0)">
					<view class="img  u-flex u-col-bottom">
						<u-image width="68rpx" height="68rpx" src="/static/img/complete.png"></u-image>
					</view>
					<view class="text-area">
						有效订单
					</view>
				</view>
				<view class="item u-flex-1" @click="jump('./orderList?current='+ 1)">
					<view class="img  u-flex u-col-bottom">
						<u-image width="68rpx" height="68rpx" src="/static/img/payment.png"></u-image>
					</view>
					<view class="text-area">
						待支付订单
					</view>
				</view>
				<view class="item u-flex-1">
				</view>
			</view>
		</view>
<!-- 		<view class="orderList">
			<view class="title">
				我的支付记录
			</view>
			<view class="u-flex">
				<view class="item u-flex-1" @click="jump('./orderList')">
					<view class="img  u-flex u-col-bottom">
						<u-image width="68rpx" height="68rpx" src="/static/img/allOrder.png"></u-image>
					</view>
					<view class="text-area">
						支付记录
					</view>
				</view>
				<view class="item u-flex-1">
				</view>
				<view class="item u-flex-1">
				</view>
			</view>

		</view> -->
		<view class="orderList">
			<view class="title">
				帮助中心
			</view>
			<view class="u-flex">
				<view class="item" style="width: 33.3%;" @click="jump()">
					<view class="img u-flex u-col-bottom">
						<u-image width="68rpx" height="68rpx" src="/static/img/surrounding.png"></u-image>
					</view>
					<view class="text-area">
						周边景点
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
				userInfo: {}
			}
		},
		onLoad() {

		},
		onShow() {
			this.getUserInfo()
		},
		methods: {
			jump(url) {
				uni.navigateTo({
					url: url
				})
			},
			getUserInfo() {
				if (uni.getStorageSync("userInfo")) {
					this.userInfo = JSON.parse(uni.getStorageSync("userInfo"))
				} else {
					this.$u.api.getUserInfo().then(res => {
						let userInfo = res.data
						uni.setStorageSync("userInfo", JSON.stringify(userInfo))
					})
				}
				console.log(this.userInfo)
			},

		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		padding: 150rpx 28rpx 0;

		.top {
			border-bottom: 1rpx solid #eeeeee;

			.topName {
				padding: 28rpx 0;

				.name {
					font-size: 40rpx;
					font-weight: 600;
				}

				.phone {
					color: #606266;
					margin-top: 10rpx;
				}
			}
		}


		.orderList {
			padding: 28rpx 0;
			border-bottom: 1rpx solid #eeeeee;

			.title {
				font-weight: 700;
				margin-bottom: 28rpx;
			}

			.item {
				text-align: center;

				.img {
					width: 68rpx;
					height: 68rpx;
					margin: 0 auto;
				}

				.text-area {
					font-size: 22rpx;
					font-weight: 600;
					margin-top: 18rpx;
				}

			}
		}
	}
</style>
