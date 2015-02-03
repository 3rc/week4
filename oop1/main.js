
// var Quote = function(quotation, author) {
// 	this.quotation = quotation;
// 	this.author = author;


// }

// Quote.prototype.countWords = function(){
// 	var words = this.quotation;
// 	var wordCount = words.split(' ');
// 	var numWords =  wordCount.length;
// 	return numWords;
// };
// Quote.prototype.create = function(){
// 	this.$el = $('<div>').addClass('.quote').append('<p class="quote-text">' + this.quotation + '</p>')
// 	.append('<p class="quote-author"> - ' + this.author + '</p>');
// 	return this.$el
// };

// Quote.prototype.changeText = function(update) {
// 	this.quotation = update;

// 	this.$el.find(".quote-text").text(this.quotation)
// }
// var quote1 = new Quote("Sucking at something is the first step to being sorta good at something.", "Jake the Dog");

// var quote2 = new Quote("The best way to predict your future is to create it.", "Abraham Lincoln");


// console.log(quote1);
// console.log(quote2);
// console.log("Words in quote 1:", quote1.countWords());

// $(document).on("ready", function() {


// 	$("body").append(quote1.create())

// });

// var Vehicle = function(color) {
// 	this.color = color;
// };

// Vehicle.prototype.move = function() {
// 	console.log("Moving!");
// };

// var Car = function(color, make){
// 	Vehice.call(this, color)

// }

var Media = function(name) {
	this.name = name;
}

Media.prototype.view = function() {
	console.log("Viewing " + this.name);
};

var Picture = function(name, url) {
	Media.call(this, name);
	this.url = url;
	this.create = function() {
		console.log("Create element")
	}
}

Picture.prototype = new Media();
Picture.prototype.constructor = Picture;

var pic1 = new Picture("pic1", "picture.jpg")