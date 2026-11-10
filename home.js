
/* =========================================
   BEHIND THE SOUND
   HOME PAGE SCRIPT
   Firebase Authentication + Firestore
========================================= */

import { auth, db } from "./firebase-config.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  collection,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// =========================================
// 1. SETTINGS
// =========================================

const TOTAL_LESSONS = 7;


// =========================================
// 2. HTML ELEMENTS
// =========================================

const menuButton = document.getElementById("menuButton");
const mainMenu = document.getElementById("mainMenu");
const logoutButton = document.getElementById("logoutButton");

const lessonCount = document.getElementById("lessonCount");
const progressPercent = document.getElementById("progressPercent");
const progressCircle = document.getElementById("progressCircle");
const progressBarFill = document.getElementById("progressBarFill");

const pretestScore = document.getElementById("pretestScore");
const pretestStatus = document.getElementById("pretestStatus");

const recentLesson = document.getElementById("recentLesson");
const recentLessonStatus = document.getElementById("recentLessonStatus");


// =========================================
// 3. HAMBURGER MENU
// =========================================

function toggleMenu() {

  const isOpen = mainMenu.classList.toggle("active");

  menuButton.setAttribute(
    "aria-expanded",
    isOpen ? "true" : "false"
  );

}

function closeMenu() {

  mainMenu.classList.remove("active");

  menuButton.setAttribute("aria-expanded", "false");

}


// Open menu

menuButton.addEventListener("click", toggleMenu);


// Close when clicking outside

document.addEventListener("click", (event) => {

  const clickedMenu = mainMenu.contains(event.target);
  const clickedButton = menuButton.contains(event.target);

  if (!clickedMenu && !clickedButton) {
    closeMenu();
  }

});


// Close with Escape

document.addEventListener("keydown", (event) => {

  if (event.key === "Escape") {
    closeMenu();
  }

});


// =========================================
// 4. LOG OUT
// =========================================

logoutButton.addEventListener("click", async () => {

  try {

    await signOut(auth);

    window.location.href = "index.html";

  } catch (error) {

    console.error("Logout error:", error);

    alert("Unable to log out. Please try again.");

  }

});


// =========================================
// 5. DEFAULT DISPLAY
// =========================================

function showDefaultProgress() {

  lessonCount.innerHTML = `0 <span>/ ${TOTAL_LESSONS}</span>`;

  progressPercent.textContent = "0%";

  progressBarFill.style.width = "0%";

  progressCircle.style.background =
    "conic-gradient(#ff9d43 0deg, #392b20 0deg)";

  pretestScore.textContent = "0";

  pretestStatus.textContent = "Not completed";

  recentLesson.textContent = "Not started";

  recentLessonStatus.textContent = "Start learning";

}


// =========================================
// 6. GET RECORD TIME
// =========================================

function getRecordTime(record) {

  const dateValue = record.updatedAt || record.createdAt;

  if (!dateValue) return 0;

  if (typeof dateValue.toMillis === "function") {
    return dateValue.toMillis();
  }

  if (typeof dateValue.seconds === "number") {
    return dateValue.seconds * 1000;
  }

  if (dateValue instanceof Date) {
    return dateValue.getTime();
  }

  return 0;

}


// =========================================
// 7. LEARNING PROGRESS
// =========================================

function updateLearningProgress(records) {

  const completedLessons = records.filter((item) => {

    return (
      item.type === "lesson" &&
      (
        item.completed === true ||
        item.status === "completed"
      )
    );

  });


  // Count unique lessons

  const completedLessonIds = new Set(

    completedLessons
      .map(item => item.lessonId)
      .filter(Boolean)

  );


  const completedCount = Math.min(
    completedLessonIds.size,
    TOTAL_LESSONS
  );


  // Calculate percentage

  const percentage = Math.round(
    (completedCount / TOTAL_LESSONS) * 100
  );


  // Update text

  lessonCount.innerHTML =
    `${completedCount} <span>/ ${TOTAL_LESSONS}</span>`;


  progressPercent.textContent = `${percentage}%`;


  // Update progress bar

  progressBarFill.style.width = `${percentage}%`;


  // Update circular progress

  const degree = percentage * 3.6;

  progressCircle.style.background =
    `conic-gradient(
      #ff9d43 ${degree}deg,
      #392b20 ${degree}deg
    )`;

}


// =========================================
// 8. PRETEST SCORE
// =========================================

function updatePretestScore(records) {

  const pretests = records

    .filter(item => item.type === "pretest")

    .sort((a, b) => getRecordTime(b) - getRecordTime(a));


  // No pretest yet

  if (pretests.length === 0) {

    pretestScore.textContent = "0";

    pretestStatus.textContent = "Not completed";

    return;

  }


  // Get latest pretest

  const latestPretest = pretests[0];

  const score = Number(latestPretest.score ?? 0);

  const maxScore = Number(latestPretest.maxScore ?? 0);


  if (maxScore > 0) {

    pretestScore.textContent = `${score}/${maxScore}`;

  } else {

    pretestScore.textContent = `${score}`;

  }

  pretestStatus.textContent = "Completed";

}


// =========================================
// 9. RECENT LESSON
// =========================================

function updateRecentLesson(records) {

  const lessons = records

    .filter(item => item.type === "lesson")

    .sort((a, b) => getRecordTime(b) - getRecordTime(a));


  // No lesson yet

  if (lessons.length === 0) {

    recentLesson.textContent = "Not started";

    recentLessonStatus.textContent = "Start learning";

    return;

  }


  // Get latest lesson

  const latestLesson = lessons[0];

  recentLesson.textContent =
    latestLesson.lessonName ||
    latestLesson.lessonId ||
    "Learning";


  const isCompleted =
    latestLesson.completed === true ||
    latestLesson.status === "completed";


  recentLessonStatus.textContent =
    isCompleted ? "Completed" : "In progress";

}


// =========================================
// 10. FIRESTORE
// =========================================

let unsubscribeProgress = null;


function loadUserProgress(user) {

  // Stop previous listener

  if (unsubscribeProgress) {
    unsubscribeProgress();
  }


  // Firestore collection

  const resultsRef = collection(
    db,
    "users",
    user.uid,
    "learningResults"
  );


  // Listen for database changes

  unsubscribeProgress = onSnapshot(

    resultsRef,

    (snapshot) => {

      const records = snapshot.docs.map((doc) => ({

        id: doc.id,

        ...doc.data()

      }));


      // Update Home page

      updateLearningProgress(records);

      updatePretestScore(records);

      updateRecentLesson(records);

    },

    (error) => {

      console.error("Firestore error:", error);

    }

  );

}


// =========================================
// 11. AUTHENTICATION CHECK
// =========================================

showDefaultProgress();


onAuthStateChanged(auth, (user) => {

  if (user) {

    // Logged in

    loadUserProgress(user);

  } else {

    // Not logged in

    if (unsubscribeProgress) {

      unsubscribeProgress();

      unsubscribeProgress = null;

    }

    window.location.href = "login.html";

  }

});


// =========================================
// END OF HOME PAGE
// =========================================
