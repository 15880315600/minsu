<template>
	<view class="wrap">
		<view class="topSearch">
			<view class="u-flex">
				<view class="u-flex-4" style="border-right: 4rpx solid #f1f1f1;margin-right: 28rpx;">
					<u-input v-model="listQuery.intro" placeholder="景点/地址/房源名" :clearable="false" />
				</view>
				<view class="u-flex-1 date">
					<view>
						03/21入住
					</view>
					<view>
						03/22退房
					</view>
				</view>
			</view>
		</view>
		<view>
			<u-dropdown title-size="24" active-color="#008489">
				<u-dropdown-item v-model="listQuery.value1" title="人数" :options="options1"></u-dropdown-item>
				<u-dropdown-item v-model="listQuery.value2" title="位置区域" :options="options2"></u-dropdown-item>
				<u-dropdown-item v-model="listQuery.value2" title="综合排序" :options="options2"></u-dropdown-item>
				<u-dropdown-item v-model="listQuery.value2" title="筛选" :options="options2"></u-dropdown-item>
			</u-dropdown>
		</view>
		<view class="roomList">
			<view class="title">
				{{ total }}处住宿
			</view>
			<view class="list">
				<view class="main" v-for="item in listData" @click="jump('./roomDetails')">
					<u-swiper :autoplay="false" :list="list" height="400" border-radius="18"></u-swiper>
					<view class="dese">
						整套公寓*2室1卫2床
					</view>
					<view class="roomName u-line-2">
						【水水大多数】啊实打实的萨达萨达撒旦撒旦撒旦阿斯蒂撒旦撒的撒的撒大傻
					</view>
					<view class="price">
						<text style="font-weight: 600;">￥188</text><text
							style="text-decoration: line-through;font-size: 24rpx;">￥188</text><text
							style="font-size: 24rpx;">/晚</text>
					</view>
				</view>
				<view style="padding: 28rpx 0;">
					<u-loadmore :status="status" />
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
				status: 'loadmore',
				listQuery: {
					page: 1,
					pageSize: 10
				},
				total: 15,
				listData: 10,
				options1: [{
						label: '默认排序',
						value: 1,
					},
					{
						label: '距离优先',
						value: 2,
					},
					{
						label: '价格优先',
						value: 3,
					}
				],
				options2: [{
						label: '去冰',
						value: 1,
					},
					{
						label: '加冰',
						value: 2,
					}
				],
				list: ['https://cdn.uviewui.com/uview/swiper/1.jpg',
					'https://cdn.uviewui.com/uview/swiper/2.jpg',
					'https://cdn.uviewui.com/uview/swiper/3.jpg'
				],
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {

		.topSearch {
			margin: 28rpx 28rpx 0;
			padding: 8rpx 28rpx;
			border-radius: 8rpx;
			border: 1rpx solid #ebeef5;
			background-color: #fff;
			overflow: hidden;
			color: #303133;
			transition: .3s;
			box-shadow: 0 2rpx 2rpx 0 rgba(0, 0, 0, .2);

			.date {
				font-size: 20rpx;
				color: #008489;
				font-weight: 600;
			}
		}

		.roomList {
			margin: 0 28rpx;

			.title {
				line-height: 148rpx;
				font-size: 38rpx;
				font-weight: 600;
			}

			.list {
				.main {
					margin-bottom: 48rpx;

					.dese {
						margin-top: 18rpx;
						font-size: 20rpx;
						line-height: 48rpx;
					}

					.roomName {
						font-size: 26rpx;
						font-weight: 600;
					}

					.price {
						line-height: 48rpx;
					}
				}

			}
		}
	}
</style>
