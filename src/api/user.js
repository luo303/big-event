import request from '@/utils/request'

export const userRegisterService = async ({
  username,
  password,
  repassword
}) => {
  const res = await request.post('/api/reg', { username, password, repassword })
  if (res.data.code !== 0) {
    // 当后端返回失败（如用户名已存在），主动抛出错误
    throw new Error(res.data.message) // 触发 catch
  }
  return res
}

export const userLoginService = async ({ username, password }) => {
  const res = await request.post('/api/login', { username, password })
  if (res.data.code !== 0) {
    // 当后端返回失败（如用户名已存在），主动抛出错误
    throw new Error(res.data.message) // 触发 catch
  }
  return res
}
