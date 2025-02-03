/* !!! A NE PAS SUPPRIMER !!! */

if (window.fetch) {
  const ONE_SECOND_IN_MS = 1000;
  const MAX_CALL_THRESHOLD_PER_SECOND = 10;

  let callCount = 0;

  setInterval(() => {
    if (callCount > 0) {
      callCount = 0;
    }
  }, ONE_SECOND_IN_MS);

  const nativeFetch = window.fetch;

  window.fetch = (input, init) => {
    if (callCount++ > MAX_CALL_THRESHOLD_PER_SECOND) {
      throw new Error(`Max number of calls per second exceeds.`);
    }
    return nativeFetch.call(window, input, init);
  };
}
