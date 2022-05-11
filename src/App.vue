<template>
  <div class="app">
    <div class="container">

      <h1>Do u know <span class="b">B</span><span class="m">M</span><span class="w">W</span> ?</h1>

      <p v-if="showSubtitle" class="subtitle">{{isStart === true ? '???' : 'Ok, bb ;['}}</p>

      <div class="nav__btns" v-if="isStart">
        <vButton
        @click="isStarted=true, isStart=false, showSubtitle=false"
        :classBtn="'red__btn'"
        >Let’s test it
        </vButton>

        <vButton
        :classBtn="'black__btn'"
        @click="isStart = false"
        >Noah
        </vButton>
      </div>
    
    <div v-if="isStarted" class="started__div">
      <div class="status">

        <div v-for="(item, index) in namesOfCircles" 
        :key="index" 
        class="status__item">

          <div class="status__num-body" 
          :class="tabIndex >= index ? 'finished-num-body' : ''"
          >{{item}}</div>

        </div>
      </div>

      <div class="answers__body" v-if="!finished && $store.state.timerValue > 0">
        <div>
          <div class="img__body">
            <img :src="questions[tabIndex].src" alt="">
          </div>
          <div class="answers">
            <div class="radio">
              <input class="radio__input" type="radio" :id="questions[tabIndex].firstV" :value="questions[tabIndex].firstV" v-model="model[tabIndex]"> 
              <label class="radio__label" :for="questions[tabIndex].firstV">{{questions[tabIndex].firstV}}</label>
            </div>

            <div class="radio">
              <input class="radio__input" type="radio" :id="questions[tabIndex].secondV" :value="questions[tabIndex].secondV" v-model="model[tabIndex]">
              <label class="radio__label" :for="questions[tabIndex].secondV">{{questions[tabIndex].secondV}}</label> 
            </div>

            <div class="radio">
              <input class="radio__input"  type="radio" :id="questions[tabIndex].thirdV" :value="questions[tabIndex].thirdV" v-model="model[tabIndex]">
              <label class="radio__label" :for="questions[tabIndex].thirdV">{{questions[tabIndex].thirdV}}</label> 
            </div>

          </div>
        </div>
          <div class="choose_answer">
          <p v-if="model.length === tabIndex">Выберите ответ!</p>
          </div>

          <v-button 
            @click="nextPage" 
            :disabled="model.length === tabIndex"
            >
            {{model.length > questions.length - 1 ? 'Result' : 'Next'}}
          </v-button>
      </div>

      <div v-else-if="finished || $store.state.timerValue === 0" class="finish">
        <p class="finish__title">Результат</p> 
        <p class="finish__subtitle">{{finishText}}</p>
        <v-button @click="restart">Start again</v-button>
      </div>
      
      <TheTimerCircle 
      timerClass="myTimer"
      />
    </div>


    </div>
  
  </div>
</template>














<script>
import {ref} from 'vue'
import TheTimerCircle from '@/components/TheTimerCircle'
import vButton from '@/components/v-Button.vue'
import {useStore} from 'vuex'

  export default {
    components: {TheTimerCircle, vButton},
    setup () {
      let   model = ref([]),
            tabIndex = ref(0),
            finished = ref(false),
            rightOnes = ref(0),
            finishText = ref('YOU LOSE'),
            isStart = ref(true),
            isStarted = ref(false),
            showSubtitle = ref(true),
            namesOfCircles = [1,2,3,4,5,6,'R']

      const store = useStore()


      const questions = ref(
        [
          {
            id: 1,
            src: 'https://motor.ru/imgs/2021/07/04/22/4749187/ab1f09f28a5cb8bdbd3ed3f8f53f757d730960d1.jpg',
            firstV: 'e34',
            secondV: 'e60',
            thirdV: 'e90'
          },
          {
            id: 2,
            src: 'https://0.allegroimg.com/original/033b95/a2e331a74517953bdfe4801d0820/BMW-3-F30-F31-PERFORMANCE-LISTWY-POD-PROGI-NOWOSC',
            firstV: 'f30',
            secondV: 'f60',
            thirdV: 'f80'
          },
          {
            id: 3,
            src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/BMW-G30.JPG/1200px-BMW-G30.JPG',
            firstV: 'g01',
            secondV: 'g30',
            thirdV: 'g20'
          },
          {
            id: 4,
            src: 'https://www.auto-data.net/images/f85/BMW-M5-F90-LCI-facelift-2020.jpg',
            firstV: 'f30',
            secondV: 'f90',
            thirdV: 'g30'
          },
          {
            id: 5,
            src: 'https://motor.ru/imgs/2019/07/03/15/3438975/444a01b9e423fc5a201de48e3bee3c5fe6314ff5.jpg',
            firstV: 'e30',
            secondV: 'e24',
            thirdV: 'e28'
          },
          {
            id: 6,
            src: 'https://i.infocar.ua/i/2/3735/98990/1920x.jpg',
            firstV: 'f10',
            secondV: 'f15',
            thirdV: 'f16'
          }
        ]
      )
      
      const answers = ref({
        a1: 'e34',
        a2: 'f30',
        a3: 'g30',
        a4: 'f90',
        a5: 'e28',
        a6: 'f16'
      })




      function nextPage () {
        store.state.timerValue = 15
        store.state.percent = 0
        ++tabIndex.value
        if (tabIndex.value > questions.value.length - 1) {
          finished.value = true
          console.log( finished.value);
        }
        
        if (finished.value === true) {
              checkResults()
          }
      }

      function checkResults () {
          model.value[0] === answers.value.a1 ? rightOnes.value++ : rightOnes.value
          model.value[1] === answers.value.a2 ? rightOnes.value++ : rightOnes.value
          model.value[2] === answers.value.a3 ? rightOnes.value++ : rightOnes.value
          model.value[3] === answers.value.a4 ? rightOnes.value++ : rightOnes.value
          model.value[4] === answers.value.a5 ? rightOnes.value++ : rightOnes.value
          model.value[5] === answers.value.a6 ? rightOnes.value++ : rightOnes.value


          if (rightOnes.value < 2) {
            finishText.value = 'i think u need to КУПИТЬ МАМКИН ГОЛЬФ'
          } else if (rightOnes.value === 6) {
            finishText.value = 'do u have BMW maybe? Найс, бро'
          } else {
            finishText.value = 'so-so Ну такое...'
          }
      }

      function restart () {
        store.state.timerValue += 25
        store.state.percent = 0
        tabIndex.value = 0
        finished.value = false
        model.value = []
        finishText.value = 'YOU LOSE'
        rightOnes.value = 0
      }


return { 
  questions,
  answers,
  model,
  tabIndex,
  nextPage,
  finished,
  rightOnes,
  checkResults,
  finishText,
  restart,
  isStart,
  isStarted,
  showSubtitle,
  namesOfCircles
}
    }
  }
