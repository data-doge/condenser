import $ from 'jquery'
import Diamond from './diamond.js'
import fetchThoughts from './fetch-thoughts'

fetchThoughts((goods, bads) => {
  // max is ~1900 chars, 279 words
  let text = bads.join(' ')

  let diamond = new Diamond(text)
  diamond.scrollText(60)
  diamond.pivot(100)
  diamond.breathe(1000)
})
