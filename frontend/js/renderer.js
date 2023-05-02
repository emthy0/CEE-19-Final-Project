import { getUserProfile , getCourseAssignments } from "./api.js";
import { renderCalendar } from "./calendar.js";
import "./api.js";
const renderLoginPage = () => {
        document.getElementsByTagName("body")[0].innerHTML = `<section>
        <header>
            <h1 id="app-name">MyCourseville API Login Page Group <span id="group-id"></span></h1>
        </header>
    </section>
    <section>
        <header>
            <h2 class="section-title description">Please press the login button to proceed to MyCourseville API Home Page</h2>
            <p class="section-subtitle description">(You need to login with MyCourseville Platform account.)</p>
        </header>
    </section>
    <section class="section-center">
        <button class="button login-button" onclick=authorizeApplication()>Login</button>
    </section>
    <section class="section-center">
        <button class="button change-page-button" onclick="window.location.href='index.html'">Go to รายการฝากซื้อ</button>
    </section>
    <section class="section-credit">
        &#169; 2110221 Computer Engineering Essentials (2022/2) &#169;
    </section>
    <script src="js/auth.js" defer></script>
    `  + 
    `<link rel="stylesheet" href="css/login.css"></link>`

}

const renderCalendarPage = () => {
    document.getElementsByTagName("body")[0].innerHTML = `    <div class="container">
    <div class="left">
      <div class="calendar">
        <div class="month">
          <i class="fas fa-angle-left prev"></i>
          <div class="date">december 2015</div>
          <i class="fas fa-angle-right next"></i>
        </div>
        <div class="weekdays">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        <div class="days"></div>
        <div class="goto-today">
          <div class="goto">
            <input type="text" placeholder="mm/yyyy" class="date-input" />
            <button class="goto-btn">Go</button>
          </div>
          <button class="today-btn">Today</button>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="today-date">
        <div class="event-day">wed</div>
        <div class="event-date">12th december 2022</div>
      </div>
      <div class="events"></div>
      <div class="add-event-wrapper">
        <div class="add-event-header">
          <div class="title">Add Event</div>
          <i class="fas fa-times close"></i>
        </div>
        <div class="add-event-body">
          <div class="add-event-input">
            <input type="text" placeholder="Event Name" class="event-name" />
          </div>
          <div class="add-event-input">
            <input
              type="text"
              placeholder="Event Time From"
              class="event-time-from"
            />
          </div>
          <div class="add-event-input">
            <input
              type="text"
              placeholder="Event Time To"
              class="event-time-to"
            />
          </div>
        </div>
        <div class="add-event-footer">
          <button class="add-event-btn">Add Event</button>
        </div>
      </div>
    </div>
    <button class="add-event">
      <i class="fas fa-plus"></i>
    </button>
  </div>

  <div class="credits">
<p>
      Watch Tutorial on Youtube
      <a href="https://youtu.be/6EVgmpm4z5U" target="_blank">Open Source Coding</a>
    </p>
  </div>` + 
  `<link rel="stylesheet" href="css/calendar.css"></link>`;
  renderCalendar()
  getCourseAssignments()
  
}


const Renderer = () => {
    getUserProfile().then(()=>{
        renderCalendarPage();
    }).catch((error) => {
      console.error(error);
        renderLoginPage();
    })
};

Renderer()