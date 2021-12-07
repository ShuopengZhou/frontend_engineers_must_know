// Throttle limit api call/function call at a max frequence
// Here is an example.
// Before throttling we have a series of calling like
// ─A─B─C─ ─D─ ─ ─ ─ ─ ─ E─ ─F─G
// After throttling at wait time of 3 dashes
// ─A─ ─ ─C─ ─ ─D ─ ─ ─ ─ E─ ─ ─G

function throttle(func, wait) {
     // 1. cooling or not
  // 2. call posponed.
  
  //     1. once called,
  //       - if cooling, stash the call
  //       - if not colling, run it  and set the timer
  //     2. when time is up, reset cooling
  //       - if stashed call, call it, go to 1
    let timer = null;
    let stashed = null;

    const startCooling = () => {
        timer = window.setTimeout(check, wait);
    }

    const check = () => {
        timer = null;

        if (stashed != null) {
            func.apply(stashed[0], stashed[1]);
            stashed = null;
            startCooling();
        }
    }
    return function(...args) {
        if (timer != null) {
            // cooling, stash it
            stashed = [this, args];
        } else {
            fuc.apply(this, args);
            startCooling();
        }
    }
  }