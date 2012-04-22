$ ->
  ffHack = new Audio("assets/coso.wav")
  window.GRCtl = new GolRocks '#board', 16, 16, synths

  $('#play_controls span[data-ctrl="play"]').click ->
    $(this).addClass('active')
    GRCtl.start()
  
  $('#play_controls span[data-ctrl="pause"]').click ->
    $('#play_controls span[data-ctrl="play"]').removeClass('active')
    GRCtl.stop()
  
  $('#synth_controls span').click ->
    GRCtl.synth = GRCtl.set_synth($(this).attr('data-synth'))
    $('#synth_controls span').removeClass("active")
    $(this).addClass("active")

  $('#speed_controls input').change ->
    update_speed()
    GRCtl.stop()
    GRCtl.start(0)

  $('#board').click ->
  	if GRCtl.status == 1
      GRCtl.stop()

  update_speed = () ->
    GRCtl.cursor_bpm = $('#speed_controls input[name="cursor"]').val()
    GRCtl.gol_bpm    = $('#speed_controls input[name="gol"]').val()

  update_speed()