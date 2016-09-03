/*
 * Lipsum
 * Create random lipsum words, sentences or paragraphs
 * First & second arguments defines a range, f.ex Lipsum.word(2,6) returns minimum 2 and maximum 6 words.
 */

var words = []
var endings = "................................??!"
var variations = {
  standard: 'lorem ipsum dolor sit amet consectetur adipiscing elit ut eget turpis dolor id elementum urna sed arcu magna accumsan volutpat tristique eu rhoncus at lectus quisque lacus ante semper in feugiat vitae commodo non mauris quisque vel sem sem maecenas pellentesque ultrices tristique fusce nibh enim porta in convallis id consequat quis purus fusce iaculis enim id mauris mollis id accumsan ipsum sagittis quisque in pharetra magna integer a mattis mauris nulla condimentum molestie massa a malesuada diam rutrum vel suspendisse fermentum lacus id erat volutpat cursus donec at felis ante eget cursus risus nunc in odio nec mi gravida rutrum nec pulvinar turpis quisque id tellus sem nunc sed dui quis mi tristique viverra',
  bacon: 'bacon ipsum dolor amet ribeye sausage pork capicola bresaola tri-tip tail ground round swine turkey chuck beef ribs doner tri-tip swine strip steak chuck turducken pork cow andouille alcatra landjaeger bresaola flank pastrami brisket rump shankle meatloaf spare ribs pork belly meatball strip steak beef ribs chicken kielbasa shoulder kevin beef ham hock cupim alcatra tongue shank meatball andouille boudin',
  gangsta: 'Lorizzle ipsum izzle izzle amizzle uhuh yih adipiscing elizzle nullam sapien dope shiznit volutpizzle things quizzle bow wow wow vizzle brizzle pellentesque eget phat sizzle erizzle pot izzle dolizzle dapibizzle tempizzle check it out mauris pellentesque nibh et turpizzle own yo in tortizzle ghetto dawg fo shizzle for sure in hizzle habitasse shizzle my nizzle crocodizzle dictumst donec dapibizzle curabitur bling bling urna pretizzle eu dizzle ac eleifend vitae nunc pot suscipizzle integizzle semper velit sizzle fo shizzle my nizzle'
}

var rand = function( len ) {
  return Math.floor( Math.random() * len )
}
var range = function( min, max ) {
  return rand( max - min + 1 ) + min
}
var capitalize = function( word ) {
  return word.substr(0,1).toUpperCase() + word.substr(1)
}
var word = function() {
  return words[rand(words.length)]
}
var ending = function() {
  var i = rand(endings.length)
  return endings.substring(i, i+1)
}

var use = function(v) {
  words = variations[ variations.hasOwnProperty(v) ? v : 'standard' ].split(' ')
}

use('standard')

module.exports = {

  use: use,

  words: function( min, max, cap ) {
    min = min || 1

    if ( min < 1 )
      return ''

    if ( max === true ) {
      cap = true
      max = undefined
    }
    if ( typeof max == 'number' )
      min = range(min, max)

    var text = cap ? capitalize(word()) : word()

    while( min-- )
      text += word() + ' '

    return text.replace(/^\s+|\s+$/g, '')
  },

  sentence: function( min, max ) {
    min = min || 8

    if ( min < 1 )
      return ''

    if ( typeof max == 'number' )
      min = range(min, max)

    var text = capitalize( word() )
    var comma = rand(2) ? rand( min-1 ) : false

    while( min-- )
      text += word() + (( comma && comma === min ) ? ', ' : ' ')

    return text.replace(/\s+/,' ').substr(0, text.length-2) + '.'
  },

  paragraphs: function( min, max ) {
    min = min || 40
    if ( min < 1 )
      return ''

    if ( min < 8 )
      return this.sentence( min )

    if ( typeof max == 'number' )
      min = range(min, max)

    var sentences = Math.floor(min/8)
    var rest = min - (sentences * 8)
    var text = ''

    while( sentences-- )
      text += this.sentence( 8 ) + ' '

    if ( rest )
      return text + this.sentence(rest)
    else
      return text.substr(0, text.length-2)
  }
}

