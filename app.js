const select = e => document.querySelector(e)
const selectAll = e => document.querySelectorAll(e)
const minutes = select('.minutes')
const seconds = select('.seconds')
const milliseconds = select('.milliseconds')

const startBtn = select('.startBtn')
const pauseBtn = select('.pauseBtn')
const continueBtn = select('.continueBtn')
const resetBtn = select('.resetBtn')
const flagBtn = select('.flagBtn')
const listResults  = select('.listResults')




let count = 1
let counterMinutes = 0
let counterSeconds = 0
let counterMilliseconds = 0

let interval;

const formatMilliseconds = e => e.padStart(3, '0')

const formatTime = e => e.padStart(2, '0')

const startCount = () => {
  interval = setInterval(() => {
    if (counterSeconds === 60) {
      counterMinutes++
      counterSeconds = 0
      minutes.textContent = formatTime(String(counterMinutes))
      seconds.textContent = formatTime(String(counterSeconds))
    }

    if (counterMilliseconds === 100) {
      counterSeconds++ 
      counterMilliseconds= 0
      seconds.textContent = formatTime(String(counterSeconds))
    }
    counterMilliseconds++
    milliseconds.textContent = formatMilliseconds(String(counterMilliseconds))
    startBtn.style.display = 'none'
    continueBtn.style.display = 'none'
    pauseBtn.style.display = 'block'
  }, 10);
}


const pauseCount = () => {
  clearInterval(interval)
  pauseBtn.style.display = 'none'
  continueBtn.style.display = 'block'
}

const resetCount = () => {
  const results = document.querySelectorAll('[data-mark = "mark-time"]')
  clearInterval(interval)
  counterMilliseconds = 0
  counterMinutes = 0
  counterSeconds = 0

  minutes.textContent = "00"
  seconds.textContent = "00"
  milliseconds.textContent = "000"

  continueBtn.style.display = 'none'
  startBtn.style.display = 'block'
  pauseBtn.style.display = 'none'
  results.forEach(el => {
    el.remove()
  });
  count = 0
}

const markCount = () => {
  if (counterMilliseconds === 0) {
    alert('Para fazer a marcação, é necessário iniciar o cronômetro xD')
    return
  }
  const paragraphResult = document.createElement('li')
  let time = `${formatTime(String(counterMinutes))}:${formatTime(String(counterSeconds))}:${formatMilliseconds(String(counterMilliseconds))}`
  paragraphResult.textContent = `${count}° Marcação de tempo: ${time}`
  paragraphResult.setAttribute('data-mark', 'mark-time')

  listResults.append(paragraphResult)
  count += 1

}

resetBtn.addEventListener('click', resetCount)
startBtn.addEventListener('click', startCount)
pauseBtn.addEventListener('click', pauseCount)
continueBtn.addEventListener('click', startCount)
flagBtn.addEventListener('click', markCount)