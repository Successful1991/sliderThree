import { Showcase } from "./Showcase";
import { Slides } from "./Slides";
import { Cursor } from "./Cursor";
// import image1 from '/wp-content/themes/sliderThree/assets/images/1.jpg';
// import image2 from '/wp-content/themes/sliderThree/assets/images/2.jpg';
// import image3 from '/wp-content/themes/sliderThree/assets/images/3.jpg';
// import image4 from '/wp-content/themes/sliderThree/assets/images/4.jpg';
// import image5 from '/wp-content/themes/sliderThree/assets/images/5.jpg';

const container = document.getElementById("app");
const cursor = new Cursor(document.querySelector('.cursor'));
// const slidesData = [
//   {
//     image:  document.getElementById("image1"),
//     // image: image1,
//     title: "Segovia",
//     meta: "Spain / Castile and León"
//   },
//   {
//     image:  document.getElementById("image2"),
//     // image: image2,
//     title: "Barcelona",
//     meta: "Spain / Catalonia"
//   },
//   {
//     image:  document.getElementById("image3"),
//     // image: image3,
//     title: "Málaga",
//     meta: "Spain / Andalusia"
//   },
//   {
//     image:  document.getElementById("image4"),
//     // image: image4,
//     title: "Pamplona",
//     meta: "Spain / Navarre"
//   },
//   {
//     image:  document.getElementById("image5"),
//     // image: image5,
//     title: "Bilbao",
//     meta: "Spain / Biscay"
//   }
// ];




function getConf(url) {
  $.ajax(url,{
    success: function (response) {
      const slidesData = response;
      slidesData.map(el=>{
        el.image = image1;
        return el
        // return el.image = (el.image)
      });
      console.log('slidesData', slidesData);
      slidesInit(slidesData)
    }
  })
}
function slidesInit(){
  const slides = new Slides(slidesData);
  const showcase = new Showcase(slidesData, {
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