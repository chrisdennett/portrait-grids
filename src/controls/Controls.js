import React from "react";
import styled from "styled-components";
//
import "@material/checkbox/dist/mdc.checkbox.css";
import "@material/form-field/dist/mdc.form-field.css";
import { Checkbox } from "@rmwc/checkbox";
import SliderControl from "./slider/SliderControl";

const TopBar = ({ appData, onUpdate }) => {
  return (
    <Container>
      <Checkbox
        label="Show Source Image"
        checked={appData.showSourceImage}
        onChange={e =>
          onUpdate({ ...appData, showSourceImage: e.currentTarget.checked })
        }
      />
      <Checkbox
        label="Show Source Sheet Grid"
        checked={appData.showSourceSheetGrid}
        onChange={e =>
          onUpdate({ ...appData, showSourceSheetGrid: e.currentTarget.checked })
        }
      />
      <Checkbox
        label="showSourceSheetOutlines"
        checked={appData.showSourceSheetOutlines}
        onChange={e =>
          onUpdate({
            ...appData,
            showSourceSheetOutlines: e.currentTarget.checked
          })
        }
      />
      <SlicerHolder>
        <SliderControl
          labelStyle={{ minWidth: 150 }}
          label={"Blur:"}
          displayValue={true}
          step={1}
          min={1}
          max={12}
          value={appData.blurRadius}
          onChange={value =>
            onUpdate({
              ...appData,
              blurRadius: value
            })
          }
        />
      </SlicerHolder>
      <SlicerHolder>
        <SliderControl
          labelStyle={{ minWidth: 150 }}
          label={"highThreshold:"}
          displayValue={true}
          step={1}
          min={0}
          max={100}
          value={appData.highThreshold}
          onChange={value =>
            onUpdate({
              ...appData,
              highThreshold: value
            })
          }
        />
      </SlicerHolder>
      <SlicerHolder>
        <SliderControl
          labelStyle={{ minWidth: 150 }}
          label={"lowThreshold:"}
          displayValue={true}
          step={1}
          min={0}
          max={100}
          value={appData.lowThreshold}
          onChange={value =>
            onUpdate({
              ...appData,
              lowThreshold: value
            })
          }
        />
      </SlicerHolder>
    </Container>
  );
};

export default TopBar;

const Container = styled.div`
  height: 100%;
  background: white;
  color: black;
`;

const SlicerHolder = styled.div`
  padding: 0 10px;
`;

/*
const defaultAppData = {
  showSourceImage: false,
  showSourceSheetGrid: true,
  showSourceSheetOutlines: true,
  blurRadius: 2,
  highThreshold: 20,
  lowThreshold: 70
};
*/
