<template>
	<view class="wrap">
		<view class="roomList">
			<view class="title">
				团购优惠
			</view>
			<view class="list">
				<view class="main" v-for="item in listData" @click="jump('./bulkDetails?id=' + item.id)">
					<u-image width="100%" height="400rpx" src="/static/img/bulk.jpg" border-radius="16"></u-image>
					<view class="dese">
						{{ item.roomDesc }}
					</view>
					<view class="price">
						<text style="font-weight: 600;">￥{{ item.groupPrice }}</text><text
							style="font-size: 24rpx;">/晚</text>
					</view>
					<view class="time">
						预约时间：{{ item.reserveTimeStart | dateFormat }} - {{ item.reserveTimeEnd | dateFormat}}
					</view>
					<view class="time">
						预定时间：{{ item.groupStartDate | dateFormat }} - {{ item.groupEndDate | dateFormat }}
					</view>
					<view class="time">
						可预订房间数：{{ item.restRoomIds.length }} / {{ item.roomNum }}
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
				status: 'loadmore',
				listQuery: {
					page: 1,
					pageSize: 10
				},
				total: 0,
				listData: []
			}
		},
		filters: {
			dateFormat: function(date) {
				let dt = new Date(date); //实例化时间对象
				let y = dt.getFullYear();
				let m = dt.getMonth() + 1 > 9 ? dt.getMonth() + 1 : '0' + (dt.getMonth() + 1);
				let d = dt.getDate() ? dt.getDate() : '0' + dt.getDate();
				//笨方法  return y + '-' + m + '-' + d
				//官方方法  注意引号，是tab键上面的符号（ES6的语法）
				return `${y}-${m}-${d}`
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
			this.$u.api.groupRoomInfoList(this.listQuery).then(res => {
				let cardList = res.result.records
				this.listData = this.listData.concat(cardList)
			})

		},
		onShow() {
			this.feachData()
		},
		methods: {
			feachData() {
				this.$u.api.groupRoomInfoList(this.listQuery).then(res => {
					let listData = res.data.records
					this.listData = listData.map(item => {
						return {
							...item,
							restRoomIds: item.restRoomId.split(',')
						}
					})
					console.log(this.listData.length)
					this.total = res.data.total
					if (this.total <= 10) {
						this.status = 'nomore';
					}

				})

			},
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

					.time {
						font-size: 24rpx;
					}
				}

			}
		}
	}
</style>
