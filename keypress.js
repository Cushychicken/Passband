$(document).keypress(function(e) {
  var element = $('*[data-key="'+e.which+'"]');

  var fun = function(element){
    // skip if this is no a functional button
    if (element.length == 0){ return true }
    console.log('Element:'.concat(element.html()));
    document.getElementById('calculator-screen').innerHTML = element.html();
    return true
  }

  if (fun(element) != false){
    return false
  } else {
    return true
  }
});


$(document).ready(function() {

  $(".btn").click(function(e) {
    e.preventDefault();

    if ($(this).data('constant') != undefined){
      return Calculator.put(Calculator[$(this).data('constant')]);
    }

    if ($(this).data('method') != undefined){
      return Calculator[$(this).data('method')]();
    }

    document.getElementById('calculator-screen').innerHTML = $(this).html();
  });
});
