import Vue from 'vue'
// import successBox from './successBox'

const components = [
  // successBox
]

components.forEach(k => {
  Vue.component(k.name, k)
})

export default components
