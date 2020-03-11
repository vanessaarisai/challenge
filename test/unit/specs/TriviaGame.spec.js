// import Vue from 'vue'
import TriviaGame from './../../../src/components/TriviaGame'
import { mount } from '@vue/test-utils'
import termsJSON from './../../fixtures/termsJSON'

function getMountedApp(data) {
  return mount(TriviaGame, {
    propsData: {
      ...data,
      start: false,
      complete: false,
      startQs: 1,
      numQs: 5,
      score: 0,
    }
  })
}

describe('Testing the TriviaGame', () => {
  const getTerms = () => termsJSON;
  const terms = getTerms();
  const wrapper = getMountedApp({ terms: terms });

  test('score should be 0 if game has not started', () => {
    expect(wrapper.vm.start).toBe(false);
    expect(wrapper.vm.score).toBe(0);
  })

  test('complete should be false if game has not started', () => {
    expect(wrapper.vm.start).toBe(false);
    expect(wrapper.vm.complete).toBe(false);
  })

  test('expect start to be true after Start Game button is clicked', () => {
    wrapper.find('button').trigger('click')
    expect(wrapper.vm.start).toBe(true);
  })

  test('expect game to be completed if startQs is the same as the numQs and onUpdateNextQuestion is called', () => {
    wrapper.vm.startQs = 10;
    expect(wrapper.vm.startQs).toBe(wrapper.vm.numQs);
    wrapper.vm.onUpdateNextQuestion();
    expect(wrapper.vm.complete).toBe(true);
  })

  test('expect Start New Game button to appear if game has been completed', () => {
    wrapper.vm.complete = true;
    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);
  })
  test('expect everything to be resetted when Start New Game button is clicked', () => {
    wrapper.vm.start = true;
    wrapper.vm.complete = true;
    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);
    wrapper.vm.startGame();
    expect(wrapper.vm.start).toBe(true);
    expect(wrapper.vm.complete).toBe(false);
    expect(wrapper.vm.startQs).toBe(1);
    expect(wrapper.vm.score).toBe(0);
  })

  test('expect flashcard(question) number to change when onUpdateCount is called', () => {
    wrapper.vm.startQs = 1;
    let newCount = 2;
    wrapper.vm.onUpdateCount(newCount);
    expect(wrapper.vm.startQs).toBe(newCount);
  })

  test('expect score to change when onUpdateScore is called', () => {
    wrapper.vm.score = 0;
    let newScore = 5;
    wrapper.vm.onUpdateScore(newScore);
    expect(wrapper.vm.score).toBe(newScore);
  })

  test('expect the application terms to be defined', () => {
    expect(terms).toBeDefined();
  });

  test('expect the terms to have the correct properties', () => {
    expect(terms[0]).toHaveProperty('term');
    expect(terms[0]).toHaveProperty('meaning');
  });

  test('expect the random term to be defined', () => {
    expect(terms).toBeDefined();
    let randomTerm = wrapper.vm.randomTerm(terms);
    expect(randomTerm).toBeDefined();
    expect(randomTerm).toHaveProperty('term');
    expect(randomTerm).toHaveProperty('meaning');
  });
})
