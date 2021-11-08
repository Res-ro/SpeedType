const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const statusDisplayElement = document.getElementById('status')
const timerElement = document.getElementById('timer')


quoteInputElement.addEventListener('input', () => {
    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    const arrayValue = quoteInputElement.value.split('')
    let correct = true
    arrayQuote.forEach((characterSpan, index) => {
       const character = arrayValue[index]
        if (character == null) {
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect') 
            correct = false   
        } else if (character === characterSpan.innerText) {
           characterSpan.classList.add('correct')
           characterSpan.classList.remove('incorrect')
        } else {
        characterSpan.classList.remove('correct')
        characterSpan.classList.add('incorrect') 
        correct = false
       }
    })

    if (correct) {
        statusDisplayElement.innerText = 'You Win!!'
        elapsedTime = null
        setTimeout(function() {
            window.location.reload(true)
        }, 1000)
    }
})

async function getRandomQuote() {
    const response = await fetch(RANDOM_QUOTE_API_URL)
    const data = await response.json()
    return data.content
}

async function renderNextQuote() {
    const quote = await getRandomQuote()
    quoteDisplayElement.innerHTML = ''
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        quoteDisplayElement.appendChild(characterSpan)
    })
    quoteInputElement.value = null
    startTimer()

}
let elapsedTime = 0;
function startTimer() {
    timerElement.innerText=elapsedTime
    timerSet = setInterval(incrementTimer, 1000)
}

function incrementTimer() {
    timerElement.innerText = elapsedTime
    if (elapsedTime++ >= 30) {
        setTimeout(function() {
            timerElement.innerText = '0'
            window.location.reload(true)
        }, 1000)
    }    
}
var audio = new Audio('countdown.mp3')

audio.play()

renderNextQuote()