import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoService } from '@/api/user'

// 用户模块
export const useUserStore = defineStore(
  'big-user',
  () => {
    const token = ref('') // 定义 token
    const setToken = (t) => (token.value = t) // 设置 token
    const user = ref({})
    const getUser = async () => {
      const res = await userGetInfoService() // 请求获取数据
      user.value = res.data.data
      console.log(user.value)
    }
    const removeToken = () => {
      token.value = ''
    }
    const setUser = (newinfo) => {
      user.value = newinfo
    }

    return { token, setToken, getUser, user, removeToken, setUser }
  },
  {
    persist: {
      key: 'user'
    }
  }
)
