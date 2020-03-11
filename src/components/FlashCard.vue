<template>
<div id="trivia-flashcard-container">
  <div id="flashcard-header">
    <div class="left">
      FlashCard #{{count}}
    </div>
    <div class="right">
      <button id="answer-button" class="answer-icon" @click="seeAnswer"></button>
      <button id="next-button" :disabled="!seeSolution && !correct" class="next-icon" @click="nextQuestion"></button>
    </div>
  </div>
  <div id="term-info">
    <input :disabled="seeSolution" v-model="answer" placeholder=""/><br/><br/> - {{term.meaning}}
  </div>
  <div v-if="correct" class="correct">CORRECT!</div>
  <div class="answer-container">
    <button id="submit-button" class="primary-btn-style w-button" v-if="!seeSolution" :disabled="correct" @click="submitAnswer">Submit</button>
    <div v-if="seeSolution" class="answer" @click="seeAnswer">Answer: {{term.term}}</div>
  </div>
</div>
</template>
<script>
export default {
  name: 'FlashCard',
  props: {
    term: {
      type: Object,
      default: () => ({
        term: '',
        meaning: ''
      })
    },
    terms: {
      type: Object,
      default: () => ({
        term: '',
        meaning: ''
      })
    },
    numQs: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      count: 1,
      answer: '',
      numCorrect: 0,
      seeSolution: false,
      correct: false
    }
  },
  methods: {
    submitAnswer () {
      if (this.term.term.toUpperCase() === this.answer.toUpperCase()) {
        this.seeSolution = false
        this.numCorrect++
        this.correct = true
        // If you want the next flashcard to show 5 seconds after the answer has been submitted, undo the comments
        // setTimeout(() =>{
        //   this.nextQuestion()
        // }, 5000);
      } else {
        this.seeSolution = true
      //   this.nextQuestion()
      }
    },
    seeAnswer () {
      if (!this.seeSolution) {
        this.seeSolution = true
        // If you want the next flashcard to show 5 seconds after the answer has displayed, undo the comments
        // setTimeout(() =>{
        //   this.nextQuestion()
        // }, 5000);
      }
    },
    nextQuestion () {
      if (this.count < this.numQs) {
        this.correct = false
        this.seeSolution = false
        this.answer = ''
        this.count++
        this.$emit('next-question', this.term)
        this.$emit('update-count', this.count)
      } else {
        this.$emit('next-question', this.term)
        this.$emit('update-count', this.count)
        this.$emit('update-score', this.numCorrect)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input[disabled]{
  border:1px solid red;
}
#trivia-flashcard-container{
  border: 1px solid black;
  border-radius: 3%;
  display: block;
  position: relative;
  margin: 0 auto;
  padding: 30px 25px 0px 25px;
  height: max-content;
  width: 400px;
}
.answer-container{
  text-align: center;
  padding: 30px 10px 20px 10px;
}
.answer-icon{
  background-image: url('./../assets/answer-icon.png');
  background-repeat: no-repeat;
  background-size: contain;
  height: 25px;
  width: 25px;
  padding: 10px 15px;
}
/* .cheat{
  position: relative;
  top: -20px;
  right: -165px;
} */
.correct{
  color: green;
  padding: 5px;
}
.answer{
  height: 25px;
}
.next-icon{
  background-image: url('./../assets/right-chevron.png');
  background-repeat: no-repeat;
  background-size: contain;
  height: 25px;
  width: 25px;
  padding: 10px 10px;
}

.primary-btn-style {
  display: inline-block;
  overflow: visible;
  width: auto;
  max-width: none;
  min-width: 0px;
  margin: 10px auto 0px;
  padding: 10px 20px;
  -webkit-align-self: auto;
  -ms-flex-item-align: auto;
  -ms-grid-row-align: auto;
  align-self: auto;
  border-radius: 4px;
  background-color: #000;
  font-family: 'Stolzl Book', sans-serif;
  font-size: 14px;
  line-height: 30px;
  font-weight: 400;
  text-align: center;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.primary-btn-style:hover {
  background-color: #4cbd94;
}

.primary-btn-style:active {
  background-color: #3b9b78;
}

.primary-btn-style.centered {
  display: block;
  max-width: 300px;
}
.w-button {
    /* display: inline-block;
    padding: 9px 15px;
    background-color: #3898EC; */
    color: white;
    border: 0;
    /* line-height: inherit; */
    text-decoration: none;
    cursor: pointer;
    /* border-radius: 0 */
}
.left{
  position: relative;
  top: -20px;
  left: -110x;
}
.right{
  position: relative;
  top: -20px;
  right: -205px;
}
#flashcard-header{
  /* padding-top: 10px; */
  display: flex;
}
</style>
