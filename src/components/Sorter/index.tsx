import React from "react";
import {
  Button,
  Select,
  Dialog,
  MenuItem,
  InputLabel,
  FormControl,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@material-ui/core";
import { useDispatch } from "store";
import SortIcon from "@material-ui/icons/Sort";
import { ISorterProps, EventChange, ISort } from "interfaces";

import "./styles.css";

const initialSort: ISort = { sort: "", order: "ascending" };
const Sorter: React.FunctionComponent<ISorterProps> = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState<boolean>(false);
  const [sort, setSort] = React.useState<ISort>(initialSort);

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<EventChange>): void => {
    setSort({ ...sort, [event.target.name!]: event.target.value as string });
  };

  const handleAccept = () => {
    dispatch({ type: "SORT_ITEMS", payload: { sortBy: sort.sort, orderBy: sort.order } });
    setOpen(false);
  };

  const handleClear = () => {
    setSort(initialSort);
    dispatch({ type: "SORT_ITEMS", payload: { sortBy: "none", orderBy: "" } });
    setOpen(false);
  };

  return (
    <>
      <Button className="sort-button" onClick={() => setOpen(true)}>
        <span>Sort Options</span>
        <SortIcon />
      </Button>

      <Dialog className="custom-dialog" open={open} onClose={handleClose}>
        <div className="dialog-bg"></div>
        <DialogTitle className="dialog-title">Sort Options</DialogTitle>
        <DialogContent className="dialog-content">
          <div className="forms">
            <FormControl className="form-control">
              <InputLabel id="sortedBy">Sort By:</InputLabel>
              <Select
                name="sort"
                labelId="sortedBy"
                value={sort.sort}
                onChange={handleChange}>
                <MenuItem value="none">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="climate">Climate</MenuItem>
                <MenuItem value="diameter">Diameter</MenuItem>
                <MenuItem value="gravity">Gravity</MenuItem>
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="orbital_period">Orbital Period</MenuItem>
                <MenuItem value="population">Population</MenuItem>
                <MenuItem value="rotation_period">Rotation Period</MenuItem>
                <MenuItem value="surface_water">Surface Water</MenuItem>
                <MenuItem value="terrain">Terrain</MenuItem>
              </Select>
            </FormControl>

            <FormControl className="form-control">
              <InputLabel id="orderBy">Order:</InputLabel>
              <Select
                name="order"
                value={sort.order}
                labelId="orderBy"
                onChange={handleChange}>
                <MenuItem value="ascending">Ascending</MenuItem>
                <MenuItem value="descending">Descending</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Button className="clear-button" onClick={handleClear}>
            Clear filters
          </Button>
        </DialogContent>

        <DialogActions className="dialog-actions">
          <Button onClick={handleAccept}>Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Sorter;
