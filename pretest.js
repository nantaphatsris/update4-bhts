
/* =========================================
   BEHIND THE SOUND
   PRETEST SYSTEM
   15 QUESTIONS / 15 MINUTES
========================================= */


// =========================================
// 1. SETTINGS
// =========================================

const TOTAL_QUESTIONS = 15;
const TOTAL_TIME = 15 * 60;

let currentQuestion = 0;
let remainingTime = TOTAL_TIME;

let currentUser = null;
let db = null;

let timerInterval = null;

let isSubmitted = false;
let isSaving = false;

let userAnswers = Array(TOTAL_QUESTIONS).fill(null);


// =========================================
// 2. QUESTIONS
// =========================================

const questions = [

  {
    question: "เสียงที่เราได้ยินในชีวิตประจำวันเกิดจากอะไร?",
    options: [
      "การสั่นสะเทือนของวัตถุ",
      "การเปลี่ยนแปลงของแสง",
      "การเคลื่อนที่ของอากาศอย่างเดียว",
      "การเปลี่ยนแปลงของอุณหภูมิ"
    ],
    answer: 0
  },

  {
    question: "ข้อใดเป็นตัวอย่างของเสียงที่เกิดจากการสั่นสะเทือน?",
    options: [
      "แสงไฟเปิดขึ้น",
      "การดีดสายกีตาร์",
      "การมองเห็นภาพ",
      "การเปิดหน้าจอคอมพิวเตอร์"
    ],
    answer: 1
  },

  {
    question: "เสียงสามารถเดินทางผ่านสิ่งใดได้บ้าง?",
    options: [
      "อากาศเท่านั้น",
      "น้ำเท่านั้น",
      "ของแข็งเท่านั้น",
      "อากาศ น้ำ และของแข็ง"
    ],
    answer: 3
  },

  {
    question: "ถ้าเราอยู่ในอวกาศที่ไม่มีอากาศ เราจะได้ยินเสียงตามปกติหรือไม่?",
    options: [
      "ได้ยินเสียงชัดขึ้น",
      "ได้ยินเฉพาะเสียงดัง",
      "ไม่ได้ยินเสียง เพราะไม่มีตัวกลาง",
      "ได้ยินเสียงเบากว่าปกติ"
    ],
    answer: 2
  },

  {
    question: "เสียงที่มีความถี่สูงจะมีลักษณะอย่างไร?",
    options: [
      "เสียงทุ้ม",
      "เสียงแหลม",
      "เสียงเบา",
      "เสียงก้อง"
    ],
    answer: 1
  },

  {
    question: "หากต้องการให้เสียงมีความนุ่มนวลและลดเสียงแหลมลง ควรใช้เครื่องมือใด?",
    options: [
      "Low-Pass Filter",
      "High-Pass Filter",
      "Delay",
      "Pitch Shifter"
    ],
    answer: 0
  },

  {
    question: "หากในเสียงพูดมีเสียงลมหรือเสียงทุ้มที่ไม่ต้องการ ควรใช้เครื่องมือใดช่วยลดเสียงเหล่านี้?",
    options: [
      "Reverb",
      "High-Pass Filter",
      "Low-Pass Filter",
      "Compressor"
    ],
    answer: 1
  },

  {
    question: "EQ เป็นเครื่องมือที่ช่วยในเรื่องใด?",
    options: [
      "เปลี่ยนภาพให้เป็นเสียง",
      "เพิ่มความเร็วของเพลง",
      "ปรับเพิ่มหรือลดความถี่ของเสียง",
      "ทำให้เสียงเล่นซ้ำ"
    ],
    answer: 2
  },

  {
    question: "ถ้าเสียงพูดมีบางช่วงดังมาก บางช่วงเบามาก ควรใช้เครื่องมือใดช่วยปรับเสียงให้สม่ำเสมอ?",
    options: [
      "Compressor",
      "Reverb",
      "Delay",
      "Pitch Shifter"
    ],
    answer: 0
  },

  {
    question: "Reverb เป็นเอฟเฟกต์ที่ทำให้เสียงมีลักษณะอย่างไร?",
    options: [
      "เสียงแห้งและไม่มีมิติ",
      "เสียงก้องเหมือนอยู่ในห้องหรือสถานที่ต่าง ๆ",
      "เสียงเร็วขึ้น",
      "เสียงสูงขึ้น"
    ],
    answer: 1
  },

  {
    question: "Echo แตกต่างจาก Reverb อย่างไร?",
    options: [
      "Echo เป็นเสียงที่สะท้อนกลับมาให้ได้ยินเป็นครั้ง ๆ",
      "Echo ทำให้เสียงเบาลงเสมอ",
      "Echo ทำให้เสียงสูงขึ้น",
      "Echo ทำให้เสียงหายไป"
    ],
    answer: 0
  },

  {
    question: "หากต้องการให้เสียงร้องมีเสียงซ้ำตามหลังเสียงต้นฉบับ ควรใช้เอฟเฟกต์ใด?",
    options: [
      "EQ",
      "Compressor",
      "Delay",
      "Low-Pass Filter"
    ],
    answer: 2
  },

  {
    question: "หากต้องการเปลี่ยนเสียงให้มีระดับสูงขึ้น ควรใช้เครื่องมือใด?",
    options: [
      "Reverb",
      "Pitch Shifter",
      "High-Pass Filter",
      "Compressor"
    ],
    answer: 1
  },

  {
    question: "การปรับ Gain มีผลต่อสิ่งใด?",
    options: [
      "ระดับความแรงของสัญญาณเสียง",
      "สีของเสียง",
      "ความเร็วในการเล่นเพลง",
      "รูปแบบของไฟล์เสียง"
    ],
    answer: 0
  },

  {
    question: "ถ้าต้องการให้เสียงที่บันทึกมาฟังดูกลมกลืนและมีมิติมากขึ้น สามารถใช้เอฟเฟกต์ใดได้?",
    options: [
      "Reverb",
      "High-Pass Filter",
      "Pitch Shifter",
      "Gain"
    ],
    answer: 0
  }

];


