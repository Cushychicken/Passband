
function selectDifficulty() {
    
}

function myFunction() {
    var test = Math.floor((Math.random() * 10) + 1);
    if (test === 1) {
        test = test + 1;
    } else if (test === 10) {
        test = test - 1;
    }
    var numStr = test.toString()
    document.getElementById("challenge").innerHTML = "1/".concat(numStr);
    document.getElementById("denom").value = test;
}

function checkAnswer(guess) {
    if (guess) {
        var fb = "Guess: ".concat(guess);
        var answer = 1/document.getElementById("denom").value;
        var ans_uLim = answer * 1.10;
        var ans_lLim = answer * 0.90;

        fb = fb.concat("; Answer: ");
        fb = fb.concat(answer);
        fb = fb.concat("; uLim: ");
        fb = fb.concat(ans_uLim);
        fb = fb.concat("; lLim: ");
        fb = fb.concat(ans_lLim);

        document.getElementById("debug").innerHTML = fb;

        if (guess === answer) {
            document.getElementById("feedback").innerHTML = "Perfect!";
        } else if ( (guess >= ans_lLim) &&
                    (guess <= ans_uLim) ) {
            document.getElementById("feedback").innerHTML = "Correct!";
        } else {
            document.getElementById("feedback").innerHTML = "Whoops! Try again.";
        }


    } else {
        document.getElementById("feedback").innerHTML = "You need to enter a guess!";
    }
}

function checkSubmit(e)
{
    if(e && e.keyCode == 13)
    {
        checkAnswer(document.getElementById('guess').value);
    }
}

