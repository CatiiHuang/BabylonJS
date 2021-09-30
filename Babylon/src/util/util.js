import * as BABYLON from "@babylonjs/core";
import { Engine } from "@babylonjs/core";
const createCanvas = (el) => {
  const canvas = document.createElement("canvas");
  canvas.style.width = "100%";
  canvas.style.height = "100%";

  canvas.id = "globe";
  document.querySelector(el).appendChild(canvas);
  return canvas;
};

const createEngine = (canvas) => {
  const engine = new Engine(canvas, true);
  return engine;
};
const createScene = (engine, ambientColor) => {
  const scene = new BABYLON.Scene(engine);
  scene.ambientColor = ambientColor;
  return scene;
};

const createRender = (scene, engine) => {
  return {
    rendering(callback) {
      engine.runRenderLoop(function () {
        scene.render();
        if (callback) callback();
      });
    },
    reSize() {
      window.addEventListener("resize", function () {
        engine.resize();
      });
    },
  };
};

const createAxisHelper = (mesh, size) => {
  const makeAxis = (scene, name, size, color4) => {
    return BABYLON.MeshBuilder.CreateLines(name, {
      colors: new Array(5).fill(0).map(() => color4),
      points: [
        new BABYLON.Vector3(0, 0, 0),
        new BABYLON.Vector3(size, 0, 0),
        new BABYLON.Vector3(0.92 * size, 0, 0.03 * size),
        new BABYLON.Vector3(size, 0, 0),
        new BABYLON.Vector3(0.92 * size, 0, -0.03 * size),
      ],
      scene,
    });
  };
  const axisX = makeAxis(mesh, "axisX", size, new BABYLON.Color4(1, 0, 0, 1));
  const axisY = makeAxis(mesh, "axisY", size, new BABYLON.Color4(0, 1, 0, 1));
  axisY.rotation.z = Math.PI / 2;
  const axisZ = makeAxis(mesh, "axisZ", size, new BABYLON.Color4(0, 0, 1, 1));
  axisZ.rotation.y = -Math.PI / 2;

  if (!mesh._isScene) {
    axisX.parent = mesh;
    axisY.parent = mesh;
    axisZ.parent = mesh;
  }

  return {
    axisX,
    axisY,
    axisZ,
  };
};

export {
  createCanvas,
  createEngine,
  createScene,
  createRender,
  createAxisHelper,
};
