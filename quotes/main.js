$(document).on('ready', function() {

	var Quote = function(quoteText, author, rating) {
		this.quoteText = quoteText;
		this.author = author;
		this.rating = rating;
		this.quoteId = _.uniqueId('quote')
	}

	var quote1 = new Quote("Dude, sucking at something is the first step to being sorta good at something",
		"Jake the Dog",
		5)

	var deleteQuote = "<button class='deleteQuote'>Delete</button>"
	$("table").append("<tr><td id='quoteItemText'>" + quote1.quoteText + "</td><td id='quoteItemAuthor'>" + quote1.author + "</td><td id='quoteItemRating'>" + quote1.rating + "</td><td id='quoteItemDelete'>" + deleteQuote + "<td></tr>" )

	$(".quoteSubmit").click(function() {
		var quoteInput = $("#quoteForm").val();
		var authorInput = $("#authorForm").val();
		var ratingInput = $("#ratingForm").val();

		$("table").append("<tr><td id='quoteItemText'>" + quoteInput + "</td><td id='quoteItemAuthor'>" + authorInput + "</td><td id='quoteItemRating'>" + ratingInput + "</td><td id='quoteItemDelete'>" + deleteQuote + "</td></tr>" )

		$(".deleteQuote").click(function() {
		$(this).parent().parent().remove();
	});
	});

	$(".deleteQuote").click(function() {
		$(this).parent().parent().remove();
	});
  
});