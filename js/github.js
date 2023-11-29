async function getLatestGithubVersion() {
    const release = await fetch('https://api.github.com/repos/CacahueteSansSel/mcLaunch/releases/latest')
    if (!release.ok) return "unknown"

    const json = await release.json()

    return json
}

function applyPlatformIcons() {
    let logos = document.getElementsByClassName('logo')

    for (let i = 0; i < logos.length; i++) {
        if (platform.os.family.toLowerCase().includes('windows')) {
            logos[i].src = 'res/icon/windows_logo.svg';
        } else if (platform.os.family.toLowerCase().includes('mac')) {
            logos[i].src = 'res/icon/apple_logo.svg';
        } else {
            logos[i].src = undefined;
        }
    }
}

function onload() {
    getLatestGithubVersion().then(r => {
        let prefix = r.name.startsWith('v0.') || r.name.startsWith('0.') ? 'beta' : 'release';
        let versionName = `${prefix} ${r.name}`

        document.getElementById('version-text').innerText = versionName
        document.getElementById('version-text-bottom').innerText = versionName

        document.getElementsByName('btn-download').forEach((downloadButton) => {
            downloadButton.onclick = function () {
                if (platform.os.family === "Windows") {
                    document.location = "https://github.com/CacahueteSansSel/mcLaunch/releases/download/v0.1.1/mcLaunch.Installer.win64.exe"
                    return
                }

                document.location = r.html_url
            }
        })
    })
}

window.addEventListener('load', onload)