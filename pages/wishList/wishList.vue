<template>
	<view class="wrap">
		<view class="title">
			心愿单
		</view>
		<view class="conut">
			{{ total }}个房源
		</view>
		<view class="main">
			<view class="list u-flex u-row-between" v-for="item in listData">
				<view class="u-relative u-flex-2" style="margin-right: 18rpx;">
					<u-image width="100%" height="148rpx" :src="src" border-radius="10"></u-image>
					<view class="u-absolute" style="right: 10rpx;top: 4rpx;color: #FFFFFF;">
						<u-icon name="heart" color="#008489"></u-icon>
					</view>
				</view>
				<view class="u-flex-5">
					<view class="dese">整套公寓*2室1卫2床</view>
					<view class="roomName u-line-1">
						<view>【水水大多数】啊实打实的萨达萨达撒旦撒旦撒旦阿斯蒂撒旦撒的撒的撒大傻</view>
					</view>
					<view class="u-flex evaluation">
						<u-icon name="star-fill" color="#028389"></u-icon>
						<u-icon name="star-fill" color="#028389"></u-icon>
						<u-icon name="star-fill" color="#028389"></u-icon>
						<u-icon name="star-fill" color="#028389"></u-icon>
						<u-icon name="star-fill" color="#028389"></u-icon>
						<text style="font-weight: 600;">111条评价</text>·超赞房东
					</view>
					<view class="price">
						<text style="font-weight: 600;">￥188</text><text
							style="text-decoration: line-through;font-size: 20rpx;">￥188</text><text
							style="font-size: 20rpx;">/晚</text>
					</view>
				</view>
			</view>
			<u-loadmore :status="status" margin-top="8" margin-bottom="38" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
				status: 'loadmore',
				listQuery: {
					page: 1,
					pageSize: 10
				},
				total: 15,
				listData: 10
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
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		padding: 0 28rpx;

		.title {
			font-size: 56rpx;
			line-height: 188rpx;
			font-weight: 600;
		}

		.conut {
			font-size: 28rpx;
			line-height: 88rpx;
			font-weight: 700;
		}

		.main {
			.list {
				align-items: flex-start;
				border-bottom: 1rpx solid #eeeeee;
				padding: 28rpx 0;

				.dese {
					color: #997a64;
					font-size: 20rpx;
					margin-bottom: 6rpx;
				}

				.roomName {
					font-size: 24rpx;
					width: 490rpx;
				}

				.evaluation {
					line-height: 40rpx;
					font-size: 20rpx;
					color: #333333;
				}
			}

		}


	}
</style>
