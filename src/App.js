import React, { useState } from "react";
import * as Space from "react-spaces";
//
import TopBar from "./top-bar/TopBar";
import DisplayCanvas from "./main/DisplayCanvas";
import Controls from "./controls/Controls";

function App() {
  const [appData, setAppData] = useState(defaultAppData);

  return (
    <Space.ViewPort>
      <Space.Top size={60}>
        <TopBar title={"TEMPLATE"} infoUrl={"https://artfly.io/binary-hands"} />
      </Space.Top>
      <Space.Fill trackSize={true}>
        <Space.Info>
          {sizeInfo => <DisplayCanvas sizeInfo={sizeInfo} appData={appData} />}
        </Space.Info>
      </Space.Fill>
      <Space.BottomResizable size={100}>
        <Controls onUpdate={setAppData} appData={appData} />
      </Space.BottomResizable>
    </Space.ViewPort>
  );
}

export default App;

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
