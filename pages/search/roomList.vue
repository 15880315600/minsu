<template>
	<view class="wrap">
		<view class="top">
			<view style="height: 44rpx;"></view>
			<view class="topSearch">
				<view class="u-flex">
					<view class="u-flex-1 date u-flex"
						style="border-right: 4rpx solid #f1f1f1;padding-right: 10rpx;margin-right: 10rpx;">
						<view style="width: 28rpx;" @click="jump('./search')">
							<u-icon name="arrow-left"></u-icon>
						</view>
						<view style="text-align: center;width: 104rpx;">
							{{ listQuery.areaName }}
						</view>
					</view>
					<view class="u-flex-4">
						<u-input v-model="listQuery.keyWord" placeholder="景点/地址/房源名" :clearable="false" />
					</view>
				</view>
			</view>
			<view style="border-bottom: 1rpx solid #EEEEEE;">
				<view class="u-flex">
					<view :class="[{active : current == index},'item','u-flex-1']" v-for="(item,index) in options"
						@click="screening(item)">
						{{ item.label }}
						<u-icon name="arrow-down-fill" size="20" style="margin-left: 10rpx;"></u-icon>
					</view>
				</view>
				<u-popup v-model="show" mode="top" :custom-style="{top:'244rpx'}" :mask-custom-style="{top:'244rpx'}">
					<view class="popupMain">
						<view class="popupItem">
							<view class="label">
								人数
							</view>
							<view class="u-flex u-row-between">
								<view style="font-size: 20rpx;">
									<view>
										成人
									</view>
									<view>
										13岁或以上
									</view>
								</view>
								<view>
									<u-number-box :min="1" v-model="listQuery.bedNum"></u-number-box>
								</view>
							</view>
						</view>
						<view class="popupItem">
							<view class="label">
								价格范围
							</view>
							<view>
								<text>￥{{ rangeValues[0] }}</text>
								<text>~</text>
								<text>￥{{ rangeValues[1] }}</text>
								<RangeSlider :width="slideWidth" :height="slideHeight" :blockSize="slideBlockSize"
									:min="slideMin" :max="slideMax" :values="rangeValues" :active-color="activeColor"
									:step="step" :liveMode="isLiveMode" @rangechange="onRangeChange">
									<view slot="minBlock" class="range-slider-block"></view>
									<!-- 左边滑块的内容 -->
									<view slot="maxBlock" class="range-slider-block"></view>
									<!-- 右边滑块的内容 -->
								</RangeSlider>
							</view>
						</view>
						<view class="popupBtn u-flex u-row-between">
							<view class="btn" @click="reset">重置</view>
							<view class="btn" @click="determine">确定</view>
						</view>
					</view>
				</u-popup>
			</view>
		</view>
		<view class="roomList">
			<view class="title">
				{{ total }}处住宿
			</view>
			<view class="list">
				<view class="main" v-for="item in listData" @click="jump('./roomDetails?id=' + item.id)">
					<u-swiper :autoplay="false" :list="item.roomImage" height="400" border-radius="18"></u-swiper>
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
				</view>
				<view style="padding: 28rpx 0;">
					<u-loadmore :status="status" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import RangeSlider from '@/components/range-slider/range-slider.vue';
	export default {
		components: {
			RangeSlider
		},
		data() {
			return {
				status: 'loadmore',
				listQuery: {
					page: 1,
					pageSize: 10,
					keyWord: '',
					areaName: '城市',
					areaCode: '',
					priceStart:'',
					priceEnd:''
				},
				show: false,
				total: 0,
				current: 0,
				listData: [],
				priceValue: [],
				options: [{
						label: '默认排序',
						value: 0,
					},
					{
						label: '好评优先',
						value: 1,
					},
					{
						label: '价格',
						value: 2,
					},
					{
						label: '筛选',
						value: 3,
					}
				],
				rangeValues: [0, 5000],
				slideWidth: 700,
				slideHeight: 80,
				slideBlockSize: 30,
				slideMin: 0,
				slideMax: 5000,
				activeColor: '#008489',
				isLiveMode: true,
				step: 1,
			}
		},
		onLoad() {
			let listData = JSON.parse(uni.getStorageSync("form"))
			if (listData.areaName && listData.areaCode) {
				this.listQuery.areaName = listData.areaName
				this.listQuery.areaCode = listData.areaCode
			}

			this.listQuery.bedNum = listData.bedNum
			this.listQuery.keyWord = listData.keyWord
			console.log(this.listQuery)
		},
		onShow() {
			this.feachData()
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
				let arr1 = []
				arr.forEach(item => {
					if (item.roomImages) {
						let roomImage = item.roomImages.split(",")
						item.roomImage = roomImage.map(iten => {
							console.log(this.baseUrl + iten)
							return this.baseUrl + iten
						})
					}
					arr1.push(item)
				})
				this.listData = this.listData.concat(arr1)
			})

		},
		methods: {
			feachData() {
				// roomSearchList
				this.$u.api.roomList(this.listQuery).then(res => {
					let arr = res.data.records
					let arr1 = []
					arr.forEach(item => {
						if (item.roomImages) {
							let roomImage = item.roomImages.split(",")
							item.roomImage = roomImage.map(iten => {
								return this.baseUrl + iten
							})
						}
						arr1.push(item)
					})
					this.listData = arr1
					this.total = res.data.total
					if (this.total <= 10) {
						this.status = 'nomore';
					}

				})

			},
			jump(url) {
				if (url == './search') {
					uni.switchTab({
						url: url
					})
				} else {
					uni.navigateTo({
						url: url
					})
				}

			},
			reset(){
				this.listQuery.bedNum = 1
				this.rangeValues = [0,5000]
				this.feachData()
			},
			determine(){
				this.listQuery.priceStart = this.rangeValues[0]
				this.listQuery.priceEnd = this.rangeValues[1]
				this.feachData()
			},
			screening(row) {
				switch (row.value) {
					case 0:
						this.current = row.value
						this.listQuery.evaluateFlag = ''
						this.listQuery.priceFlag = ''
						break;
					case 1:
						this.current = row.value
						this.listQuery.evaluateFlag = 1
						this.listQuery.priceFlag = ''
						break;
					case 2:
						this.current = row.value
						this.listQuery.evaluateFlag = ''
						this.listQuery.priceFlag = 1
						break;
					case 3:
						if (this.show) {
							this.show = false
						} else {
							this.show = true
						}

						break;
				}
				this.feachData()
			},
			onRangeChange(e) {
				this.rangeValues = [e.minValue, e.maxValue];

				console.log(this.rangeValues);
				console.log(JSON.stringify(e));
			},
		}
	}
