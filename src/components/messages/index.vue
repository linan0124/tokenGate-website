 <template>
   <transition name="msgbox-fade">
     <div class="Popup" v-if="value"
     @mouseenter="clearTimer"
      @mouseleave="startTimer">
       <div class="popupcon">
           <div class="close clearfix">
             <i class="el-icon-close  close" @click="close()"></i>
           </div>
           <div class="con_clos">
             <div class="createContract_contents">
               <h3>{{ message }}</h3>
             </div>
         </div>
       </div>
     </div>
   </transition>
 </template>

<script>
export default {
  name: 'tipBox',
  data () {
    return {
      value: false,
      closed: false,
      onClose: null,
      duration: 2000
    }
  },
  watch: {
    closed (newVal) {
      if (newVal) {
        this.value = false
        this.$el.addEventListener('transitionend', this.destroyElement)
      }
    }
  },
  methods: {
    close () {
      this.closed = true
      if (typeof this.onClose === 'function') {
        this.onClose(this)
      }
    },
    // 销毁弹框元素方法
    destroyElement () {
      this.$el.removeEventListener('transitionend', this.destroyElement)
      this.$destroy(true)
      this.$el.parentNode.removeChild(this.$el)
    },
    clearTimer () {
      clearTimeout(this.timer)
    },

    startTimer () {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close()
          }
        }, this.duration)
      }
    }
  },
  created () {
  },
  mounted () {
    this.startTimer()
  },
  destroyed () {}
}
</script>

 <style lang="scss" scoped>
 h3{
    //  color:#fff;
    color:#8F8F8F;
     line-height:24px;
     text-align:center;
     margin-top:30px;
     margin-bottom: 20px;
     font-weight: normal;
   }
   p{
      font-size: 14px;
      // color: #636770;
      color:red;
      line-height: 22px;
      text-align: left;
      text-indent: 30px;
      width: 276px;
      padding-left: 24px;
   }
 .Popup {
   width: 100%;
   height: 100%;
   background: rgba(36,40,81,0.5);
    position: fixed;
    left: 0;
     top: 0;
     z-index: 1000;
   }
   .popupcon {
     border-radius: 4px;
     position: absolute;
     left: 50%;
     top: 50%;
     width: 300px;
    //  background: #404899;
     margin-left: -150px;
     margin-top: -120px;
     // box-shadow: 0px 0px 4px 1px #666666;
     overflow: hidden;
     padding-bottom: 30px;
     opacity: 0.9;
      background: #FFFFFF;
      // border-radius: 8px;

   }
 [class*=" el-icon-"], [class^=el-icon-] {
   float: right;
   cursor: pointer;
 }
 .close {
   margin-right: 6px;
   margin-top: 6px;
   font-size:14px;

 }
 .con_clos {

 }
 .btn {
   padding: 20px 10% 0;
 }
 .affirmBtn{

   &:nth-child(1){
     margin-bottom: 20px;
   }
   &:nth-child(2){
     background-image: linear-gradient(-180deg, #EAF5FF 0%, #C5E2FF 100%);
   }
 }

 .popup__tip{
  text-align: center;
  line-height: 50px;
  // height: 50px;
 }

.msgbox-fade-enter-active {
    animation: msgbox-fade-in .3s
}

.msgbox-fade-leave-active {
    animation: msgbox-fade-out .3s
}

@keyframes msgbox-fade-in {
    0% {
        transform: translate3d(0, -20px, 0);
        opacity: 0
    }
    100% {
        transform: translate3d(0, 0, 0);
        opacity: 1
    }
}

@keyframes msgbox-fade-out {
    0% {
        transform: translate3d(0, 0, 0);
        opacity: 1
    }
    100% {
        transform: translate3d(0, -20px, 0);
        opacity: 0
    }
}
 </style>
