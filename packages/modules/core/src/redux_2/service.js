import { StoreSingleton } from "./store";
import { DUMMY_ACTION } from "./types";

class CoreServiceClass extends StoreSingleton {
  constructor() {
    super();
  }

  dispatchAsyncMetho = () => {
    this.dispatch({ type: DUMMY_ACTION, payload: "prev" });
  };
}

export const CoreService = new CoreServiceClass();
