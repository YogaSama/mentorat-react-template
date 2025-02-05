/* !!! A NE PAS SUPPRIMER !!! */
/* Empêche de rentrer sur une boucle infini d'appel sur le réseau */

// ----------------------------
// Configurable :
const REFRESH_IN_MS = 1000;
const MAX_CALL_THRESHOLD_PER_REFRESH = 50;
const FETCH_RESPONSE_DELAY_MS = 500;
// ----------------------------

function delay(timeMs: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, timeMs));
}

let callCount = 0;
let error = false;

setInterval(() => {
  if (callCount > 0) {
    callCount = 0;
  }
}, REFRESH_IN_MS);

const nativeFetch = window.fetch;

window.fetch = async (input, init) => {
  if (error) {
    alert('Too many calls. (reload or debug your code)');
    error = false;
  }

  if (callCount++ > MAX_CALL_THRESHOLD_PER_REFRESH) {
    error = true;
    throw new Error(`Max number of calls per second exceeds.`);
  }

  try {
    const response = nativeFetch.call(window, input, init);
    await delay(FETCH_RESPONSE_DELAY_MS);
    return response;
  } catch (err) {
    await delay(FETCH_RESPONSE_DELAY_MS);
    throw err;
  }
};

console.log('security init.');
