import Action from "./actions";
import { IPlanet, IState } from "../interfaces";

function reducers(state: IState, action: Action) {
  switch (action.type) {
    case "SET_ITEMS": {
      const items = [...state.items, ...action.payload.items];
      return { ...state, items, next: action.payload.next };
    }

    case "ADD_ITEMS": {
      const items = [...state.items, ...action.payload.items];
      localStorage.setItem("results", JSON.stringify(items));
      localStorage.setItem("nextLink", JSON.stringify(action.payload.next));
      return { ...state, items, next: action.payload.next };
    }

    case "SORT_ITEMS": {
      const { sortBy, orderBy } = action.payload;
      if (sortBy !== "none") {
        const items = [...state.items];
        const asc = "ascending";
        const filtered = items.sort((a: any, b: any) => {
          if (a[sortBy] > b[sortBy]) return orderBy === asc ? 1 : -1;
          if (a[sortBy] < b[sortBy]) return orderBy === asc ? -1 : 1;
          return 0;
        });
        return { ...state, filtered };
      } else return { ...state, filtered: [] };
    }

    case "SET_FILTER": {
      const items = state.items;
      if (action.payload.filter) {
        const filterName = action.payload.filter.toLowerCase();
        const filtered = items.filter((item: IPlanet) =>
          item.name.toLowerCase().includes(filterName)
        );
        return { ...state, filter: action.payload.filter, filtered };
      } else return { ...state, filter: null, filtered: [] };
    }

    default:
      return state;
  }
}

export default reducers;
