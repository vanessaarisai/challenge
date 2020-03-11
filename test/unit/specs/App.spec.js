// import Vue from 'vue'
import App from './../../../src/App'
import { mount } from '@vue/test-utils'
import termsJSON from './../../fixtures/termsJSON'

function getMountedApp(data) {
  return mount(App, {
    propsData: {
      ...data,
    }
  })
}

describe('Testing the App', () => {
  const getTerms = () => termsJSON;
  const terms = getTerms();
  const wrapper = getMountedApp({ terms: terms });

  test('Logo should be vouch logo', () => {
    const image = wrapper.find('img');
    expect(image.exists()).toBe(true);
    expect(image.attributes('src')).toBe('./assets/vouch-logo.png')
  })
  test('expect the application terms to be defined', () => {
    expect(terms).toBeDefined();
  });

  test('expect the terms to have the correct properties', () => {
    expect(terms[0]).toHaveProperty('term');
    expect(terms[0]).toHaveProperty('meaning');
  });
})
