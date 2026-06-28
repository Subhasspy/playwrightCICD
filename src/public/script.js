// Client-side JavaScript for Playwright Test Website

// Counter functionality
let count = 0;
const countElement = document.getElementById('count');
const incrementBtn = document.getElementById('increment');
const decrementBtn = document.getElementById('decrement');

if (incrementBtn && decrementBtn) {
  incrementBtn.addEventListener('click', () => {
    count++;
    countElement.textContent = count;
  });

  decrementBtn.addEventListener('click', () => {
    count--;
    countElement.textContent = count;
  });
}

// Login form handling
const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('login-message');

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        loginMessage.textContent = data.message;
        loginMessage.style.color = 'green';
        // Redirect to dashboard after successful login
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1000);
      } else {
        loginMessage.textContent = data.message;
        loginMessage.style.color = 'red';
      }
    } catch (error) {
      loginMessage.textContent = 'An error occurred. Please try again.';
      loginMessage.style.color = 'red';
    }
  });
}

// Contact form handling
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('form-message');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        formMessage.textContent = data.message;
        formMessage.style.color = 'green';
        contactForm.reset();
      } else {
        formMessage.textContent = 'Failed to send message.';
        formMessage.style.color = 'red';
      }
    } catch (error) {
      formMessage.textContent = 'An error occurred. Please try again.';
      formMessage.style.color = 'red';
    }
  });
}

// File upload handling
const uploadButton = document.getElementById('uploadButton');
const fileInput = document.getElementById('fileInput');
const uploadStatus = document.getElementById('upload-status');

if (uploadButton) {
  uploadButton.addEventListener('click', () => {
    const file = fileInput.files[0];
    if (file) {
      uploadStatus.textContent = `Uploading ${file.name}...`;
      // Simulate upload
      setTimeout(() => {
        uploadStatus.textContent = 'File uploaded successfully!';
        uploadStatus.style.color = 'green';
      }, 2000);
    } else {
      uploadStatus.textContent = 'Please select a file first.';
      uploadStatus.style.color = 'red';
    }
  });
}

// Dashboard functionality
const refreshBtn = document.getElementById('refresh-data');
const toggleThemeBtn = document.getElementById('toggle-theme');
const notification = document.getElementById('notification');
const userCountElement = document.getElementById('user-count');

if (refreshBtn) {
  refreshBtn.addEventListener('click', async () => {
    try {
      const response = await fetch('/api/users');
      const users = await response.json();
      userCountElement.textContent = users.length;
      notification.classList.remove('hidden');
      setTimeout(() => {
        notification.classList.add('hidden');
      }, 3000);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  });
}

if (toggleThemeBtn) {
  toggleThemeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
  });
}

// API Demo functionality
const fetchUsersBtn = document.getElementById('fetch-users');
const usersList = document.getElementById('users-list');
const simulateErrorBtn = document.getElementById('simulate-error');
const errorMessage = document.getElementById('error-message');
const startUpdatesBtn = document.getElementById('start-updates');
const stopUpdatesBtn = document.getElementById('stop-updates');
const liveData = document.getElementById('live-data');

let updateInterval;

if (fetchUsersBtn) {
  fetchUsersBtn.addEventListener('click', async () => {
    usersList.textContent = 'Loading...';
    try {
      const response = await fetch('/api/users');
      const users = await response.json();
      usersList.innerHTML = users.map(user =>
        `<div><strong>${user.name}</strong> - ${user.email}</div>`
      ).join('');
    } catch (error) {
      usersList.textContent = 'Error loading users.';
    }
  });
}

if (simulateErrorBtn) {
  simulateErrorBtn.addEventListener('click', () => {
    errorMessage.textContent = 'Simulated API error occurred!';
    errorMessage.style.color = 'red';
    setTimeout(() => {
      errorMessage.textContent = '';
    }, 3000);
  });
}

if (startUpdatesBtn) {
  startUpdatesBtn.addEventListener('click', () => {
    updateInterval = setInterval(() => {
      const timestamp = new Date().toLocaleTimeString();
      liveData.textContent = `Last update: ${timestamp}`;
    }, 2000);
  });
}

if (stopUpdatesBtn) {
  stopUpdatesBtn.addEventListener('click', () => {
    clearInterval(updateInterval);
    liveData.textContent = 'Updates stopped';
  });
}

// CTA button on home page
const ctaButton = document.getElementById('cta-button');
if (ctaButton) {
  ctaButton.addEventListener('click', () => {
    window.location.href = '/forms';
  });
}