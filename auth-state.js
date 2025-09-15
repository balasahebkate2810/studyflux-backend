import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const auth = getAuth();

// Show or hide the logout button with a fallback delay if the element is not yet in DOM
function setLogoutVisibility(show) {
  let logoutBtn = document.getElementById('logout-btn');

  if (!logoutBtn) {
    // Retry finding the logout button after a short delay to handle late DOM loading
    setTimeout(() => {
      logoutBtn = document.getElementById('logout-btn');
      if (logoutBtn) {
        logoutBtn.style.display = show ? 'inline-block' : 'none';
      }
    }, 300);
  } else {
    logoutBtn.style.display = show ? 'inline-block' : 'none';
  }
}

// Listen to the auth state changes to handle user session and redirection
onAuthStateChanged(auth, (user) => {
  const path = window.location.pathname;
  const isAuthPage = path.includes('login.html') || path.includes('signup.html');

  if (user) {
    // User is signed in
    if (isAuthPage) {
      // Redirect signed-in user away from login/signup pages to main page
      window.location.href = "index.html";
    }
    setLogoutVisibility(!isAuthPage);
  } else {
    // User is signed out
    if (!isAuthPage) {
      // Redirect unauthenticated user to login page
      window.location.href = "login.html";
    }
    setLogoutVisibility(false);
  }
});

// Export auth for use in other modules of the app
export { auth };
