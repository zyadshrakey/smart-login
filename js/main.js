var signInEmailInp = document.getElementById("signInEmailInp");
var signInPasswordInp = document.getElementById("signInPasswordInp");
var signUpNameInp = document.getElementById("signUpNameInp");
var userNameAlert = document.getElementById("userNameAlert");
var signUpEmailInp = document.getElementById("signUpEmailInp");
var userEmailAlert = document.getElementById("userEmailAlert");
var signUpPasswordInp = document.getElementById("signUpPasswordInp");
var userPasswordAlert = document.getElementById("userPasswordAlert");
var fillMsg = document.getElementById("fillMsg");
var wrongMsg = document.getElementById("wrongMsg");
var confirmMsg = document.getElementById("confirmMsg");
var accountExistMsg = document.getElementById("accountExistMsg");
var tryAgainMsg = document.getElementById("tryAgainMsg");
var loginBtn = document.getElementById("loginBtn");
var userName = document.getElementById("userName");
var usersName = localStorage.getItem("usersSession");
var usersData = [];

if (localStorage.getItem("allData") != null) {
  usersData = JSON.parse(localStorage.getItem("allData"));
} else {
  usersData = [];
}

signUpEmailInp.onkeyup = function () {
  var userEmailRejex = /^[\w-\.]+@([\w-]+\.)+[\w-]{3,}$/;
  if (
    userEmailRejex.test(signUpEmailInp.value) == true &&
    signUpEmailInp.value != ""
  ) {
    signUpEmailInp.classList.add("is-valid");
    signUpEmailInp.classList.remove("is-invalid");
    userEmailAlert.classList.add("d-none");
    return true;
  } else {
    signUpEmailInp.classList.add("is-invalid");
    signUpEmailInp.classList.remove("is-valid");
    userEmailAlert.classList.remove("d-none");
    return false;
  }
};

function userInpValidation() {
  signUpEmailInp.onkeyup();
  if (signUpEmailInp.onkeyup() == true) {
    return true;
  } else {
    return false;
  }
}

function isEmailExist() {
  for (var i = 0; i < usersData.length; i++) {
    if (
      usersData[i].email.toLowerCase() == signUpEmailInp.value.toLowerCase()
    ) {
      signUpEmailInp.classList.remove("is-valid");
      signUpEmailInp.classList.add("is-invalid");
      accountExistMsg.classList.remove("d-none");
      return true;
    }
  }
  return false;
}

function signUp() {
  userInpValidation();
  isEmailExist();
  if (userInpValidation() == true && isEmailExist() == false) {
    var user = {
      name: signUpNameInp.value,
      email: signUpEmailInp.value,
      password: signUpPasswordInp.value,
    };
    usersData.push(user);
    localStorage.setItem("allData", JSON.stringify(usersData));
    confirmMsg.classList.remove("d-none");
    tryAgainMsg.classList.add("d-none");
  } else {
    tryAgainMsg.classList.remove("d-none");
  }
}

function signIn() {
  if (signInEmailInp == "" && signInPasswordInp == "") {
    fillMsg.classList.remove("d-none");
    return false;
  }
  for (var i = 0; i < usersData.length; i++) {
    if (
      usersData[i].email.toLowerCase() == signInEmailInp.value.toLowerCase() &&
      usersData[i].password.toLowerCase() ==
        signInPasswordInp.value.toLowerCase()
    ) {
      localStorage.setItem("usersSession", usersData[i].name);
      loginBtn.setAttribute("href", "welcome.html");
      location.replace("welcome.html");
      displayWelcomeUser();
    } else {
      wrongMsg.classList.remove("d-none");
    }
  }
}

function displayWelcomeUser() {
  userName.innerHTML = "Welcome" + " " + usersName;
}
function logout() {
  localStorage.removeItem("usersSession");
}
