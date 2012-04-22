class @GolRocks
  constructor: (element, @rows, @columns, @synths) ->
    @board      = new BoardHTML element, @rows, @columns
    @gol_bpm    = 60
    @cursor_bpm = 1000
    @cursor_pos = 0
    @synth      = this.set_synth('ScatterWave')
    @status     = 0

  set_synth: (synth_string) ->
    new @synths[synth_string]
    
  start: (read = 1) ->
    @gol = new GoL @board.read() if read
    if @gol_bpm > 1
      @gol_clock = setInterval(
        (=> this.updateGol()),
        Math.round 60000 / @gol_bpm)
    else 
      clearInterval @gol_clock  

    if @cursor_bpm > 1
      @cursor_clock = setInterval(
        (=> this.updateCursor()),
        Math.round 60000 / @cursor_bpm) 
    else 
      clearInterval @cursor_clock
    @status = 1

  stop: () ->
  	clearInterval @gol_clock
  	clearInterval @cursor_clock
  	@status = 0

  updateGol: () ->
    @board.update @gol.step()

  updateCursor: () ->
    $(".row:eq(#{@cursor_pos})").removeClass('cursor')
    @cursor_pos = 
    if @cursor_pos == @rows-1 
      0 
    else 
      @cursor_pos + 1 

    @synth.step(@cursor_pos)

    $(".row:eq(#{@cursor_pos})").addClass('cursor')

    for value, index in @gol.board[@cursor_pos]
      @synth.play(@cursor_pos, index) unless value == 0