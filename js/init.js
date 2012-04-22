(function() {
  $(function() {
    var ffHack, update_speed;
    window.GRCtl = new GolRocks('#board', 16, 16, synths);
    ffHack = new Audio("assets/coso.wav");
    $('#play_controls span[data-ctrl="play"]').click(function() {
      $(this).addClass('active');
      return GRCtl.start();
    });
    $('#play_controls span[data-ctrl="pause"]').click(function() {
      $('#play_controls span[data-ctrl="play"]').removeClass('active');
      return GRCtl.stop();
    });
    $('#synth_controls span').click(function() {
      GRCtl.synth = GRCtl.set_synth($(this).attr('data-synth'));
      $('#synth_controls span').removeClass("active");
      return $(this).addClass("active");
    });
    $('#speed_controls input').change(function() {
      update_speed();
      GRCtl.stop();
      return GRCtl.start(0);
    });
    $('#board').click(function() {
      if (GRCtl.status === 1) {
        return GRCtl.stop();
      }
    });
    update_speed = function() {
      GRCtl.cursor_bpm = $('#speed_controls input[name="cursor"]').val();
      return GRCtl.gol_bpm = $('#speed_controls input[name="gol"]').val();
    };
    return update_speed();
  });
}).call(this);
