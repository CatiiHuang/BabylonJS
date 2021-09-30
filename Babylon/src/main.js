import Globe from "@/scenes/globe/globe.js";
import "./style/style.css";
import shiningEarth from "@/assets/t_globe_d.jpeg";
import bumpEarth from "@/assets/t_globe_n.jpeg";

document.body.insertAdjacentHTML(
  "beforeend",
  '<div class="canvas-layer" style="height: 100%; width: 100%"></div>'
);

new Globe({
  el: ".canvas-layer",
  globe: {
    diffuseTexture: shiningEarth,
    bumpTexture: bumpEarth,
  },
  scatter: {
    cylinder: {
      data: [
        {
          position: [116.4074, 39.9042],
          label: "北京",
          value: 1,
        },
        {
          position: [121.4737, 31.2304],
          label: "上海",
          value: 2,
        },
      ],
    },
  },
});
