(function() {
  this.ScatterWave = (function() {
    function ScatterWave() {
      this.sound = new Audio("assets/coso.wav");
    }
    ScatterWave.prototype.play = function(line, column) {
      this.sound.currentTime = 1;
      return this.sound.play();
    };
    ScatterWave.prototype.step = function(line) {};
    return ScatterWave;
  })();
  this.MozAudio = (function() {
    function MozAudio() {
      var i, _, _len, _ref;
      this.sound = new Audio();
      this.samples = new Float32Array(22050);
      _ref = this.samples;
      for (i = 0, _len = _ref.length; i < _len; i++) {
        _ = _ref[i];
        this.samples[i] = Math.sin(i / 20);
      }
    }
    MozAudio.prototype.play = function(_, i) {
      this.sound.mozSetup(1, 44100 - 100 * i * i);
      return this.sound.mozWriteAudio(this.samples);
    };
    MozAudio.prototype.step = function() {};
    return MozAudio;
  })();
  this.MySinth = (function() {
    function MySinth() {}
    MySinth.prototype.play = function(x, y) {};
    MySinth.prototype.step = function() {};
    return MySinth;
  })();
  this.synths = {
    ScatterWave: this.ScatterWave,
    MozAudio: this.MozAudio
  };
}).call(this);
