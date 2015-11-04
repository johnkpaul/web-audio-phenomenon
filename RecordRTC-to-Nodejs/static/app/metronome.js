var audioContext = new AudioContext();
var tempo = 60.0;
var futureTickTime = 0.0;
var timerID = 0;
var shouldPlay = false;

function audioFileLoader(filename){
  var soundObj = {};
  soundObj.filename = filename;

  var getSound = new XMLHttpRequest();
  getSound.open('GET', soundObj.filename, true);
  getSound.responseType = 'arraybuffer';
  getSound.onload = function(){
    audioContext.decodeAudioData(getSound.response, function(buffer){
      soundObj.soundToPlay = buffer;
    });
  }

  getSound.send();

  soundObj.play = function(){
    var playSound = audioContext.createBufferSource();
    playSound.buffer = soundObj.soundToPlay;
    playSound.connect(audioContext.destination);
    playSound.start(audioContext.currentTime);
    playSound.stop(audioContext.currentTime + .5);
  }

  return soundObj;
}

var vase = audioFileLoader('/blue.mp3');

function start(){
  shouldPlay = true;
}

function stop(){
  shouldPlay = false;
}

window.startMetronome = function(){
  setTimeout(start, 500);
}
window.stopMetronome = stop;

function scheduler(){
  while (futureTickTime < audioContext.currentTime + 0.1){
    if(shouldPlay){
      vase.play();
    }

    var secondsPerBeat = 60.0 / tempo;
    futureTickTime += 0.25 + secondsPerBeat;


  }
  
  timerID = window.setTimeout(scheduler, 50.0);
}

scheduler();
//start();
