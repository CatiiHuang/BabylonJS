export const axisHelper = (scene, len) => {
  const xAxis = BABYLON.MeshBuilder.CreateLines(
    "zAxis",
    {
      colors: [new BABYLON.Color4(1, 0, 0), new BABYLON.Color4(1, 0, 0)],
      points: [new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(len, 0, 0)],
    },
    scene
  );
  const yAxis = BABYLON.MeshBuilder.CreateLines(
    "yAxis",
    {
      colors: [new BABYLON.Color4(0, 1, 0), new BABYLON.Color4(0, 1, 0)],
      points: [new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, len, 0)],
    },
    scene
  );
  const zAxis = BABYLON.MeshBuilder.CreateLines(
    "zAxis",
    {
      colors: [new BABYLON.Color4(0, 0, 1), new BABYLON.Color4(0, 0, 1)],
      points: [new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 0, len)],
    },
    scene
  );

  return {
    xAxis,
    yAxis,
    zAxis,
  };
};

export const initScene = (engine, canvas) => {
  // 场景
  const scene = new BABYLON.Scene(engine);
  scene.ambientColor = new BABYLON.Color3(1, 1, 1);
  // 相机
  const camera = new BABYLON.ArcRotateCamera(
    "Camera",
    Math.PI / 2,
    Math.PI / 2,
    40,
    new BABYLON.Vector3(0, 0, 0),
    scene
  );
  camera.position = new BABYLON.Vector3(50, 50, 50);
  camera.attachControl(canvas, true);
  // 灯光
  const light1 = new BABYLON.HemisphericLight(
    "light1",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );
  // const light2 = new BABYLON.HemisphericLight(
  //   "light2",
  //   new BABYLON.Vector3(0, -1, 0),
  //   scene
  // );
  // 动画
  // 渲染器
  const render = (animation) => {
    engine.runRenderLoop(function () {
      scene.render();
      animation ? animation() : "";
    });
    window.addEventListener("resize", function () {
      engine.resize();
    });
  };

  return {
    scene,
    render,
    camera,
    light1,
    // light2,
  };
};

export const getPosition = (lng, lat, radius) => {
  const phi = (180 + lng) * (Math.PI / 180);
  const theta = (90 - lat) * (Math.PI / 180);
  return {
    x: -radius * Math.sin(theta) * Math.cos(phi),
    y: radius * Math.cos(theta),
    z: radius * Math.sin(theta) * Math.sin(phi),
  };
};
