function Metronome(workFunc, interval) {
  let that = this;
  let expected, timeout;
  this.interval = interval;

  this.start = function() {
    expected = Date.now() + this.interval;
    timeout = setTimeout(step, this.interval);
  }

  this.stop = function() {
    clearTimeout(timeout);
  }

  function step() {
    var drift = Date.now() - expected;
    workFunc();
    expected += that.interval;
    timeout = setTimeout(step, Math.max(0, that.interval-drift));
  }
}

let tick = function() {
  monoSynth.play(parseInt(notesToPlay[compteur]), 1, 0, 1/6);
  compteur++;
};

let metronome = new Metronome(tick, 1000);