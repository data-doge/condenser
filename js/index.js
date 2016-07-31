import $ from 'jquery'
import Diamond from './diamond.js'
import fetchThoughts from './fetch-thoughts'

fetchThoughts((goods, bads) => {
  console.log('goods: ', goods)
  console.log('bads: ', bads)
})

// ~1900 chars, 279 words
let text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tincidunt blandit elit sit amet lobortis. Phasellus gravida id nisl eu malesuada. Morbi rutrum, ligula sit amet sodales semper, diam arcu lacinia ante, ultrices porttitor neque augue a massa. Morbi euismod arcu in tortor efficitur, nec mollis diam mollis. Aenean nec diam aliquet, rhoncus odio a, egestas est. Etiam condimentum dapibus tortor eget pellentesque. Ut ullamcorper augue vitae accumsan mattis. Vestibulum ut nibh vitae dolor condimentum sagittis. Quisque dui nisl, efficitur vel commodo a, tincidunt eget ante. Nullam iaculis vitae risus nec ullamcorper. Donec sed porta magna, cursus volutpat metus. Nam elementum sapien eget leo gravida sollicitudin. Maecenas aliquam eleifend orci. Sed lobortis augue vel justo laoreet, volutpat auctor orci luctus. Maecenas neque augue, mollis vel risus quis, cursus tempor neque. Donec nunc augue, vulputate at metus non, congue sagittis felis. In mattis viverra ipsum eget finibus. Se eleifend oid. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tincidunt blandit elit sit amet lobortis. Phasellus gravida id nisl eu malesuada. Morbi rutrum, ligula sit amet sodales semper, diam arcu lacinia ante, ultrices porttitor neque augue a massa. Morbi euismod arcu in tortor efficitur, nec mollis diam mollis. Aenean nec diam aliquet, rhoncus odio a, egestas est. Etiam condimentum dapibus tortor eget pellentesque. Ut ullamcorper augue vitae accumsan mattis. Vestibulum ut nibh vitae dolor condimentum sagittis. Quisque dui nisl, efficitur vel commodo a, tincidunt eget ante. Nullam iaculis vitae risus nec ullamcorper. Donec sed porta magna, cursus volutpat metus. Nam elementum sapien eget leo gravida sollicitudin. Maecenas aliquam eleifend orci. Sed lobortis augue vel justo laoreet, volutpat auctor orci luctus. Maecenas neque augue, mollis vel risus quis, cursus tempor neque.'

let diamond = new Diamond(text)
diamond.scrollText(60)
diamond.pivot(100)
diamond.breathe(1000)
