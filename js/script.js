// Declare all usable variables for the canvas
let canvas = document.getElementById('test-canvas');
let ctx = canvas.getContext('2d');
ctx.font = '700 14px helvetica';
let img = document.getElementById('source');
let validationButton = document.getElementById('validation-button');
let downloadButton = document.getElementById('download-button');

// Sets the background (called in other functions)
putBackgroundImage = () =>{
    ctx.drawImage(img, 0, 0, 1280, 1280, 0, 0, 640, 640);
};

// Create the basic canvas, only a background
draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    putBackgroundImage();
    ctx.fillText('zzccmxtp', 56, 202);
};

// TEMPORARY (to make it iterate with the input IDs) : Puts the different texts in the canvas
putText = () =>{
    ctx.fillStyle = "#000000";
    ctx.fillText(seed1.value.toUpperCase(), 55, 170);
    ctx.fillText(seed2.value.toUpperCase(), 55, 202);
    ctx.fillText('EQUIPE 2 SKETBA', 55, 234);
    ctx.fillText('EQUIPE 2 SKETBA', 55, 266);
    ctx.fillText('EQUIPE 2 SKETBA', 55, 298);
    ctx.fillText('EQUIPE 2 SKETBA', 55, 330);
    ctx.fillText('EQUIPE 2 SKETBA', 55, 362);
    ctx.fillText('EQUIPE 2 SKETBA', 55, 394);
    ctx.fillText('EQUIPE 2 SKETBA', 55, 426);
    ctx.fillText('EQUIPE 2 SKETBA', 55, 458);
    ctx.fillText('EQUIPE 2 SKETBA', 55, 490);
    ctx.fillText('EQUIPE 2 SKETBA', 55, 522);
    ctx.fillText('EQUIPE 2 SKETBA', 55, 554);
    ctx.fillText('EQUIPE 2 SKETBA', 55, 586);
    ctx.fillText('EQUIPE 2 SKETBA', 55, 618);
    ctx.fillStyle = "#20c91c";
    ctx.fillText('72-10', 263, 169);
};

// TEMPORARY : Uses the only input yet to test the writing
let seed1 = document.getElementById('seed1');
let seed2 = document.getElementById('seed2');

// Resets the canvas, set back image and uses the (temporary) text, prepares the download CTA to download the validated canvas
validationButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    putBackgroundImage();
    putText();
    downloadButton.href = canvas.toDataURL("image/png");
});

// TO USE : Updates the canvas when typing, avoid waiting to press the validation CTA
// const allInputs = document.querySelector('input');
// allInputs.addEventListener('keyup', () =>{
//     console.log('porut');
// });

// Create variables for input generation
let westConferenceInputs = document.getElementById('west-conference-inputs');

// Creates the inputs for the West Conference > TO OPTIMISE WITH ONLY ONE FUNCTION? WOULD PASS THE ELEMENT EAST OR WEST, THAT DEFINES IN WHICH TEAM POOL WE CHOSE AND USES IDs TO SEPARATE CONFERENCES
placeWestChoices = () =>{
    // Creates 15 inputs
    for(let j = 1; j < 16; j++){
        let singleInput = document.createElement('select');
        singleInput.setAttribute('id', `input-west-${j}`);
        westConferenceInputs.appendChild(singleInput);
        // Sets a placeholder
        let placeHolder = document.createElement('option');
        let placeHolderText = document.createTextNode(`Seed #${j}`);
        placeHolder.appendChild(placeHolderText);
        singleInput.appendChild(placeHolder);
        // Places the needed teams in each input
        for(let i = 0; i < teamsList.length; i++){
            let aimedInput = document.getElementById(`input-west-${j}`);
            let optionItem = document.createElement('option');
            let valueTeamName = document.createTextNode(teamsList[i]);
            optionItem.appendChild(valueTeamName);
            aimedInput.appendChild(optionItem);
        }
    }
};

// Trigger on page load : canvas creation, choices in selectors
window.onload = draw();
window.onload = placeWestChoices();