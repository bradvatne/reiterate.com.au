jQuery(document).ready(function($) {

    // 1. Header Sticky Logic
    $(window).scroll(function(e) {
        var distanceY = $(window).scrollTop(),
            shrinkOn = $(window).height(),
            header = $("header");

        if (distanceY > shrinkOn) {
            if (!header.hasClass("scrolled")) {
                header.addClass("scrolled");
            }
        } else {
            if (header.hasClass("scrolled")) {
                header.removeClass("scrolled");
            }
        }
    });

    // 2. The Typewriter Effect Logic
    function runTypewriter() {
        // Find elements with class "rei-typed-multi"
        $(".rei-typed-multi").each(function() {
            var $this = $(this);
            // Get the text (earnings|income|roi)
            var textContent = $this.text();
            
            // If it contains the pipe symbol |
            if (textContent.indexOf("|") > -1) {
                var words = textContent.split("|");
                if (words.length > 1) {
                    // Save words to data attribute
                    $this.data("rei-typed-values", words);
                    $this.data("rei-typed-index", 0);
                    // Clear text to start animation
                    $this.text("");
                    $this.addClass("rei-typed");
                }
            }
        });

        // Start the animation loop for setup elements
        $(".rei-typed-multi.rei-typed").each(function() {
            typeWriterLoop($(this));
        });
    }

    // 3. The Animation Loop
    function typeWriterLoop($element) {
        var values = $element.data("rei-typed-values");
        var index = parseInt($element.data("rei-typed-index"));
        var currentWord = values[index];
        var currentText = $element.text();

        // Typing forward
        if (currentText.length < currentWord.length && currentText === currentWord.substring(0, currentText.length)) {
            $element.text(currentWord.substring(0, currentText.length + 1));
            setTimeout(function() { typeWriterLoop($element) }, 100); // Typing speed
        } 
        // Deleting backward
        else if (currentText.length > currentWord.length || (currentText !== currentWord.substring(0, currentText.length))) {
            $element.text(currentText.substring(0, currentText.length - 1));
            setTimeout(function() { typeWriterLoop($element) }, 50); // Backspace speed
        } 
        // Word complete, wait then switch
        else if (currentText === currentWord) {
            var nextIndex = (index < values.length - 1) ? index + 1 : 0;
            $element.data("rei-typed-index", nextIndex);
            setTimeout(function() { typeWriterLoop($element) }, 2000); // Wait time before deleting
        }
    }

    // Run the typewriter
    runTypewriter();
    console.log('test');

    // 4. Smooth Anchor Scrolling (Optional fix for standard links)
    $('a[href^="#"]').click(function(e) {
        var targetId = $(this).attr("href").replace(/^#/, "");
        if (targetId && $("#" + targetId).length > 0) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: $("#" + targetId).offset().top
            }, 500);
        }
    });
});