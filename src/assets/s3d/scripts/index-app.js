import { Showcase } from "./modules/Showcase";
import { Slides } from "./modules/Slides";
import { Cursor } from "./modules/Cursor";

const container = document.getElementById("app");
const cursor = new Cursor(document.querySelector('.cursor'));

let slidesData;
let slides;
let showcase;
function getConf(url) {
    $.ajax(url,{
        success: function (response) {
            slidesData = response;
           slidesInit(slidesData);
        }
    })
}
function slidesInit(slidesData){
    slides = new Slides(slidesData);
    showcase = new Showcase(slidesData, {
        onActiveIndexChange: activeIndex => {
            slides.onActiveIndexChange(activeIndex);
        },
        onIndexChange: index => {
            slides.onMove(index);
        },
        onZoomOutStart: ({ activeIndex }) => {
            cursor.enter();
            slides.appear();
        },
        onZoomOutFinish: ({ activeIndex }) => {
        },
        onFullscreenStart: ({ activeIndex }) => {
            cursor.leave();
            slides.disperse(activeIndex);
        },
        onFullscreenFinish: ({ activeIndex }) => {
        }
    });

    showcase.mount(container);
    slides.mount(container);
    showcase.render();

    window.addEventListener("resize", function() {
        showcase.onResize();
    });

    window.addEventListener("mousemove", function(ev) {
        showcase.onMouseMove(ev);
    });
}
getConf('/wp-content/themes/sliderThree/static/configSlide.JSON');

