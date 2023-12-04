const grabBtn = document.getElementById("collectBtn");
const startBtn = document.getElementById("startBtn");
const logout = document.getElementById("logout");

let token = ''
chrome.storage.local.get().then(async (result) => {
    if (!result.token) {
        window.location.href = "popup.html";

    }
    else {
        token = result.token

        await fetch("https://tbapi.omegasoft.keenetic.name/info/",
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },

            }).then(response => {
                return response.json()
            }).then(data => {
                fillAccountInfo(data)
            }).catch(err => {
                chrome.storage.local.clear()
                window.location.href = "popup.html";

            })
    }

});


logout.addEventListener("click", () => {
    chrome.storage.local.clear()
    window.location.href = "popup.html";
})

function fillAccountInfo(data) {
    const UList = document.getElementById("UList")
    UList.innerHTML = ''
    for (account of data) {

        const container = document.createElement('div')

        const accountItem = document.createElement('input')
        accountItem.type = "radio"
        accountItem.name = "account"
        accountItem.value = account.id
        accountItem.id = account.id

        const accountLabel = document.createElement('label')
        accountLabel.htmlFor = account.id
        accountLabel.innerText = JSON.stringify(account.name)

        container.append(accountItem)
        container.append(accountLabel)

        UList.append(container)
    }
    grabBtn.disabled = false
}

startBtn.addEventListener("click", async () => {
    if (cookiesData.length < 3) {
        collected.innerHTML = 'собрано не все'
    }

    const accID = document.querySelector('input[name="account"]:checked').value;
    const body = { cookies: cookiesData, url: currentTabURL, account_id: accID }
    collected.innerHTML = 'Дождитесь, когда вас выкинет из игры. Проверить статус можно <a href="http://totalbattle.omegasoft.keenetic.name/"> на сайте </a>'
    grabBtn.disabled = true
    startBtn.disabled = true
    await fetch("https://tbapi.omegasoft.keenetic.name/process_cookie/",
        {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        }).then(response => {

            if (response.status == 200) {
                return response.json()
            }
            else {
                collected.innerHTML = 'Сейчас сервер занят, повторите попытку позже или обратитесь к администратору'
                grabBtn.disabled = false
                startBtn.disabled = false
            }

        }).then(data => {

        })

})


const cookiesData = {};
let currentTabID;
let currentTabURL;
grabBtn.addEventListener("click", async () => {
    await chrome.tabs.query(
        {
            active: true,
            lastFocusedWindow: true
        },
        function (tabs) {
            currentTabID = tabs[0].id;
            currentTabURL = tabs[0].url

        }
    );

    const collected = document.getElementById('collected')

    alert(currentTabURL)

    await chrome.cookies.get({
        url: "https://totalbattle.com/",
        name: "cookieyesID",
    }, function (cookie) {
        if (!cookie) return
        cookiesData['cookieyesID'] = cookie.value
        collected.innerHTML = 'collected'
        startBtn.disabled = false

    })
    await chrome.cookies.get({
        url: "https://totalbattle.com/",
        name: "log_cookie",
    }, (cookie) => {
        if (!cookie) return
        cookiesData['log_cookie'] = cookie.value
        collected.innerHTML = 'collected'
        startBtn.disabled = false
    })
    await chrome.cookies.get({
        url: "https://totalbattle.com/",
        name: "PTBHSSID",
    }, (cookie) => {
        if (!cookie) return
        cookiesData['PTBHSSID'] = cookie.value
        collected.innerHTML = 'collected'
        startBtn.disabled = false
    })

    await chrome.cookies.get({
        url: "https://totalbattle.com/",
        name: "PTRHSSID",
    }, (cookie) => {
        if (!cookie) return
        cookiesData['PTRHSSID'] = cookie.value
        collected.innerHTML = 'collected'
        startBtn.disabled = false
    })

    await chrome.cookies.get({
        url: "https://triumph.totalbattle.com/",
        name: "cookieyesID",
    }, function (cookie) {
        if (!cookie) return
        cookiesData['cookieyesID'] = cookie.value
        collected.innerHTML = 'collected'
        startBtn.disabled = false

    })
    await chrome.cookies.get({
        url: "https://triumph.totalbattle.com/",
        name: "log_cookie",
    }, (cookie) => {
        if (!cookie) return
        cookiesData['log_cookie'] = cookie.value
        collected.innerHTML = 'collected'
        startBtn.disabled = false
    })
    await chrome.cookies.get({
        url: "https://triumph.totalbattle.com/",
        name: "PTBHSSID",
    }, (cookie) => {
        if (!cookie) return
        cookiesData['PTBHSSID'] = cookie.value
        collected.innerHTML = 'collected'
        startBtn.disabled = false
    })

    await chrome.cookies.get({
        url: "https://triumph.totalbattle.com/",
        name: "PTRHSSID",
    }, (cookie) => {
        if (!cookie) return
        cookiesData['PTRHSSID'] = cookie.value
        collected.innerHTML = 'collected'
        startBtn.disabled = false
    })


    // chrome.cookies.get({
    //     url: "https://totalbattle.com/",
    //     name: "g_state",
    // }, (cookie) => {
    //     cookiesData.push(cookie)
    //     collected.innerHTML = 'collected'
    // })


})

