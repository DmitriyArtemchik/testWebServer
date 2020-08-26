window.onload = ()=>{

const obj = {
  two : document.getElementById('two'),
  two2 : document.getElementById('two2'),
  two3 : document.getElementById('two3'),
  two4 : document.getElementById('two4'),
  two5 : document.getElementById('two5')
};

function resetAnimation () {
  // the class is added to the HTML tag in 3 seconds.
  // the same happens with the rest of the set times every 1.5 and 3 seconds
  setTimeout(()=>{obj.two5.classList.add('startAnimation');},3000);
  setTimeout(()=>{obj.two5.classList.add('zIndex');},4500);
  setTimeout(()=>{obj.two4.classList.add('startAnimation');},7500);
  setTimeout(()=>{obj.two4.classList.add('zIndex');},9000);
  setTimeout(()=>{obj.two3.classList.add('startAnimation');},12000);
  setTimeout(()=>{obj.two3.classList.add('zIndex');},13500);
  setTimeout(()=>{obj.two2.classList.add('startAnimation');},16500);
  setTimeout(()=>{obj.two2.classList.add('zIndex');},18000);
  setTimeout(()=>{obj.two.classList.add('startAnimation');},21000);
};

resetAnimation();

setInterval(()=>{
  // the function removes the previously assigned classes every 22.5 seconds
  // and calls the function resetAnimation
  for (key in obj) { obj[key].classList.remove('zIndex', 'startAnimation'); }
  return resetAnimation();
},22500);





// ==== canvas #1 ====

  const canvas = document.querySelector('#scene');
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  // Store the 2D context
  const ctx = canvas.getContext('2d');

  let width = canvas.clientWidth, // Width of the canvas
      height = canvas.clientHeight; // Height of the canvas

      if (window.devicePixelRatio > 1) {
        canvas.width = canvas.clientWidth * 2;
        canvas.height = canvas.clientHeight * 2;
        ctx.scale(2, 2);
      }

  function Animation(rate) {
    this.LastTime = 0;
    this.Rate = rate;
    this.update = function() {};
    this.render = function() {};
  };

  Animation.prototype.run = function(time) {
    if((time - this.LastTime) > this.Rate) {
      this.LastTime = time;
      this.update();
    }
    this.render();
  };

  const objAnimation = {
    Layer1 : new Animation(260),
    Layer2 : new Animation(220),
    Layer3 : new Animation(100)
  };

   for (var key in objAnimation) {

    objAnimation[key].sizeH = 1200;
    objAnimation[key].sizeH2 = 1200;
    objAnimation[key].sizeW = 0.5;
    objAnimation[key].sizeRandom = 50;
    objAnimation[key].sizeRandom2 = 50;
    objAnimation[key].radius = 3;
    objAnimation[key].radiusRandom = 1;
    objAnimation[key].color = "rgba(112, 112, 111, 0.99)";
    objAnimation[key].color2 = "rgba(10, 9, 9, 0.88)";
    objAnimation[key].color3 = "rgba(194, 192, 190, 0.99)";
    objAnimation[key].sWidth = 0;
    objAnimation[key].sHeight = 0;
    objAnimation[key].rHeight = 0;
    objAnimation[key].randomH = 0;
  }

    objAnimation.Layer1.update = function() {

      this.sWidth = -(this.sizeW/2) + Math.random() * width;
      this.sHeight = -(this.sizeH/2) + Math.random() * height;
      this.randomH = Math.random() * this.sizeRandom;
      this.rHeight = this.sizeH + this.randomH;
    };

    objAnimation.Layer1.render = function() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = this.color;
      ctx.fillRect(this.sWidth, this.sHeight, this.sizeW, this.rHeight);
    };

      objAnimation.Layer2.update = function() {
        this.sWidth = -(this.sizeW/2) + Math.random() * width;
        this.sHeight = -(this.sizeH2/2) + Math.random() * height;
        this.randomH = Math.random() * this.sizeRandom2;
        this.rHeight = this.sizeH2 + this.randomH;
      };

  objAnimation.Layer2.render = function() {
    ctx.fillStyle = this.color2;
    ctx.fillRect(this.sWidth, this.sHeight, this.sizeW, this.rHeight);
  };

  objAnimation.Layer3.update = function() {
    this.sWidth = -(this.sizeW/2) + Math.random() * width;
    this.sHeight = -(this.sizeH2/2) + Math.random() * height;
    this.randomH = Math.random() * this.radiusRandom;
    this.rHeight = this.radius + this.randomH;
   }

  objAnimation.Layer3.render = function() {
    ctx.fillStyle = this.color3;
    ctx.strokeStyle = this.color3;
    ctx.arc(this.sWidth, this.sHeight, this.rHeight, 0, getRadians(360));
    ctx.fill();
    ctx.stroke();
    function getRadians(degrees) {
     return (Math.PI / 180) * degrees;
    };
    ctx.beginPath();
  };

  function MainLoop(time) {
    objAnimation.Layer1.run(time);
    objAnimation.Layer2.run(time);
    objAnimation.Layer3.run(time);
    requestAnimationFrame(MainLoop);
  };

  requestAnimationFrame(MainLoop);





// ==== canvas #2 ====

  const canvas2 = document.querySelector('#scene2');
  canvas2.width = canvas2.clientWidth;
  canvas2.height = canvas2.clientHeight;
  const ctx2 = canvas2.getContext('2d');

  let width2 = canvas2.clientWidth,
      height2 = canvas2.clientHeight;


      if (window.devicePixelRatio > 1) {
        canvas2.width2 = canvas2.clientWidth * 2;
        canvas2.height2 = canvas2.clientHeight * 2;
        ctx2.scale(2, 2);
      }
        ctx2.rect(0, 0, width2, height2);
        ctx2.fillStyle = "rgba(232, 179, 142, 0.31)";
        ctx2.fill();
};





// ==== preloader ====

let images = document.images,
    imagesTotalCount = images.length,
    imagesLoaderCount = 0,
    percDisplay = document.getElementById('jsLoader'),
    preloader = document.getElementById('pagePreloader');

for (var i = 0; i < imagesTotalCount; i++) {
  var imageClone = new Image();
  imageClone.onload = imagesLoader;
  imageClone.onerror = imagesLoader;
  imageClone.src = images[i].src;
}

function imagesLoader() {
  imagesLoaderCount++;
  percDisplay.innerHTML = (((100 / imagesTotalCount) * imagesLoaderCount) <<0) + '%';
  if(imagesLoaderCount >= imagesTotalCount) {
    setTimeout(()=> {
      if(!preloader.classList.contains('done')) {
        preloader.classList.add('done');
      }
    },1200);
  }
};
