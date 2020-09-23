import * as services from "api";
import { useStore } from "store";
import PlanetCard from "../PlanetCard";
import { IData, IPlanet } from "interfaces";
import React, { useState, useEffect, useCallback } from "react";

const useHome = () => {
  const [state, dispatch] = useStore();
  const nextLink = state.next;
  const [loading, setLoading] = useState(false);

  // Save the items in the store and the localStorage.
  const addItems = useCallback(
    (items: IPlanet[], next: string | null): void => {
      dispatch({ type: "ADD_ITEMS", payload: { items, next } });
    },
    [dispatch]
  );

  // Set the items without saving them in the localStorage
  const setItems = useCallback(
    (items: IPlanet[], next: string | null): void => {
      if (state.items.length === 0)
        dispatch({ type: "SET_ITEMS", payload: { items, next } });
    },
    [dispatch, state.items.length]
  );

  useEffect(() => {
    const results = localStorage.getItem("results");
    const next = localStorage.getItem("nextLink");
    const getInitial = async () => {
      const data: IData = await services.getPlanets();
      if (data && data.results) {
        addItems(data.results, data.next);
      }
    };

    if (!results) getInitial();
    else setItems(JSON.parse(results), next ? JSON.parse(next) : null);
  }, [addItems, setItems]);

  const handleClick = async () => {
    setLoading(true);

    try {
      const data: IData = await services.getNextPage(nextLink!);
      addItems(data.results, data.next);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const Planet = (planet: IPlanet) => <PlanetCard planet={planet} key={planet.name} />;

  return {
    state,
    Planet,
    loading,
    nextLink,
    handleClick
  };
};

export default useHome;
