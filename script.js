document.addEventListener('DOMContentLoaded', function () {
    const showLoginBtn = document.getElementById('showLogin');
    const hideLoginBtn = document.getElementById('hideLogin');
    const loginForm = document.getElementById('login');
    const signupForm = document.getElementById('signup');
    const spanToggle = document.querySelector(".span-toggle");
    let main = document.querySelector(".main");

    // Toggle forms
    showLoginBtn.addEventListener("click", function () {
        loginForm.style.display = 'flex';
        signupForm.style.display = 'none';
        spanToggle.classList.add("span-left");
        spanToggle.classList.remove("span-right");
        showToast("Switched to Login Form");
        if (window.innerWidth <= 500) {
       main.style.marginTop = '-26vh';
        }
    });

    hideLoginBtn.addEventListener("click", function () {
        loginForm.style.display = 'none';
        signupForm.style.display = 'flex';
        spanToggle.classList.remove("span-left");
        spanToggle.classList.add("span-right");
        showToast("Switched to Signup Form");
        if (window.innerWidth <= 500) {
       main.style.marginTop = '-16vh';
  }
    });

    

    // Signup functionality
    document.getElementById('signupBtn').addEventListener('click', function () {
        const username = document.getElementById('signupUsername').value.trim();
        const email = document.getElementById('signupEmail').value.trim();
        const password = document.getElementById('signupPassword').value;
        
        if (!username) {
            showToast("Username cannot be empty!");
            return;
        }

        if (username.length < 4) {
            showToast("Username must be at least 4 characters!");
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email) {
            showToast("Email cannot be empty!");
            return;
        }

        if (!emailRegex.test(email)) {
            showToast("Please enter a valid email!");
            return;
        }

        if (!password) {
            showToast("Password cannot be empty!");
            return;
        }

        if (password.length < 6) {
            showToast("Password must be at least 6 characters!");
            return;
        }

        let users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.find(u => u.email === email || u.username === username)) {
            showToast("An account with this email or username already exists");
            return;
        }

        users.push({ username, email, password });
        localStorage.setItem('users', JSON.stringify(users));

        showToast("Signup successful! Redirecting to login...");

        // Clear form
        document.getElementById('signupUsername').value = '';
        document.getElementById('signupEmail').value = '';
        document.getElementById('signupPassword').value = '';

        // Redirect to login after 1.5s
        setTimeout(() => {
            loginForm.style.display = 'flex';
            signupForm.style.display = 'none';
            spanToggle.classList.add("span-left");
            spanToggle.classList.remove("span-right");
        }, 1000);
    });

    // Login functionality
    document.getElementById('loginBtn').addEventListener('click', function () {
        const username = document.getElementById('loginUsername').value.trim();
        const password = document.getElementById('loginPassword').value;

        if (!username) {
            showToast("Please enter your username");
            return;
        }

        if (!password) {
            showToast("Please enter your password");
            return;
        }

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            showToast("Login successful! Welcome " + username);
            document.getElementById('loginUsername').value = '';
            document.getElementById('loginPassword').value = '';
        } else {
            showToast("Invalid username or password");
        }
    });
});

// Toggle password visibility
function togglePassword(inputId, eyeBtn) {
    const input = document.getElementById(inputId);
    if (input.type === 'password') {
        input.type = 'text';
        eyeBtn.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
    } else {
        input.type = 'password';
        eyeBtn.innerHTML = '<i class="fa-solid fa-eye"></i>';
    }
}

// Toast function
function showToast(message) {
    const toast = document.querySelector(".toastMsg");
    const msg = toast.querySelector(".msg");
    if (!toast || !msg) return;

    msg.innerText = message;

    const oldTimer = toast.querySelector(".toast-timer");
    if (oldTimer) oldTimer.remove();

    const timer = document.createElement("span");
    timer.classList.add("toast-timer");
    toast.appendChild(timer);

    toast.classList.remove("show");
    void toast.offsetWidth; // trigger reflow
    toast.classList.add("show");

    timer.addEventListener("animationend", () => {
        toast.classList.remove("show");
        msg.innerText = "";
        timer.remove();
    });
}
