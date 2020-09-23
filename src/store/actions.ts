import { IPlanet } from "../interfaces";

type Action =
  | {
      type: "SET_ITEMS";
      payload: {
        items: IPlanet[];
        next: string | null;
      };
    }
  | {
      type: "ADD_ITEMS";
      payload: {
        items: IPlanet[];
        next: string | null;
      };
    }
  | {
      type: "SET_FILTER";
      payload: {
        filter: string | null;
      };
    }
  | {
      type: "SORT_ITEMS";
      payload: {
        sortBy: string;
        orderBy: string;
      };
    };

export default Action;
