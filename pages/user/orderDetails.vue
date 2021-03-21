<template>
	<view class="wrap">
		<view class="img u-relative">
			<u-image width="100%" height="480rpx" :src="src"></u-image>
			<view class="u-absolute sta">
				订单未支付
			</view>
			<view class="topBack u-absolute" @click="jump('./orderList')">
				<u-icon name="arrow-leftward" color="#ffffff" size="38"></u-icon>
			</view>
		</view>
		<view class="main">
			<view class="roomName">
				<view class="top">
					3月21日周日-3月22日周一
				</view>
				<view class="title">
					【卡比*星享】江景投影复古墨绿写真居/西街2公里/动车站15分钟/乳胶床垫自助入住/夜景超美带飘窗
				</view>
			</view>
			<view class="checkInTime u-flex">
				<view class="u-flex-1">
					<view class="top">
						入住
					</view>
					<view class="time">
						<view class="date">2021年3月21日</view>
						<view class="dateTime">下午3：00</view>
					</view>
				</view>
				<view class="u-flex-1 right">
					<view class="top">
						退房
					</view>
					<view class="time">
						<view class="date">2021年3月21日</view>
						<view class="dateTime">下午3：00</view>
					</view>
				</view>
			</view>
			<view class="list">
				<view class="label">订单号</view>
				<view>488481521841251551</view>
			</view>
			<view class="list">
				<view class="label">订单号</view>
				<view>488481521841251551</view>
			</view>
			<view class="list">
				<view class="label">订单号</view>
				<view>488481521841251551</view>
			</view>
			<view class="list">
				<view class="label">订单号</view>
				<view>488481521841251551</view>
			</view>

		</view>
		<view class="bottom u-flex u-row-right">
			<view class="btn">
				评价
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
				listQuery: {},
				listData: {}
			}
		},
		onLoad() {

		},
		methods: {
			jump(url) {
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		padding-bottom: 58rpx;

		.img {
			.sta {
				line-height: 56rpx;
				padding: 0 16rpx;
				font-size: 24rpx;
				background: #FFFFFF;
				border-radius: 6rpx;
				border: 1rpx solid #eeeeee;
				right: 28rpx;
				bottom: 28rpx;
			}

			.topBack {
				left: 28rpx;
				top: 68rpx;
			}
		}

		.main {
			padding: 0 28rpx;
			margin-bottom: 100rpx;

			.roomName {
				padding: 28rpx 0;

				.top {
					font-size: 20rpx;
					color: #8a8a8a;
					line-height: 48rpx;
				}

				.title {
					font-weight: 600;
				}
			}

			.checkInTime {
				border-bottom: 1rpx solid #eeeeee;
				padding: 28rpx 0;

				.top {
					font-size: 20rpx;
					color: #8a8a8a;
					line-height: 48rpx;
				}

				.time {
					margin-top: 18rpx;

					.date {
						line-height: 48rpx;
						font-size: 24rpx;
					}

					.dateTime {
						font-size: 28rpx;
						font-weight: 600;
					}
				}

				.right {
					border-left: 1rpx solid #eeeeee;
					padding-left: 48rpx;
				}
			}

			.list {
				padding: 28rpx 0;
				font-size: 24rpx;
				border-bottom: 1rpx solid #eeeeee;

				.label {
					font-weight: 700;
				}

				&>view {
					line-height: 40rpx;
				}
			}

		}

		.bottom {
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 100rpx;
			padding: 0 28rpx;
			background: #FFFFFF;
			border: 1rpx solid #EEEEEE;

			.btn {
				padding: 10rpx 28rpx;
				border-radius: 50rpx;
				font-size: 24rpx;
				background: #008489;
				color: #FFFFFF;
				border: 1rpx solid #EEEEEE;
			}
		}


	}
</style>
