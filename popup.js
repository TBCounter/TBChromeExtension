
chrome.storage.local.get().then((result) => {
    if (result.token) {
        window.location.href = "lk.html";
    }
});


const form = document.getElementById("login-form");

form.addEventListener("submit", handleFormSubmit);


async function handleFormSubmit(event) {
    event.preventDefault();
    chrome.storage.local.clear()
    const err = document.getElementById('error')
    const email = document.querySelector("[name='email']").value
    const password = document.querySelector("[name='password']").value

    await fetch('https://tbapi.omegasoft.keenetic.name/login/', {
        method: 'POST',
        body: JSON.stringify({ email, password })
    }
    ).then(response => {
        if (response.status == 200) {

            return response.json()
        }
        else {
            err.innerHTML = 'Что-то пошло не так '
        }
    }
    ).then(data => {
        if (data) {

            chrome.storage.local.set(data).then(() => {
                err.innerHTML = 'все ок'
            });
        }
        else {
            err.innerHTML = 'Что-то пошло не так '
        }
    }).catch(
        (error) => {

            err.innerHTML = error
        }
    )
    window.location.href = "lk.html";
}
