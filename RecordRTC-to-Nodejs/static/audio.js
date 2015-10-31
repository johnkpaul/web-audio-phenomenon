//var dev, osc;

//function audioCallback(buffer, channelCount){
    //// Fill the buffer with the oscillator output.
    //osc.append(buffer, channelCount);
//}

//window.addEventListener('load', function(){
    //// Create an instance of the AudioDevice class
    //dev = audioLib.AudioDevice(audioCallback [> callback for the buffer fills */, 2 /* channelCount <]);
//debugger;
    //// Create an instance of the Oscillator class
    //osc = audioLib.Oscillator(dev.sampleRate [> sampleRate */, 340 /* frequency <]);
//}, true);

var PLAY = false;
var mySample = atob(Click1);

var tempo = 70,
    notesPerBeat = 4,
    tickCounter = 1,
    tick = 0,
    dev, sampler;

function audioCallback(buffer, channelCount){
    // Fill the buffer with the sampler output
    sampler.append(buffer, channelCount);
}

window.addEventListener('load', function(){
if(!PLAY) return;
    // Create an instance of the AudioDevice class
    dev = audioLib.AudioDevice(audioCallback /* callback for the buffer fills */, 2 /* channelCount */);
    // Create an instance  of the Sampler class
    sampler = audioLib.Sampler(dev.sampleRate);
    // Load the sample to the sampler
    sampler.loadWav(mySample, true);

    // The addPreProcessing() method is called before .generate()
    sampler.addPreProcessing(function(){
        // Make tickCounter approach 1, and trigger sample when reached
        tickCounter = tickCounter + 1 / dev.sampleRate * tempo / 60;

        if (tickCounter >= 1){
            tickCounter = 0;
            // Trigger the sample at e if first note, otherwise at a
            this.noteOn(tick ? 440 : 660);
            tick = (tick + 1) % notesPerBeat;
        }
    });

}, true);
