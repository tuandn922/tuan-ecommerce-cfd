import { Slider, makeStyles } from "@material-ui/core";
import React, { useState } from "react";

const useStyles = makeStyles({
  root: {
    color: "#6a983c",
  },
});
const FilterPrice = () => {
  const classes = useStyles();
  const [value, setValue] = useState([100000, 100000000]);
  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };
  return (
    <>
      {/* <Slider
        className={classes.root}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        max={1}
        min={100}
      /> */}
      <div className="price">
        <div className="price--input">
          <h3>Min</h3>
          <input type="text" name="price-min" id="min" placeholder="0" />
        </div>
        <div className="line"></div>
        <div className="price--input">
          <h3>Max</h3>
          <input type="text" name="price-max" id="max" placeholder="0" />
        </div>
      </div>
      <div className="button-form">
        <div className="btn btn-buy">
          <span>Apply</span>
        </div>
        <div className="btn btn--more">
          <span>Reset</span>
        </div>
      </div>
    </>
  );
};

export default FilterPrice;
