// const card = document.querySelector('.card');
const showBtn = document.getElementById('show');
const hiddenBtn = document.getElementById('btn-hidden');
const addContainer = document.getElementById('add-container');

// ສ່ວນຂອງການເພີ່ມ ລົບ ຄຳຖາມ ແລະ ການ next && prev ຄຳຖາມ
const cardContainer = document.getElementById('card-container');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const currentEl = document.getElementById('current');
const clearBtn = document.getElementById('clear');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCard = document.getElementById('add-card');

let currentActiveCard = 0; // ໜ້າຄຳຖາມປັດຈຸບັນ
let cardsEL = []; //ເກັບຈຳນວນຄຳຖາມທັງໝົດ
const cardData = getCardData();

function createCard() {
    cardData.forEach((data, index) => {
        createSingleCard(data, index);
    });
}

function createSingleCard(data, index) {
    const card = document.createElement('div');
    card.classList.add('card');

    if(index == 0){
        card.classList.add('active');
    }

    card.innerHTML = `
            <div class="inner-card">
                <div class="inner-card-front">
                    <p>${data.question}</p>
                </div>
                <div class="inner-card-back">
                    <p>${data.answer}</p>
                </div>
            </div>
    `;

    card.addEventListener('click', () => {
        //ເພີ່ມ class ແລະ ລົບ class show-answer ເຂົ້າໄປໃຫ້ກັບ class card
        card.classList.toggle("show-answer");
    });
    cardsEL.push(card);
    cardContainer.appendChild(card);
    updateCurrentQuestion()
}

function updateCurrentQuestion() {
    currentEl.innerText = `${currentActiveCard+1} / ${cardsEL.length}`;
}


// card.addEventListener('click', () => {
//     //ເພີ່ມ class ແລະ ລົບ class show-answer ເຂົ້າໄປໃຫ້ກັບ class card
//     card.classList.toggle("show-answer");
// });

showBtn.addEventListener('click', () => {
    //ເພີ່ມ class show ເຂົ້າໄປໃຫ້ກັບ class add-container
    addContainer.classList.add('show');
});

hiddenBtn.addEventListener('click', () => {
    //ລົບ class show ເຂົ້າໄປໃຫ້ກັບ class add-container
    addContainer.classList.remove('show');
});

createCard();

nextBtn.addEventListener('click', () => {
    cardsEL[currentActiveCard].className = 'card left';
    currentActiveCard = currentActiveCard + 1;
    if(currentActiveCard > cardsEL.length - 1) {
        currentActiveCard = cardsEL.length - 1;
    }
    cardsEL[currentActiveCard].className = 'card active';
    updateCurrentQuestion();
});

prevBtn.addEventListener('click', () => {
    cardsEL[currentActiveCard].className = 'card right';
    currentActiveCard = currentActiveCard - 1;
    if(currentActiveCard < 0) {
        currentActiveCard = 0;
    }
    cardsEL[currentActiveCard].className = 'card active';
    updateCurrentQuestion();
});

// ເພີ່ມຄຳຖາມ
addCard.addEventListener('click', () => {
    const question = questionEl.value;
    const answer = answerEl.value;

    if(question.trim() && answer.trim()) {
        const newCard = {question,answer};
        createSingleCard(newCard);
        questionEl.value = "";
        answerEl.value = "";
        addContainer.classList.remove('show');
        cardData.push(newCard);
        setCardData(cardData);
    }
});

function setCardData(cards) {
    localStorage.setItem('cards',JSON.stringify(cards));
    window.location.reload();
}

//ດືງຂໍ້ມູນ locaStorage ມາສະແດງ
function getCardData() {
   const cards = JSON.parse(localStorage.getItem('cards'));
//    return cards === null ? [] : cards;

    if(cards === null) {
        return [];
    }else {
        return cards;
    }

}

clearBtn.addEventListener('click', () => {
    localStorage.removeItem("cards");
    // console.log("hhhhh");
    window.location.reload();

});