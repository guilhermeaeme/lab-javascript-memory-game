var MemoryGame = function (cards) {
  this.cards = cards,
  this.pickedCards = [],
  this.pairsClicked = 0,
  this.pairsGuessed = 0
};

MemoryGame.prototype.shuffleCards = function () {
  this.pickedCards = [];
  this.pairsClicked = 0;
  this.pairsGuessed = 0;

	for (var i = this.cards.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = this.cards[i];
        this.cards[i] = this.cards[j];
        this.cards[j] = temp;
    }
};

MemoryGame.prototype.checkIfPair = function (firstCard, secondCard) {
	var result = (firstCard === secondCard);

	this.pairsClicked++;

	if(result) this.pairsGuessed++;

	return result;
};

MemoryGame.prototype.isFinished = function () {
	return this.pairsGuessed == (this.cards.length / 2);
};
