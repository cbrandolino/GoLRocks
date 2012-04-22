class @ScatterWave 
  constructor: () ->
    @sound = new Audio("assets/coso.wav")
  play: (line, column) ->
    @sound.currentTime = 1 
    @sound.play()
  step: (line) ->
  	return

class @MozAudio
  constructor: () ->
    @sound = new Audio()
    @samples = new Float32Array(22050)
    @samples[i] = Math.sin( i / 20 ) for _,i in @samples 
  play:(_, i)->
    @sound.mozSetup(1, 44100 - 100 * i * i)
    @sound.mozWriteAudio(@samples)
  step:() ->
  	return

class @MySinth
  constructor: () ->
    # Here you load sound assets and stuff
  play: (x, y) ->
    # Coordinates of each alive cell encountered by the cursor.
    # If a line has five alive cells, it will be called five times 
    # when the cursor meets it.
  step: () ->
    # Gets called before each new step. You might want to stop playing sounds,
    # apply effects etc.

@synths = {ScatterWave: @ScatterWave, MozAudio: @MozAudio}
