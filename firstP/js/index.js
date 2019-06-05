

const app = new PIXI.Application({
  //transparent:true,
  antialias: true
});
document.body.appendChild(app.view);

// // BEZIER CURVE ////
// information: https://en.wikipedia.org/wiki/Bézier_curve

// ------- GUIDE LINES ---------

// const realPath = new PIXI.Graphics();

// realPath.lineStyle(2, 0xFFFFFF, 1);
// realPath.moveTo(0, 0);

// let PCXT = 0;
// let PCYT = 0;

// for (var a = 0; a < Math.PI * 2; a += 0.5) {
//
//     var r = 200;
//     var x = r * Math.cos(a);
//     var y = r * Math.sin(a);
//
//     var Lx = r * Math.cos(a-0.5);
//     var Ly = r * Math.sin(a-0.5);
//
//     Cx = (r+r/(r/2)) * Math.cos(a-0.150);
//     Cy = (r+r/(r/2)) * Math.sin(a-0.150);
//
//     //Cx2 = (r+r/40) * Math.cos((a+0.5)-0.125);
//     //Cy2 = (r+r/40) * Math.sin((a+0.5)-0.125);
//
//     //bezier.bezierCurveTo(PCX, PCY, Cx, Cy, x, y);
//
//     realPath.moveTo(Lx, Ly);
//     realPath.lineTo(PCXT, PCYT);
//     realPath.moveTo(x, y);
//     realPath.lineTo(Cx, Cy);
//     realPath.lineTo(Cx+5, Cy+5);
//     //realPath.lineTo(x, y);
//
//     PCXT = x + (x - Cx);
//     PCYT = y + (y - Cy);
//   }
// realPath.lineTo(100, 200);
// realPath.lineTo(200, 200);
// realPath.lineTo(240, 100);

// realPath.position.x = 300;
// realPath.position.y = 300;
//
// app.stage.addChild(realPath);



// ------- make bloby circle -------
    // just for fun, let's rotate mr rabbit a little

const bezier = new PIXI.Graphics();


let yOff = 0;

app.ticker.add(() => {
  bezier.clear();
  bezier.lineStyle(5, 0xAA0000, 1);
//
 bezier.beginFill(0xFFFF00);
//
// // set the line style to have a width of 5 and set the color to red

app.stage.addChild(bezier);

let PCX = 0;
let PCY = 0;

let F;

let xOff = 0;

//bezier.drawRect(-300,-300,600,600)
// bezier.beginHole();

for (var a = 0; a < Math.PI * 2; a += 0.5) {

    let random = Math.random()*50;

    let noice = noise.simplex2(xOff,yOff) * 50;

    let r = 200 + noice;
    let x = r * Math.cos(a);
    let y = r * Math.sin(a);

    Cx = (r+r/(r/2)) * Math.cos(a-0.150);
    Cy = (r+r/(r/2)) * Math.sin(a-0.150);

    if(a==0){
      F = {
        x: x,
        y: y,
        Cx: Cx,
        Cy: Cy
      };

      bezier.moveTo(x, y);

    } else if (a+0.5 > Math.PI * 2) {
      x = F.x;
      y = F.y;
      Cx = F.Cx;
      Cy = F.Cy;

      bezier.bezierCurveTo(PCX, PCY, Cx, Cy, x, y+0.5);

    } else {
      bezier.bezierCurveTo(PCX, PCY, Cx, Cy, x, y);
    }

    PCX =  x + (x - Cx);
    PCY =  y + (y - Cy);

    xOff++
  }

  // bezier.endHole();
  // bezier.endHole();

  yOff += 0.005;

  });


bezier.position.x = 300;
bezier.position.y = 300;

noise.seed(Math.random());


app.stage.addChild(bezier);
