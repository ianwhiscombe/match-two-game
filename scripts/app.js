document.addEventListener('DOMContentLoaded', () => {
    // card images
    const cardArray = [
        {
            name: 'Cat1',
            img: '/assets/images/Cat1.jpg'
        },
        {
            name: 'Cat1',
            img: '/assets/images/Cat1.jpg'
        },
        {
            name: 'Cat2',
            img: '/assets/images/Cat2.jpg'
        },
        {
            name: 'Cat2',
            img: '/assets/images/Cat2.jpg'
        },
        {
            name: 'Cat3',
            img: '/assets/images/Cat3.jpg'
        },
        {
            name: 'Cat3',
            img: '/assets/images/Cat3.jpg'
        },
        {
            name: 'Cat4',
            img: '/assets/images/Cat4.jpg'
        },
        {
            name: 'Cat4',
            img: '/assets/images/Cat4.jpg'
        },
        {
            name: 'Cat5',
            img: '/assets/images/Cat5.jpg'
        },
        {
            name: 'Cat5',
            img: '/assets/images/Cat5.jpg'
        },
        {
            name: 'Cat6',
            img: '/assets/images/Cat6.jpg'
        },
        {
            name: 'Cat6',
            img: '/assets/images/Cat6.jpg'
        }
    ]
    // randomise the cards at beginning of game.
    cardArray.sort(()=> 0.5 - Math.random());

    const grid = document.querySelector('.grid');
    const resultDisplay = document.querySelector('#result');
    var cardsChosen = [];
    var cardsChosenId = [];
    var cardsWon = [];

    // ** Create starting board
    // we loop over the card array's length.
    // for each iteration we create an html <img> element and assign it to a variable named 'card'.
    // the src attribute is then added to each <img> element, along with the value of the src, the relative path to the white-square image.
    // a second attrubute is added, 'data-id' along with the value at the current index of the loop.
    // an event listener is then added to listen for a click on the card and if so to call the flipcard function.
    // append child adds the card to the end of the <div> named 'grid'.
    function createBoard(){
        for (let i = 0; i < cardArray.length; i++) {
            var card = document.createElement('img');
            card.setAttribute('src', '/assets/images/card-back.jpg');
            card.setAttribute('data-id', i);
            card.setAttribute('class', 'animate__animated animate__flip');
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        }
    }

    // * Check selected cards for matches
    // all img's from the flipcard function are selected and assigned to the cards variable.
    // the card ids at position 1 and 2 of the cardsChosenId array are assigned to separate variables.
    // if the two card ids in the cardsChosen array match, an alert is called and then an attribute is set on each card to display a white square.
    // the two chosen cards are then pushed into the cardsWon array.
    // if the cards don't match, the attribute is changed again on them to set the image back to the unicorn image.
    // then, the two arrays are cleared ready for the next flip.
    // the score is displayed at resultDisplay by taking the value of the length of cardsWon array.

    function checkForMatch() {
        var cards = document.querySelectorAll('img');
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];
        if (cardsChosen[0] === cardsChosen[1]) {
            Swal.fire({
                position: 'center',
                padding: '1rem',
                width: '25rem',
                background: '#c9f4de',
                title: 'They match!',
                imageUrl: '/assets/images/cat-heart.jpg',
                imageAlt: 'Happy cat',
                showConfirmButton: false,
                timer: 2200,
                allowOutsideClick: true
            })
            cards[optionOneId].setAttribute('src', '/assets/images/cat-family.jpg');
            cards[optionTwoId].setAttribute('src', '/assets/images/cat-family.jpg');
            cardsWon.push(cardsChosen)
        } else {
            cards[optionOneId].setAttribute('src', '/assets/images/card-back.jpg');
            cards[optionTwoId].setAttribute('src', '/assets/images/card-back.jpg');
            Swal.fire({
                position: 'center',
                padding: '1rem',
                width: '25rem',
                background: '#fdaaaa',
                title: 'Try again',
                imageUrl: '/assets/images/cat-no.jpg',
                imageAlt: 'Sad cat',
                showConfirmButton: false,
                timer: 2200,
                allowOutsideClick: true
            })
        }
        cardsChosen = [];
        cardsChosenId = [];
        resultDisplay.textContent = cardsWon.length;
        if (cardsWon.length === cardArray.length / 2) {
            Swal.fire({
                title: 'You found all the kittens. Well done!',
                width: 600,
                padding: '3em',
                background: 'url(/assets/images/cat-unicorn.jpg)',
                confirmButtonColor: '#ffd1dc',
                backdrop: `
                rgba(0,0,123,0.4)
                url("/assets/images/tenor.gif")
                `
            })
        }

    }
    // * Flip the card
    // the value at the 'data-id' attribute (the elements index number) is assigned to the cardId variable.
    // the name property for the cardId element (the elemetns index number) from the cardArray is pushed into the cardsChosen array. 
    // the index number in cardId is then pushed into the cardsChosenId array.
    // a src attribute is added to the selected card using the value in the img property from the cardArray at the position contained in cardId. This adds an image to the selected square.
    // the if statement checks to see if there are 2 cards in its array, if there is the checkForMatch function is fired.

    function flipCard() {
        var cardId = this.getAttribute('data-id');
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);
        this.setAttribute('class', 'animate__animated animate__bounceIn');
        this.setAttribute('src', cardArray[cardId].img);
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 1200);
        }
    }

    document.querySelector('.btn').addEventListener('click', () => {
        window.location.reload();
    })
    

    createBoard();
})