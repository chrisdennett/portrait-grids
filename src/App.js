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
        <TopBar
          title={"Portrait Grid"}
          infoUrl={"https://artfly.io/portrait-grids-maker"}
        />
      </Space.Top>
      <Space.Fill trackSize={true}>
        <Space.Info>
          {sizeInfo => <DisplayCanvas sizeInfo={sizeInfo} appData={appData} />}
        </Space.Info>
      </Space.Fill>
      <Space.BottomResizable size={250}>
        <Controls onUpdate={setAppData} appData={appData} />
      </Space.BottomResizable>
    </Space.ViewPort>
  );
}

export default App;

const defaultAppData = {
  showSourceImage: true,
  showSourceSheetGrid: true,
  showSourceSheetOutlines: true,
  test: 4,
  blurRadius: 2,
  highThreshold: 20,
  lowThreshold: 70
};
