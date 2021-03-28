<template>
	<view class="wrap">
		<view style="height: 44rpx;"></view>
		<view class="topBack" @click="back('./user')">
			<u-icon name="arrow-leftward" color="#333333" size="38"></u-icon>
		</view>
		<view class="title">
			订单中心
		</view>
		<view style="width: 400rpx;">
			<u-tabs :list="list" bar-width="100" height="100" active-color="#232323" inactive-color="#656565"
				:is-scroll="false" font-size="24" :current="current" @change="change"></u-tabs>
		</view>
		<view class="main" v-if="listData.length >0">
			<view class="list u-flex u-row-between" v-for="item in listData" @click="jump(item)">
				<view class="u-flex-3">
					<view class="dese">{{ item.tittle }}</view>
					<view class="checkInTime">
						{{ item.orderReserveTimeStart.split(' ')[0] }} - {{ item.orderReserveTimeEnd.split(' ')[0] }}
					</view>
					<view class="price">
						<text style="color: #953c2a;font-weight: 600;" v-if="current == 0">已支付</text>
						<text style="color: #953c2a;font-weight: 600;" v-else>待支付</text>·
						<text>￥{{ item.orderPricePay }}</text>
					</view>
				</view>
				<view class="u-relative u-flex-1" style="margin-left: 18rpx;">
					<u-image width="100%" height="128rpx" :src="src" border-radius="10"></u-image>
					<view class="u-absolute" style="right: 10rpx;top: 4rpx;color: #FFFFFF;">
						<u-icon name="heart" color="#008489"></u-icon>
					</view>
				</view>
			</view>
			<view style="padding: 28rpx 0;">
				<u-loadmore :status="status" />
			</view>
		</view>
		<view v-else>
			<u-empty mode="order" style="margin-top: 180rpx;"></u-empty>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
				list: [{
					name: '有效订单'
				}, {
					name: '待支付'
				}],
				current: 0,
				status: 'loadmore',
				listQuery: {
					page: 1,
					pageSize: 10
				},
				total: 0,
				listData: []
			}
		},
		onLoad(e) {
			this.current = e.current
			if (this.current == 0) {
				this.feachData()
			} else {
				this.feachData1()
			}
		},
		onReachBottom() {
			let str = Math.ceil(this.total / 10)
			if (this.listQuery.page >= str) {
				this.status = 'nomore'
				return
			}
			this.status = 'loading';
			this.listQuery.page = ++this.listQuery.page;
			if (this.current == 0) {
				this.$u.api.userPay(this.listQuery).then(res => {
					let list = res.data.records
					let arr = []
					list.forEach((item, index) => {
						arr.push(item)
					})
					this.listData = this.listData.concat(arr)
				})
			}

		},
		methods: {
			feachData1() {
				this.$u.api.myWaitPay().then(res => {
					this.listData = res.data
				})
			},
			feachData() {
				this.$u.api.userPay(this.listQuery).then(res => {
					this.listData = res.data.records
					this.total = res.data.total
					if (this.total <= 10) {
						this.status = 'nomore';
					}
				})
			},
			jump(item) {
				item.current = this.current
				uni.setStorageSync("item", JSON.stringify(item))
				uni.navigateTo({
					url: './orderDetails'
				})
			},
			back(url) {
				uni.switchTab({
					url: url
				})
			},
			change(index) {
				this.current = index;
				if (this.current == 0) {
					this.feachData()
				} else {
					this.feachData1()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		padding: 0 28rpx;

		.topBack {
			margin-top: 48rpx;
		}

		.title {
			line-height: 120rpx;
			font-size: 44rpx;
			font-weight: 600;
		}

		.main {
			.list {
				align-items: flex-start;
				border-bottom: 1rpx solid #eeeeee;
				padding: 28rpx 0;

				.dese {
					font-weight: 600;
					font-size: 26rpx;
					margin-bottom: 6rpx;
				}

				.checkInTime {
					font-size: 24rpx;
					color: #737373;
				}

				.price {
					line-height: 40rpx;
					font-size: 20rpx;
					color: #333333;
				}
			}

		}
	}
</style>
