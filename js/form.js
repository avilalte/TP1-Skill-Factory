//Variable declaration

const submitBtn = document.querySelector(".submit");
const previewCard = document.querySelector(".preview");
const previewBtn = document.querySelector(".preview-btn");
const form = document.querySelector("form");
const msgArea = document.querySelector("#msg");
const username = document.querySelector("#username");
const usernameInfo = document.querySelector(".name-info");
const email = document.querySelector("#email");
const emailInfo = document.querySelector(".email-info");
const msg = document.querySelector("#msg");
const msgInfo = document.querySelector(".msg-info");
const errorMsg = document.querySelector(".error-msg");
const messages = [];
const validationStatus = {
  username: false,
  email: false,
};
const regEx = {
  name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letters plus accent marks.
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // follows correct e-mail format.
};

const addMsg = () => {
  const msgPreview = {};
  msgPreview.name = username.value;
  msgPreview.email = email.value;
  msgPreview.msg = msg.value;
  previewCard.innerHTML = `<p>Thank you! This is your message: </p>
  <div class='preview-msg'><p><b>Username:</b> ${msgPreview.name}</p>
    <p><b>E-mail:</b> ${msgPreview.email}</p>
    <p><b>Message:</b><br></p><p id='msg-preview-box'> ${msgPreview.msg}</p></div>
    <p>Click Submit to finish</p><p onclick='exitPreview()' id='exit-preview'>X</p>`;
  return msgPreview;
};

// Form Validation:

const formValidation = (e) => {
  if (e.target.id == "username") {
    if (regEx.name.test(username.value)) {
      usernameInfo.classList.remove("show-info");
      validationStatus.username = true;
    } else {
      usernameInfo.innerHTML = `Incorrect name. Only letters allowed.`;
      usernameInfo.classList.add("show-info");
      validationStatus.username = false;
    }
  }
  if (e.target.id == "email") {
    if (regEx.email.test(email.value)) {
      emailInfo.classList.remove("show-info");
      validationStatus.email = true;
    } else {
      emailInfo.innerHTML = `Please insert a valid e-mail.`;
      emailInfo.classList.add("show-info");
      validationStatus.email = false;
    }
  }
  if (e.target.id == "msg") {
    if (msgArea.value.length == 1500) {
      msgInfo.innerHTML = `You've reached the maximum amount of characters available.`;
      msgInfo.classList.add("show-info");
    } else msgInfo.classList.remove("show-info");
  }
  if (username.value == "") usernameInfo.classList.remove("show-info");
  if (email.value == "") emailInfo.classList.remove("show-info");
};

// Exit buttons

const exitPreview = () => {
  previewCard.classList.remove("preview-show");
};

const exitError = () => {
  errorMsg.classList.remove("error-show");
};

// ------------------------

//Event Listeners.

[username, email, msg].forEach((input) => {
  input.addEventListener("keyup", formValidation);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validationStatus.username && validationStatus.email) {
    if (previewCard) {
      previewCard.classList.remove("preview-show");
    }
    messages.push(addMsg());
    console.log(
      `%c You submitted the following data: `,
      "background-color: #006594; color: white; padding: 0 .5rem"
    );
    console.log(
      `%c Name: ${messages[messages.length - 1].name}`,
      "background-color: #006594; color: white"
    );
    console.log(
      `%c E-mail: ${messages[messages.length - 1].email}`,
      "background-color: #006594; color: white"
    );
    console.log(
      `%c Message: ${messages[messages.length - 1].msg}`,
      "background-color: #006594; color: white; padding: 0 .5rem"
    );
  } else {
    errorMsg.classList.add("error-show");
    e.preventDefault();
    return false;
  }
});

previewBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (validationStatus.username && validationStatus.email) {
    if (previewCard.classList.contains("preview-show"))
      previewCard.classList.remove("preview-show");
    addMsg();
    previewCard.classList.add("preview-show");
  } else {
    previewCard.classList.remove("preview-show");
    errorMsg.classList.add("error-show");
  }
});