</script>




















<style lang="scss" scoped>
.app {

}
h1 {
  font-weight: 300;
  font-size: 7.6rem;
  padding-top: 1rem;
  span {
    font-weight: bold;
  }
  .b{
    color: #00B3FF;
  }
  .m{
    color: #2E42AC;
  }
  .w{
    color: #D03130;
  }
}
.subtitle{
  font-size: 18rem;
  font-weight: 300;
  color: #d4d4d4;
  padding-top: 5rem;
}
.nav__btns {
  margin-top: 3rem;
  display: flex;
  gap: 1.5rem;
}
.finish {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.choose_answer {
  height: 5rem;
  display: flex;
  align-items: center;
  p {
    font-size: 1.3rem;
  }
}
.answers {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 4rem;
}
.answers__body {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.container {
  width: 110rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.img__body {
  background: #D03130;
  border-radius: 1rem;
  width: 37rem;
  height: 22rem;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 35rem;
    height: 20rem;
    object-fit: cover;
    border-radius: 1rem;
  }
}
.status{
  display: flex;
  margin: 3rem 0;
  align-items: center;
  justify-content: center;
  position: relative;
  gap: 2rem;
  &__num-body{
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: .2rem solid black;
    border-radius: 50%;
    font-weight: 700;
    font-size: 2rem;
  }
  .finished-num-body {
    border-color: #00B3FF; 
    color: #00B3FF;
    width: 5rem;
    height: 5rem;
    transition: .5s;
    font-size: 3rem;
  }
  .status__item:last-child {
    .finished-num-body {
      border-color: #00CE5F;
      color: #00CE5F; 
    }
  }
.status__item:nth-child(5), .status__item:nth-child(6) {
    .finished-num-body {
      border-color: #D03130;
      color: #D03130;
    }
  }
  .status__item:nth-child(3), .status__item:nth-child(4) {
    .finished-num-body {
      border-color: #2E42AC;
      color: #2E42AC;
    }
  }
  .finished__hr {
    width: 0;
    height: 2px;
    background: red;
  }
  .finished__hr.active {
    width: 40px;
    transition: 1s;
  }
}
.finish {
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}
.finish__title {
  font-size: 2.4rem;
  text-transform: uppercase;
}
.finish__subtitle {
  font-size: 3rem;
  font-weight: bold;
  text-transform: uppercase;
}

//Стилизация инпута
.radio__label {
  position: relative;
  width: 3rem;
  padding-left: 3rem;
  font-size: 1.5rem;
  font-weight: 600;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 1.6rem;
    height: 1.6rem;
    background: transparent;
    border: .2rem black solid;
    border-radius: 50%;
    transition: .3s;

  }
  &:after{
    content: '';
    position: absolute;
    top: .5rem;
    left: .5rem;
    background: #00CE5F;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    opacity: 0;
    transition: .3s;
  }
}
.radio__input {
    appearance: none;
    position: absolute
  }
.radio__input:checked + .radio__label:before {
    border-color: #00CE5F;
}
.radio__input:checked + .radio__label:after {
    opacity: 1;
}
.started__div {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.myTimer {
  margin-top: 2rem;
}
</style>