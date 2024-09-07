const Canvas = require('canvas')
const canvasGif = require('canvas-gif')

const fonts = './asset/font/'

async function ttp(text) {
    return new Promise(async (resolve, reject) => {

    Canvas.registerFont(fonts + 'SF-Pro.ttf', { family: 'SF-Pro' })
    let length = text.length

    var font = 90
    if (length>12){ font = 68}
    if (length>15){ font = 58}
    if (length>18){ font = 55}
    if (length>19){ font = 50}
    if (length>22){ font = 48}
    if (length>24){ font = 38}
    if (length>27){ font = 35}
    if (length>30){ font = 30}
    if (length>35){ font = 26}
    if (length>39){ font = 25}
    if (length>40){ font = 20}
    if (length>49){ font = 10}

    var ttp_ = {}
    ttp_.create = Canvas.createCanvas(576, 576)
    ttp_.context = ttp_.create.getContext('2d')
    ttp_.context.font =`${font}px SF-Pro`
    ttp_.context.strokeStyle = 'black'
    ttp_.context.lineWidth = 3
    ttp_.context.textAlign = 'center'
    ttp_.context.strokeText(text, 290,300)
    ttp_.context.fillStyle = 'white'
    ttp_.context.fillText(text, 290,300)

        resolve(ttp_.create.toBuffer())
    })
}

const wrapText = (ctx, text, maxWidth) => {
    if(ctx.measureText(text).width < maxWidth) return [text];
    if(ctx.measureText("W").width > maxWidth) return null;
    const words = text.split(" ");
    const lines = [];
    let line = "";
    while(words.length > 0) {
        let split = false;
        while(ctx.measureText(words[0]).width >= maxWidth){
            const tmp = words[0];
            words[0] = tmp.slice(0, -1);
            if(split){
                words[1] = `${tmp.slice(-1)}${words[1]}`
            }else{
                split = true;
                words.splice(1, 0, tmp.slice(-1));
            }
        }
        if (ctx.measureText(`${line}${words[0]}`).width < maxWidth) {
            line += `${words.shift()} `;
        } else {
            lines.push(line.trim());
            line = "";
        }
        if (words.length === 0) lines.push(line.trim());
    }
    return lines;
}

async function attp(text) {
    return new Promise(async (resolve, reject) => {

const file = "./asset/image/attp.gif"
let length = text.length
        
var font = 90
if (length>12){ font = 68}
if (length>15){ font = 58}
if (length>18){ font = 55}
if (length>19){ font = 50}
if (length>22){ font = 48}
if (length>24){ font = 38}
if (length>27){ font = 35}
if (length>30){ font = 30}
if (length>35){ font = 26}
if (length>39){ font = 25}
if (length>40){ font = 20}
if (length>49){ font = 10}
Canvas.registerFont(fonts + 'SF-Pro.ttf', { family: 'SF-Pro' })
canvasGif(
    file,
    (ctx, width, height, totalFrames, currentFrame) => {

        var couler = ["#ff0000","#ffe100","#33ff00","#00ffcc","#0033ff","#9500ff","#ff00ff"]
        let jadi = couler[Math.floor(Math.random() * couler.length)]
    
    
        function drawStroked(text, x, y) {
            ctx.font = `${font}px SF-Pro`
            ctx.strokeStyle = 'black'
            ctx.lineWidth = 3
            ctx.textAlign = 'center'
            ctx.strokeText(text, x, y)
            ctx.fillStyle = jadi
            ctx.fillText(text, x, y)
        }
        
        drawStroked(text,290,300)

    },
    {
        coalesce: false, // whether the gif should be coalesced first (requires graphicsmagick), default: false
        delay: 0, // the delay between each frame in ms, default: 0
        repeat: 0, // how many times the GIF should repeat, default: 0 (runs forever)
        algorithm: 'neuquant', // the algorithm the encoder should use, default: 'neuquant',
        optimiser: false, // whether the encoder should use the in-built optimiser, default: false,
        fps: 7, // the amount of frames to render per second, default: 60
        quality: 1, // the quality of the gif, a value between 1 and 100, default: 100
    }
).then((buffer) =>{
resolve(buffer)

})
})
}
  
const generateMeme = async (imageSrc, topText, bottomText) => {
    const base = await Canvas.loadImage(imageSrc);
    const canvas = Canvas.createCanvas(base.width, base.height);
    Canvas.registerFont(fonts + 'Impact.ttf', { family: 'Impact' })
    const ctx = canvas.getContext("2d");

    ctx.drawImage(base, 0, 0);
    const fontSize = Math.round(base.height / 8);
    ctx.font = `${fontSize}px Impact`;
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";

    const topLines = await wrapText(ctx, topText, base.width - 10)
    if (topLines) {
        for (let i = 0; i < topLines.length; i++) {
          const textHeight = i * fontSize + i * 10;
          ctx.strokeStyle = "";
          ctx.lineWidth = 5;
          ctx.strokeText(topLines[i], base.width / 2, textHeight);
          ctx.fillStyle = "white";
          ctx.fillText(topLines[i], base.width / 2, textHeight);
        }
      }
      const bottomLines = await wrapText(ctx, bottomText, base.width - 10);
      if (bottomLines) {
        ctx.textBaseline = "bottom";
        const initial =
          base.height -
          (bottomLines.length - 1) * fontSize -
          (bottomLines.length - 1) * 10;
        for (let i = 0; i < bottomLines.length; i++) {
          const textHeight = initial + i * fontSize + i * 10;
          ctx.strokeStyle = "";
          ctx.lineWidth = 5;
          ctx.strokeText(bottomLines[i], base.width / 2, textHeight);
          ctx.fillStyle = "white";
          ctx.fillText(bottomLines[i], base.width / 2, textHeight);
        }
      }
      
      return canvas.toBuffer();
}

module.exports. { ttp, attp, generateMeme}