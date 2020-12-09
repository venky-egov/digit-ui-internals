import { StoreSingleton } from "@egovernments/digit-ui-module-core/src/redux_2/store";
import { custom_pgr_citizen_reducer } from "./reducer";
import { PGR_SOME_ACTION } from "./types";

class PGRStoreService extends StoreSingleton {
  constructor() {
    super();
    this.addReducer("PGR", custom_pgr_citizen_reducer);
  }

  dispatchAsynchronously = (data) => {
    setTimeout(() => {
      this.dispatch({ type: PGR_SOME_ACTION, payload: "check" });
      console.log("------------------>", this.state());
    }, 1000);
  };
}

export const PgrStoreService = new PGRStoreService();
