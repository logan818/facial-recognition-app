/** Steps
 * Install Dependencies  DONE
 * Import dependencies DONE
 * Setup webcam and canvas DONE 
 * Define references to those DONE 
 * Load facemesh DONE 
 * Detect function Might have buggs
 * Drawing utilities 
 * Load triangulation
 * Setup triangle path
 * Setup point drawing
 * Add drawMesh to detect function
 */

import React, { useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";
import Webcam from 'react-webcam';
//import logo from './logo.svg';
import './App.css';
import {drawMesh} from './utilities';

function App() {


//Setup Reference
const webcamRef = useRef(null);
const canvasRef = useRef(null);

// Load facemesh
// inputResolution:{How big of an image we are bringing in w, h}, scale: how much we want to scale it down //* inputResolution:{width:640, height:480}, scale:0.8,
// loading setinterval and running detect function we created on line //* detect(net)

const runFacemesh = async () =>{
  const net = await facemesh.load({
    inputResolution:{width:640, height:480}, scale:0.8,
  });
  setInterval(()=>{
    detect(net)
    // !! RUNNING EVERY MILLISECOND 
  }, 100)
};

// Detect function
// Will only run if the webcam has input data
// checking webcam is not undefined  //* typeof webcamRef.current !== "undefined" &&
// checking webcam not null //* webcamRef.current != null
// checking webcam is receiving data //* webcamRef.current.video.readState === 4


//  net is grabbing the neural network from tensorflow //* const detect = async (net) => {
const detect = async (net) => {
  if (
    typeof webcamRef.current !== "undefined" &&
     webcamRef.current != null &&
     webcamRef.current.video.readyState === 4
      ) {
        // Get Video Properties
        const video = webcamRef.current.video;
        const videoWidth = webcamRef.current.video.videoWidth;
        const videoHeight = webcamRef.current.video.videoHeight;

        // Set Video Width
        webcamRef.current.video.width = videoWidth;
        webcamRef.current.video.height = videoHeight;

        // Set canvas width
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;

        // Make detections
        // Allows us to detect all our facial landmarks; nose, mouth, ears, etc... estimate faces //* const face = await net.estimateFaces(video);
        const face = await net.estimateFaces(video);
        console.log(face);

        // Get canvas context for drawing
        const ctx = canvasRef.current.getContext("2d");
        drawMesh(face, ctx)
      }
}

// Have to actually run the function after all the const have been created //* runFacemesh();

runFacemesh();

  return (
    <div className="App">
      <header className="App-header">
      <Webcam ref={webcamRef} style ={
        {
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        left: 0,
        right: 0,
        textAlign: "center",
        zIndex: 9,
        width: 640,
        height: 480 
        }
      } />

      <canvas ref={ canvasRef }
      style = {
      {
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        left: 0,
        right: 0,
        textAlign: "center",
        zIndex: 9,
        width: 640,
        height: 480 
        }
      } ></canvas>
      
      </header>
    </div>
  );
}

export default App;
