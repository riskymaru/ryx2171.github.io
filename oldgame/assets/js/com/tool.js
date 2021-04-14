


function collide(a, b) {
    const aBox = a.getBounds();
    const bBox = b.getBounds();

    //orig
            return aBox.x + aBox.width > bBox.x &&
             aBox.x < bBox.x + bBox.width &&
             aBox.y + aBox.height > bBox.y &&
             aBox.y < bBox.y + bBox.height;

}

function takeScreenshot(app) {
    //window.prompt("sometext","defaultText");
     
    //wait = true;
    app.renderer.extract.canvas(app.stage).toBlob((b) => {
        const a = document.createElement('a');
        document.body.append(a);
        a.download = 'screenshot';
        a.href = URL.createObjectURL(b);
        a.click();
        a.remove();
    }, 'image/png');
}


function showInputText(str){
  var person = prompt("Please enter your name:","__");
  console.log("hello",person);
  return person;
}


/*function RyxPixiResize(app,config){
  // Perform initial resizing
  resize(pixi,config)();
  // Add event listener so that our resize function runs every time the
  // browser window is resized.
  window.addEventListener("resize", resize(pixi,config));
}

function resize (app,config){
  return function () {

      const vpw = window.innerWidth;  // Width of the viewport
      const vph = window.innerHeight; // Height of the viewport

      let nvw; // New game width
      let nvh; // New game height

      let WIDTH = config.pixiSettings.width;
      let HEIGHT = config.pixiSettings.height;


      // The aspect ratio is the ratio of the screen's sizes in different dimensions.
      // The height-to-width aspect ratio of the game is HEIGHT / WIDTH.
      
      if (vph / vpw < HEIGHT / WIDTH) {
        // If height-to-width ratio of the viewport is less than the height-to-width ratio
        // of the game, then the height will be equal to the height of the viewport, and
        // the width will be scaled.
        nvh = vph;
        nvw = (nvh * WIDTH) / HEIGHT;
      } else {
        // In the else case, the opposite is happening.
        nvw = vpw;
        nvh = (nvw * HEIGHT) / WIDTH;
      }
      
      // Set the game screen size to the new values.
      // This command only makes the screen bigger --- it does not scale the contents of the game.
      // There will be a lot of extra room --- or missing room --- if we don't scale the stage.
      app.renderer.resize(nvw, nvh);
      
      // This command scales the stage to fit the new size of the game.
      app.stage.scale.set(nvw / WIDTH, nvh / HEIGHT);
      
  };
}*/


function convert(val,type){

  if(type == "str2int"){
      let n = null;
      let newArr = [];
      val.forEach(function(itm,id){
          newArr[id] = parseInt(itm);
      })
      return newArr;
  }else
  if(type == "num2comma"){
    
      let fixedNumber = val.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
      let num = String(fixedNumber).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      const temp = num;

      //console.log("num",val)
      if(val>=100){

            fixedNumber = parseInt(fixedNumber);
            num = String(fixedNumber).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      }else
      if(val<100){

          if(temp.split(".")[1] == undefined){

              num = String(num);

              if(num.length<=3){
                //num = String(num) + ".00";
              }

          }else
          if(temp.split(".")[1].length == 1){
              num = num.toString() + "0";
          }
      }
      
      return num;
    }
}


function deg2rad(degrees){
  let deg = degrees * Math.PI / 180;

  return deg;
}


function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
}

function colorlog(str,color){

  if(!color){
    color = "green";
  }

  console.log('%c' + str , 'background:'+color+'; color: white; display: block;');
}