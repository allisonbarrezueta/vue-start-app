const events = new Map();

export default {
  $on(eventName, fn) {
    if (!events.has(eventName)) {
      events.set(eventName, []);
    }
    events.get(eventName).push(fn);
  },

  $off(eventName, fn) {
    const event = events.get(eventName);
    if (event) {
      for (let i = 0; i < event.length; i++) {
        if (event[i] === fn) {
          event.splice(i, 1);
          events.set(eventName, event);
          break;
        }
      }
    }
  },

  $emit(eventName, data) {
    const event = events.has(eventName);
    if (event) {
      events.get(eventName).forEach((fn) => fn(data));
    }
  },
};
