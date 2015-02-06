$(document).on('ready', function() {

	var Quote = function(quoteText, author, rating) {
		this.quoteText = quoteText;
		this.author = author;
		this.rating = rating;
		this.idUnique = _.uniqueId('')
	}

	Quote.prototype.Constructor = Quote;

	var allQuotes = [];

	var deleteQuote = "<button class='deleteQuote'>Delete</button>";

	var regenerateQuotes = function() {
		$(".quoteItems").remove();

			var sortedQuotes = _.sortBy(allQuotes, function(allQuotes) {return (allQuotes.rating)}).reverse();

			var filteredSortedQuotes = _.filter(sortedQuotes, function(sortedQuotes) {return (sortedQuotes.rating !== null)});

			for(i = 0; i < filteredSortedQuotes.length; i++) {
				$("table").append("<tr class='quoteItems' id='" + filteredSortedQuotes[i].idUnique + "'><td id='quoteItemText'>'" + 
					filteredSortedQuotes[i].quoteText + 
					"'</td><td id='quoteItemAuthor'>" + 
					filteredSortedQuotes[i].author + 
					"</td><td class='quoteItemRating' id='rating" +
					filteredSortedQuotes[i].rating + "'>" + 
					"</td><td id='" + filteredSortedQuotes[i].idUnique +
					 "'>" + deleteQuote + "</td></tr>" );
			};

		$(".random-quote-button").click(function() {
			$(".random-quote-text p").remove()
			var randomQuote = filteredSortedQuotes[Math.floor(Math.random() * filteredSortedQuotes.length)]
			$(".random-quote-text").append("<p>'" + randomQuote.quoteText + 
				"'<br>-- <strong>" + randomQuote.author + "</strong></p>");
		});

		$(".quoteItemRating").click(function() {
			var editRating = "<div class='editRatingContainer' id='" + $(this).parent().attr("id") + "'><input class='editRating' maxlength='1'></div>";
			var ratingToEdit = $(editRating).attr("id");
			$(this).hide().after(editRating);
			$(".editRating").focus();

			$(".editRating").on("blur", function() {
				var newRating = $(".editRating").val();
				if(isNaN(newRating) || newRating > 5 || newRating === '') {
					return false
				}
				else {
					allQuotes[(ratingToEdit - 1) / 2].rating = newRating;
				}
				$(".editRatingContainer").remove();
				$(".quoteItemRating").show();
				regenerateQuotes();
			});

	  	});

		$(".deleteQuote").click(function() {
			$(".undoDelete").remove();
			var deletedQuoteId = $(this).parent().attr("id");
			console.log("Quote ID to be deleted: " + deletedQuoteId);
			var deletedQuote = $(this).parent().parent();
			deletedQuote.hide();
			var undoDelete = "<div class='undoDelete'><button>Undo Last Delete</button><br></div>";
			$("body").append(undoDelete);
			var deleteTimer = setTimeout(function() {
				allQuotes[(deletedQuoteId - 1) / 2].quoteText = null;
				allQuotes[(deletedQuoteId - 1) / 2].author = null;
				allQuotes[(deletedQuoteId - 1) / 2].rating = null;
				console.log("Quote Deleted!");
				$(".undoDelete").remove();
				deletedQuote.remove();
			}, 5000)
			$(".undoDelete").click(function() {
				clearTimeout(deleteTimer);
				deletedQuote.show();
				$(this).remove();
				console.log("Quote Delete cancelled");
			});
		});


		localStorage.setItem('allQuotes', JSON.stringify(allQuotes));
		console.log(JSON.parse(localStorage.getItem('allQuotes')))

	};


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
				this.idUnique = _.uniqueId('');
				regenerateQuotes();
				
			};

	});

	$("#formHide").click(function() {
		$(".quoteForm").hide();
		$("body").append("<a href='#' id='formShow'><br>Click to Add More Quotes!</a>");
		$("#formShow").click(function() {
			$(".quoteForm").show();
			$(this).remove();
		})
	});

	$("#buttonHide").click(function() {
		$(".random-quote").hide();
		$("body").append("<a href='#' id='buttonShow'><br>Click to bring back the Random Quote Button!</a>");
		$("#buttonShow").click(function() {
			$(".random-quote").show();
			$(this).remove();
		})
	})
  
});