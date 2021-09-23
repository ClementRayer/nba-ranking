// Declare all usable variables for the canvas
var canvas = document.getElementById('export-canvas');
var ctx = canvas.getContext('2d');
ctx.font = '700 30px helvetica';
var img = document.getElementById('source');
var toggleScore = document.getElementById('toggle-score');
var validationButton = document.getElementById('validation-button');
var resetButton = document.getElementById('reset-button');
var downloadButton = document.getElementById('download-button');

// Declare variables about the canvas shown in the page
var shownCanvas = document.getElementById('shown-canvas');
var shownCtx = shownCanvas.getContext('2d');

// Create variables for input generation
var westConferenceInputs = document.getElementById('west-conference-inputs');
var eastConferenceInputs = document.getElementById('east-conference-inputs');

// Sets the background (called in other functions)
putBackgroundImage = () =>{
    ctx.drawImage(img, 0, 0, 1280, 1280, 0, 0, 1280, 1280);
    updateShownCanvas();
};

// Create the basic canvas, only a background
draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    putBackgroundImage();
};

// Handle the wins/losses toggle
var displayScores = true;
toggleScore.addEventListener('change', () =>{
    displayScores = (toggleScore.checked) ? true : false;
    updateChoices('west');
    updateChoices('east');
});

// Puts the input texts in the canvas, shown canvas copies the export one
putText = (conference) =>{
    // Adapts positions regarding the current conference
    if(conference === 'west'){
        var currentConference = 'west';
        var rankXReference = 110;
        var teamXReference = 152;
        var winLossXReference = 523;
        var whiteRectangleXReference = 515;
    }else{
        var currentConference = 'east';
        var rankXReference = 681;
        var teamXReference = 723;
        var winLossXReference = 1095;
        var whiteRectangleXReference = 1086;
    };
    ctx.fillStyle = "#000000";
    for(k = 1; k < 16; k++){
        // Places the team name
        var seedToGet = document.getElementById(`input-${currentConference}-${k}`);
        ctx.font = '700 30px helvetica';
        ctx.fillStyle = "#20c91c";
        ctx.fillText(`${k}.`, rankXReference, 276+(64 * k));
        ctx.fillStyle = "#000000";
        ctx.fillText(seedToGet.value, teamXReference, 276+(64 * k));
        // Calculates the score based on inputed win number
        if(displayScores === true){
            var resultToGet = document.getElementById(`input-result-${currentConference}-${k}`);
            var winsInputed = resultToGet.value;
            var defeatsCalculated = 82 - winsInputed;
            var calculatedWinLosses = `${winsInputed} - ${defeatsCalculated}`;
            // Places the calculated team score
            ctx.font = '700 26px helvetica';
            ctx.fillStyle = "#20c91c";
            ctx.fillText(calculatedWinLosses, winLossXReference, 276+(64 * k));
        }else{
            setWhiteRectangles(whiteRectangleXReference, k);
        };
    };
    updateShownCanvas();
};

// Adds white rectangles (triggered only if the win/loss is activated)
setWhiteRectangles = (xPosition, yPosition) =>{
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(xPosition, 243+(64 * yPosition), 91, 44);
};

// Updates the canvas shown on the page
updateShownCanvas = () =>{
    shownCtx.drawImage(canvas, 0, 0, 1280, 1280, 0, 0, 1000, 1000);
}

// Validate choices : resets the canvas, set back image and uses the text, prepares the download CTA to download the validated canvas
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
    var concernedInput = (conference === 'west') ? westConferenceInputs : eastConferenceInputs;
    var teamPools = (conference === 'west') ? westTeamsList : eastTeamsList;
    // Creates 15 inputs
    for(j = 1; j < 16; j++){
        // Creates div
        var inputDiv = document.createElement('div');
        inputDiv.setAttribute('class', 'input-line');
        inputDiv.setAttribute('id', `input-line-${conference}-${j}`);
        concernedInput.appendChild(inputDiv);
        // Creates the team picker
        var singleInput = document.createElement('select');
        singleInput.setAttribute('class', 'input-team-name');
        singleInput.setAttribute('id', `input-${conference}-${j}`);
        inputDiv.appendChild(singleInput);
        // Sets a placeholder
        var placeHolder = document.createElement('option');
        var placeHolderText = document.createTextNode(`Seed #${j}`);
        placeHolder.appendChild(placeHolderText);
        singleInput.appendChild(placeHolder);
        // Places the needed teams in each input
        for(i = 0; i < teamPools.length; i++){
            var aimedInput = document.getElementById(`input-${conference}-${j}`);
            var optionItem = document.createElement('option');
            var valueTeamName = document.createTextNode(teamPools[i]);
            optionItem.appendChild(valueTeamName);
            aimedInput.appendChild(optionItem);
        };
        // Creates the score inputs if box checked
        if(displayScores === true){
            createScoreInput(conference, j);
        };
    };
};

// Adds the number inputs
createScoreInput = (conference, j) =>{
    var scoreSingleInput = document.createElement('input');
    scoreSingleInput.setAttribute('type', 'number');
    scoreSingleInput.setAttribute('class', 'input-wins')
    scoreSingleInput.setAttribute('min', '0');
    scoreSingleInput.setAttribute('max', '82');
    scoreSingleInput.setAttribute('id', `input-result-${conference}-${j}`);
    var targetedDiv = document.getElementById(`input-line-${conference}-${j}`);
    targetedDiv.appendChild(scoreSingleInput);
}

// Adds or remove the number inputs when the checkbox is updated
updateChoices = (conference) =>{
    if(displayScores === true){
        for(j = 1; j < 16; j++){
            createScoreInput(conference, j);
        };
    }else{
        for(j = 1; j < 16; j++){
            var inputToDelete = document.getElementById(`input-result-${conference}-${j}`);
            inputToDelete.remove();
        };
    };
}

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
    placeChoices('west');
    placeChoices('east');
    updateShownCanvas();
});