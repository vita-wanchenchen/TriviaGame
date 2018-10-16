$(document).ready(function(){

    // Create variables for question counter, wins, losses timer time, questions and answers.
    var questionCounter = 0;
    var timer = 15;
    var correctPicks = 0;
    var wrongPicks = 0;

    

    var questions = [
        {
          question: "Calico cats are almost always?",
          choices: ["Left Pawed", 
                    "Female", 
                    "Friendly", 
                    "Finicky"],
          correctAnswer: "Female",
          image: "<img src='./images/cat-1.gif' class='answerimg'>"
        },

        {
            question: "A group of cats is called?",
            choices: ["A Clowder", 
                      "A Pack", 
                      "A Hoard", 
                      "Nothing. Cats don’t congregate in groups"],
            correctAnswer: "A Clowder",
            image: "<img src='./images/cat-2.gif' class='answerimg'>"
        },

        {
            question: "Which of these is NOT a well known cat myth or saying?",
            choices: ["Cats always land on their feet", 
                      "Cats have nine lives", 
                      "It’s raining cats and dogs", 
                      "Don’t throw the cat out with the bath water"],
            correctAnswer: "Don’t throw the cat out with the bath water",
            image: "<img src='./images/cat-3.gif' class='answerimg'>"
        },

        {
            question: "What is a cat doing when it’s “making biscuits?",
            choices: ["Playing with bread dough", 
                      "Training to be a chef", 
                      "Kneading with its paws", 
                      "Auditing for a Food Network show"],
            correctAnswer: "Kneading with its paws",
            image: "<img src='./images/cat-4.gif' class='answerimg'>"
        },

        {
            question: "What is the scientific name for hair loss in cats? ",
            choices: ["Balding Disorder", 
                      "Minoxidil", 
                      "Alopecia", 
                      "Lymphadenopathy"],
            correctAnswer: "Alopecia",
            image: "<img src='./images/cat-5.gif' class='answerimg'>"
        },
        
        {
            question: "About how many cats live at Disneyland?",
            choices: ["One Cat", 
                      "1000 Cats", 
                      "200 Cats", 
                      "None"],
            correctAnswer: "200 Cats",
            image: "<img src='./images/cat-6.gif' class='answerimg'>"
        },
        
        {
            question: "Hemingway Cats are felines that have:",
            choices: ["Written a best-selling book", 
                      "An abnormally large head", 
                      "A cropped tail", 
                      "Extra toes"],
            correctAnswer: "Extra toes",
            image: "<img src='./images/cat-7.gif' class='answerimg'>"
        },
        
        {
            question: "What is the scientific name for “Fear of Cats?",
            choices: ["Felineophobia", 
                      "Get-it-away-ophobia", 
                      "Ailurophobia", 
                      "There isn’t one because it’s not a recognized fear"],
            correctAnswer: "Ailurophobia",
            image: "<img src='./images/cat-8.gif' class='answerimg'>"
        },
        
        {
            question: "Giving your kitty catnip might cause it to:",
            choices: ["Be sleepy", 
                      "Be energetic", 
                      "Do nothing", 
                      "All of the above"],
            correctAnswer: "All of the above",
            image: "<img src='./images/cat-9.gif' class='answerimg'>"
        }
    ];

    // Function generate questions. 
    function questionContent () {
        $("#cards").append("<p class='question'>" + 
        questions[questionCounter].question + 
        "</p>" + "<p class='choices'>" +
        questions[questionCounter].choices[0] + 
        "</p>" +  "<p class='choices'>" +
        questions[questionCounter].choices[1] + 
        "</p>" + "<p class='choices'>" +
        questions[questionCounter].choices[2] + 
        "</p>" + "<p class='choices'>" +
        questions[questionCounter].choices[3] + 
        "</p>");
    }

    // Function for player pick correct answer.
    function playerCorrect () {
		$("#cards").html("<p>You knew some meow fact!</p>");
		correctPicks++;
		var correctAnswer = questions[questionCounter].correctAnswer;
		$("#cards").append("<p>The answer was <span class='answer'>" + 
			correctAnswer + 
			"</span></p>" + 
			questions[questionCounter].image);
		setTimeout(nextQuestion, 4000);
		questionCounter++;
    }
    
    // Function for player pick wrong answer.
    function playerWrong () {
		$("#cards").html("<p>Nope, that's wrong meow!</p>");
		wrongPicks++;
		var correctAnswer = questions[questionCounter].correctAnswer;
		$("#cards").append("<p>The answer was <span class='answer'>" + 
			correctAnswer + 
			"</span></p>" + 
			questions[questionCounter].image);
		setTimeout(nextQuestion, 4000);
		questionCounter++;
    }
    
    // Function for player run out of time.
    function playerTimeRunOut () {
        if (timer === 0) {
			$("#cards").html("<p>Time ran out Meow!</p>");
			wrongPicks++;
			var correctAnswer = questions[questionCounter].correctAnswer;
			$("#cards").append("<p>The answer was <span class='answer'>" + 
				correctAnswer + 
				"</span></p>" + 
                questions[questionCounter].image);
			setTimeout(nextQuestion, 4000);
			questionCounter++;
		}
    }

    // Function for showing result.
    function finalResult() {
		if (correctPicks === questions.length) {
			var endMessage = "Purrrr-fect! You are a meow master!";
		}
		else {
			var endMessage = "Time for some study meow!!!";
		}
		$("#cards").html("<p>" + endMessage + "</p>" + "<p>You got " + 
			correctPicks + " correct.</p>" + 
			"<p>You got " + wrongPicks + " wrong.</p>");
        $("#cards").append("<button type='button' class='btn btn-info btn-lg' id='startbutton'>Play Again?</button>");
		gameReset();
		$("#startbutton").click(nextQuestion);
    }
    
    // Function for the timer.
    function timeCounter() {
		clock = setInterval(countDown, 1000);
		function countDown() {
			if (timer < 1) {
				clearInterval(clock);
				playerTimeRunOut();
			}
			if (timer > 0) {
				timer--;
			}
			$("#timer").html(timer);
		}
    }
    
    // Function for generate next question.
    function nextQuestion() {
		if (questionCounter < questions.length) {
			timer = 15;
			$("#cards").html("<p>You have <span id='timer'>" + timer + "</span> seconds left!</p>");
			questionContent();
			timeCounter();
			playerTimeRunOut();
		}
		else {
			finalResult();
		}
    }
    
    // Function for reset.
    function gameReset() {
		questionCounter = 0;
		correctPicks = 0;
		wrongPicks = 0;
    }
    
    // Function for starting the game.
    function startGame() {
    	$("#cards").html("<p>You have <span id='timer'>" + timer + "</span> seconds left!</p>");
    	$("#startbutton").hide();
		questionContent();
    	timeCounter();
    	playerTimeRunOut();
    }

    $("#startbutton").click(startGame);

    $("#cards").on("click", ".choices", (function() {
		var userGuess = $(this).text();
		if (userGuess === questions[questionCounter].correctAnswer) {
			clearInterval(clock);
			playerCorrect();
		}
		else {
			clearInterval(clock);
			playerWrong();
		}
	}));

});