<template>
  <div>
    {{ userInfo.name }}
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const userInfo = ref({
  name: '小明',
  sex: 12,
})

//打乱格式
const res = [1, 2, 3].map((item) => {
  //这里没有返回值，eslint会报错
  console.log(item)
})
</script>
