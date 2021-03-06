// /common/http.api.js

//登录
let codeUrl = '/user_info/get_code';
let loginUrl = '/user_info/login';
let registerUrl = '/user_info/register';
let getUserInfoUrl = 'user_info/account_info';
//登录

//首页
let getHomeAdUrl = '/advertisement/get_home_ad';
let getDefaultUrl = '/notice/get_default';
//首页

//民宿列表
let roomListUrl = '/room/query_page';
let roomSearchListUrl = '/room/user_search';
let roomDetailsUrl = '/room/';
let userCreateOrdeUrl = '/order_table/user_create_order';
let payUrl = '/order_table/pay/';
let selectByDateUrl = '/room_reserve_record/select_by_date';
let storeDetailsUrl = '/store/';
let groupRoomInfoListUrl = '/group_room_info/query_page';
let groupRoomInfoIdListUrl = '/group_room_info/';
let groupRoomInfoGetGroupOrderUrl = '/group_room_info/get_group_order';
let userCreateOrdeGroupUrl = '/order_table/pay_group';
//民宿列表
//订单
let myWaitPayUrl = '/order_table/my_wait_pay';
let userPayUrl = '/order_table/user_query_page';
//订单

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	//登录
	let getCode = (params = {}) => vm.$u.post(codeUrl, params);
	let login = (params = {}) => vm.$u.post(loginUrl, params);
	let register = (params = {}) => vm.$u.post(registerUrl, params);
	let getUserInfo = (params = {}) => vm.$u.get(getUserInfoUrl, params);
	//登录

	//首页
	let getHomeAd = (params = {}) => vm.$u.get(getHomeAdUrl, params);
	let getDefault = (params = {}) => vm.$u.get(getDefaultUrl, params);

	//首页
	//民宿列表
	let roomDetails = (params = {}) => vm.$u.get(roomDetailsUrl + params.id);

	let roomList = (params = {}) => vm.$u.get(roomListUrl, params);
	let roomSearchList = (params = {}) => vm.$u.get(roomSearchListUrl, params);
	let userCreateOrde = (params = {}) => vm.$u.post(userCreateOrdeUrl, params);
	let pay = (params = {}) => vm.$u.post(payUrl + params.orderNo);
	let selectByDate = (params = {}) => vm.$u.get(selectByDateUrl, params);
	let storeDetails = (params = {}) => vm.$u.get(storeDetailsUrl + params.id);
	let groupRoomInfoList = (params = {}) => vm.$u.get(groupRoomInfoListUrl, params);
	let groupRoomInfoIdList = (params = {}) => vm.$u.get(groupRoomInfoIdListUrl + params.id);
	let groupRoomInfoGetGroupOrder = (params = {}) => vm.$u.get(groupRoomInfoGetGroupOrderUrl, params);
	let userCreateOrdeGroup = (params = {}) => vm.$u.post(userCreateOrdeGroupUrl, params);
	
	//民宿列表
	
	//订单
	let myWaitPay = (params = {}) => vm.$u.get(myWaitPayUrl, params);
	let userPay = (params = {}) => vm.$u.get(userPayUrl, params);
	//订单

	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {
		getCode,
		login,
		register,
		getUserInfo,
		getHomeAd,
		getDefault,
		roomList,
		roomDetails,
		roomSearchList,
		userCreateOrde,
		pay,
		myWaitPay,
		userPay,
		selectByDate,
		storeDetails,
		groupRoomInfoList,
		groupRoomInfoIdList,
		groupRoomInfoGetGroupOrder,
		userCreateOrdeGroup
	};
}

export default {
	install
}
