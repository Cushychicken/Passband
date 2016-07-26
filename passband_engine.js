var Passband = {

	// Level Variables 
	level:				1,
	difficulty:			'easy',

	// Game Variables
	memory_value: 		'', 
	challenge_value: 	'', 
	ans_uLim_value: 	'',
	ans_lLim_value: 	'',

	// DOM Variables
	challenge_id: 	'challenge-screen', 
	screen_id: 		'calculator-screen',
	feedback_id:  	'feedback',


	challenge: function() {
		// if easy - generate single digit integer inverse
		// Difficulty should be passed as a key/value store with limits bounding the multiplier
 		//var exp = Math.floor(Math.random() * (max - min + 1)) + min;
		var exp = 0;
		var answer = Math.floor((Math.random() * 10));
	    if (answer === 0) {
	        answer = answer + 1;
	    }
	    
	    this.challenge_value = answer ^ (10 * exp);
	    this.update_challenge();
	},

	update_challenge: function() {
		document.getElementById(this.challenge_id).innerHTML = this.challenge_value;
	},

	put: function(value) {
    	console.log("value:".concat(value));
    	this.memory_value += value;
    	console.log("memory_value:".concat(this.memory_value));
   		this.update_memory();
  	},

  	update_memory: function() {
    	document.getElementById(this.screen_id).innerHTML = this.memory_value;
  	},

  	reset: function() {
	    this.memory_value = '';
	    this.results_value = '0';
	    this.update_memory();
	    this.clear_history();
	    this.refresh();
  	},

	check: function() {}

}

$(document).keypress(function(e) {
  var element = $('*[data-key="'+e.which+'"]');
  console.log(element.html());
  var fun = function(element){
    // skip if this is no a functional button
    if (element.length == 0){ return true }

    if (element.data('constant') != undefined){
      return Passband.put(Passband[element.data('constant')]);
    }

    if (element.data('method') != undefined){
      return Passband[element.data('method')]();
    }

    return Passband.put(element.html());
  }

  if (fun(element) != false){
    return false
  } else {
    return true
  }
});

$(document).ready(function() {

  Passband.challenge();

  $(".btn").click(function(e) {
    e.preventDefault();

    if ($(this).data('constant') != undefined){
      return Passband.put(Passband[$(this).data('constant')]);
    }

    if ($(this).data('method') != undefined){
      return Passband[$(this).data('method')]();
    }

    return Passband.put($(this).html());
  });
});