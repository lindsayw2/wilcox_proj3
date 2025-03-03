let audioContext;
let oscillator;
let gainNode;
let delayNode;
let modOscillator;
let modGain;

document.getElementById("startButton").addEventListener("click", () => {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Create oscillator (sound)
        oscillator = audioContext.createOscillator();
        oscillator.type = "sawtooth"; 
        oscillator.frequency.value = 440; 
        
        // Gain node (volume)
        gainNode = audioContext.createGain();
        gainNode.gain.value = 0.5;

        // Delay node/ flanger
        delayNode = audioContext.createDelay();
        delayNode.delayTime.value = 0.005; 
        // LFO
        modOscillator = audioContext.createOscillator();
        modOscillator.type = "sine"; 
        modOscillator.frequency.value = 1; 

        // Gain node for modulation depth
        modGain = audioContext.createGain();
        modGain.gain.value = 0.005; 

        // Connect modulator to delay
        modOscillator.connect(modGain);
        modGain.connect(delayNode.delayTime);

        // Connect audio nodes
        oscillator.connect(delayNode);
        delayNode.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // Start everything
        oscillator.start();
        modOscillator.start();
    }
});

// Update flanger rate (LFO speed)
document.getElementById("flangerRate").addEventListener("input", (event) => {
    modOscillator.frequency.value = parseFloat(event.target.value);
});

// Update flanger depth 
document.getElementById("flangerDepth").addEventListener("input", (event) => {
    modGain.gain.value = parseFloat(event.target.value) / 1000; 
});

// Update master volume
document.getElementById("volume").addEventListener("input", (event) => {
    gainNode.gain.value = parseFloat(event.target.value);
});
