<template>
	<view class="wrap">
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
		<view class="main">
			<view class="list u-flex u-row-between" v-for="item in listData" @click="jump('./orderDetails')">
				<view class="u-flex-3">
					<view class="dese">整套公寓*2室1卫2床</view>
					<view class="checkInTime">
						2021/03/21-03/22·1晚
					</view>
					<view class="price">
						<text style="color: #953c2a;font-weight: 600;">订单待支付</text>·
						<text>￥188</text>
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: 'https://cdn.uviewui.com/uview/swiper/1.jpg',

				list: [{
					name: '全部订单'
				}, {
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
				total: 15,
				listData: 10
			}
		},
		onLoad() {

		},
		onReachBottom() {
			let str = Math.ceil(this.total / 10)
			if (this.listQuery.page >= str) {
				this.status = 'nomore'
				return
			}
			this.status = 'loading';
			this.listQuery.page = ++this.listQuery.page;
			this.listData += 10
			// this.$u.api.cartList(this.listQuery).then(res => {
			// 	let cardList = res.result.records
			// 	let arr = []
			// 	cardList.forEach((item, index) => {
			// 		item.productAttrs = JSON.parse(item.productAttr)
			// 		let spDatas = Object.values(item.productAttrs)
			// 		item.spData = spDatas.toString()
			// 		item.checked = false
			// 		arr.push(item)
			// 	})
			// 	this.cardList = this.cardList.concat(arr)
			// })

		},
		methods: {
			jump(url) {
				uni.navigateTo({
					url: url
				})
			},
			back(url){
				uni.switchTab({
					url:url
				})
			},
			change(index) {
				this.current = index;
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
