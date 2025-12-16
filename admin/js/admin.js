const API_URL = 'http://localhost:5000/api';

// DOM Elements
const loginForm = document.getElementById('login-form');
const projectForm = document.getElementById('project-form');
const projectsList = document.getElementById('projects-list');
const messagesList = document.getElementById('messages-list');
const logoutBtn = document.getElementById('logout-btn');

// Auth Check
const token = localStorage.getItem('token');
const currentPage = window.location.pathname.split('/').pop();

if (!token && currentPage === 'dashboard.html') {
    window.location.href = 'login.html';
}

if (token && currentPage === 'login.html') {
    window.location.href = 'dashboard.html';
}

// Login
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('token', data.token);
                window.location.href = 'dashboard.html';
            } else {
                document.getElementById('error-msg').innerText = data.msg;
            }
        } catch (err) {
            console.error(err);
        }
    });
}

// Dashboard Functions
if (currentPage === 'dashboard.html') {
    loadProjects();
    loadMessages();

    // Logout
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = 'login.html';
    });

    // Add Project
    projectForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('p-title').value;
        const description = document.getElementById('p-desc').value;
        const imageUrl = document.getElementById('p-img').value;
        const projectLink = document.getElementById('p-link').value;

        try {
            const res = await fetch(`${API_URL}/projects`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ title, description, imageUrl, projectLink })
            });

            if (res.ok) {
                alert('Project Added');
                projectForm.reset();
                loadProjects();
            }
        } catch (err) {
            console.error(err);
        }
    });
}

async function loadProjects() {
    try {
        const res = await fetch(`${API_URL}/projects`);
        const projects = await res.json();

        projectsList.innerHTML = projects.map(p => `
            <div class="project-item">
                <div>
                    <strong>${p.title}</strong><br>
                    <small>${p.description}</small>
                </div>
                <button class="delete-btn" onclick="deleteProject('${p._id}')">Delete</button>
            </div>
        `).join('');
    } catch (err) {
        console.error(err);
    }
}

async function deleteProject(id) {
    if (!confirm('Are you sure?')) return;
    try {
        await fetch(`${API_URL}/projects/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        loadProjects();
    } catch (err) {
        console.error(err);
    }
}

async function loadMessages() {
    try {
        const res = await fetch(`${API_URL}/messages`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const messages = await res.json();

        messagesList.innerHTML = messages.map(m => `
            <div class="message-item">
                <div>
                    <strong>${m.name}</strong> (${m.email})<br>
                    <p>${m.message}</p>
                    <small>${new Date(m.createdAt).toLocaleDateString()}</small>
                </div>
                <button class="delete-btn" onclick="deleteMessage('${m._id}')">Delete</button>
            </div>
        `).join('');
    } catch (err) {
        console.error(err);
    }
}

async function deleteMessage(id) {
    if (!confirm('Are you sure?')) return;
    try {
        await fetch(`${API_URL}/messages/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        loadMessages();
    } catch (err) {
        console.error(err);
    }
}

// Expose functions to window for onclick events
window.deleteProject = deleteProject;
window.deleteMessage = deleteMessage;
