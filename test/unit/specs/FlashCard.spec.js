// import Vue from 'vue'
import FlashCard from './../../../src/components/FlashCard'
import { mount } from '@vue/test-utils'
import termsJSON from './../../fixtures/termsJSON'

function getMountedApp(data) {
  return mount(FlashCard, {
    propsData: {
      ...data,
      count: 1,
      answer: '',
      numCorrect: 0,
      seeSolution: false,
      correct: false
    }
  })
}

describe('Testing the FlashCard', () => {
  const getTerms = () => termsJSON;
  const terms = getTerms();
  const wrapper = getMountedApp({ terms: terms });

  test('flashcard should contain all buttons needed for the game to function properly', () => {
    let answerButton = wrapper.find('#answer-button');
    expect(answerButton.exists()).toBe(true);
    let nextQButton = wrapper.find('#next-button');
    expect(nextQButton.exists()).toBe(true);
    let submitButton = wrapper.find('#submit-button');
    expect(submitButton.exists()).toBe(true);
  })

  test('expect chevron button to be disabled if no answer has been submitted and seeSolution is false', () => {
    wrapper.vm.seeSolution = false;
    wrapper.vm.answer = '';
    let nextQButton = wrapper.find('#next-button');
    expect(nextQButton.exists()).toBe(true);
    expect(nextQButton.attributes('disabled')).toBe('disabled');
    expect(nextQButton.trigger('click')).toBeUndefined();
  })

  test('expect flashcard to contain term\'s meaning', () => {
    let termMeaning = wrapper.find('#term-info');
    expect(termMeaning.exists()).toBe(true);
    expect(termMeaning.text()).toEqual('-' + wrapper.vm.term.meaning);
  })

  test('expect correct to be true if the submitted answer is correct', () => {
    let qAnswer = wrapper.vm.term.term;
    let qInput = wrapper.find('input').setValue(qAnswer);
    wrapper.vm.submitAnswer();
    expect(wrapper.vm.correct).toBe(true);
  })

  test('expect correct to be false and seeSolution to be true if the submitted answer is incorrect', () => {
    let qAnswer = 'hello';
    let qInput = wrapper.find('input').setValue(qAnswer);
    wrapper.vm.submitAnswer();
    expect(wrapper.vm.seeSolution).toBe(true);
  })

  test('expect CORRECT message to be displayed if the submitted answer is correct', () => {
    wrapper.vm.correct = true;
    let correctMsg = wrapper.find('.correct');
    expect(correctMsg.exists()).toBe(true);
    expect(correctMsg.text()).toEqual('CORRECT!');
  })

  test('expect seeSolution to be true if seeAnswer is called', () => {
    wrapper.vm.seeSolution = false;
    wrapper.vm.seeAnswer();
    expect(wrapper.vm.seeSolution).toBe(true);
  })

  test('expect answer to be displayed if seeSolution is true', () => {
    wrapper.vm.seeSolution = true;
    let correctAnswer = wrapper.find('.answer');
    expect(correctAnswer.exists()).toBe(true);
    expect(correctAnswer.text()).toEqual('Answer:' + wrapper.vm.term.term);
  })

  test('expect input to be disabled if seeSolution is true', () => {
    wrapper.vm.seeSolution = true;
    let qInput = wrapper.find('input');
    expect(qInput.exists()).toBe(true);
    expect(qInput.attributes('disabled')).toBe('disabled');
  })

  test('expect everything to be resetted when chevron button is clicked', () => {
    wrapper.vm.count = 1;
    wrapper.vm.numQs = 5;
    const button = wrapper.find('#next-button');
    expect(button.exists()).toBe(true);
    wrapper.vm.nextQuestion();
    expect(wrapper.vm.correct).toBe(false);
    expect(wrapper.vm.seeSolution).toBe(false);
    expect(wrapper.vm.answer).toBe('');
  })
})
