/* global $ */
function updateTime () {
  seconds--;
  $('#timeDisplay').text('Time Remaining: ' + seconds);
  isGameOver();
}
var seconds = 30;
var timer;
var play;
var timerChallenge;
var playChallenge;
var score = 0;
var width = document.getElementById('playArea').offsetWidth - 200;
var height = document.getElementById('playArea').offsetHeight - 200;
// function challenge () {
//   clearInterval(timer);
//   clearInterval(play);
//   timerChallenge = setInterval(updateTime, 500);
//   playChallenge = setInterval(random, 500);
//   $(document).keydown(function (event) {
//     var keycode = event.keyCode;
//     // console.log('key pressed');
//     $('.bubble' + keycode).animate({
//       // 'top': height + 'px',
//       'height': 'toggle',
//       'opacity': 0
//     }, 'slow');
//     $('.bubble' + keycode).fadeOut('slow').hide('slow', function () {
//       score += 40;
//       $('#scoreDisplay').text('Score: ' + score);
//       $(this).remove();
//     });
//   });
// }
function start () {
  timer = setInterval(updateTime, 1000);
  play = setInterval(random, 1000);
  $('#pause').css('color', 'rgba(2, 0, 15, 0.8)');
  $('#paused').css('display', 'none');
  $('#start').off('click');
  $(document).keydown(function (event) {
    var keycode = event.keyCode;
    // console.log('key pressed');
    $('.bubble' + keycode).animate({
      // 'top': height + 'px',
      'height': 'toggle',
      'opacity': 0
    }, 'slow');
    $('.bubble' + keycode).fadeOut('slow').hide('slow', function () {
      score += 20;
      $('#scoreDisplay').text('Score: ' + score);
      $(this).remove();
    });
    // if (score >= 100) {
    //   challenge();
    // }
  });
  // if (score === 200 && isGameOver === false) {
  //   timer = setInterval(updateTime, 500);
  //   isGameOver();
  // } else {
  //   timer = setInterval(updateTime, 1000);
  //   isGameOver();
  // }
}
function pause () {
  clearInterval(timer);
  clearInterval(play);
  // if (challenge()) {
  //   clearInterval(timerChallenge);
  //   clearInterval(playChallenge);
  // } else {
  //   clearInterval(timer);
  //   clearInterval(play);
  // }
  $('#start').click(start);
  $('#pause').css('color', 'rgba(255, 6, 14, 1)');
  $('#paused').css('display', 'block');
  $('#paused').append('<p style = "z-index: 500;">PAUSED</p>');
  $(document).off('keydown');
  // console.log('pause clicked');
}
function reset () {
  clearInterval(timer);
  document.location.reload();
  seconds = 30;
  $('#timeDisplay').text('Time Remaining: ' + seconds);
}
function scoreDisplay () {
  $('#scoreDisplay').text('Score: ' + score);
}
function random () {
  // random alphabets. keycode A~Z is 65~90
  var randomNumber = Math.floor(Math.random() * (90 - 65 + 1)) + 65;
  var randomCharacter = String.fromCharCode(randomNumber);
  // random colors
  function randomColor () {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  // random position of colored alphabets appearing in the screen
  // var width = screen.width - 500;
  // var height = screen.height - 500;
  var top = Math.floor(Math.random() * height) + 60;
  var left = Math.floor(Math.random() * width);
  var colorBoth = randomColor();
  $('#playArea').append('<span class="bubble bubble' + randomNumber + '" style = "left: ' + left + 'px; top :' + top + 'px; border: 0.3em solid' + colorBoth + '; color:' + colorBoth + '; z-index: 0; padding-top: 0.5em; font-size: 1.5em">' + randomCharacter + '</span>');
}
function isGameOver () {
  // if time is up, game over
  // console.log('checking game over');
  if (seconds === 0) {
    clearInterval(timer);
    clearInterval(play);
    // if (challenge()) {
    //   clearInterval(timerChallenge);
    //   clearInterval(playChallenge);
    // } else {
    //   clearInterval(timer);
    //   clearInterval(play);
    // }
    $(document).off('keydown');
    $('#start').off();
    $('#pause').off();
    $('#gameOver').css('display', 'block');
    $('#gameOver').append('<p>GAME OVER</p>');
    return true;
  } else {
    return false;
  }
}
$(document).ready(function () {
  $('#timeDisplay').text('Time Remaining: ' + seconds);
  scoreDisplay();
});
$('#start').click(start);
$('#pause').click(pause);
$('#reset').click(reset);
