class EventBus extends HTMLElement {
  constructor() {
    super();

    const eventCallbacksPairs = {};

    this.eventCallbacksPairs = eventCallbacksPairs;
  }

  subscribe(event, callback) {
    if (this.eventCallbacksPairs[event]) {
      this.eventCallbacksPairs[event]
        .callbacks
        .push(callback);
    } else {
      this.eventCallbacksPairs[event] = new EventCallbacksPair(
        event, [ callback ]
      );
    }
  }

  publish(event, payload) {
    if (this.eventCallbacksPairs[event]) {
      this.eventCallbacksPairs[event]
        .callbacks
        .forEach((callback) => callback(event, payload));
    }
  }
}

class EventCallbacksPair {
  constructor(event, callbacks) {
    this.event = event;
    this.callbacks = callbacks;
  }
}

customElements.define('event-bus', EventBus);
