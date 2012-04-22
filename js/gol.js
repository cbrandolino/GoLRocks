(function() {
  this.GoL = (function() {
    function GoL(board) {
      this.board = board;
    }
    GoL.prototype.nextStatus = function(l, c) {
      var neighbours;
      neighbours = this.b(l + 1, c) + this.b(l + 1, c + 1) + this.b(l - 1, c) + this.b(l - 1, c + 1) + this.b(l, c + 1) + this.b(l - 1, c - 1) + this.b(l, c - 1) + this.b(l + 1, c - 1);
      return neighbours === 3 || (neighbours === 2 && this.board[l][c] === 1);
    };
    GoL.prototype.b = function(l, c) {
      if (this.board[l] && this.board[l][c]) {
        return this.board[l][c];
      } else {
        return 0;
      }
    };
    GoL.prototype.step = function() {
      var c, cell, l, line, newBoard, _len, _len2, _ref, _ref2;
      newBoard = [];
      _ref = this.board;
      for (l = 0, _len = _ref.length; l < _len; l++) {
        line = _ref[l];
        newBoard[l] = [];
        _ref2 = this.board[0];
        for (c = 0, _len2 = _ref2.length; c < _len2; c++) {
          cell = _ref2[c];
          newBoard[l][c] = +this.nextStatus(l, c);
        }
      }
      return this.board = newBoard;
    };
    return GoL;
  })();
  this.BoardHTML = (function() {
    function BoardHTML(element, rows, columns) {
      this.element = element;
      this.set_canvas(rows, columns);
      $('.cell').click(function() {
        return $(this).attr('data-status', $(this).attr('data-status') === '0' ? 1 : 0);
      });
    }
    BoardHTML.prototype.set_canvas = function(rows, columns) {
      var container;
      container = $(this.element);
      return _(rows).times(function() {
        var html_line;
        html_line = $("<div class='row'>");
        _(columns).times(function() {
          return html_line.append("<div class='cell' data-status='0'></div>");
        });
        return container.append(html_line);
      });
    };
    BoardHTML.prototype.update = function(board) {
      return $(this.element).children('.row').each(function(l, line_element) {
        return $(line_element).children('.cell').each(function(c, cell_element) {
          return $(cell_element).attr('data-status', board[l][c]);
        });
      });
    };
    BoardHTML.prototype.read = function() {
      var board;
      board = [];
      $(this.element).children('.row').each(function(l, line_element) {
        board[l] = [];
        return $(line_element).children('.cell').each(function(c, cell_element) {
          return board[l][c] = +$(cell_element).attr('data-status');
        });
      });
      return board;
    };
    return BoardHTML;
  })();
}).call(this);
