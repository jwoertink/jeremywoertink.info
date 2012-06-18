class Map
  constructor: (@width, @height) ->
    
  
$ ->
  initDraggableSprites()
  

initDraggableSprites = ->
  $('.icon-img').draggable({ grid: [16,16], snap: ".dropzone" })