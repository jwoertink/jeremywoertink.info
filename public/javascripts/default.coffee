class Player
  constructor: (@name) ->
  
  talk: ->
    "My name is #{@name}"

p = new Player('Jeremy')
