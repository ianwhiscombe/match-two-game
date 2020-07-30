document.addEventListener('DOMContentLoaded', () => {
    
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
    // Randomise the cards at beginning of game.
    cardArray.sort(()=> 0.5 - Math.random());

    const grid = document.querySelector('.grid');
    const resultDisplay = document.querySelector('#result');
    var cardsChosen = [];
    var cardsChosenId = [];
    var cardsWon = [];

    //  Create starting board
    
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

    // Check selected cards for matches

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
    // Flip the card

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