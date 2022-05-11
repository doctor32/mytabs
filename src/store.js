import { createStore } from 'vuex'

export default createStore ({ 
 state() {
     return {
         timerValue: 15,
         percent: 0
     }
 }
})