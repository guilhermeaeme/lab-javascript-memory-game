var cards = [
  { name: 'aquaman',         img: 'aquaman.jpg' },
  { name: 'batman',          img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four',  img: 'fantastic-four.jpg' },
  { name: 'flash',           img: 'flash.jpg' },
  { name: 'green arrow',     img: 'green-arrow.jpg' },
  { name: 'green lantern',   img: 'green-lantern.jpg' },
  { name: 'ironman',         img: 'ironman.jpg' },
  { name: 'spiderman',       img: 'spiderman.jpg' },
  { name: 'superman',        img: 'superman.jpg' },
  { name: 'the avengers',    img: 'the-avengers.jpg' },
  { name: 'thor',            img: 'thor.jpg' },
  { name: 'aquaman',         img: 'aquaman.jpg' },
  { name: 'batman',          img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four',  img: 'fantastic-four.jpg' },
  { name: 'flash',           img: 'flash.jpg' },
  { name: 'green arrow',     img: 'green-arrow.jpg' },
  { name: 'green lantern',   img: 'green-lantern.jpg' },
  { name: 'ironman',         img: 'ironman.jpg' },
  { name: 'spiderman',       img: 'spiderman.jpg' },
  { name: 'superman',        img: 'superman.jpg' },
  { name: 'the avengers',    img: 'the-avengers.jpg' },
  { name: 'thor',            img: 'thor.jpg' }
];

var memoryGame = new MemoryGame(cards);
var $pairs_clicked = null;
var $pairs_guessed = null;

$(document).ready(function(){
  $pairs_clicked = $('#pairs_clicked');
  $pairs_guessed = $('#pairs_guessed');

  buildBoard();

  // Bind the click event of each element to a function
  $('body').delegate('.back', 'click', function () {
    var card = $(this).parent().data('card-name');

    memoryGame.pickedCards.push($(this).parent());

    $(this).parent().addClass('active');
    $(this).parent().find('.back, .front').toggleClass('front back');

    if(memoryGame.pickedCards.length == 2) {
      var result = memoryGame.checkIfPair(memoryGame.pickedCards[0].data('card-name'), memoryGame.pickedCards[1].data('card-name'));

      $('.back,.front').addClass('blocked');

      $pairs_clicked.html(memoryGame.pairsClicked);
      $pairs_guessed.html(memoryGame.pairsGuessed);

      if(memoryGame.isFinished()) {
        setTimeout(function(){
          if(confirm('Play again?')){
            buildBoard();
          }
        }, 500)
      }

      if(result){
        $('.card[data-card-name="' + card + '"]').addClass('blocked').find('.front, .back').addClass('blocked');

        return nextTurn();
      }

      setTimeout(nextTurn, 1000);
    }
  });
});

function nextTurn() {
  $('.back,.front').removeClass('blocked');

  $('.card.active:not(.blocked)').find('.back, .front').toggleClass('front back');
  $('.card:not(.blocked)').removeClass('active');

  memoryGame.pickedCards = [];
}

function buildBoard() {
  var html = '';

  memoryGame.shuffleCards();

  memoryGame.cards.forEach(function (pic) {
    html += '<div class="card" data-card-name="'+ pic.name +'">';
    html += '  <div class="back" name="'+ pic.img +'"></div>';
    html += '  <div class="front" style="background: url(img/'+ pic.img +') no-repeat"></div>';
    html += '</div>';
  });

  // Add all the div's to the HTML
  $('#memory_board').html(html);

  $pairs_clicked.html(memoryGame.pairsClicked);
  $pairs_guessed.html(memoryGame.pairsGuessed);

  nextTurn();
}
