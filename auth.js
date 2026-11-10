// ========================================
// BEHIND THE SOUND
// AUTHENTICATION SYSTEM
// Firebase Authentication + Firestore
// ========================================

import { auth, db } from "./firebase-config.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// ========================================
// SETTINGS
// ========================================

// หลัง Login หรือ Sign Up สำเร็จ
// ให้กลับไปหน้า Landing Page ก่อน
// สามารถเปลี่ยนเป็นหน้าอื่นได้ภายหลัง

const AFTER_AUTH_URL = "home.html";


// ========================================
// ELEMENTS
// ========================================

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

const formMessage = document.getElementById("formMessage");


// ========================================
// MESSAGE FUNCTION
// ========================================

function showMessage(message, type = "error") {

  if (!formMessage) return;

  formMessage.textContent = message;

  formMessage.className = "form-message";

  if (type === "success") {
    formMessage.classList.add("success");
  }

}


// ========================================
// FIREBASE ERROR TRANSLATION
// ========================================

function getErrorMessage(error) {

  const errorCode = error.code;

  const messages = {

    "auth/invalid-email":
      "รูปแบบอีเมลไม่ถูกต้อง",

    "auth/user-not-found":
      "ไม่พบบัญชีผู้ใช้นี้",

    "auth/wrong-password":
      "รหัสผ่านไม่ถูกต้อง",

    "auth/invalid-credential":
      "อีเมลหรือรหัสผ่านไม่ถูกต้อง",

    "auth/email-already-in-use":
      "อีเมลนี้ถูกใช้งานแล้ว",

    "auth/weak-password":
      "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร",

    "auth/network-request-failed":
      "ไม่สามารถเชื่อมต่ออินเทอร์เน็ตได้",

    "auth/too-many-requests":
      "มีการลองเข้าสู่ระบบหลายครั้งเกินไป กรุณาลองใหม่ภายหลัง",

    "auth/missing-password":
      "กรุณากรอกรหัสผ่าน"

  };

  return messages[errorCode] ||
    "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง";

}


// ========================================
// SIGN UP
// ========================================

if (signupForm) {

  signupForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const fullName =
      document.getElementById("fullName").value.trim();

    const email =
      document.getElementById("email").value.trim();

    const password =
      document.getElementById("password").value;

    const confirmPassword =
      document.getElementById("confirmPassword").value;

    const submitButton =
      signupForm.querySelector("button[type='submit']");


    // Check empty name

    if (!fullName) {
      showMessage("กรุณากรอกชื่อของคุณ");
      return;
    }


    // Check password length

    if (password.length < 6) {
      showMessage("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");
      return;
    }


    // Check password confirmation

    if (password !== confirmPassword) {
      showMessage("รหัสผ่านทั้งสองช่องไม่ตรงกัน");
      return;
    }


    try {

      submitButton.disabled = true;
      submitButton.textContent = "Creating Account...";

      showMessage("กำลังสร้างบัญชี...", "success");


      // Create Firebase Authentication account

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      const user = userCredential.user;


      // Save display name to Firebase Authentication

      await updateProfile(user, {
        displayName: fullName
      });


      // Save user profile to Firestore

      await setDoc(doc(db, "users", user.uid), {

        uid: user.uid,

        displayName: fullName,

        email: email,

        createdAt: serverTimestamp()

      });


      showMessage("สมัครสมาชิกสำเร็จ กำลังเข้าสู่เว็บไซต์...", "success");


      // Redirect

      setTimeout(() => {
        window.location.href = AFTER_AUTH_URL;
      }, 1000);


    } catch (error) {

      console.error("Signup error:", error);

      showMessage(getErrorMessage(error));

      submitButton.disabled = false;
      submitButton.innerHTML =
        'Create Account <span>→</span>';

    }

  });

}



// ========================================
// LOG IN
// ========================================

if (loginForm) {

  loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email =
      document.getElementById("email").value.trim();

    const password =
      document.getElementById("password").value;

    const submitButton =
      loginForm.querySelector("button[type='submit']");


    try {

      submitButton.disabled = true;
      submitButton.textContent = "Logging In...";

      showMessage("กำลังเข้าสู่ระบบ...", "success");


      // Sign in with Firebase Authentication

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );


      showMessage("เข้าสู่ระบบสำเร็จ กำลังเข้าสู่เว็บไซต์...", "success");


      // Redirect

      setTimeout(() => {
        window.location.href = AFTER_AUTH_URL;
      }, 1000);


    } catch (error) {

      console.error("Login error:", error);

      showMessage(getErrorMessage(error));

      submitButton.disabled = false;
      submitButton.innerHTML =
        'Log In <span>→</span>';

    }

  });

}



// ========================================
// FORGOT PASSWORD
// ========================================

const forgotPasswordButton =
  document.getElementById("forgotPassword");


if (forgotPasswordButton) {

  forgotPasswordButton.addEventListener("click", async () => {

    const email =
      document.getElementById("email").value.trim();


    if (!email) {

      showMessage("กรุณากรอกอีเมลก่อนกด Forgot password");

      document.getElementById("email").focus();

      return;

    }


    try {

      await sendPasswordResetEmail(auth, email);

      showMessage(
        "ส่งลิงก์รีเซ็ตรหัสผ่านไปยังอีเมลแล้ว กรุณาตรวจสอบกล่องจดหมาย",
        "success"
      );

    } catch (error) {

      console.error("Password reset error:", error);

      showMessage(getErrorMessage(error));

    }

  });

}