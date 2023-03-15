import './DOMPurify-main/dist/purify.min.js'

export const triggerAlert = () => {
    let dia = document.getElementById('alert-dialog')
    dia.showModal()
}

export const triggerConfirm = () => {
    let outputInfo = document.getElementById('output-1')
    let dia = document.getElementById('confirm-dialog')
    dia.showModal()
    document.getElementById('yes-button').addEventListener('click', (event) => {
        outputInfo.innerHTML = `The value returned by the confirm method is : true`
    })

    document.getElementById('no-button').addEventListener('click', (event) => {
        outputInfo.innerHTML = `The value returned by the confirm method is : false`
    })
}

export const triggerPrompt = () => {
    let outputInfo = document.getElementById('output-1')
    let dia = document.getElementById('prompt-dialog')
    dia.showModal()
    document.getElementById('submit-button').addEventListener('click', (event) => {
        let userInput = document.getElementById('prompt-input').value
        userInput = DOMPurify.sanitize(userInput)
        if (userInput) {
            outputInfo.innerHTML = `The value entered by the user is : ${userInput}`
        }
        else {
            outputInfo.innerHTML = "User didn't enter anything"
        }
    })
}