// =========================================
// 3. HTML ELEMENTS
// =========================================

const questionNumber = document.getElementById("questionNumber");
const questionLabel = document.getElementById("questionLabel");

const questionText = document.getElementById("questionText");
const answerList = document.getElementById("answerList");

const answerHint = document.getElementById("answerHint");

const previousButton = document.getElementById("previousButton");
const nextButton = document.getElementById("nextButton");

const answeredCount = document.getElementById("answeredCount");

const timerElement = document.getElementById("timer");
const timerFill = document.getElementById("timerFill");

const backButton = document.getElementById("backButton");

const resultOverlay = document.getElementById("resultOverlay");
const finalScore = document.getElementById("finalScore");
const resultMessage = document.getElementById("resultMessage");

const homeButton = document.getElementById("homeButton");
const saveStatus = document.getElementById("saveStatus");


// =========================================
// 4. RENDER QUESTION
// =========================================

function renderQuestion() {

  const question = questions[currentQuestion];

  const number = currentQuestion + 1;

  questionNumber.textContent =
    `Question ${number} of ${TOTAL_QUESTIONS}`;

  questionLabel.textContent =
    `Question ${number} of ${TOTAL_QUESTIONS}`;

  questionText.textContent = question.question;

  answerList.innerHTML = "";

  const letters = ["ก", "ข", "ค", "ง"];

  question.options.forEach((option, index) => {

    const button = document.createElement("button");

    button.type = "button";
    button.className = "answer-option";

    const letter = document.createElement("span");

    letter.className = "option-letter";
    letter.textContent = letters[index];

    const text = document.createElement("span");

    text.className = "option-text";
    text.textContent = option;

    button.appendChild(letter);
    button.appendChild(text);

    if (userAnswers[currentQuestion] === index) {
      button.classList.add("selected");
    }

    button.addEventListener("click", () => {
      selectAnswer(index);
    });

    answerList.appendChild(button);

  });


  previousButton.disabled = currentQuestion === 0;

  if (currentQuestion === TOTAL_QUESTIONS - 1) {

    nextButton.textContent = "Submit";
    nextButton.classList.add("submit-button");

  } else {

    nextButton.textContent = "Next";
    nextButton.classList.remove("submit-button");

  }

  nextButton.disabled =
    userAnswers[currentQuestion] === null;

  answerHint.textContent =
    userAnswers[currentQuestion] === null
      ? "Select one answer to continue."
      : "Answer selected.";

  updateAnsweredCount();

}


// =========================================
// 5. SELECT ANSWER
// =========================================

function selectAnswer(index) {

  if (isSubmitted || isSaving) return;

  userAnswers[currentQuestion] = index;

  renderQuestion();

}


// =========================================
// 6. ANSWER COUNTER
// =========================================

function updateAnsweredCount() {

  const count = userAnswers.filter(
    answer => answer !== null
  ).length;

  answeredCount.textContent =
    `${count} / ${TOTAL_QUESTIONS} Answered`;

}


// =========================================
// 7. NEXT / SUBMIT
// =========================================

nextButton.addEventListener("click", () => {

  if (isSubmitted || isSaving) return;

  if (userAnswers[currentQuestion] === null) return;

  if (currentQuestion === TOTAL_QUESTIONS - 1) {

    submitQuiz(false);
    return;

  }

  currentQuestion++;

  renderQuestion();

});


// =========================================
// 8. PREVIOUS
// =========================================

previousButton.addEventListener("click", () => {

  if (isSubmitted || isSaving) return;

  if (currentQuestion <= 0) return;

  currentQuestion--;

  renderQuestion();

});


// =========================================
// 9. BACK TO HOME
// =========================================

function goHome() {

  window.location.assign("./home.html");

}

backButton.addEventListener("click", goHome);

