const signupEmail = document.querySelector(".signup-email");
const signupPass = document.querySelector(".signup-password");
const passConfirm = document.querySelector(".signup-confirm");
const signup = document.querySelector(".signup");
const error1 = document.querySelector(".error1");
const error2 = document.querySelector(".error2");
const error3 = document.querySelector(".error3");
const error4 = document.querySelector(".error4");

signup.addEventListener("click", (e) => {
  e.preventDefault();

  const emailValue = signupEmail.value.trim();
  const signupPassValue = signupPass.value.trim();
  const passConfirmValue = passConfirm.value.trim();

  if (emailValue === "") {
    error1.classList.remove("hidden");
  } else if (!emailValue.includes("@")) {
    error2.classList.remove("hidden");
  } else {
    error1.classList.add("hidden");
    error2.classList.add("hidden");
  }

  if (signupPassValue === "") {
    error3.classList.remove("hidden");
  } else {
    error3.classList.add("hidden");
  }

  if (passConfirmValue === "") {
    error4.classList.remove("hidden");
    console.log("error");
  } else {
    error4.classList.add("hidden");
  }
});

const registerInput = document.querySelectorAll('.register-input')
registerInput.forEach((x) => {
  x.addEventListener('click', function() {
    error1.classList.add("hidden");
    error2.classList.add("hidden");
    error3.classList.add("hidden");
    error4.classList.add("hidden");
  })
})