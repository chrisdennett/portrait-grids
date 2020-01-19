import React from "react";
import styled from "styled-components";
//
import "@material/checkbox/dist/mdc.checkbox.css";
import "@material/form-field/dist/mdc.form-field.css";
import { Checkbox } from "@rmwc/checkbox";

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
      <Checkbox
        label="showDrawingSheet"
        checked={appData.showDrawingSheet}
        onChange={e =>
          onUpdate({
            ...appData,
            showDrawingSheet: e.currentTarget.checked
          })
        }
      />
      <Checkbox
        label="showDrawingSheetGrid"
        checked={appData.showDrawingSheetGrid}
        onChange={e =>
          onUpdate({
            ...appData,
            showDrawingSheetGrid: e.currentTarget.checked
          })
        }
      />
      <Checkbox
        label="showDrawingSheetOutlines"
        checked={appData.showDrawingSheetOutlines}
        onChange={e =>
          onUpdate({
            ...appData,
            showDrawingSheetOutlines: e.currentTarget.checked
          })
        }
      />
    </Container>
  );
};

export default TopBar;

const Container = styled.div`
  height: 100%;
  background: white;
  color: black;
`;

/*
const defaultAppData = {
  showSourceImage: false,
  showSourceSheetGrid: true,
  showSourceSheetOutlines: true,
  showDrawingSheet: true,
  showDrawingSheetGrid: true,
  showDrawingSheetOutlines: true,
  blurRadius: 2,
  highThreshold: 20,
  lowThreshold: 70
};

*/
