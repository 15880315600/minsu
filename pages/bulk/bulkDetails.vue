<template>
	<view class="wrap">
		<view class="roomList">
			<view class="top">
				<view class="title">专享优惠</view>
				<view class="dese">新客专享低价 好房低至7折</view>
			</view>
			<view class="grid u-flex u-flex-wrap u-row-between" style="align-items: flex-start;">
				<view class="main" v-for="item in listData.roomTables" @click="getOrder(item)">
					<view class="u-relative">
						<u-image width="100%" height="218rpx" :src="baseUrl + item.mainImage"></u-image>
						<!-- 							<view class="u-absolute" style="right: 10rpx;top: 4rpx;color: #FFFFFF;">
							<u-icon name="heart"></u-icon>
						</view> -->
					</view>
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
					<!-- 						<view class="u-flex evaluation">
						<u-icon name="star-fill" color="#028389"></u-icon><text
							style="font-weight: 600;">4.8</text>(29)·超赞房东
					</view> -->
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
					this.listData = res.data
				})
			},
			getOrder(row) {
				let setData = {
					groupRoomId: this.listData.groupRoomInfo.id,
					roomId: row.id
				}
				this.$u.api.groupRoomInfoGetGroupOrder(setData).then(res => {
					let GroupOrder = {
						groupRoomInfo:this.listData.groupRoomInfo,
						roomInfo:row,
						orderNo:res.data.orderNo
					}
					uni.setStorageSync("GroupOrder", JSON.stringify(GroupOrder))
					uni.navigateTo({
						url:'./roomDetails'
					})
					console.log(setData)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		padding: 0 28rpx;

		.roomList {
			.top {
				.title {
					margin-top: 48rpx;
					font-size: 36rpx;
					font-weight: 600;
				}

				.dese {
					line-height: 80rpx;
					font-weight: 500;
				}
			}

			.grid {

				.main {
					width: 49%;
					margin-bottom: 28rpx;

					.dese {
						margin-top: 18rpx;
						color: #997a64;
						font-size: 18rpx;
						line-height: 40rpx;
					}

					.roomName {
						font-size: 26rpx;
					}

					.price {
						line-height: 48rpx;
					}

					.evaluation {
						line-height: 48rpx;
						font-size: 24rpx;
						color: #999999;
					}
				}
			}
		}
	}
</style>
