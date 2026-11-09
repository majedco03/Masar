// login scripts

// form validation
function validateForm() {
    const username = document.querySelector(".username").value;
    const password = document.querySelector(".password").value;
    var errorMessages = document.querySelectorAll(".error");
    errorMessages.forEach((error) => {
        error.remove();
    });

    if (username === "") {
        // instead of alertt, we will show a red message under the field.
        // get the field elemnt and add a red message under it.
        var usernameField = document.querySelector(".username");
        let p = document.createElement("p");
        p.classList.add("error");
        p.innerText = "الرجاء إدخال إسم المستخدم";
        p.style.color = "red";
        p.style.fontSize = "1rem";
        p.style.marginTop = "0.5rem";
        usernameField.insertAdjacentElement("afterend", p);
        return false;
    }

    if (password === "") {
        var passwordField = document.querySelector(".password");
        let p = document.createElement("p");
        p.classList.add("error");
        p.innerText = "الرجاء إدخال كلمة المرور";
        p.style.color = "red";
        p.style.fontSize = "1rem";
        p.style.marginTop = "0.5rem";
        passwordField.insertAdjacentElement("afterend", p);
        return false;
    }

    return true;
}

async function login() {
    const username = document.querySelector(".username").value;
    const password = document.querySelector(".password").value;

    const response = await fetch("/backend/login.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
        // redirect to home page
        window.location.href = "/frontend/index.html";
    }
    else {
        // show error message
        alert(data.message);
    }

}

// add event listener to the form submit event
var submitButton = document.querySelector("#login_btn");
submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    if (validateForm()) {
        login();
        return true;
    }
});


async function register() {
    var username = document.querySelector(".username").value;
    var password = document.querySelector(".password").value;
    var confirmPassword = document.querySelector(".confirm_password").value;

    if (password !== confirmPassword) {
        alert("كلمة المرور وتأكيد كلمة المرور غير متطابقين");
        return false;
    }

    var response = await fetch("/backend/register.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });

    var data = await response.json();

    if (response.ok) {
        window.location.href = "/frontend/index.html";
    }
    else {
        // show error message
        alert(data.message);
    }
}

// when the register button clicker, manuplate the form to show the register form, make the submit button to say "Register" and change the form action to /register
function showRegisterForm() {
    var form = document.querySelector("#login_form");
    form.innerHTML = `
        <label for="user_name" class="field_label">إسم المستخدم</label><br>
        <input name="user_name" type="text" placeholder="ادخل اسم المستخدم" class="field username"><br><br>
        <label for="password" class="field_label">كلمة المرور</label><br>
        <input type="password" name="password" placeholder="كلمة المرور" class="field password"><br><br>
        <label for="confirm_password" class="field_label">تأكيد كلمة المرور</label><br>
        <input type="password" name="confirm_password" placeholder="تأكيد كلمة المرور" class="field confirm_password"><br><br>
        <input type="submit" value="إنشاء حساب جديد" class="btn" id="register_btn">
        <input type="button" value="العودة لتسجيل الدخول" class="btn" id="back_btn">
    `;
    // change the submit button event listener to register
    var registerButton = document.querySelector("#register_btn");
    registerButton.addEventListener("click", function (event) {
        event.preventDefault();
        if (validateForm()) {
            register();
            return true;
        }
    });
    // add event listener to the return button to show the login form
var backButton = document.querySelector("#back_btn");
backButton.addEventListener("click", function (event) {
    event.preventDefault();
    location.reload();
});
}


// add event listener to the register button
var registerButton = document.querySelector("#register_btn");
registerButton.addEventListener("click", function (event) {
    event.preventDefault();
    showRegisterForm();
});