export const newBlog = (buttonId, dialogId, formId, listId, closeId) => {
    if (!('blogCount' in localStorage)) {
        localStorage.setItem('blogCount', 0)
    }
    let button = document.getElementById(buttonId)
    let dia = document.getElementById(dialogId)
    button.addEventListener('click', (event) => {
        dia.showModal()
    })
    let form = document.getElementById(formId)
    form.addEventListener('submit', (event) => {
        addToLocalStorage(form.postTitle.value, form.postDate.value, form.postSummary.value)
        showLocalStorage(listId)
        form.postTitle.value = ""
        form.postDate.value = ""
        form.postSummary.value = ""
    })
    document.getElementById(closeId).addEventListener('click', (event) => {
        form.postTitle.value = ""
        form.postDate.value = ""
        form.postSummary.value = ""
        dia.close()
    })
}

export const addToLocalStorage = (title, date, summary) => {
    localStorage.setItem('blogCount', parseInt(localStorage.getItem('blogCount')) + 1)
    localStorage.setItem(`blog_${localStorage.getItem('blogCount')}`, `{"title": "${title}", "date": "${date}", "summary": "${summary}"}`)
}

export const deleteById = (blogId) => {
    localStorage.removeItem(`blog_${blogId}`)
}

export const showLocalStorage = (listId) => {
    let lst = document.getElementById(listId)
    while (lst.firstChild) {
        lst.removeChild(lst.firstChild)
    }
    for (let i = 0; i <= localStorage['blogCount']; i++) {
        let key = `blog_${i}`
        if (key in localStorage) {
            let currLi = document.createElement('li')
            currLi.innerHTML = localStorage.getItem(key)
            let del = document.createElement('button')
            del.innerHTML = 'delete'
            let edit = document.createElement('button')
            edit.innerHTML = 'edit'
            currLi.appendChild(del)
            currLi.appendChild(edit)
            lst.appendChild(currLi)

            del.addEventListener('click', (event) => {
                let dia = document.getElementById('confirm-dialog')
                dia.showModal()
                document.getElementById('yes-button').addEventListener('click', (event) => {
                    localStorage.removeItem(`blog_${key.substring(5, key.length)}`)
                    showLocalStorage(listId)
                })
            })
            edit.addEventListener('click', (event) => {
                editStorage(key.substring(5, key.length))
                showLocalStorage(listId)
            })
        }
    }
}

export const editStorage = (postId) => {
    let orgMessage = JSON.parse(localStorage.getItem(`blog_${postId}`))
    let editDialog = document.createElement('dialog')
    let editForm = document.createElement('form')
    editForm.innerHTML = 
        `<label>Post Title: <input name="postTitle" type="text" value="${orgMessage.title}" required></label>
        <br>
        <label>Post Date: <input name="postDate" type="date" value="${orgMessage.date}" required></label>
        <br>
        <label>Post Summary: <textarea name="postSummary" required>${orgMessage.summary}</textarea></label>
        <br>
        <input type="submit">`
    editDialog.appendChild(editForm)
    document.querySelector('body').appendChild(editDialog)
    editDialog.showModal()
    editForm.addEventListener('submit', (event) => {
       localStorage.setItem(`blog_${postId}`, `{"title": "${editForm.postTitle.value}", "date": "${editForm.postDate.value}", "summary": "${editForm.postSummary.value}"}`)
    })
}