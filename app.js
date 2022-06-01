var navBar = `    
<nav>
<div id="nav-wrapper">
<button class="icon" onclick="menuBar()">=</button>
<button onclick="darkMode()">☾</button>
<a href="index.html">Winston Purnomo</a>
<a href="about.html">About</a>
<a href="contact.html">Contact</a>
</div>
</nav>`;

/** Set the dark mode to on, and save a cookie to remember preferences across pages. */
function darkMode() {
    var element = document.body;
    element.classList.toggle("toggle-mode");
    const cookieValue = document.cookie.split('; ').find(row => row.startsWith('darkMode=')).split('=')[1];
    if (cookieValue === 'false') {
        document.cookie = 'darkMode=true;path="/"';
    } else {
        document.cookie = 'darkMode=false;path="/"';
    }
}

/** Check if dark mode is toggled on, and restore setting if enabled. */
function restoreDarkMode() {
    document.getElementById('nav').insertAdjacentHTML('afterbegin', navBar);
    var element = document.body;
    const cookieValue = document.cookie.split('; ').find(row => row.startsWith('darkMode=')).split('=')[1];
    if (cookieValue === 'true') {
        element.classList.toggle("toggle-mode");
    }
}

function menuBar() {
    var x = document.querySelector('nav');
    if (x.className === 'nav') {
      x.className += " responsive";
    } else {
      x.className = 'nav';
    }
}