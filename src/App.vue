<template>
  <div class="app">
    <div class="container">
    <h1>Тест на долбоеба</h1>


    <div class="status">
      <div class="status__num-body finished-num-body">1</div>
      <div class="status__hr"></div>
      <div class="finished__hr" :class="tabIndex > 0 ? 'active' : ''"></div>
      <div class="status__num-body" :class="tabIndex > 0 ? 'finished-num-body' : ''">2</div>
      <div class="status__hr"></div>
      <div class="finished__hr" :class="tabIndex > 1 ? 'active' : ''"></div>
      <div class="status__num-body" :class="tabIndex > 1 ? 'finished-num-body' : ''">3</div>
      <div class="status__hr"></div>
      <div class="finished__hr" :class="tabIndex > 2 ? 'active' : ''"></div>
      <div class="status__num-body" :class="tabIndex > 2 ? 'finished-num-body' : ''">R</div>
    </div>

    <div class="answers__body" v-if="!finished">
      <div>
        <img :src="questions[tabIndex].src" alt="">
        <div class="answers">
          <label for=""><input type="radio" name="e34" :value="questions[tabIndex].firstV" v-model="model[tabIndex]">{{questions[tabIndex].firstV}}</label> 
          <label for=""><input type="radio" name="e34" :value="questions[tabIndex].secondV" v-model="model[tabIndex]">{{questions[tabIndex].secondV}}</label> 
          <label for=""><input type="radio" name="e34" :value="questions[tabIndex].thirdV" v-model="model[tabIndex]">{{questions[tabIndex].thirdV}}</label> 
        </div>
      </div>
        <div class="choose_answer">
        <p v-if="model.length === tabIndex">Выберите ответ!</p>
        </div>
        {{model}}
        {{finishText}}
        <button 
          @click="nextPage" 
          :disabled="model.length === tabIndex"
          >
          {{model.length > 2 ? 'Узнать результат' : 'Далее'}}
        </button>
    </div>

    <div v-else class="finish">
      <p>Результат: <span class="finish__text">{{finishText}}</span></p> 
      <button @click="restart">Пройти заново</button>
            {{model}}
    </div>


    </div>
  </div>
</template>

<script>
import {ref} from 'vue'

  export default {
    setup () {
      let   model = ref([]),
            tabIndex = ref(0),
            finished = ref(false),
            rightOnes = ref(0),
            finishText = ref('')

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
            src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/BMW_320d_Sport_Line_%28F30%29_%E2%80%93_Frontansicht%2C_26._Februar_2012%2C_W%C3%BClfrath.jpg/1200px-BMW_320d_Sport_Line_%28F30%29_%E2%80%93_Frontansicht%2C_26._Februar_2012%2C_W%C3%BClfrath.jpg',
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
          }
        ]
      )
      
      const answers = ref({
        first: 'e34',
        second: 'f30',
        third: 'g30'
      })

      function nextPage () {
        ++tabIndex.value
        if (tabIndex.value > 2) {
          finished.value = true
        }

        if (finished.value === true) {
          this.checkResults()
        }
      }

      function checkResults () {
          this.model[0] === this.answers.first ? rightOnes.value++ : rightOnes.value
          this.model[1] === this.answers.second ? rightOnes.value++ : rightOnes.value
          this.model[2] === this.answers.third ? rightOnes.value++ : rightOnes.value


          if (rightOnes.value === 0) {
            finishText.value = 'ТЫ РЕАЛЬНО ДОЛБОЕБ'
          } else if (rightOnes.value === 3) {
            finishText.value = 'шаришь за бнв'
          } else {
            finishText.value = 'ну такое ..'
          }
      }

      function restart () {
        tabIndex.value = 0
        finished.value = false
        model.value = []
        finishText.value = ''
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
        restart
      }
    }
  }
</script>

<style lang="scss" scoped>
.finish {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.choose_answer {
  height: 50px;
}
.answers {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 20px;
}
.answers__body {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.container {
  width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
img {
  width: 300px;
  height: 200px;
  object-fit: cover;
}
.status{
  display: flex;
  margin-bottom: 20px;
  align-items: center;
  &__num-body{
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid gray;
    border-radius: 50%;
  }
  &__hr {
    width: 20px;
    height: 2px;
    background: gray;
  }
  .finished-num-body {
    border-color: red; 
    color: red;
    width: 50px;
    height: 50px;
    transition: .5s;
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
.finish__text {
  font-size: 50px;
  font-weight: bold;
  text-transform: uppercase;
}
</style>