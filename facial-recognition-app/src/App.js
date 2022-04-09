/** Steps
 * Install Dependencies  DONE
 * Import dependencies DONE
 * Setup webcam and canvas DONE 
 * Define references to those DONE 
 * Load facemesh DONE 
 * Detect function
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

function App() {


//Setup Reference
const webcamRef = useRef(null);
const canvasRef = useRef(null);

// Load facemesh
// inputResolution:{How big of an image we are bringing in w, h}, scale: how much we want to scale it down 

const runFacemesh = async () =>{
  const net = await facemesh.load({
    inputResolution:{width:640, height:480}, scale:0.8
  })
}


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
