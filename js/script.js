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
putText = (conference) =>{
    ctx.fillStyle = "#000000";
    if(conference == 'west'){
        for(k = 1; k < 16; k++){
            let seedToGet = document.getElementById(`input-${conference}-${k}`);
            ctx.fillText(seedToGet.value, 55, 138+(32 * k))
        }
    }else{
        for(k = 1; k < 16; k++){
            let seedToGet = document.getElementById(`input-${conference}-${k}`);
            ctx.fillText(seedToGet.value, 340, 138+(32 * k))
        }
    }
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
    putText('west');
    putText('east');
    downloadButton.href = canvas.toDataURL("image/png");
});

// TO USE : Updates the canvas when typing, avoid waiting to press the validation CTA
// const allInputs = document.querySelector('input');
// allInputs.addEventListener('keyup', () =>{
//     console.log('porut');
// });

// Create variables for input generation
let westConferenceInputs = document.getElementById('west-conference-inputs');
let eastConferenceInputs = document.getElementById('east-conference-inputs');

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
        for(let i = 0; i < westTeamsList.length; i++){
            let aimedInput = document.getElementById(`input-west-${j}`);
            let optionItem = document.createElement('option');
            let valueTeamName = document.createTextNode(westTeamsList[i]);
            optionItem.appendChild(valueTeamName);
            aimedInput.appendChild(optionItem);
        }
    }
};
placeEastChoices = () =>{
    // Creates 15 inputs
    for(let j = 1; j < 16; j++){
        let singleInput = document.createElement('select');
        singleInput.setAttribute('id', `input-east-${j}`);
        eastConferenceInputs.appendChild(singleInput);
        // Sets a placeholder
        let placeHolder = document.createElement('option');
        let placeHolderText = document.createTextNode(`Seed #${j}`);
        placeHolder.appendChild(placeHolderText);
        singleInput.appendChild(placeHolder);
        // Places the needed teams in each input
        for(let i = 0; i < eastTeamsList.length; i++){
            let aimedInput = document.getElementById(`input-east-${j}`);
            let optionItem = document.createElement('option');
            let valueTeamName = document.createTextNode(eastTeamsList[i]);
            optionItem.appendChild(valueTeamName);
            aimedInput.appendChild(optionItem);
        }
    }
};

// Trigger on page load : canvas creation, choices in selectors
window.onload = draw();
window.onload = placeWestChoices();
window.onload = placeEastChoices();