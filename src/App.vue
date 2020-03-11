<template>
  <div id="app">
    <img alt="Vouch logo" src="./assets/vouch-logo.png" height="30%" width="30%">
    <h1>Welcome to Vouch Trivia</h1>
    <p>Learn common insurance terms by playing Vouch Trivia!</p>
    <div class="app-info">
      <ul>
        <b>Instructions:</b>
        <li>If you are stuck, simply click on the answer icon on the top right to see the correct answer. </li>
        <li>Once you have submitted your answer, or seen the correct answer, use the chevron icon next to the answer icon to move on to the next flashcard. </li>
      </ul>
    </div>
    <TriviaGame :terms="terms"/>
  </div>
</template>

<script>
import TriviaGame from './components/TriviaGame.vue'
import termsJSON from './assets/termsJSON.json'

export default {
  name: 'App',
  components: {
    TriviaGame
  },
  data () {
    return {
      terms: termsJSON
    }
  }
}
</script>

<style>
@import './assets/vouch-css.css';
#app {
  font-family: 'Stolzl Book', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.app-info{
  margin: 0 auto;
  width: 75%;
  text-align: left
}
</style>
