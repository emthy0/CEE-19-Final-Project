import { updateCourseAssignments, getCourseAssignments } from "./api.js";
import { showLoading, hideLoading } from "./renderer.js";
console.log("Load calendar");



export function renderCalendar(assignmentList) {
  const calendar = document.querySelector(".calendar"),
    date = document.querySelector(".date"),
    daysContainer = document.querySelector(".days"),
    prev = document.querySelector(".prev"),
    next = document.querySelector(".next"),
    todayBtn = document.querySelector(".today-btn"),
    gotoBtn = document.querySelector(".goto-btn"),
    dateInput = document.querySelector(".date-input"),
    eventDay = document.querySelector(".event-day"),
    eventDate = document.querySelector(".event-date"),
    eventsContainer = document.querySelector(".events"),
    addEventBtn = document.querySelector(".add-event"),
    addEventWrapper = document.querySelector(".add-event-wrapper "),
    addEventCloseBtn = document.querySelector(".close "),
    addEventTitle = document.querySelector(".event-name "),
    addEventFrom = document.querySelector(".event-time-from "),
    addEventTo = document.querySelector(".event-time-to "),
    addEventSubmit = document.querySelector(".add-event-btn ");

  let today = new Date();
  let activeDay = today.getDate();
  let activeMonth = today.getMonth();
  let activeYear = today.getFullYear();
  console.log("active day reset")
  let month = today.getMonth();
  let year = today.getFullYear();

  const months = [
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
  ];

  // const eventsArr = [
  //   {
  //     day: 13,
  //     month: 11,
  //     year: 2022,
  //     events: [
  //       {
  //         title: "Event 1 lorem ipsun dolar sit genfa tersd dsad ",
  //         time: "10:00 AM",
  //       },
  //       {
  //         title: "Event 2",
  //         time: "11:00 AM",
  //       },
  //     ],
  //   },
  // ];

  let eventsArr = [];
  getEvents(assignmentList);
  console.log(eventsArr);

  //function to add days in days with class day and prev-date next-date on previous month and next month days and active on today
  function initCalendar(year, month) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    date.innerHTML = months[month] + " " + year;

    let days = "";

    for (let x = day; x > 0; x--) {
      days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
    }

    for (let i = 1; i <= lastDate; i++) {
      //check if event is present on that day


      days += `<div id="date-${year}-${month+1}-${i}" class="day ">${i}</div>`;
    }


    for (let j = 1; j <= nextDays; j++) {
      days += `<div class="day next-date">${j}</div>`;
    }
    daysContainer.innerHTML = days;
    let event = false;
    eventsArr.forEach((eventObj) => {
      if (
        eventObj.events.filter(event => event.priority !== 4).length > 0
      ) {
        document.getElementById(`date-${eventObj.year}-${eventObj.month}-${eventObj.day}`)?.classList.add('event')
      } else {
        document.getElementById(`date-${eventObj.year}-${eventObj.month}-${eventObj.day}`)?.classList.remove('event')
      }
    });
    console.log(activeDay, activeMonth, activeYear)
    console.log(activeDay, month, year)
    if (month === activeMonth && year === activeYear) {
      console.log('Setting active')
      document.getElementById(`date-${year}-${month+1}-${activeDay}`)?.classList.add('active')
    }
    const tday = new Date();
    if (month === tday.getMonth() && year === tday.getFullYear()) {
      console.log('Setting tday')
      document.getElementById(`date-${year}-${month+1}-${activeDay}`)?.classList.add('active')
    }
    addListner();
  }

  //function to add month and year on prev and next button
  function prevMonth() {
    month--;
    if (month < 0) {
      month = 11;
      year--;
    }
    initCalendar(year,month);
    getActiveDay(activeDay)

  }

  function nextMonth() {
    month++;
    if (month > 11) {
      month = 0;
      year++;
    }
    initCalendar(year,month);
  }

  function reRender() {
    document.getElementById(`date-${activeYear}-${activeMonth}-${activeDay}`)?.classList.add('active')
  }

  prev.addEventListener("click", prevMonth);
  next.addEventListener("click", nextMonth);

  initCalendar(year,month);
  document.getElementById(`date-${year}-${month+1}-${activeDay}`)?.classList.add('active', 'today')

  //function to add active on day
  function addListner() {
    const days = document.querySelectorAll(".day");
    days.forEach((day) => {
      day.addEventListener("click", (e) => {
        getActiveDay(e.target.innerHTML);
        updateEvents(Number(e.target.innerHTML));
        activeDay = Number(e.target.innerHTML);
        activeMonth = month;
        activeYear = year;
        console.log(`${activeMonth} ${activeYear} ${activeDay}`)
        //remove active
        days.forEach((day) => {
          day.classList.remove("active");
        });
        //if clicked prev-date or next-date switch to that month
        if (e.target.classList.contains("prev-date")) {
          prevMonth();
          //add active to clicked day afte month is change
          setTimeout(() => {
            //add active where no prev-date or next-date
            const days = document.querySelectorAll(".day");
            days.forEach((day) => {
              if (
                !day.classList.contains("prev-date") &&
                day.innerHTML === e.target.innerHTML
              ) {
                day.classList.add("active");
              }
            });
          }, 100);
        } else if (e.target.classList.contains("next-date")) {
          nextMonth();
          //add active to clicked day afte month is changed
          setTimeout(() => {
            const days = document.querySelectorAll(".day");
            days.forEach((day) => {
              if (
                !day.classList.contains("next-date") &&
                day.innerHTML === e.target.innerHTML
              ) {
                day.classList.add("active");
              }
            });
          }, 100);
        } else {
          e.target.classList.add("active");
        }
      });
    });
  }

  todayBtn.addEventListener("click", () => {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar(year,month);
  });

  dateInput.addEventListener("input", (e) => {
    dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
    if (dateInput.value.length === 2) {
      dateInput.value += "/";
    }
    if (dateInput.value.length > 7) {
      dateInput.value = dateInput.value.slice(0, 7);
    }
    if (e.inputType === "deleteContentBackward") {
      if (dateInput.value.length === 3) {
        dateInput.value = dateInput.value.slice(0, 2);
      }
    }
  });

  gotoBtn.addEventListener("click", gotoDate);

  function gotoDate() {
    console.log("here");
    const dateArr = dateInput.value.split("/");
    if (dateArr.length === 2) {
      if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
        month = dateArr[0] - 1;
        year = dateArr[1];
        initCalendar(year,month);
        return;
      }
    }
    alert("Invalid Date");
  }

  //function get active day day name and date and update eventday eventdate
  function getActiveDay(date) {
    const day = new Date(year, month, date);
    const dayName = day.toString().split(" ")[0];
    eventDay.innerHTML = dayName;
    eventDate.innerHTML = date + " " + months[month] + " " + year;
    updateEvents(date)
  }

  //function update events when a day is active
  function updateEvents(date) {
    let events = "";
    eventsArr.forEach((eventData) => {
      if (
        date === eventData.day &&
        month + 1 === eventData.month &&
        year === eventData.year
      ) {
        eventData.events.forEach((event) => {
          events += `<div class="event">
            <div class="title">
              <i class="fas fa-circle"></i>
              <h3 class="event-title">${event.title}</h3>
            </div>
            <div class="event-time">
              <span class="event-time">${event.time}</span>
            </div>
        </div>`;
        });
      }
      if (
        eventData.events.filter(event => event.priority !== 4).length > 0
      ) {
        document.getElementById(`date-${eventData.year}-${eventData.month}-${eventData.day}`)?.classList.add('event')
      } else {
        document.getElementById(`date-${eventData.year}-${eventData.month}-${eventData.day}`)?.classList.remove('event')
      }
    });
    if (events === "") {
      events = `<div class="no-event">
            <h3>No Events</h3>
        </div>`;
    } 

    eventsContainer.innerHTML = events;
    saveEvents();
  }

  //function to add event
  addEventBtn.addEventListener("click", () => {
    addEventWrapper.classList.toggle("active");
  });

  addEventCloseBtn.addEventListener("click", () => {
    addEventWrapper.classList.remove("active");
  });

  document.addEventListener("click", (e) => {
    if (e.target !== addEventBtn && !addEventWrapper.contains(e.target)) {
      addEventWrapper.classList.remove("active");
    }
  });

  //allow 50 chars in eventtitle
  addEventTitle.addEventListener("input", (e) => {
    addEventTitle.value = addEventTitle.value.slice(0, 60);
  });

  function defineProperty() {
    var osccred = document.createElement("div");
    osccred.innerHTML =
      "A Project By <a href='https://www.youtube.com/channel/UCiUtBDVaSmMGKxg1HYeK-BQ' target=_blank>Open Source Coding</a>";
    osccred.style.position = "absolute";
    osccred.style.bottom = "0";
    osccred.style.right = "0";
    osccred.style.fontSize = "10px";
    osccred.style.color = "#ccc";
    osccred.style.fontFamily = "sans-serif";
    osccred.style.padding = "5px";
    osccred.style.background = "#fff";
    osccred.style.borderTopLeftRadius = "5px";
    osccred.style.borderBottomRightRadius = "5px";
    osccred.style.boxShadow = "0 0 5px #ccc";
    document.body.appendChild(osccred);
  }

  defineProperty();

  //allow only time in eventtime from and to
  addEventFrom.addEventListener("input", (e) => {
    addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
    if (addEventFrom.value.length === 2) {
      addEventFrom.value += ":";
    }
    if (addEventFrom.value.length > 5) {
      addEventFrom.value = addEventFrom.value.slice(0, 5);
    }
  });

  addEventTo.addEventListener("input", (e) => {
    addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
    if (addEventTo.value.length === 2) {
      addEventTo.value += ":";
    }
    if (addEventTo.value.length > 5) {
      addEventTo.value = addEventTo.value.slice(0, 5);
    }
  });

  const apiUpdateAssignments = async (assignments, newAssignment) => {
    console.log("Updating assignments");
    console.log(assignments);
    const assignmentList = assignments.reduce((list, day) => {
      list.push(...day.events);
      return list;
    }, []);
    assignmentList.push(newAssignment);
    return await updateCourseAssignments(assignmentList);
  };

  //function to delete event when clicked on event
  eventsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("event")) {
      const eventTitle = e.target.children[0].children[1].innerHTML;

      const isCompleted = eventsArr.find(event => event.day === activeDay && event.month === activeMonth + 1 && event.year === activeYear).events.find(e => e.title === eventTitle).priority === 4;
      if (!isCompleted && confirm("Are you sure you want to update this event?\n You wont beable to undo this action")) {
        
        eventsArr.forEach((event) => {
          if (
            event.day === activeDay &&
            event.month === month + 1 &&
            event.year === year
          ) {
            event.events.forEach((item, index) => {
              if (item.title === eventTitle) {
                event.events.splice(index, 1);
                apiUpdateAssignments(eventsArr, {
                  ...item,
                  priority: Math.min(item.priority + 2, 4),
                }).finally(()=> {
                  getCourseAssignments().then((assignments) => {
                    getEvents(assignments)
                  });
                  
                } )
              }
            });
            //if no events left in a day then remove that day from eventsArr
            if (event.events.length === 0) {
              eventsArr.splice(eventsArr.indexOf(event), 1);
              //remove event class from day
              const activeDayEl = document.querySelector(".day.active");
              if (activeDayEl.classList.contains("event")) {
                activeDayEl.classList.remove("event");
              }
            }
          }
        });
        updateEvents(activeDay);
      }
    }
  });

  //function to save events in local storage
  function saveEvents() {
    localStorage.setItem("events", JSON.stringify(eventsArr));
  }

  function statusEnumToString(status) {
    switch (status) {
      case 0:
        return "Unread";
      case 1:
        return "High";
      case 2:
        return "In Progress";
      case 3:
        return "Low";
      case 4:
        return "Completed";
    }
  }

  //function to get events from local storage
  function getEvents(rawAssignments) {
    //check if events are already saved in local storage then return event else nothing
    if (!rawAssignments) return;
    const groupedEvents = rawAssignments.reduce((acc, assignment) => {
      const eventDate = new Date(assignment.duedate);
      const dueTime = new Date(assignment.duetime * 1000);
      if (!acc[assignment.duedate]) {
        acc[assignment.duedate] = {
          day: eventDate.getDate(),
          month: eventDate.getMonth() + 1,
          year: eventDate.getFullYear(),
          events: [],
        };
      }
      acc[assignment.duedate].events.push({
        ...assignment,
        dueTime: dueTime,
        title: `[${statusEnumToString(assignment.priority)}] ${
          assignment.title
        } - ${assignment.course.title}`,
        time: dueTime.toTimeString().split(' ')[0],
      });
      acc[assignment.duedate].events.sort((a, b) => a.dueTime - b.dueTime);
      return acc;
    }, {});
    console.log(groupedEvents);
    const groupedEventsArray = Object.values(groupedEvents);

    // eventsArr.push(...groupedEventsArray);
    eventsArr = groupedEventsArray
    initCalendar(year,month);
    console.log(activeDay);
    getActiveDay(activeDay)
  }

  function convertTime(time) {
    //convert time to 24 hour format
    let timeArr = time.split(":");
    let timeHour = timeArr[0];
    let timeMin = timeArr[1];
    let timeFormat = timeHour >= 12 ? "PM" : "AM";
    timeHour = timeHour % 12 || 12;
    time = timeHour + ":" + timeMin + " " + timeFormat;
    return time;
  }
}
