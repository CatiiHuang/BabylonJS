import {
  Color3,
  Vector3,
  ArcRotateCamera,
  HemisphericLight,
  DirectionalLight,
} from "@babylonjs/core";

import * as BABYLON from "@babylonjs/core";

import {
  createScene,
  createCanvas,
  createEngine,
  createRender,
  createAxisHelper,
} from "@/util/util.js";

class Globe {
  constructor(opt) {
    this._opt = opt;
    this.name = "globe";
    this._init(opt);
    this._main();
  }
  _init() {
    this._initState();
    this._initScene();
    this._initLight();
    this._initRender();
    this._rendering();
    createAxisHelper(this._scene, 100);
  }
  _initState() {
    this.unit = this._opt.unit || 10;
    this._canvas = null;
    this._engine = null;
    this._camera = null;
  }
  _initScene() {
    this._canvas = createCanvas(this._opt.el);
    this._engine = createEngine(this._canvas);
    this._scene = createScene(this._engine, new Color3(1, 1, 1));
    this._camera = new ArcRotateCamera(
      "Camera",
      Math.PI / 2,
      Math.PI / 2,
      30,
      new Vector3(0, 0, 0),
      this._scene
    );
    this._camera.attachControl(this._canvas, true);
    this._camera.position = new BABYLON.Vector3(50, 50, 50);
  }
  _initLight() {
    const light1 = new HemisphericLight(
      "light1",
      new Vector3(0, 1000, 0),
      this._scene
    );
    light1.intensity = 2;
    const light2 = new DirectionalLight(
      "DirectionalLight",
      new BABYLON.Vector3(0, -100, 0),
      this._scene
    );
    light2.diffuse = new BABYLON.Color3(1, 1, 1);
    light2.specular = new BABYLON.Color3(0, 0, 0);
    this._light1 = light1;
    this._light2 = light2;
  }
  _initRender() {
    this._render = createRender(this._scene, this._engine);
  }
  _rendering() {
    this._render.rendering(() => {
      this._animation();
    });
    this._render.reSize();
  }
  _animation() {}
  _main() {
    this.drawGlobe();
    this.drawCylinder();
  }
  // 绘制地球
  drawGlobe() {
    const { diffuseTexture, bumpTexture } = this._opt.globe;
    this._globe = BABYLON.MeshBuilder.CreateSphere(
      "globe",
      {
        arc: Math.PI,
        diameter: 5 * this.unit,
        segments: 48,
      },
      this._scene
    );
    this._globe.radius = (5 * this.unit) / 2;
    const globeMat = new BABYLON.StandardMaterial("boxMat");
    globeMat.diffuseColor = new BABYLON.Color3(1, 1, 1); //漫反射颜色
    globeMat.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1); //镜面颜色
    globeMat.emissiveColor = new BABYLON.Color3(1, 1, 1); //自发光颜色
    globeMat.ambientColor = new BABYLON.Color3(1, 1, 1); //环境光颜色
    globeMat.diffuseTexture = new BABYLON.Texture(diffuseTexture) || null;
    // globeMat.bumpTexture = new BABYLON.Texture(bumpTexture) || null;
    this._globe.material = globeMat;
  }
  drawCylinder() {
    const { data } = this._opt.scatter.cylinder;
    const dataList = data
      .map((item) => Number(item.value))
      .sort((a, b) => b - a);
    const max = dataList[0];
    const maxH = this._globe.radius / 5;
    data.forEach((item) => {
      const { label, value, position } = item;
      const posV3 = WGSToCartesian(...position, this._globe.radius);
      const height = (value / max) * maxH;
      this.drawCylinderModel({ label, value, posV3, height });
    });
  }
  drawCylinderModel({ label, value, posV3, height }) {
    const cylinder = BABYLON.MeshBuilder.CreateBox(`cylinder${label}`, {
      height: height,
      width: 0.8,
      depth: 0.8,
    });
    cylinder.value = value;
    cylinder.label = label;
    const mat = new BABYLON.StandardMaterial();
    mat.diffuseColor = new BABYLON.Color3(
      Math.random(),
      Math.random(),
      Math.random()
    );
    cylinder.material = mat;
    cylinder.position = posV3;
    cylinder.lookAt(this._globe.position);
    cylinder.rotate(BABYLON.Axis.Y, Math.PI / 2, BABYLON.Space.LOCAL);
    cylinder.rotate(BABYLON.Axis.Z, Math.PI / 2, BABYLON.Space.LOCAL);
    cylinder.translate(new Vector3(0, 1, 0), -height / 2, BABYLON.Space.LOCAL);
  }
}

const getRad = (angle) => (angle * Math.PI) / 180;
const WGSToCartesian = (lat, lng, radius = 1) => {
  const alpha = getRad(180 + lng);
  const beta = getRad(90 - lat);
  return new Vector3(
    radius * Math.sin(beta) * Math.cos(alpha),
    radius * Math.cos(beta),
    radius * Math.sin(beta) * Math.sin(alpha)
  );
};

export default Globe;
