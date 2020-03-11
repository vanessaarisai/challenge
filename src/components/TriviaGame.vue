<template>
<div id="trivia-container">
  <div v-if="(!start && !complete)|| (start && complete)">
    <div v-if="complete">
      <h3>You're Done!!</h3>
      <p>Score: {{score}} / {{numQs}}</p>
      <img v-if="score === numQs" src="https://media.giphy.com/media/FnGdcQzqypBaE/giphy.gif" alt=”animated” />
      <p v-if="score < numQs">Don't like your score? Try again!</p>
    </div>
    <button class="primary-btn-style w-button" @click="startGame">Start <span v-if="complete">New</span> Game</button>
  </div>
  <div v-else-if="start && !complete">
      <FlashCard
      :terms="terms"
      :term="term"
      @next-question="onUpdateNextQuestion"
      @update-count="onUpdateCount"
      @update-score="onUpdateScore"
      :numQs="numQs"/>
  </div>
</div>
</template>

<script>
import FlashCard from './FlashCard.vue'
export default {
  name: 'TriviaGame',
  components: {
    FlashCard
  },
  props: {
    terms: {
      type: Object,
      default: () => ({
        term: '',
        meaning: ''
      })
    }
  },
  data () {
    return {
      start: false,
      complete: false,
      startQs: 1,
      numQs: 10,
      score: 0,
      term: this.randomTerm(this.terms)
    }
  },
  methods: {
    startGame () {
      if (!this.start && !this.complete) {
        this.start = true
      } else if (this.start && this.complete) {
        this.start = true
        this.complete = false
        this.startQs = 1
        this.score = 0
      }
    },
    randomTerm (terms) {
      var keys = Object.keys(terms)
      var nextTerm = terms[keys[keys.length * Math.random() << 0]]
      return nextTerm
    },
    onUpdateNextQuestion () {
      if (this.startQs <= this.numQs) {
        this.term = this.randomTerm(this.terms)
        if (this.startQs === this.numQs) {
          this.complete = true
        }
      }
    },
    onUpdateCount (newCount) {
      this.startQs = newCount
    },
    onUpdateScore (newScore) {
      this.score = newScore
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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

</style>
