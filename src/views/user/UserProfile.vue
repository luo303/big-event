<script setup>
import { useUserStore } from '@/stores'
import { ref } from 'vue'
import { userUpdateInfoService } from '@/api/user'
const store = useUserStore()
const {
  user: { username, nickname, email, id }
} = store

const userInfo = ref({ username, nickname, email, id })
const info = ref({
  username: userInfo.value.username,
  nickname: '',
  email: ''
})
const rules = {
  nickname: [
    { required: true, message: '请输入用户昵称', trigger: 'blur' },
    {
      pattern: /^\S{2,10}$/,
      message: '昵称必须是2-10位的非空字符串',
      trigger: 'blur'
    }
  ],
  email: [
    { required: true, message: '请输入用户邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
  ]
}
const formRef = ref()
const onSubmit = async () => {
  const valid = await formRef.value.validate()
  if (valid) {
    userInfo.value.nickname = info.value.nickname
    userInfo.value.email = info.value.email
    await userUpdateInfoService(userInfo.value)
    await store.getUser()
    info.value.nickname = ''
    info.value.email = ''
    ElMessage.success('修改成功')
  }
}
const position = ref('left')
</script>
<template>
  <page-container title="基本资料">
    <el-form
      label-width="auto"
      style="max-width: 600px"
      :rules="rules"
      :model="info"
      ref="formRef"
      :label-position="position"
    >
      <el-form-item label="登录名称">
        <el-input v-model="info.username" disabled />
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickname">
        <el-input v-model="info.nickname" />
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input v-model="info.email" />
      </el-form-item>
      <el-form-item>
        <el-button class="button" type="primary" @click="onSubmit"
          >提交修改</el-button
        >
      </el-form-item>
    </el-form>
  </page-container>
</template>
<style scoped>
.button {
  margin-left: 79px;
}
</style>
