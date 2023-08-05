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
</script>
