/* !!! A NE PAS SUPPRIMER !!! */

const nativeFetch = window.fetch;

let callCount = 0;
const MAX_CALL_THRESHOLD = 5;

window.fetch = (input, init) => {
  if (callCount++ > MAX_CALL_THRESHOLD) {
    throw new Error(`Number of calls exceeds the tolerance threshold.`);
  }
  return nativeFetch.call(window, input, init);
};
