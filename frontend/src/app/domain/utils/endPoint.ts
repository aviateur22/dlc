/**
 * Endpoint request
 */
export default {
  login: {
    url: '/user/login'
  },
  register: {
    url: '/user/register'
  },
  productsUser: {
    url: '/product/get-all-by-user-id'
  },
  productImage:  {
    url: '/image'
  },
  logout: {
    url: '/user/logout'
  },
  addProduct: {
    url: '/product'
  },
  deleteProduct: {
    url: '/product/'
  },  
  addfriend: {
    url: '/friend'
  },
  deleteFriend: {
    url: '/friend/'
  },
  findAllFriendsByUserId: {
    url: '/friend/find-by-user-id'
  }
}