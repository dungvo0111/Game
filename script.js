const RANDOM_QUOTE_API_URL = 'http://quotes.stormconsultancy.co.uk/random.json'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')
const bestElement = document.getElementById('best')
const avgElement = document.getElementById('average')
const speedArr = []
$(document).ready(function myFunction() {
    alert("Welcome to the Speed Typing Game\nPress OK when you are ready, have fun!")});

quoteInputElement.addEventListener('input', () => {
    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    const arrayInput = quoteInputElement.value.split('')
    let startTime1 = new Date()
    let isCorrect = true
    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayInput[index]
        if(character == null) {
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
            isCorrect = false
        } else if(character === characterSpan.innerText) {
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        } else {
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
            isCorrect = false
        }
    })

    if(isCorrect) {
        let typingSpeed = arrayInput.length*60/((new Date()-startTime)/1000)
        console.log(typingSpeed)
        speedArr.push(typingSpeed)
        console.log(speedArr)
        let avg = speedArr.reduce((sum, speed) => (speed + sum)/speedArr.length,0)
        console.log(avg)
        avgElement.innerText = avg.toPrecision(5)
        let best = Math.max(...speedArr)
        console.log(best)
        bestElement.innerText = best.toPrecision(5)
        getNextQuote()
    }
    
})
function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.quote)
}


async function getNextQuote() {
    const quote = await getRandomQuote()
    quoteDisplayElement.innerHTML = ''
    quote.split('').forEach(char => {
        const characterSpan = document.createElement('span')
        
        characterSpan.innerText = char
        quoteDisplayElement.appendChild(characterSpan)
    })
    quoteInputElement.value = null
    startTimer()
}

let startTime
function startTimer() {
    timerElement.innerText =0
    startTime = new Date()
    setInterval(() => {
        timer.innerText = getTimerTime()        
    }, 1000)
}

function getTimerTime() {
    return  Math.floor((new Date() -startTime)/ 1000)
}

function timing() {
    const arrayInput = quoteInputElement.value.split('')
    let avg = arrayInput.length/(totalTime*60*1000);
    console.log(arrayInput.length)
    console.log(totalTime)
    console.log(avg);
    totalTime = 0;

}
getNextQuote()