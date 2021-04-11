<template>
	<view class="wrap">
		<view class="img u-relative">
			<u-image width="100%" height="480rpx" :src="baseUrl + listData.orderImage"></u-image>
			<view class="u-absolute sta" v-if="listData.current == 0">
				订单已支付
			</view>
			<view class="u-absolute sta" v-if="listData.current == 1">
				订单未支付
			</view>
			<view class="topBack u-absolute" @click="jump()">
				<u-icon name="arrow-leftward" color="#ffffff" size="38"></u-icon>
			</view>
		</view>
		<view class="main">
			<view class="roomName">
				<view class="top">
					{{ listData.orderReserveTimeStart.split(' ')[0] }} -
					{{ listData.orderReserveTimeEnd.split(' ')[0] }}
				</view>
				<view class="title">
					{{ listData.orderBody }}
				</view>
			</view>
			<view class="checkInTime u-flex">
				<view class="u-flex-1">
					<view class="top">
						入住
					</view>
					<view class="time">
						<view class="date">{{ listData.orderReserveTimeStart.split(' ')[0] }}</view>
						<view class="dateTime">下午4：00</view>
					</view>
				</view>
				<view class="u-flex-1 right">
					<view class="top">
						退房
					</view>
					<view class="time">
						<view class="date">{{ listData.orderReserveTimeEnd.split(' ')[0] }}</view>
						<view class="dateTime">中午12：00</view>
					</view>
				</view>
			</view>
			<view class="list">
				<view class="label">预留人姓名</view>
				<view>{{ listData.reserveName }}</view>
			</view>
			<view class="list">
				<view class="label">预留人手机</view>
				<view>{{ listData.reservePhone }}</view>
			</view>
			<view class="list">
				<view class="label">订单号</view>
				<view>{{ listData.orderNo }}</view>
			</view>
			<view class="list">
				<view class="label">备注</view>
				<view>{{ listData.orderRemark }}</view>
			</view>
			<view class="list">
				<view class="label">支付总价</view>
				<view>{{ listData.orderPricePay }}</view>
			</view>
			<view class="list">
				<view class="label">创建时间</view>
				<view>{{ listData.orderCreateTime }}</view>
			</view>



		</view>
		<view class="bottom u-flex u-row-right"  v-if="listData.current == 1">
			<view class="btn" @click="show = true">
				支付
			</view>
		</view>
		<u-keyboard default="" ref="uKeyboard" mode="number" :mask="true" :mask-close-able="false" :dot-enabled="false"
			v-model="show" :safe-area-inset-bottom="true" :tooltip="false" @change="onChange" @backspace="onBackspace">
			<view>
				<view class="u-text-center u-padding-20 money">
					<text>{{ listData.orderPricePay }}</text>
					<text class="u-font-20 u-padding-left-10">元</text>
					<view class="u-padding-10 close" data-flag="false" @tap="showPop(false)">
						<u-icon name="close" color="#333333" size="28"></u-icon>
					</view>
				</view>
				<view class="u-flex u-row-center">
					<u-message-input mode="box" :maxlength="6" :dot-fill="true" v-model="password"
						:disabled-keyboard="true"></u-message-input>
				</view>
				<view class="u-text-center u-padding-top-10 u-padding-bottom-20 tips">支付键盘</view>
			</view>
		</u-keyboard>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listQuery: {},
				listData: {},
				show: false,
				password: '',
			}
		},
		onLoad() {
			this.listData = JSON.parse(uni.getStorageSync("item"))
			console.log(this.listData)
		},
		methods: {
			jump(url) {
				uni.navigateTo({
					url: './orderList?current=' + this.listData.current
				})
			},
			onChange(val) {
				if (this.password.length < 6) {
					this.password += val;
				}

				if (this.password.length >= 6) {
					this.pay();
				}
			},
			onBackspace(e) {
				if (this.password.length > 0) {
					this.password = this.password.substring(0, this.password.length - 1);
				}
			},
			pay() {
				uni.showLoading({
					title: '支付中'
				})
				this.$u.api.pay(this.setData).then(res => {
					uni.hideLoading();
					this.show = false;
					uni.showToast({
						icon: 'success',
						title: '支付成功'
					})
				}).catch(error=>{
					this.show = false
				})
			},
			showPop(flag = true) {
				this.password = '';
				this.show = flag;
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

		.money {
			font-size: 80rpx;
			color: $u-type-warning;
			position: relative;

			.close {
				position: absolute;
				top: 20rpx;
				right: 20rpx;
				line-height: 28rpx;
				font-size: 28rpx;
			}
		}

		.tips {
			color: $u-tips-color;
		}
	}
</style>
