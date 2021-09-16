// Declare all usable variables for the canvas
let canvas = document.getElementById('test-canvas');
let ctx = canvas.getContext('2d');
ctx.font = '700 14px helvetica';
let img = document.getElementById('source');
let validationButton = document.getElementById('validation-button');
let resetButton = document.getElementById('reset-button');
let downloadButton = document.getElementById('download-button');

// Create variables for input generation
let westConferenceInputs = document.getElementById('west-conference-inputs');
let eastConferenceInputs = document.getElementById('east-conference-inputs');

// Sets the background (called in other functions)
putBackgroundImage = () =>{
    ctx.drawImage(img, 0, 0, 1280, 1280, 0, 0, 640, 640);
};

// Create the basic canvas, only a background
draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    putBackgroundImage();
};

// TEMPORARY (to make it iterate with the input IDs) : Puts the different texts in the canvas
putText = (conference) =>{
    ctx.fillStyle = "#000000";
    if(conference == 'west'){
        for(k = 1; k < 16; k++){
            let seedToGet = document.getElementById(`input-${conference}-${k}`);
            ctx.fillStyle = "#20c91c";
            ctx.fillText(`${k}.`, 55, 138+(32 * k));
            ctx.fillStyle = "#000000";
            ctx.fillText(seedToGet.value, 75, 138+(32 * k));
        }
    }else{
        for(k = 1; k < 16; k++){
            let seedToGet = document.getElementById(`input-${conference}-${k}`);
            ctx.fillStyle = "#20c91c";
            ctx.fillText(`${k}.`, 340, 138+(32 * k));
            ctx.fillStyle = "#000000";
            ctx.fillText(seedToGet.value, 360, 138+(32 * k));
        }
    }
};

// Resets the canvas, set back image and uses the (temporary) text, prepares the download CTA to download the validated canvas
validationButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    putBackgroundImage();
    putText('west');
    putText('east');
    downloadButton.href = canvas.toDataURL("image/png");
});

// Creates the inputs for the Conferences
placeChoices = (conference) =>{
    // Set the variables to serve west or east content (DOM element + team pool)
    let concernedInput = (conference === 'west') ? westConferenceInputs : eastConferenceInputs;
    let teamPools = (conference === 'west') ? westTeamsList : eastTeamsList;
    // Creates 15 inputs
    for(let j = 1; j < 16; j++){
        let singleInput = document.createElement('select');
        singleInput.setAttribute('id', `input-${conference}-${j}`);
        concernedInput.appendChild(singleInput);
        // Sets a placeholder
        let placeHolder = document.createElement('option');
        let placeHolderText = document.createTextNode(`Seed #${j}`);
        placeHolder.appendChild(placeHolderText);
        singleInput.appendChild(placeHolder);
        // Places the needed teams in each input
        for(let i = 0; i < teamPools.length; i++){
            let aimedInput = document.getElementById(`input-${conference}-${j}`);
            let optionItem = document.createElement('option');
            let valueTeamName = document.createTextNode(teamPools[i]);
            optionItem.appendChild(valueTeamName);
            aimedInput.appendChild(optionItem);
        }
    }
};

// Trigger on page load : canvas creation, choices in selectors
window.onload = draw();
window.onload = placeChoices('west');
window.onload = placeChoices('east');

// Reset the choices by regenerating the inputs
resetButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    putBackgroundImage();
    westConferenceInputs.innerHTML = '';
    eastConferenceInputs.innerHTML = '';
    window.onload = placeChoices('west');
    window.onload = placeChoices('east');
});