homeButton.addEventListener("click", goHome);


// =========================================
// 10. TIMER
// =========================================

function startTimer() {

  if (timerInterval) return;

  timerInterval = setInterval(() => {

    if (isSubmitted || isSaving) return;

    remainingTime--;

    updateTimerDisplay();

    if (remainingTime <= 0) {

      clearInterval(timerInterval);
      timerInterval = null;

      submitQuiz(true);

    }

  }, 1000);

}


// =========================================
// 11. TIMER DISPLAY
// =========================================

function updateTimerDisplay() {

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  timerElement.textContent =
    `${String(minutes).padStart(2, "0")}:` +
    `${String(seconds).padStart(2, "0")}`;

  const percentage =
    (remainingTime / TOTAL_TIME) * 100;

  timerFill.style.width = `${percentage}%`;

  if (remainingTime <= 60) {

    timerElement.style.color = "#ff7770";
    timerFill.style.background = "#ff7770";

  }

}


// =========================================
// 12. CALCULATE SCORE
// =========================================

function calculateScore() {

  let score = 0;

  questions.forEach((question, index) => {

    if (userAnswers[index] === question.answer) {
      score++;
    }

  });

  return score;

}


// =========================================
// 13. FIREBASE CONNECTION
// โหลด Firebase แยกจากระบบแสดงโจทย์
// =========================================

async function initializeFirebase() {

  try {

    const configModule = await import("./firebase-config.js");

    const { firebaseConfig } = configModule;

    const appModule = await import(
      "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"
    );

    const authModule = await import(
      "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js"
    );

    const firestoreModule = await import(
      "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"
    );

    const app = appModule.getApps().length
      ? appModule.getApp()
      : appModule.initializeApp(firebaseConfig);

    const auth = authModule.getAuth(app);

    db = firestoreModule.getFirestore(app);

    await new Promise((resolve) => {

      authModule.onAuthStateChanged(
        auth,

        (user) => {
          currentUser = user;
          resolve();
        },

        (error) => {
          console.error("Auth error:", error);
          resolve();
        }
      );

    });

    console.log("Firebase connected successfully");

  } catch (error) {

    console.error("Firebase connection error:", error);

    saveStatus.textContent =
      "Firebase connection error. Quiz can still be completed, but results may not be saved.";

  }

}


// =========================================
// 14. SUBMIT QUIZ
// =========================================

async function submitQuiz(timeUp = false) {

  if (isSubmitted || isSaving) return;

  if (!timeUp) {

    const allAnswered = userAnswers.every(
      answer => answer !== null
    );

    if (!allAnswered) {

      answerHint.textContent =
        "Please answer all questions before submitting.";

      return;

    }

  }

  isSaving = true;

  nextButton.disabled = true;
  previousButton.disabled = true;

  clearInterval(timerInterval);
  timerInterval = null;

  const score = calculateScore();

  saveStatus.textContent = "Saving your result...";

  try {

    // รอ Firebase โหลดให้เสร็จก่อนบันทึก

    await firebaseReady;

    if (!currentUser || !db) {

      throw new Error("User is not authenticated.");

    }

    await firestoreAddResult(score, timeUp);

    isSubmitted = true;

    saveStatus.textContent = "";

    showResult(score, timeUp, true);

  } catch (error) {

    console.error("Pretest save error:", error);

    // แสดงคะแนนแม้บันทึก Firebase ไม่สำเร็จ

    isSubmitted = true;

    saveStatus.textContent = "";

    showResult(score, timeUp, false);

  }

}


// =========================================
// 15. FIRESTORE SAVE
// =========================================

async function firestoreAddResult(score, timeUp) {

  const firestoreModule = await import(
    "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"
  );

  await firestoreModule.addDoc(

    firestoreModule.collection(
      db,
      "users",
      currentUser.uid,
      "learningResults"
    ),

    {

      type: "pretest",

      score: score,

      maxScore: TOTAL_QUESTIONS,

      completed: true,

      answers: userAnswers,

      timeUsed: TOTAL_TIME - remainingTime,

      timeUp: timeUp,

      createdAt: firestoreModule.serverTimestamp()

    }

  );

}


// =========================================
// 16. SHOW RESULT
// =========================================

function showResult(score, timeUp, saved) {

  finalScore.textContent = score;

  if (saved) {

    resultMessage.textContent = timeUp
      ? "Time is up! Your result has been saved."
      : "Your pretest result has been saved successfully.";

  } else {

    resultMessage.textContent =
      "Your score has been calculated, but the result could not be saved to Firebase. Please check your login and connection.";

  }

  resultOverlay.classList.add("active");

}


// =========================================
// 17. START SYSTEM
// =========================================

// แสดงโจทย์ทันที ไม่ต้องรอ Firebase

renderQuestion();

updateTimerDisplay();

startTimer();


// โหลด Firebase ในขั้นตอนแยก

const firebaseReady = initializeFirebase();


// =========================================
// END
// =========================================
