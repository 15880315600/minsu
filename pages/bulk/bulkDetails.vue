<template>
	<view class="wrap">
		<view class="roomList">
			<view class="list">
				<view class="main" v-for="item in listData.roomTables" @click="getOrder(item)" v-if="listData.groupRoomInfo.restRoomIds.indexOf(item.id.toString()) != -1">
					<u-image width="100%" height="400rpx" :src="baseUrl + item.mainImage" border-radius="16"></u-image>
					<view class="dese">
						{{ item.roomDesc }}
					</view>
					<view class="roomName u-line-2">
						{{ item.tittle }}
					</view>
					<view class="price">
						<text style="font-weight: 600;">￥{{ listData.groupRoomInfo.groupPrice }}</text><text
							style="font-size: 24rpx;">/晚</text>
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
				status: 'loadmore',
				listQuery: {},
				total: 0,
				listData: {}
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
		onLoad(e) {
			console.log(e)
			this.listQuery.id = e.id
			this.feachData()
		},
		methods: {
			feachData() {
				console.log(this.listQuery)
				this.$u.api.groupRoomInfoIdList(this.listQuery).then(res => {
					let listData = res.data
					if(listData.groupRoomInfo.restRoomId){
						listData.groupRoomInfo.restRoomIds = listData.groupRoomInfo.restRoomId.split(',')
					}
					
					console.log(listData)
					this.listData = listData
				})
			},
			getOrder(row) {
				let setData = {
					groupRoomId: this.listData.groupRoomInfo.id,
					roomId: row.id
				}
				this.$u.api.groupRoomInfoGetGroupOrder(setData).then(res => {
					let GroupOrder = {
						groupRoomInfo: this.listData.groupRoomInfo,
						roomInfo: row,
						orderNo: res.data.orderNo
					}
					uni.setStorageSync("GroupOrder", JSON.stringify(GroupOrder))
					uni.navigateTo({
						url: './roomDetails'
					})
					console.log(setData)
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
