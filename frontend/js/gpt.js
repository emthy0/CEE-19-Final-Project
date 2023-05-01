const app = document.querySelector("#app")
const calendar = app.querySelector(".calendar")
const calendarBody = app.querySelector("#calendarBody")
const prevBtn = app.querySelector("#prevBtn")
const nextBtn = app.querySelector("#nextBtn")
const monthYear = app.querySelector("#monthYear")
const details = app.querySelector(".details")
const detailsDate = app.querySelector("#detailsDate")
const detailsContent = app.querySelector("#detailsContent")

let currentDate = new Date()

function renderCalendar() {
  calendarBody.innerHTML = ""
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const lastDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate()
  const firstDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay()
  monthYear.textContent = `${
    monthNames[currentDate.getMonth()]
  } ${currentDate.getFullYear()}`
  let date = 1
  for (let i = 0; i < 6; i++) {
    const row = document.createElement("tr")
    for (let j = 0; j < 7; j++) {
      const cell = document.createElement("td")
      if (i === 0 && j < firstDay) {
        cell.textContent = ""
      } else if (date > lastDay) {
        break
      } else {
        cell.textContent = date
        if (
          currentDate.getFullYear() === new Date().getFullYear() &&
          currentDate.getMonth() === new Date().getMonth() &&
          date === new Date().getDate()
        ) {
          cell.classList.add("today")
        }
        cell.addEventListener("click", () => {
          detailsDate.textContent = `${
            monthNames[currentDate.getMonth()]
          } ${date}, ${currentDate.getFullYear()}`
          detailsContent.textContent = `This is the detail for ${
            monthNames[currentDate.getMonth()]
          } ${date}, ${currentDate.getFullYear()}.`
          details.classList.remove("hidden")
        })
        date++
      }
      row.appendChild(cell)
    }
    calendarBody.appendChild(row)
  }
}

renderCalendar()

prevBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1)
  renderCalendar()
})

nextBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1)
  renderCalendar()
})

document.addEventListener("click", (event) => {
  if (!details.contains(event.target)) {
    details.classList.add("hidden")
  }
})
