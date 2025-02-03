/* !!! A NE PAS SUPPRIMER !!! */

console.log('import init file.');

function delay(timeMs: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, timeMs));
}

const ONE_SECOND_IN_MS = 1000;
const MAX_CALL_THRESHOLD_PER_SECOND = 50;
const FETCH_RESPONSE_DELAY = 500;

let callCount = 0;

setInterval(() => {
  if (callCount > 0) {
    callCount = 0;
  }
}, ONE_SECOND_IN_MS);

const nativeFetch = window.fetch;

window.fetch = async (input, init) => {
  if (callCount++ > MAX_CALL_THRESHOLD_PER_SECOND) {
    throw new Error(`Max number of calls per second exceeds.`);
  }

  try {
    const response = nativeFetch.call(window, input, init);
    await delay(FETCH_RESPONSE_DELAY);
    return response;
  } catch (err) {
    await delay(FETCH_RESPONSE_DELAY);
    throw err;
  }
};
