document.addEventListener("DOMContentLoaded", () => {
    loadComponent('header/index.html', 'header');
    loadComponent('footer/index.html', 'footer');
    loadPage('home');

    document.addEventListener('click', (event) => {
        if (event.target.tagName === 'A' && (event.target.getAttribute('href') === 'home' || event.target.getAttribute('href') === 'about')) {
            event.preventDefault();
            const page = event.target.getAttribute('href');
            loadPage(page);
        }
    });
});

function loadStylesheet(url) {
    const existingLink = document.querySelector(`link[href="${url}"]`);
    if (existingLink) {
        existingLink.remove();
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    link.onload = () => console.log(`Loaded stylesheet: ${url}`);
    link.onerror = () => console.error(`Error loading stylesheet: ${url}`);
    document.head.appendChild(link);
}

function loadComponent(url, elementId) {
    fetch(url)
        .then(response => response.text())
        .then(data => document.getElementById(elementId).innerHTML = data)
        .catch(error => console.error('Error loading component:', error));
}

function loadPage(page) {
    const contentDiv = document.getElementById('content');
    fetch(`content/${page}.html`)
        .then(response => response.text())
        .then(data => {
            contentDiv.innerHTML = data;
            loadStylesheet(`content/${page}.css`);
            loadScript(`content/${page}.js`);
        })
        .catch(error => console.error('Error loading page:', error));
}

function loadScript(url) {
    const existingScript = document.querySelector(`script[src="${url}"]`);
    if (existingScript) {
        existingScript.remove();
    }

    const script = document.createElement('script');
    script.src = url;
    script.onload = () => console.log(`Loaded script: ${url}`);
    script.onerror = () => console.error(`Error loading script: ${url}`);
    document.head.appendChild(script);
}