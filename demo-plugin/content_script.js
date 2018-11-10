const gmailConfig = {
    mailWindowSelector: `.GP`,
};

const siteConfig = getSiteConfig();

if (siteConfig) {
    pollForMailWindows(siteConfig);
}

function getSiteConfig() {
    switch (window.location.hostname) {
        case `mail.google.com`:
            return gmailConfig;
        default:
            return null;
    }
}

function pollForMailWindows() {
    setInterval(() => {
        const mailWindows = document.querySelectorAll(siteConfig.mailWindowSelector);
        mailWindows.forEach((mailWindow) => {
            if (mailWindow.isFound) {
                return;
            }
            mailWindow.isFound = true;
            appendClippy(mailWindow);
        });
    }, 250);
}

function appendClippy(mailWindow) {
    const clippyImg = document.createElement(`img`);
    clippyImg.src = `chrome-extension://${chrome.runtime.id}/assets/clippy.gif`;
    clippyImg.style.cssText = `position: absolute; bottom: 0; right: 0;`;

    const clippySize = 120;

    clippyImg.width = clippySize;
    clippyImg.height = clippySize;

    mailWindow.appendChild(clippyImg);
}
