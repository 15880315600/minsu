<template>
	<view class="content">
		<view class="swiper">
			<u-swiper :list="list" height="580" border-radius="18"></u-swiper>
		</view>
		<view class="wrap">
			<view class="searchDIV">
				<view class="top u-flex">
					<view :class=" [{artice : current == 0}, 'topbtn','u-flex-1'] " @click="current = 0">
						短租
					</view>
					<view :class=" [{artice : current == 1}, 'topbtn','u-flex-1'] " @click="current = 1">
						长租
					</view>
				</view>
				<view class="search">

					<u-form :model="form" ref="uForm">
						<u-form-item>
							<u-input v-model="form.areaName" placeholder="请输入目的地城市" @click="show = true" disabled
								:clearable="false" />
							<u-picker mode="region" v-model="show" @confirm="regionChange">
							</u-picker>
						</u-form-item>
						<u-form-item>
							<view class="u-flex">
								<view class="u-flex-4" style="border-right: 4rpx solid #f1f1f1;margin-right: 28rpx;">
									<u-input v-model="form.keyWord" placeholder="景点/地址/房源名" :clearable="false" />
								</view>
								<view class="u-flex-1 u-flex">
									<u-input v-model="form.bedNum" placeholder="房客人数" :clearable="false" />
								</view>
							</view>
						</u-form-item>
					</u-form>
					<view class="btn" @click="jumpSearch()">
						搜索房源
					</view>
					<view class="dese u-flex u-row-between">
						<view class="u-flex">
							<view class="icon u-relative">
								<u-icon name="checkbox-mark" size="24" style="position: absolute;left: 2rpx;top:2rpx">
								</u-icon>
							</view>
							<view class="text-area">
								真实可靠的房源
							</view>
						</view>
						<view class="u-flex">
							<view class="icon u-relative">
								<u-icon name="checkbox-mark" size="24" style="position: absolute;left: 2rpx;top:2rpx">
								</u-icon>
							</view>
							<view class="text-area">
								专业客服团队
							</view>
						</view>
						<view class="u-flex">
							<view class="icon u-relative">
								<u-icon name="checkbox-mark" size="24" style="position: absolute;left: 2rpx;top:2rpx">
								</u-icon>
							</view>
							<view class="text-area">
								多重安全保障
							</view>
						</view>
					</view>
				</view>
			</view>
			<view>
				<u-notice-bar mode="horizontal" :list="noticeList"></u-notice-bar>
			</view>
			<view class="roomList">
				<view class="top">
					<view class="title">专享优惠</view>
					<view class="dese">新客专享低价 好房低至7折</view>
				</view>
				<view class="grid u-flex u-flex-wrap u-row-between">
					<view class="main" v-for="item in listData" @click="jump('./roomDetails?id=' + item.id)">
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
							<text style="font-weight: 600;">￥{{ item.roomPriceNow }}</text><text
								style="text-decoration: line-through;font-size: 24rpx;">￥{{ item.roomPriceOld }}</text><text
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				form: {},
				current: 0,
				status: 'loadmore',
				listQuery: {
					page: 1,
					pageSize: 10
				},
				show: false,
				total: 0,
				listData: [],
				noticeList:[]
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
			this.$u.api.roomList(this.listQuery).then(res => {
				let arr = res.data.records
				this.listData = this.listData.concat(arr)
			})
		},
		onLoad() {
			this.feachData()
		},
		onShow() {
			this.getData()
		},
		methods: {
			feachData() {
				this.$u.api.getHomeAd().then(res => {
					this.list = res.data.map(item => {
						return this.baseUrl + item.adImage
					})
				})
				this.$u.api.getDefault().then(res => {
					this.noticeList.push(res.data.desc)
				})

			},
			getData() {
				this.$u.api.roomList(this.listQuery).then(res => {
					this.listData = res.data.records
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
			},
			jumpSearch(url) {
				uni.setStorageSync("form", JSON.stringify(this.form))
				uni.navigateTo({
					url: './roomList'
				})
			},
			regionChange(e) {
				console.log(e)
				this.form.areaName = e.area.label
				this.form.areaCode = e.area.value
			}
		}
	}
</script>
<style lang="scss" scoped>
	.content {
		padding-top: 440rpx;

		.swiper {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 580rpx;
			z-index: -1;

		}

		.wrap {
			padding: 0 28rpx;

			.searchDIV {
				width: 100%;

				margin-bottom: 24rpx;
				border-radius: 18rpx;
				border: 1rpx solid #ebeef5;
				background-color: #fff;
				overflow: hidden;
				color: #303133;
				transition: .3s;
				box-shadow: 0 2rpx 12rpx 0 rgba(0, 0, 0, .2);

				.top {
					background: #e2e2e2;

					.topbtn {
						text-align: center;
						color: #000000;
						font-weight: 600;
						line-height: 80rpx;

						&.artice {
							background: #FFFFFF;
							color: #8f8f8f;
						}
					}
				}

				.search {
					padding: 10rpx 28rpx;

					.btn {
						background: #008489;
						text-align: center;
						line-height: 88rpx;
						color: #FFFFFF;
						margin-top: 28rpx;
						border-radius: 10rpx;
					}
				}

				.dese {
					.icon {
						width: 30rpx;
						height: 30rpx;
						border-radius: 50%;
						border: 1px solid #b7d9da;
						margin-right: 10rpx;
					}

					.text-area {
						color: #787878;
						font-size: 18rpx;
						line-height: 68rpx;
					}
				}
			}

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
	}
</style>
