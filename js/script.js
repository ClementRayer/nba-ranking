let canvas = document.getElementById('test-canvas');
let ctx = canvas.getContext('2d');
let img = document.getElementById('source');
let downloadButton = document.getElementById('download-button');

draw = () => {  
    putBackgroundImage();
    ctx.font = '14px helvetica';
    ctx.fillText('zzccmxtp', 22, 88);
}

putBackgroundImage = () =>{
    ctx.drawImage(img, 0, 0, 640, 640, 0, 0, 300, 300);
}

putText = (teamName) =>{
    ctx.fillText(teamName, 22, 48);
}

window.onload = draw();

let seed1 = document.getElementById('seed1');
let validationButton = document.getElementById('validation-button');

validationButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    putBackgroundImage();
    putText(seed1.value);
    // var imageExport = canvas.toDataURL("image/png");
    // document.write('<img src="'+imageExport+'"/>');
    console.log(canvas.toDataURL("image/png"));
    downloadButton.href = canvas.toDataURL("image/png");
});

