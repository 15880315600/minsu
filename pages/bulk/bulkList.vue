<template>
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
		onShow() {
			this.feachData()
		},
		methods: {
			feachData() {
				this.$u.api.groupRoomInfoList(this.listQuery).then(res => {
					this.listData = res.data.records
					this.total = res.data.total
					if (this.total <= 10) {
						this.status = 'nomore';
					}

				})

			},
		}
	}
</script>

<style>
</style>
