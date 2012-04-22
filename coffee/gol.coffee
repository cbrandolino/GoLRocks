class @GoL
  constructor:(@board)->

  nextStatus: (l, c) ->
    neighbours = 
      this.b(l + 1, c) + this.b(l + 1, c + 1) + 
      this.b(l - 1, c) + this.b(l - 1, c + 1) + 
      this.b(l, c + 1) + this.b(l - 1, c - 1) + 
      this.b(l, c - 1) + this.b(l + 1, c - 1)
    neighbours is 3 or (neighbours is 2 and @board[l][c] is 1) 

  b: (l, c) ->
    (if (@board[l] and @board[l][c]) then @board[l][c] else 0)

  step: () ->
    newBoard = []
    for line, l in @board
      newBoard[l] = []
      for cell, c in @board[0]
        newBoard[l][c] = +@nextStatus(l, c)
    @board = newBoard

class @BoardHTML
  constructor: (@element, rows, columns) ->
    this.set_canvas(rows, columns)
    $('.cell').click ->
      $(this).attr('data-status', 
        if $(this).attr('data-status') == '0' then 1 else 0 )

  set_canvas: (rows, columns) ->
    container = $(@element)
    _(rows).times ->
      html_line = $("<div class='row'>")
      _(columns).times ->
        html_line.append("<div class='cell' data-status='0'></div>") 
      container.append(html_line)

  update: (board) ->
    $(@element).children('.row').each (l, line_element) ->
      $(line_element).children('.cell').each (c, cell_element) ->
        $(cell_element).attr('data-status', board[l][c])

  read: () ->
    board = []
    $(@element).children('.row').each (l, line_element) ->
      board[l] = []
      $(line_element).children('.cell').each (c, cell_element) ->
        board[l][c] = +$(cell_element).attr('data-status')
    board