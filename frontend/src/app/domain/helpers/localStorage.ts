export default {

  /**
   * Ajout loginData to localStorage
   * @param loginData 
   */
  loginData: (loginData: {token: string, user: string})=>{
    localStorage.setItem('token',loginData.token);
    localStorage.setItem('user', loginData.user)
  },

  /**
   * Clear All localstorage
   */
  clearAll: ()=>{
    localStorage.clear()
  }
}