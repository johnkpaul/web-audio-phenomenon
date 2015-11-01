import WebAudioScheduler from "web-audio-scheduler";
var audioContext = new AudioContext();
var scheduler = new WebAudioScheduler({
  context: audioContext
});

function metronome(e) {
  scheduler.insert(e.playbackTime + 0.000, ticktack, [ 880, 1.00 ]);
  scheduler.insert(e.playbackTime + 1.000, ticktack, [ 880, 1.00 ]);
  scheduler.insert(e.playbackTime + 2.000, metronome);
}

function ticktack(e, freq, dur) {
  var t0 = e.playbackTime;
  var t1 = t0 + dur;
  var osc = audioContext.createOscillator();
  var amp = audioContext.createGain();

  osc.frequency.value = freq;
  amp.gain.setValueAtTime(0.5, t0);
  amp.gain.exponentialRampToValueAtTime(1e-6, t1);

  osc.start(t0);

  osc.connect(amp);
  amp.connect(audioContext.destination);

  scheduler.insert(t1, function(e) {
    osc.stop(e.playbackTime);
    scheduler.nextTick(function() {
      osc.disconnect();
      amp.disconnect();
    });
  });
}

function start() {
  scheduler.start(metronome);
}

function stop() {
  scheduler.stop(true);
}
window.startMetronome = function(){
  setTimeout(start, 500);
}
window.stopMetronome = stop;
//start();
