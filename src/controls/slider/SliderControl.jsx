import React from "react";
import styled from "styled-components";
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
// ui
import {
  SliderRail,
  Handle,
  Track,
  Tick
} from "./components/slider-components"; // example render components - source below
import { isUndefined } from "util";

const sliderStyle = {
  position: "relative",
  width: "100%"
};

const SliderControl = ({
  label,
  displayValue,
  value,
  values,
  onChange,
  showTicks = false,
  min = 0,
  max = 1,
  step = 0.001
}) => {
  const domain = [min, max];

  if (isUndefined(value) && isUndefined(values)) return <pre>null value</pre>;

  // if only one value given, turn into array so can treat the same
  if (!values) values = [value];

  // only return array if there are multiple values
  const onSliderUpdate = values => {
    console.log("SLIDER values: ", values);
    onChange(values.length > 1 ? values : values[0]);
  };

  return (
    <div style={{ height: 60, width: "100%" }}>
      <SliderLabel
        use={"button"}
        tag={"div"}
        className={"sliderControl--label"}
      >
        {label} {displayValue && values}
      </SliderLabel>
      <Slider
        mode={2}
        step={step}
        domain={domain}
        rootStyle={sliderStyle}
        onUpdate={onSliderUpdate}
        values={values}
      >
        <Rail>
          {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
        </Rail>
        <Handles>
          {({ handles, getHandleProps }) => (
            <div className="slider-handles">
              {handles.map(handle => (
                <Handle
                  key={handle.id}
                  handle={handle}
                  domain={domain}
                  getHandleProps={getHandleProps}
                />
              ))}
            </div>
          )}
        </Handles>
        <Tracks left={false} right={false}>
          {({ tracks, getTrackProps }) => (
            <div className="slider-tracks">
              {tracks.map(({ id, source, target }) => (
                <Track
                  key={id}
                  source={source}
                  target={target}
                  getTrackProps={getTrackProps}
                />
              ))}
            </div>
          )}
        </Tracks>

        {showTicks && (
          <Ticks count={5}>
            {({ ticks }) => (
              <div className="slider-ticks">
                {ticks.map(tick => (
                  <Tick key={tick.id} tick={tick} count={ticks.length} />
                ))}
              </div>
            )}
          </Ticks>
        )}
      </Slider>
    </div>
  );
};

export default SliderControl;

const SliderLabel = styled.div`
  width: 100%;
  text-transform: uppercase;
  font-size: 12px;
  min-height: 30px;
`;
