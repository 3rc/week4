$(document).on('ready', function() {

	var Quote = function(quoteText, author, rating) {
		this.quoteText = quoteText;
		this.author = author;
		this.rating = rating;
	}

	Quote.prototype.idUnique = _.uniqueId('');
	Quote.prototype.Constructor = Quote;

	var allQuotes = [];

	var deleteQuote = "<button class='deleteQuote'>Delete</button>";

	$(".quoteSubmit").click(function() {
		var quoteInput = $("#quoteForm").val();
		var authorInput = $("#authorForm").val();
		var ratingInput = $("#ratingForm").val();
		if(quoteInput == "" || authorInput == "" || ratingInput == "") {
			alert("Please complete the quote!")
		}

		else if( isNaN(ratingInput) || ratingInput > 5){
			alert("Please rate your quote 1-5 stars!")
		}

		else {
			$("input").val("");

			allQuotes.push(new Quote(quoteInput, authorInput, ratingInput));

			$(".quoteItems").remove();

			var sortedQuotes = _.sortBy(allQuotes, function(allQuotes) {return (allQuotes.rating)}).reverse();

			var filteredSortedQuotes = _.filter(sortedQuotes, function(sortedQuotes) {return (sortedQuotes.rating !== null)});

			for(i = 0; i < filteredSortedQuotes.length; i++) {
				$("table").append("<tr class='quoteItems'><td id='quoteItemText'>" + 
					filteredSortedQuotes[i].quoteText + 
					"</td><td id='quoteItemAuthor'>" + 
					filteredSortedQuotes[i].author + 
					"</td><td id='quoteItemRating'>" + 
					filteredSortedQuotes[i].rating + 
					"★</td><td id='" + sortedQuotes[i].idUnique + "'>" + 
					deleteQuote + "</td></tr>" )
			}
		}
		$(".deleteQuote").click(function() {
			$(this).parent().parent().remove();
			allQuotes[$(this).parent().attr("id") - 1].quoteText = null;
			allQuotes[$(this).parent().attr("id") - 1].author = null;
			allQuotes[$(this).parent().attr("id") - 1].rating = null;

		});
	});


	$("#formHide").click(function() {
		$(".quoteForm").hide();
		$("body").append("<a href='#' id='formShow'>Click to Add More Quotes!</a>");
		$("#formShow").click(function() {
			$(".quoteForm").show();
			$(this).remove();
		})
	})
  
});