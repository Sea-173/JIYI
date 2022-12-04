import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home'
import ProductDetails from '@/views/ProductDetails'
import ClubDetails from '@/views/ClubDetails'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Apply from '@/views/Apply'
import UserCenter from '@/views/UserCenter'
import UserCenterHome from '@/views/UserCenterHome'

import ShoppingCart from '@/components/UserCenter/ShoppingCart'
import MyOrder2 from '@/components/UserCenter/MyOrder2'
import MyFocus from '@/components/UserCenter/MyFocus'
import MyWallet from '@/components/UserCenter/MyWallet'
import MyMessage from '@/components/Message/MyMessage'
import AfterSale from '@/components/UserCenter/AfterSale'
import MessageBox from '@/components/Message/MessageBox'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: 'message-box',
      name: 'MessageBox',
      component: MessageBox,
    },

    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/product-details/:id',
      name: 'ProductDetails',
      component: ProductDetails,
    },
    {
      path: '/club-details/:id',
      name: 'ClubDetails',
      component: ClubDetails,
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/apply',
      name: 'Apply',
      component: Apply
    },
    {
      path: '/user-center',
      name: 'UserCenter',
      component: UserCenter,
      redirect: to=> {
        return '/user-center/user-center-home'
      },
      children: [
          {
          	path: 'user-center-home',
          	name: 'UserCenterHome',
          	component: UserCenterHome,

          },
        	{
        		path: 'shopping-cart',
        		name: 'ShoppingCart',
        		component: ShoppingCart,
        	},
        	{
        		path: 'my-order2',
        		name: 'MyOrder2',
        		component: MyOrder2,
        	},
        	{
        		path: 'my-focus',
        		name: 'MyFocus',
        		component: MyFocus,
        	},
        	{
        		path: 'my-wallet',
        		name: 'MyWallet',
        		component: MyWallet,
        	},
        	{
        		path: 'my-message',
        		name: 'MyMessage',
        		component: MyMessage,
        	},
        	{
        		path: 'after-sale',
        		name: 'AfterSale',
        		component: AfterSale,
        	},
      ],
    },
  ]
})
