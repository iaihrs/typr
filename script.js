const numberOfWords = document.getElementById('numberOfWords').value
const wordPopularity = document.getElementById('wordPopularity').value
const wordList = './english_10k.json'

const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const numberOfWordsElement = document.getElementById('numberOfWords')
const wordPopularityElement = document.getElementById('wordPopularity')
const timerElement = document.getElementById('timer')

numberOfWordsElement.addEventListener('input', () => {
    location.reload();
})

wordPopularityElement.addEventListener('input', () => {
    location.reload();
})

// Looks for any change to the quoteInputElement textarea
quoteInputElement.addEventListener('input', () => {
    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    const arrayValue = quoteInputElement.value.split('')
    let correct = true
    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index]
        if (character == null) {
            characterSpan.classList.remove('incorrect')
            characterSpan.classList.remove('correct')
            correct = false
        }
        else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        }
        else {
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
            correct = false
        }
    })

    if (correct) renderNewQuote()
})

function getWordList() {
    return fetch(wordList)
    .then((response) => response.json())
}

async function renderNewQuote() {
    const words = await getWordList()
    var test = ""
    for (let i = 0; i < numberOfWords; i++) {
        var randNum = Math.floor(Math.random() * wordPopularity)
        test+=(words[randNum]+=" ")
    }
    const quote = test.slice(0,-1)
    quoteDisplayElement.innerHTML = ''
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        // Stops weird null character bug that makes correct typing seem incorrect by one character (thank you @hawkins for the fix)
        if (character != null) {
            characterSpan.innerText = character
            quoteDisplayElement.appendChild(characterSpan)
        }
    })
    quoteInputElement.value = null
}

//TIMER STUFF, DOESNT QUITE WORK YET
/*
let startTime

function startTimer() {
    timerElement.innerText = 0
    startTime = new Date()
    setInterval(() => {
        timer.innerText = getTimerTime()
    }, 100)

}

function getTimerTime() {
    ms = Math.round((new Date() - startTime) / 100)
    return (ms/10).toFixed(1)
}
*/

renderNewQuote()