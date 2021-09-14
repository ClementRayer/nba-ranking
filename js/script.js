let canvas = document.getElementById('test-canvas');
let ctx = canvas.getContext('2d');
let img = document.getElementById('source');
let downloadButton = document.getElementById('download-button');

draw = () => {  
    putBackgroundImage();
    ctx.font = '700 14px helvetica';
    ctx.fillText('zzccmxtp', 85, 128);
}

putBackgroundImage = () =>{
    ctx.drawImage(img, 0, 0, 1280, 1280, 0, 0, 640, 640);
}

putText = (teamName) =>{
    ctx.fillText(teamName.toUpperCase(), 85, 128);
    ctx.fillText('EQUIPE 2 SKETBA', 85, 163);
    ctx.fillText('EQUIPE 2 SKETBA', 85, 198);
    ctx.fillText('EQUIPE 2 SKETBA', 85, 233);
    ctx.fillText('EQUIPE 2 SKETBA', 85, 268);
}

window.onload = draw();

let seed1 = document.getElementById('seed1');
let validationButton = document.getElementById('validation-button');

validationButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    putBackgroundImage();
    putText(seed1.value);
    console.log(canvas.toDataURL("image/png"));
    downloadButton.href = canvas.toDataURL("image/png");
});

