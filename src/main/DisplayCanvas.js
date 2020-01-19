import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import toBlob from "canvas-to-blob";
import styled from "styled-components";
import * as jsfeat from "./jsfeat";
// helpers
import * as ImageHelper from "./ImageHelper";

const DisplayCanvas = ({ sizeInfo, appData }) => {
  const [sourceImg, setSourceImg] = useState(null);
  const [canvasX, setCanvasX] = useState(0);
  const [canvasY, setCanvasY] = useState(0);

  const canvasRef = React.useRef(null);

  useEffect(() => {
    if (!sourceImg) {
      const image = new Image();
      image.crossOrigin = "Anonymous";
      image.onload = () => {
        setSourceImg(image);
      };
      image.src = "img/sample-397x480.png";
    } else {
      const { w, h } = drawCanvas(
        sourceImg,
        canvasRef.current,
        sizeInfo.width,
        sizeInfo.height
      );
      const x = (sizeInfo.width - w) / 2;
      const y = (sizeInfo.height - h) / 2;

      setCanvasX(x);
      setCanvasY(y);

      ImageHelper.drawImageToCanvas(
        {
          sourceImg,
          outputCanvas: canvasRef.current,
          orientation: 1,
          maxOutputWidth: 480
        },
        () => {
          updateCannyFilter();
        }
      );
    }
  });

  const saveImage = () => {
    const downloadName = `artfly_portrait_grid_source.png`;
    this.canvas.toBlob(blob => {
      saveAs(blob, downloadName);
    });
  };

  const updateCannyFilter = () => {
    const paddingForText = 30;

    const cannyCanvas = document.createElement("canvas");
    const width = sourceImg.width;
    const height = sourceImg.height;
    cannyCanvas.width = width;
    cannyCanvas.height = height;

    ImageHelper.drawToCanvas(sourceImg, cannyCanvas);
    const ctx = cannyCanvas.getContext("2d");
    const image_data = ctx.getImageData(0, 0, width, height);

    const gray_img = new jsfeat.matrix_t(
      width,
      height,
      jsfeat.U8_t | jsfeat.C1_t
    );
    const code = jsfeat.COLOR_RGBA2GRAY;
    jsfeat.imgproc.grayscale(image_data.data, width, height, gray_img, code);

    const kernel_size = (appData.blurRadius + 1) << 1;
    jsfeat.imgproc.gaussian_blur(gray_img, gray_img, kernel_size, 0);

    jsfeat.imgproc.canny(
      gray_img,
      gray_img,
      appData.lowThreshold,
      appData.highThreshold
    );

    // render result back to canvas
    const data_u32 = new Uint32Array(image_data.data.buffer);

    const alpha = 0xff << 24;
    let colour;
    let i = gray_img.cols * gray_img.rows,
      pix = 0;

    while (--i >= 0) {
      pix = gray_img.data[i];

      // generates colour of -1 (white) or -16777216 (black)
      colour = alpha | (pix << 16) | (pix << 8) | pix;
      data_u32[i] = colour === -1 ? -16777216 : -1;
    }

    ctx.putImageData(image_data, 0, 0);

    const outputCtx = canvasRef.current.getContext("2d");
    canvasRef.current.width = width;
    canvasRef.current.height = height;

    if (appData.showSourceImage) {
      outputCtx.globalCompositeOperation = "color-burn";
      outputCtx.drawImage(
        sourceImg,
        paddingForText,
        paddingForText,
        width - paddingForText,
        height - paddingForText
      );
    }

    if (appData.showSourceSheetOutlines) {
      outputCtx.drawImage(
        cannyCanvas,
        paddingForText,
        paddingForText,
        width - paddingForText,
        height - paddingForText
      );
    }

    if (appData.showSourceSheetGrid) {
      drawGrid(10, canvasRef.current, paddingForText);
    }
  };

  return (
    <Container>
      <CanvasHolder left={canvasX} top={canvasY}>
        <canvas ref={canvasRef} />
      </CanvasHolder>
    </Container>
  );
};

export default DisplayCanvas;

const drawGrid = (squaresPerRow, canvas, gutterSize, fontSize = 20) => {
  // add numbers and letters
  // add letters across the top and numbers down.
  // need to make the canvas slightly bigger than the source.
  const lettersString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const letters = { ...lettersString };

  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;

  ctx.beginPath();

  const gridSquareSize = (width - gutterSize) / squaresPerRow;
  let xPos, yPos, digit;
  ctx.font = `${fontSize}px Verdana`;
  const sqaureTextMiddle = gridSquareSize / 2 - fontSize / 2;

  for (let i = 0; i <= squaresPerRow; i++) {
    xPos = gutterSize + i * gridSquareSize;
    ctx.moveTo(xPos, gutterSize);
    ctx.lineTo(xPos, height);

    // label
    digit = i < lettersString.length ? letters[i] : "0h";
    ctx.fillText(digit, xPos + sqaureTextMiddle, fontSize);
  }

  const squaresDown = Math.ceil(height / gridSquareSize);
  for (let j = 0; j <= squaresDown; j++) {
    yPos = gutterSize + j * gridSquareSize;
    ctx.moveTo(gutterSize, yPos);
    ctx.lineTo(width, yPos);

    // label
    let digitXPos = j > 9 ? 0 : gutterSize - fontSize; // v rough positioning
    ctx.fillText(String(j), digitXPos, yPos + fontSize + sqaureTextMiddle);
  }

  ctx.stroke();
};

const drawCanvas = (source, targetCanvas, maxTargetWidth, maxTargetHeight) => {
  const ctx = targetCanvas.getContext("2d");

  const sourceW = source.width;
  const sourceH = source.height;

  // limit maximum size to source image size (i.e. don't increase size)
  const maxWidth = Math.min(maxTargetWidth, sourceW);
  const maxHeight = Math.min(maxTargetHeight, sourceH);

  const widthToHeightRatio = sourceH / sourceW;
  const heightToWidthRatio = sourceW / sourceH;

  // set size based on max width
  let w = maxWidth;
  let h = w * widthToHeightRatio;

  // if that makes the h bigger than max
  if (h > maxHeight) {
    // set size based on max height
    h = maxHeight;
    w = h * heightToWidthRatio;
  }

  targetCanvas.width = w;
  targetCanvas.height = h;

  //	context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
  ctx.drawImage(source, 0, 0, sourceW, sourceH, 0, 0, w, h);

  // return the output width and height so it can be used to position canvas
  return { w, h };
};

const CanvasHolder = styled.div`
  position: absolute;
  left: ${props => props.left}px;
  top: ${props => props.top}px;
  line-height: 0;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
`;

const Container = styled.div`
  background: yellow;
  width: 100%;
  height: 100%;
`;
