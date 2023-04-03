// Get request 
let viewQuotesForm = document.getElementById('view-quotes-form')
let quotesDiv = document.getElementById('my-quotes-container')
let quotePhone = document.getElementById('view-quotes-phone')

//Post Request
let scheduleForm = document.getElementById("schedule-quote")
let firstNameInput = document.getElementById("first-name")
let lastNameInput = document.getElementById("last-name")
let phoneInput = document.getElementById("phone")
let emailInput = document.getElementById("email")
let dateInput = document.getElementById("date")
let timeInput = document.getElementById("time")
let addressInput = document.getElementById("address")
let cityInput = document.getElementById("city")
let stateInput = document.getElementById("state")
let serviceInput = document.getElementById("service-type")
let notesInput = document.getElementById("notes")
let goodPost = document.getElementById('good-post')

//Delete Request
let deleteQuotesForm = document.getElementById("delete-quotes-form")
let deleteQuotesDiv = document.getElementById("delete-my-quotes-container")
let deleteQuotesPhoneInput = document.getElementById("delete-quotes-phone")



viewQuotesForm.addEventListener('submit', (event) => {
    event.preventDefault()
    
    let actQuotePhone = quotePhone.value
    
    axios.get("http://localhost:6500/quotes/" + actQuotePhone)
    .then(res => { 
        // console.log(res.data)
            quotesDiv.innerHTML = ''
        
            if (res.data.length === 0) {
                let noQuotesMsg = document.createElement('h4')
                noQuotesMsg.innerHTML = 'There are no quotes associated with that number'
                quotesDiv.appendChild(noQuotesMsg)
                return
            }
            for (let i = 0; i < res.data.length; i++) {
                let quoteObj = {phone: res.data[i].phone,
                quoteId: res.data[i].quote_id,
                date: res.data[i].date,
                time: res.data[i].time,
                service: res.data[i].service}

                let individualQuote = document.createElement('div')
                individualQuote.classList.add('individualQuote')
                individualQuote.classList.add(quoteObj.quoteId)
                individualQuote.setAttribute("id", quoteObj.quoteId)
                
                let deleteBtn = document.createElement('button')
                deleteBtn.setAttribute("id", "delete-button " + quoteObj.quoteId)
                
                let quotePhone = document.createElement('p')
                let quoteDate = document.createElement('p')
                let quoteTime = document.createElement('p')
                let quoteService = document.createElement('p')

                deleteBtn.classList.add(quoteObj.quoteId)

                deleteBtn.innerHTML = "Cancel Quote"
                quotePhone.innerHTML = "Phone: " + quoteObj.phone
                quoteDate.innerHTML = "Date: " + quoteObj.date
                quoteTime.innerHTML = "Time: " + quoteObj.time
                quoteService.innerHTML = "Service: " + quoteObj.service

                quotesDiv.appendChild(individualQuote)
                individualQuote.appendChild(quotePhone)
                individualQuote.appendChild(quoteDate)
                individualQuote.appendChild(quoteTime)
                individualQuote.appendChild(quoteService)
                individualQuote.appendChild(deleteBtn)

                deleteBtn.addEventListener('click', (event)=>{  
                    let targetId = event.target.classList[0]

                    event.target.parentElement.remove()

                    axios.delete('http://localhost:6500/quotes/delete/' + targetId)
                    .then(makeMsg("Quote successfully deleted!"))
                    .catch(err => console.log("Something happened on the backend", err))
                })
            }                   
    }).catch((err)=> console.log(`something bad happened with the backend`, err))
})

scheduleForm.addEventListener("submit", (event) => {
    event.preventDefault()
    if(notesInput.length === 0){
        notesInput.value = "none"
    }
    let quoteBod = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        phone: phoneInput.value,
        email: emailInput.value,
        service: serviceInput.value,
        date: dateInput.value,
        time: timeInput.value,
        address: addressInput.value,
        city: cityInput.value,
        state: stateInput.value,
        notes: notesInput.value
    }

    // console.log(quoteBod)

    axios.post('http://localhost:6500/schedule', quoteBod)
    .then(makeMsg("Quote scheduled successfully!"))
    .catch(err => console.log("something went wrong with the post", err))
})


function makeMsg (msg){
    let postMsg = document.createElement('h3')

    // postMsg.setAttribute("visibility", "visible")

    postMsg.innerHTML = msg

    goodPost.appendChild(postMsg)

    // setTimeout(() => {
    //     postMsg.hide()
    // }, 5000)
}