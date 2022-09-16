let logs = []

const inputEl = document.getElementById("input-el")
const saveInputBtn = document.getElementById("saveInput-btn")
const saveTabBtn = document.getElementById("saveTab-btn")
const deleteBtn = document.getElementById("delete-btn")
const ulEl = document.getElementById("ul-el")
const linkFromLocalStorage = JSON.parse(localStorage.getItem("myLinks"))


if (linkFromLocalStorage) {
    logs = linkFromLocalStorage
    render(logs)
}

saveTabBtn.addEventListener("click", function(){
    // chrome tabs api
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        logs.push(tabs[0].url)
        localStorage.setItem("myLinks", JSON.stringify(logs))
        render(logs) 
    }) 
})

function render(logs) {
    let listItems = ""
    for(let i = 0; i < logs.length; i++) {
        listItems += `<li>
                        <a href='${logs[i]}' target='_blank'>
                            ${logs[i]}
                        </a>
                      </li>`
    } 
    ulEl.innerHTML = listItems
}

saveInputBtn.addEventListener("click", function() {
    logs.push(inputEl.value)
    inputEl.value = "" 
    localStorage.setItem("myLinks", JSON.stringify(logs))
    render(logs)
})
 
deleteBtn.addEventListener("dblclick", function(){
    logs = []
    localStorage.clear()
    render(logs)
})




