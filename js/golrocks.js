(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  this.GolRocks = (function() {
    function GolRocks(element, rows, columns, synths) {
      this.rows = rows;
      this.columns = columns;
      this.synths = synths;
      this.board = new BoardHTML(element, this.rows, this.columns);
      this.gol_bpm = 60;
      this.cursor_bpm = 1000;
      this.cursor_pos = 0;
      this.synth = this.set_synth('ScatterWave');
      this.status = 0;
    }
    GolRocks.prototype.set_synth = function(synth_string) {
      return new this.synths[synth_string];
    };
    GolRocks.prototype.start = function(read) {
      if (read == null) {
        read = 1;
      }
      if (read) {
        this.gol = new GoL(this.board.read());
      }
      if (this.gol_bpm > 1) {
        this.gol_clock = setInterval((__bind(function() {
          return this.updateGol();
        }, this)), Math.round(60000 / this.gol_bpm));
      } else {
        clearInterval(this.gol_clock);
      }
      if (this.cursor_bpm > 1) {
        this.cursor_clock = setInterval((__bind(function() {
          return this.updateCursor();
        }, this)), Math.round(60000 / this.cursor_bpm));
      } else {
        clearInterval(this.cursor_clock);
      }
      return this.status = 1;
    };
    GolRocks.prototype.stop = function() {
      clearInterval(this.gol_clock);
      clearInterval(this.cursor_clock);
      return this.status = 0;
    };
    GolRocks.prototype.updateGol = function() {
      return this.board.update(this.gol.step());
    };
    GolRocks.prototype.updateCursor = function() {
      var index, value, _len, _ref, _results;
      $(".row:eq(" + this.cursor_pos + ")").removeClass('cursor');
      this.cursor_pos = this.cursor_pos === this.rows - 1 ? 0 : this.cursor_pos + 1;
      this.synth.step(this.cursor_pos);
      $(".row:eq(" + this.cursor_pos + ")").addClass('cursor');
      _ref = this.gol.board[this.cursor_pos];
      _results = [];
      for (index = 0, _len = _ref.length; index < _len; index++) {
        value = _ref[index];
        _results.push(value !== 0 ? this.synth.play(this.cursor_pos, index) : void 0);
      }
      return _results;
    };
    return GolRocks;
  })();
}).call(this);
