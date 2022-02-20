const today = new Date()
const year = today.getFullYear()
const month = today.getMonth()

let firstDayOfWeek = parseInt(controls.firstDayOfWeek.value)

function renderMonthHeader() {
  let monthHeader = document.createElement('h1')
  monthHeader.textContent = today.toLocaleDateString('en-us', {month: 'long'})
  simpleCalendar.appendChild(monthHeader)
}
renderMonthHeader()

function renderWeekdayHeader() {
  let weekdayHeaderDate = new Date(getStartDate())
  let weekdayHeader = document.createElement('div')
  weekdayHeader.className = 'week'
  for (i=0;i<7;i++) {
    let weekdayHeaderDay = document.createElement('div')
    weekdayHeaderDay.className = 'day'
    weekdayHeaderDay.textContent = weekdayHeaderDate.toLocaleDateString('en-us', {weekday: 'short'}).slice(0, 2)
    weekdayHeader.appendChild(weekdayHeaderDay)
    weekdayHeaderDate.setDate(weekdayHeaderDate.getDate() + 1)
  }
  
  simpleCalendar.appendChild(weekdayHeader)
}
renderWeekdayHeader()

function renderCalendar() {
  let currentDate = getStartDate()
  let lastDayOfMonth = new Date(year, month + 1, 0)
  let calendarElement = document.createElement('div')
  
  do {
    var week = document.createElement('div')
    week.className = 'week'
    
    for (i=0;i<7;i++) {
      let day = document.createElement('div')
      day.className = 'day'
      day.textContent = currentDate.getDate()
      
      if (currentDate.getMonth() > month) {
        day.classList.add('nextMonthDay')
      }
      if (currentDate.getMonth() < month) {
        day.classList.add('prevMonthDay')
      }
      
      week.appendChild(day)
      currentDate.setDate(currentDate.getDate() + 1)
    }
    calendarElement.appendChild(week)
    
  } while (currentDate.valueOf() <= lastDayOfMonth.valueOf())
    
  simpleCalendar.appendChild(calendarElement)
}
renderCalendar()

controls.firstDayOfWeek.addEventListener('change', function(e) {
  firstDayOfWeek = parseInt(controls.firstDayOfWeek.value)
  let simpleCalendarReplace = simpleCalendar
  let simpleCalendarElement = document.createElement('div')
  simpleCalendarElement.id = 'simpleCalendar'
  simpleCalendarReplace.parentNode.replaceChild(simpleCalendarElement, simpleCalendarReplace)
  renderMonthHeader()
  renderWeekdayHeader()
  renderCalendar()
})

function getStartDate() {
  let startDate = new Date(year, month, 1)
  startDate.setDate(startDate.getDate() - (startDate.getDay() + firstDayOfWeek))
  return startDate
}
