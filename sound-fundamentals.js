
/* =========================================
   BEHIND THE SOUND
   SOUND FUNDAMENTALS JAVASCRIPT
========================================= */


/* =========================================
   1. PAGE NAVIGATION
========================================= */

const topicPage = document.getElementById("topicPage");
const lessonPage = document.getElementById("lessonPage");
const lessonContent = document.getElementById("lessonContent");
const backButton = document.getElementById("backButton");

const params = new URLSearchParams(window.location.search);
const selectedTopic = params.get("topic");


/* =========================================
   2. BACK BUTTON
========================================= */

backButton.addEventListener("click", () => {

  if (selectedTopic) {
    window.location.href = "sound-fundamentals.html";
  } else {
    window.location.href = "learning.html";
  }

});


/* =========================================
   3. TOPIC CONTENT
========================================= */

const lessons = {

  /* =====================================
     WHAT IS SOUND
  ====================================== */

  sound: `

    <div class="lesson-page-heading">
      <h1>What is Sound?</h1>
    </div>

    <article class="content-card">

      <h3>Sound (เสียง)</h3>

      <h4>เสียงเกิดขึ้นได้อย่างไร?</h4>

      <p>
        เสียง (Sound) คือพลังงานรูปแบบหนึ่งที่เกิดจากการสั่นสะเทือนของวัตถุ
        และเดินทางผ่านตัวกลาง เช่น อากาศ น้ำ และของแข็ง ในรูปแบบของคลื่นเสียง
      </p>

      <p>
        เมื่อวัตถุเกิดการสั่นสะเทือน จะทำให้อนุภาคของตัวกลางเกิดการอัดตัวและขยายตัวสลับกันอย่างต่อเนื่อง
        เกิดเป็นคลื่นเสียงที่เคลื่อนที่ผ่านตัวกลาง เมื่อคลื่นเสียงเดินทางมาถึงหูของเรา
        เราจึงสามารถรับรู้และได้ยินเสียงนั้นได้
      </p>

      <h4>เสียงเดินทางผ่านตัวกลางชนิดใดได้ดีที่สุด?</h4>

      <p>
        เสียงสามารถเดินทางผ่านของแข็งได้เร็วกว่าในของเหลวและแก๊สโดยทั่วไป
        เนื่องจากอนุภาคในของแข็งอยู่ใกล้ชิดกัน ทำให้สามารถส่งผ่านการสั่นสะเทือนจากอนุภาคหนึ่งไปยังอีกอนุภาคหนึ่งได้อย่างรวดเร็ว
      </p>

      <p>
        ในขณะที่ของเหลวและแก๊สมีระยะห่างระหว่างอนุภาคมากกว่า
        จึงส่งผ่านการสั่นสะเทือนได้ช้ากว่า
      </p>

      <h4>Sound in Everyday Life</h4>

      <p>
        เสียงรอบตัวเราเกิดจากการสั่นสะเทือนของวัตถุที่แตกต่างกัน เช่น
      </p>

      <div class="everyday-item">
        <h4>เสียงเคาะประตู (Knocking)</h4>
        <p>
          เกิดจากการกระทบกันระหว่างมือกับประตู ทำให้ประตูเกิดการสั่นสะเทือน
        </p>
      </div>

      <div class="everyday-item">
        <h4>เสียงพูด (Human Voice)</h4>
        <p>
          เกิดจากการสั่นสะเทือนของเส้นเสียง ขณะที่อากาศไหลผ่านกล่องเสียง
        </p>
      </div>

      <div class="everyday-item">
        <h4>เสียงกีตาร์ (Guitar Sound)</h4>
        <p>
          เกิดจากการสั่นสะเทือนของสายกีตาร์เมื่อถูกดีด และส่งผ่านแรงสั่นสะเทือนไปยังตัวกีตาร์เพื่อสร้างเสียง
        </p>
      </div>

    </article>


    <article class="fact-card">

      <div class="fact-label">✦ FUN FACT!</div>

      <h3>ทำไมเราถึงไม่ได้ยินเสียงในอวกาศ?</h3>

      <p>
        เพราะอวกาศส่วนใหญ่เป็นสุญญากาศ ซึ่งแทบไม่มีตัวกลางสำหรับส่งผ่านคลื่นเสียง
        ดังนั้นเสียงจึงไม่สามารถเดินทางผ่านอวกาศมาถึงหูของเราได้เหมือนเสียงที่เดินทางผ่านอากาศบนโลก
      </p>

    </article>

  `,


  /* =====================================
     FREQUENCY
  ====================================== */

  frequency: `

    <div class="lesson-page-heading">
      <h1>Frequency</h1>
    </div>

    <article class="content-card">

      <h3>Frequency (ความถี่)</h3>

      <p>
        ความถี่ (Frequency) คือจำนวนรอบที่วัตถุเกิดการสั่นสะเทือนภายในเวลา 1 วินาที
        โดยมีหน่วยเป็นเฮิรตซ์ (Hertz: Hz)
      </p>

      <p>
        ตัวอย่างเช่น หากวัตถุสั่นสะเทือน 100 รอบภายใน 1 วินาที
        จะมีความถี่เท่ากับ 100 Hz
      </p>

      <p>
        ความถี่เป็นปัจจัยสำคัญที่กำหนดระดับเสียงสูง–ต่ำ (Pitch)
        โดยเสียงที่มีความถี่ต่ำจะให้ความรู้สึกเป็นเสียงทุ้ม
        ส่วนเสียงที่มีความถี่สูงจะให้ความรู้สึกเป็นเสียงแหลม
      </p>

      <h3>ช่วงความถี่ที่มนุษย์ได้ยิน</h3>

      <p>
        โดยทั่วไป หูของมนุษย์สามารถรับฟังเสียงได้ในช่วงประมาณ 20–20,000 Hz หรือ 20 kHz
      </p>

      <p>
        อย่างไรก็ตาม ความสามารถในการได้ยินความถี่แต่ละช่วงแตกต่างกันไปในแต่ละบุคคล
        โดยขึ้นอยู่กับปัจจัยต่าง ๆ เช่น อายุ สุขภาพของระบบการได้ยิน
        และการสัมผัสเสียงดังในชีวิตประจำวัน
      </p>

      <h3>Frequency กับช่วงอายุ</h3>

      <p>
        ความสามารถในการได้ยินเสียงความถี่สูงมักลดลงเมื่ออายุมากขึ้น
        โดยตัวเลขต่อไปนี้เป็นช่วงความถี่โดยประมาณที่อาจพบได้
        ไม่ใช่เกณฑ์ตายตัวของทุกคน
      </p>

      <div class="frequency-table">

        <div class="frequency-row">
          <span>เด็ก-วัยรุ่น</span>
          <strong>18,000 - 20,000 Hz</strong>
        </div>

        <div class="frequency-row">
          <span>20-30 ปี</span>
          <strong>15,000 - 17,000 Hz</strong>
        </div>

        <div class="frequency-row">
          <span>40-50 ปี</span>
          <strong>12,000 - 14,000 Hz</strong>
        </div>

        <div class="frequency-row">
          <span>60 ปีขึ้นไป</span>
          <strong>8,000 - 10,000 Hz</strong>
        </div>

      </div>

    </article>


    <article class="fact-card">

      <div class="fact-label">✦ DID YOU KNOW?</div>

      <h3>ทำไมอายุมากขึ้นจึงได้ยินเสียงแหลมน้อยลง?</h3>

      <p>
        ภายในหูชั้นในมีอวัยวะที่เรียกว่า คอเคลีย (Cochlea)
        ซึ่งมีเซลล์ขนรับเสียง (Hair Cells) ทำหน้าที่เปลี่ยนแรงสั่นสะเทือนของเสียงให้เป็นสัญญาณประสาทส่งไปยังสมอง
      </p>

      <p>
        เมื่ออายุมากขึ้น เซลล์ขนเหล่านี้จะค่อย ๆ เสื่อมสภาพ
        โดยเฉพาะเซลล์ที่ทำหน้าที่รับเสียงความถี่สูง ซึ่งอยู่บริเวณฐานของ Cochlea
        ส่งผลให้ความสามารถในการรับฟังเสียงแหลมลดลงตามวัย
      </p>

    </article>

  `,


  /* =====================================
     WAVEFORM
  ====================================== */

  waveform: `

    <div class="lesson-page-heading">
      <h1>Waveform</h1>
    </div>


    <article class="content-card">

      <h3>Waveform (รูปคลื่นเสียง)</h3>

      <p>
        Waveform (รูปคลื่นเสียง) คือภาพที่ใช้แสดงการเปลี่ยนแปลงของสัญญาณเสียงตามเวลา
        ทำให้เราสามารถมองเห็นลักษณะของเสียงผ่านรูปแบบคลื่นได้ เช่น ความแรงของสัญญาณ
        การสั่นสะเทือน และรูปแบบของคลื่นเสียง
      </p>

      <p>
        แม้ว่าเสียงจะเป็นสิ่งที่เราได้ยิน แต่ Waveform ช่วยให้เราสามารถมองเห็นลักษณะของเสียงได้ผ่านกราฟ
        ทำให้เข้าใจและวิเคราะห์เสียงได้ง่ายขึ้น
      </p>


      <h3>Waveform Components</h3>

      <div class="wave-diagram">

        <svg viewBox="0 0 760 410"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Sine wave showing amplitude, peak, trough, cycle and period">

          <defs>
            <marker id="waveArrow"
              markerWidth="7"
              markerHeight="7"
              refX="5"
              refY="3"
              orient="auto-start-reverse">
              <path d="M0 0 L6 3 L0 6"
                fill="none"
                stroke="#ffad59"
                stroke-width="1.2"/>
            </marker>
          </defs>

          <!-- CENTER AXIS -->
          <line x1="65" y1="190"
            x2="690" y2="190"
            stroke="#b9a99a"
            stroke-width="1.5"
            stroke-dasharray="6 5"/>

          <!-- SINE WAVE -->
          <path
            d="M65 190
               C115 190 115 80 165 80
               S215 190 265 190
               S315 300 365 300
               S415 190 465 190
               S515 80 565 80
               S615 190 665 190"
            fill="none"
            stroke="#ffad59"
            stroke-width="4"
            stroke-linecap="round"/>

          <!-- PEAK -->
          <circle cx="165" cy="80" r="5" fill="#ffad59"/>

          <line x1="165" y1="80"
            x2="165" y2="45"
            stroke="#ffad59"
            stroke-dasharray="4 4"/>

          <text x="165" y="30"
            fill="#ffc27e"
            font-size="17"
            text-anchor="middle">
            Peak
          </text>

          <!-- TROUGH -->
          <circle cx="365" cy="300" r="5" fill="#ffad59"/>

          <line x1="365" y1="300"
            x2="365" y2="335"
            stroke="#ffad59"
            stroke-dasharray="4 4"/>

          <text x="365" y="360"
            fill="#ffc27e"
            font-size="17"
            text-anchor="middle">
            Trough
          </text>

          <!-- AMPLITUDE -->
          <line x1="105" y1="190"
            x2="105" y2="80"
            stroke="#ffad59"
            stroke-width="2"
            marker-start="url(#waveArrow)"
            marker-end="url(#waveArrow)"/>

          <text x="95" y="135"
            fill="#ffc27e"
            font-size="14"
            text-anchor="end">
            Amplitude
          </text>

          <!-- CYCLE -->
          <line x1="165" y1="125"
            x2="565" y2="125"
            stroke="#ffad59"
            stroke-width="2"
            marker-start="url(#waveArrow)"
            marker-end="url(#waveArrow)"/>

          <text x="365" y="115"
            fill="#ffc27e"
            font-size="15"
            text-anchor="middle">
            1 Cycle
          </text>

          <!-- PERIOD -->
          <line x1="165" y1="390"
            x2="565" y2="390"
            stroke="#ffad59"
            stroke-width="2"
            marker-start="url(#waveArrow)"
            marker-end="url(#waveArrow)"/>

          <text x="365" y="380"
            fill="#ffc27e"
            font-size="15"
            text-anchor="middle">
            Period
          </text>

          <!-- TIME -->
          <text x="680" y="215"
            fill="#e9c59c"
            font-size="14"
            text-anchor="end">
            Time
          </text>

        </svg>

      </div>


      <div class="component-item">
        <h3>Amplitude (แอมพลิจูด)</h3>
        <p>
          ระยะห่างจากเส้นกึ่งกลางของคลื่นไปยังจุดสูงสุดหรือจุดต่ำสุด
          ใช้แสดงขนาดของการสั่นหรือระดับสัญญาณ โดยทั่วไป
          เมื่อเปรียบเทียบสัญญาณภายใต้เงื่อนไขเดียวกัน
          แอมพลิจูดที่มากขึ้นจะสัมพันธ์กับเสียงที่ดังขึ้น
        </p>
      </div>

      <div class="component-item">
        <h3>Peak (จุดสูงสุด)</h3>
        <p>
          ตำแหน่งสูงสุดของคลื่น เป็นจุดที่มีค่าการกระจัดเป็นบวกมากที่สุดเมื่อเทียบกับเส้นกึ่งกลาง
        </p>
      </div>

      <div class="component-item">
        <h3>Trough (จุดต่ำสุด)</h3>
        <p>
          ตำแหน่งต่ำสุดของคลื่น เป็นจุดที่มีค่าการกระจัดเป็นลบมากที่สุดเมื่อเทียบกับเส้นกึ่งกลาง
        </p>
      </div>

      <div class="component-item">
        <h3>Cycle (รอบคลื่น)</h3>
        <p>
          การสั่นของคลื่นครบหนึ่งรอบ โดยเริ่มจากจุดหนึ่งและกลับมายังตำแหน่งเดิมพร้อมทิศทางการเคลื่อนที่เดิม
        </p>
      </div>

      <div class="component-item">
        <h3>Period (คาบเวลา)</h3>
        <p>
          ระยะเวลาที่คลื่นใช้ในการสั่นครบหนึ่งรอบ มีหน่วยเป็นวินาที (Seconds)
          โดย Period จะสัมพันธ์กับ Frequency แบบแปรผกผัน กล่าวคือ
          ความถี่สูงจะมีคาบเวลาสั้น ส่วนความถี่ต่ำจะมีคาบเวลายาว
        </p>
      </div>

    </article>


    <!-- WAVEFORM TYPES -->

    <article class="content-card waveform-types-section">

      <h3>Waveform Types</h3>

      <p>
        รูปคลื่นเสียงแต่ละประเภทมีลักษณะแตกต่างกัน ซึ่งส่งผลต่อลักษณะเสียงที่เราได้ยิน
      </p>


      <div class="waveform-grid">

        <!-- SINE -->
        <button class="wave-type"
          type="button"
          data-wave="sine">

          <span class="wave-type-name">Sine Wave</span>

          <svg viewBox="0 0 200 90">
            <path d="M5 45 C30 -5 55 -5 80 45 S130 95 155 45 S180 -5 195 45"
              fill="none"
              stroke="#ffb45f"
              stroke-width="3"/>
          </svg>

          <span class="wave-play-hint">Tap to listen</span>

        </button>


        <!-- SQUARE -->
        <button class="wave-type"
          type="button"
          data-wave="square">

          <span class="wave-type-name">Square Wave</span>

          <svg viewBox="0 0 200 90">
            <path d="M5 65 L5 20 L50 20 L50 65 L100 65 L100 20 L150 20 L150 65 L195 65"
              fill="none"
              stroke="#ffb45f"
              stroke-width="3"/>
          </svg>

          <span class="wave-play-hint">Tap to listen</span>

        </button>


        <!-- TRIANGLE -->
        <button class="wave-type"
          type="button"
          data-wave="triangle">

          <span class="wave-type-name">Triangle Wave</span>

          <svg viewBox="0 0 200 90">
            <path d="M5 65 L30 15 L55 65 L80 15 L105 65 L130 15 L155 65 L180 15 L195 45"
              fill="none"
              stroke="#ffb45f"
              stroke-width="3"/>
          </svg>

          <span class="wave-play-hint">Tap to listen</span>

        </button>


        <!-- SAWTOOTH -->
        <button class="wave-type"
          type="button"
          data-wave="sawtooth">

          <span class="wave-type-name">Sawtooth Wave</span>

          <svg viewBox="0 0 200 90">
            <path d="M5 65 L50 15 L50 65 L95 15 L95 65 L140 15 L140 65 L185 15"
              fill="none"
              stroke="#ffb45f"
              stroke-width="3"/>
          </svg>

          <span class="wave-play-hint">Tap to listen</span>

        </button>

      </div>

    </article>

  `

};


