async function getLatestGithubVersion() {
    const release = await fetch('https://api.github.com/repos/CacahueteSansSel/mcLaunch/releases/latest')
    if (!release.ok) return "unknown"

    const json = await release.json()

    return json
}

function applyPlatformIcons() {
    let logos = document.getElementsByClassName('logo')

    for (let i = 0; i < logos.length; i++) {
        if (platform.os.family.toLowerCase().includes('os x')) {
            logos[i].src = 'res/icon/apple_logo.svg';
        }
    }
}

function onload() {
    applyPlatformIcons()

    getLatestGithubVersion().then(r => {
        let prefix = r.name.startsWith('v0.') || r.name.startsWith('0.') ? 'beta' : 'release';
        let versionName = `${prefix} ${r.name}`

        document.getElementById('version-text').innerText = versionName
        document.getElementById('version-text-bottom').innerText = versionName

        document.getElementsByName('btn-download').forEach((downloadButton) => {
            downloadButton.onclick = function () {
                if (platform.os.family === "Windows") {
                    document.location = "https://github.com/CacahueteSansSel/mcLaunch/releases/download/v0.2.4/mcLaunch-Installer-win-x64.exe"
                    return
                }

                document.location = r.html_url
            }
        })
    }).catch(reason => {
        document.getElementById('version-text').innerText = "beta"
        document.getElementById('version-text-bottom').innerText = "beta"
    })
}

function onscroll() {
    let header = document.getElementById('header')

    if (window.scrollY) header.classList.add('header-opaque')
    else header.classList.remove('header-opaque')
}

function openGithub() {
    document.location = "https://github.com/CacahueteSansSel/mcLaunch"
}

window.addEventListener('load', onload)
window.addEventListener('scroll', onscroll)