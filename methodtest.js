function getFormData() {
    let form = document.getElementById('form1')
    let formData = {}
    formData.id = form.id.value
    formData.articleName = form.article_name.value
    formData.articleText = form.article_text.value
    if (formData.id == "" || formData.articleName == "" || formData.articleText == "") {
        alert('Please fill in all fields in the form!')
        return false
    }
    formData.date = new Date()
    return formData
}

async function printResponse(response) {
    let output = document.getElementById('response')
    output.innerHTML = `HTTP/1.1 ${response.status} ${response.statusText}<br><br>`

    let headers = response.headers
    for (let key of headers.keys()){
        output.innerHTML += `${key}: ${headers.get(key)}<br>`
    }
    output.innerHTML += '<br>'

    let body = await response.text()
    output.innerHTML += body
}

export const postBtn = (buttonId) => {
    document.getElementById(buttonId).addEventListener('click', async (event) => {
        let endpoint = 'https://httpbin.org/post'
        let formData = getFormData()
        if (!formData) {
            output.innerHTML = ''
            return
        }
        let response = await fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify(formData)
        })
        printResponse(response)
    })
}

export const getBtn = (buttonId) => {
    document.getElementById(buttonId).addEventListener('click', async (event) => {
        let endpoint = 'https://httpbin.org/get?'
        let formData = getFormData()
        if (!formData) {
            output.innerHTML = ''
            return
        }
        for (let key in formData) {
            endpoint += `${key}=${formData[key]}&`
        }
        endpoint = endpoint.substring(0, endpoint.length - 1)
        let response = await fetch(endpoint, {
            method: 'GET'
        })
        printResponse(response)
    })
}

export const putBtn = (buttonId) => {
    document.getElementById(buttonId).addEventListener('click', async (event) => {
        let endpoint = 'https://httpbin.org/put'
        let formData = getFormData()
        if (!formData) {
            output.innerHTML = ''
            return
        }
        let response = await fetch(endpoint, {
            method: 'PUT',
            body: JSON.stringify(formData)
        })
        printResponse(response)
    })
}

export const delBtn = (buttonId) => {
    document.getElementById(buttonId).addEventListener('click', async (event) => {
        let endpoint = 'https://httpbin.org/delete?'
        let formData = getFormData()
        if (!formData) {
            output.innerHTML = ''
            return
        }
        for (let key in formData) {
            endpoint += `${key}=${formData[key]}&`
        }
        endpoint = endpoint.substring(0, endpoint.length - 1)
        let response = await fetch(endpoint, {
            method: 'DELETE'
        })
        printResponse(response)
    })
}