/* =========================================
   4. DISPLAY SELECTED TOPIC
========================================= */

if (selectedTopic && lessons[selectedTopic]) {

  topicPage.hidden = true;
  lessonPage.hidden = false;

  lessonContent.innerHTML = lessons[selectedTopic];

  document.title =
    selectedTopic.charAt(0).toUpperCase() +
    selectedTopic.slice(1) +
    " | Behind The Sound";

} else {

  topicPage.hidden = false;
  lessonPage.hidden = true;

}


/* =========================================
   5. WAVEFORM AUDIO
========================================= */

let audioContext = null;
let currentOscillator = null;
let currentButton = null;

const SOUND_DURATION = 1.5;
const SOUND_FREQUENCY = 440;


/* =========================================
   6. STOP CURRENT AUDIO
========================================= */

function stopCurrentAudio() {

  if (currentOscillator) {

    try {
      currentOscillator.stop();
    } catch (error) {
      // Audio already stopped
    }

    currentOscillator = null;
  }

  if (currentButton) {
    currentButton.classList.remove("playing");
    currentButton = null;
  }

}


/* =========================================
   7. PLAY WAVEFORM
========================================= */

async function playWaveform(type, button) {

  stopCurrentAudio();

  if (!audioContext) {

    const AudioContextClass =
      window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) {
      alert("Your browser does not support audio playback.");
      return;
    }

    audioContext = new AudioContextClass();

  }

  if (audioContext.state === "suspended") {
    await audioContext.resume();
  }

  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.type = type;
  oscillator.frequency.value = SOUND_FREQUENCY;

  const now = audioContext.currentTime;

  gain.gain.setValueAtTime(0.0001, now);

  gain.gain.exponentialRampToValueAtTime(
    0.08,
    now + 0.04
  );

  gain.gain.setValueAtTime(
    0.08,
    now + 1.2
  );

  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    now + SOUND_DURATION
  );

  oscillator.connect(gain);
  gain.connect(audioContext.destination);

  currentOscillator = oscillator;
  currentButton = button;

  button.classList.add("playing");

  oscillator.start();
  oscillator.stop(now + SOUND_DURATION);

  oscillator.onended = () => {

    button.classList.remove("playing");

    if (currentOscillator === oscillator) {
      currentOscillator = null;
      currentButton = null;
    }

  };

}


/* =========================================
   8. WAVEFORM BUTTON EVENTS
========================================= */

document.querySelectorAll(".wave-type").forEach(button => {

  button.addEventListener("click", async () => {

    const type = button.dataset.wave;

    try {

      await playWaveform(type, button);

    } catch (error) {

      console.error("Audio playback error:", error);

    }

  });

});


/* =========================================
   9. CLEANUP
========================================= */

window.addEventListener("pagehide", () => {

  stopCurrentAudio();

  if (audioContext) {
    audioContext.close();
    audioContext = null;
  }

});


/* =========================================
   END OF JAVASCRIPT
========================================= */
