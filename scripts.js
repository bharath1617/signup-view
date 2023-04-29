let details = [];

document.getElementById("signlink").addEventListener('click', (event) => {
  document.getElementById("signup").style.display = 'block';
  document.getElementById("profile").style.display = 'none';
});
document.getElementById("profilelink").addEventListener('click', (event) => {
    document.getElementById("profile").style.display = 'block';
    document.getElementById("signup").style.display = 'none';
  });


function addelements() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("mail").value;
  let password = document.getElementById("password").value;
  let confirmPass = document.getElementById("confirm-pass").value;

  if (name === "" || email === "" || password === "" || confirmPass === "") {
    document.getElementById("succ-err").innerHTML = "Error: All fields are mandatory";
    document.getElementById("succ-err").style.color = "red";
    return;
  } 
  else if (password !== confirmPass) {
    document.getElementById("succ-err").innerHTML = "Error: Passwords do not match";
    document.getElementById("succ-err").style.color = "red";
    return;
  }
  let accessToken = generateAccessToken();
  details = [accessToken, name, email, password ];
  console.log(details);
  localStorage.setItem("details", JSON.stringify(details));
  document.getElementById("succ-err").innerHTML = "Successfully signed up!";
  document.getElementById("succ-err").style.color = "green";
  setTimeout(() => {
    displayProfile();
  }, 1000);
  document.getElementById("name").value = "";
  document.getElementById("mail").value = "";
  document.getElementById("password").value = "";
  document.getElementById("confirm-pass").value = "";
}

function generateAccessToken() {
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < 16; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}
function displayProfile() {
  const details = JSON.parse(localStorage.getItem("details"));
  console.log(details);
  if (details && details.length > 0) {
    document.getElementById("profile-name").textContent =`${details[1]}`;
    document.getElementById("profile-email").textContent = `${details[2]}`;
    document.getElementById("profile-password").textContent = `${details[3]}`;
    document.getElementById("profile").style.display = "block";
    document.getElementById("signup").style.display = "none";
  } else {
    document.getElementById("signup").style.display = 'block';
    document.getElementById("profile").style.display = 'none';  
  }
}

function logout() {
  localStorage.removeItem("details");
  document.getElementById("signup").style.display = 'block';
  document.getElementById("profile").style.display = 'none';

  
}

if (window.location.href.includes("/profile")) {
  displayProfile();
}

