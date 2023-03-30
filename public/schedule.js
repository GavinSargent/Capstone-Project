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
let cityInput = document.getElementById("service-type")
let stateInput = document.getElementById("city")
let serviceInput = document.getElementById("state")
let notesInput = document.getElementById("notes")
// let scheduleForm = document.getElementById()



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
                individualQuote.setAttribute("id", quoteObj.quoteId)

                let quotePhone = document.createElement('p')
                let quoteDate = document.createElement('p')
                let quoteTime = document.createElement('p')
                let quoteService = document.createElement('p')

                quotePhone.innerHTML = "Phone: " + quoteObj.phone
                quoteDate.innerHTML = "Date: " + quoteObj.date
                quoteTime.innerHTML = "Time: " + quoteObj.time
                quoteService.innerHTML = "Service: " + quoteObj.service

                quotesDiv.appendChild(individualQuote)
                individualQuote.appendChild(quotePhone)
                individualQuote.appendChild(quoteDate)
                individualQuote.appendChild(quoteTime)
                individualQuote.appendChild(quoteService)
            }                   
    }).catch((err)=> console.log(`something bad happened with the backend`, err))
})

scheduleForm.addEventListener("submit", (event) => {
    event.preventDefault()

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
    
    axios.post('http://localhost:6500/schedule', quoteBod)
    .then(res => console.log("Quote succesfully submitted"))
    .catch(err => console.log("something went wrong with the post", err))
})