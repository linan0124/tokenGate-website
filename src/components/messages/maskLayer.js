import Vue from 'vue'
import msgboxVue from './index.vue'
let MessageConstructor = Vue.extend(msgboxVue)

let instance
let instances = []
let seed = 1

var MessageBox = function (options) {
  options = options || {}
  if (typeof options === 'string') {
    options = {
      message: options
    }
  }
  let userOnClose = options.onClose
  let id = 'message_' + seed++

  options.onClose = function () {
    MessageBox.close(id, userOnClose)
  }

  instance = new MessageConstructor({
    data: options
  })
  instance.id = id
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  instance.vm.value = true
  instance.dom = instance.vm.$el
  instances.push(instance)
  return instance.vm
}

MessageBox.close = function (id, userOnClose) {
  for (let i = 0, len = instances.length; i < len; i++) {
    if (id === instances[i].id) {
      if (typeof userOnClose === 'function') {
        userOnClose(instances[i])
      }
      instances.splice(i, 1)
      break
    }
  }
}

export default MessageBox
