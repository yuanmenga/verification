import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')
export function sum(num1: number, num2: number) {
  return num1 + num2
}
// const list = [1, 2, 3].map((item) => {
//   console.log(item)
// })
