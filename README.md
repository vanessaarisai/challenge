# Objective
The insurance agents of Vouch are entered in an insurance trivial competition with many other insurance companies. To help us retain the trivia championship trophy, you have been tasked with building a flashcard web application to help our agents remember common insurance terms.

## Project Info
You can update the JSON file with the terms and term meanings with your own file. Simply make sure that the data is in the following format:

<code>
{
  "0": {
    "term": "Accident",
    "meaning": "an unexpected event or circumstance without deliberate intent."
  },
  "1": {
    "term": "Accident Insurance",
    "meaning": "insurance for unforeseen bodily injury."
  },
  "2": {
    "term": "Accident Only",
    "meaning": "an insurance contract that provides coverage, singly or in combination, for death, dismemberment, disability, or hospital and medical care caused by or necessitated as a result of accident or specified kinds of accident."
  },
  "3": {
    "term": "Accident Only",
    "meaning": "policies providing coverage, singly or in combination, for death, dismemberment, disability, or hospital and medical care caused by or necessitated as a result of accident or specified kinds of accidents. Types of coverage include student accident, sports accident, travel accident, blanket accident, specific accident or accidental death and dismemberment (AD&D)."
  },
  "4": {
    "term": "Accidental Bodily Injury",
    "meaning": "unexpected injury to a person."
  }
}
</code>

NOTE: You can also use the text2json.js script to create the JSON file. The text file must be in a format similar to Insurance-Terms.txt. These can be found in the assets directory.

You can change how many flashcards/questions there are in each game by updating the "numQs" prop in TriviaGame.vue

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