</script>
<style lang="scss" scoped>
	.wrap {
		.top {
			position: fixed;
			z-index: 1;
			width: 100%;
			background: #FFFFFF;

			.topSearch {
				margin: 28rpx 28rpx 0;
				padding: 8rpx 28rpx;
				border-radius: 8rpx;
				border: 1rpx solid #ebeef5;
				background-color: #fff;
				overflow: hidden;
				color: #303133;
				transition: .3s;
				font-size: 20rpx;
				box-shadow: 0 2rpx 2rpx 0 rgba(0, 0, 0, .2);

				.date {
					font-size: 20rpx;
					color: #008489;
					font-weight: 600;
				}
			}


			.item {
				text-align: center;
				line-height: 68rpx;
				font-size: 24rpx;

				&.active {
					color: #008489;
					font-weight: 600;
				}
			}

			.popupMain {
				padding: 0 28rpx;

				.popupItem {
					padding: 0 0 28rpx 0;
					border-bottom: 1rpx solid #EEEEEE;
					.label {
						line-height: 100rpx;
					}
				}
				.popupBtn{
					padding: 0 48rpx;
					margin: 48rpx 0;
					.btn{
						width: 40%;
						line-height: 68rpx;
						color: #FFFFFF;
						background: #008489;
						text-align: center;
						border-radius: 8rpx;
					}
				}

			}
		}


		.roomList {
			padding-top: 256rpx;
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
