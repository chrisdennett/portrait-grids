import React from "react";
import * as Space from "react-spaces";
//
import TopBar from "./top-bar/TopBar";
import DisplayCanvas from "./main/DisplayCanvas";
import Controls from "./controls/Controls";

function App() {
  return (
    <Space.ViewPort>
      <Space.Top size={60}>
        <TopBar title={"TEMPLATE"} infoUrl={"https://artfly.io/binary-hands"} />
      </Space.Top>
      <Space.Fill trackSize={true}>
        <Space.Info>
          {sizeInfo => <DisplayCanvas sizeInfo={sizeInfo} />}
        </Space.Info>
      </Space.Fill>
      <Space.BottomResizable size={100}>
        <Controls />
      </Space.BottomResizable>
    </Space.ViewPort>
  );
}

export default App;
