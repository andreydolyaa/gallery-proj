'use strict';



var MAX_QUESTS = 5;
var gQuests
var gCurrQuestIdx;


play();



function play() {
    gCurrQuestIdx = 0;
    gQuests = createQuests();
    renderQuest();
}





function renderQuest() {
    var elImg = document.querySelector('.game-img');
    var elBtns = document.querySelector('.btns');
    var answer = document.querySelector('.answer');
    var htmlStr = '';

    if (gCurrQuestIdx === MAX_QUESTS) {
        elImg.innerHTML = '';
        elBtns.innerHTML = '';
        answer.innerHTML = '';
        elBtns.innerHTML = `
        <h2 class="victory">Victorious!</h2>
        <button onclick="play()">RESTART</button`;
    } else {

        elImg.innerHTML = `<img src="img/${gQuests[gCurrQuestIdx].id}.jpg">`
        for (var i = 0; i < 1; i++) {
            htmlStr += `
            <button id="${i}" onclick="checkAnswer(this.id)">${gQuests[gCurrQuestIdx].opts[0]}</button>
            <button id="${i + 1}" onclick="checkAnswer(this.id)">${gQuests[gCurrQuestIdx].opts[1]}</button>`;
        }
        elBtns.innerHTML = htmlStr;
    }

}




function checkAnswer(optIdx) {
    var correct = '✔';
    var wrong = '❌';
    var answer = document.querySelector('.answer');

    if (+optIdx === gQuests[gCurrQuestIdx].correctOptIndex) {
        answer.innerText = 'Correct! ' + correct
        answer.style.color = 'green';
        gCurrQuestIdx++;
        renderQuest();
    } else {
        answer.innerText = 'Wrong! ' + wrong;
        answer.style.color = 'red';
    }
}




function createQuests() {
    var quests = [
        {
            id: 1,
            opts: ['It\'s a Ferarri!', 'It\'s a Lamborgini!'],
            correctOptIndex: 0,
        },
        {
            id: 2,
            opts: ['It\'s a BMW!', 'It\'s a Toyota!'],
            correctOptIndex: 0,
        },
        {
            id: 3,
            opts: ['It\'s a KIA!', 'It\'s a Audi!'],
            correctOptIndex: 1,
        },
        {
            id: 4,
            opts: ['It\'s a KIA', 'It\'s a Hyundai!'],
            correctOptIndex: 0,
        },
        {
            id: 5,
            opts: ['It\'s a Lexus!', 'It\'s a Mercedes!'],
            correctOptIndex: 1,
        },
    ];
    return quests;
}












    // elBtns.innerHTML = `
    // <button id="${gQuests[gCurrQuestIdx].correctOptIndex}" onclick="checkAnswer(this.id)">${gQuests[gCurrQuestIdx].opts[0]}</button>

    // <button id="${gQuests[gCurrQuestIdx].correctOptIndex}" onclick="checkAnswer(this.id)">${gQuests[gCurrQuestIdx].opts[1]}</button>
    // `;

// var btn1 = document.createElement('button');
//     var btn2 = document.createElement('button');


//     for (var i = 0; i < quests.length; i++) {
//         img.src = 'img/' + 1 + '.jpg';

//         elImg.appendChild(img);
//         btn1.innerHTML = `id:${quests[i].correctOptIndex}`;
//         btn1.innerText = `${quests[i].opts[quests[i].correctOptIndex]}`
//         btn2.innerText = `${quests[i].opts[quests[i].correctOptIndex]}`
//         elImg.appendChild(img);
//         elBtns.appendChild(btn1);
//         elBtns.appendChild(btn2);

//         console.log(btn1);
//         console.log(btn2);
//     }


// btn.innerHTML = `id:${quests[i].correctOptIndex}`;
//         btn.innerText = `${quests[i].opts[quests[i].correctOptIndex]}`
//         elBtns.appendChild(btn);




// function createQuests(amount = 5) {
//     var quests = [];
//     for (var i = 0; i < amount; i++) {
//         var quest = createQuest();
//         quests.push(quest);
//     }
//     return quests;
// }

// function createQuest() {
//     var quest = {
//         id: gCurrQuestIdx++,
//         opts: [],
//         correctOptIndex: 0
//     };
//     return quest;
// }