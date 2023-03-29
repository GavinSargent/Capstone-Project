const viewQuotesForm = document.getElementById('view-quotes-btn')
const quotesDiv = document.getElementById('my-quotes')
const quotePhone = document.getElementById('view-quotes-phone')



function getQuotes(event){
    event.preventDefault()

    console.log("THIS IS THE QUOTE PHONE", quotePhone)
    axios.get(`http://localhost:6500/quotes/${quotePhone}`)
    .then(res => { console.log(res.data)})
       /* for (let i = 0; i < res.data.length; i++) {
            const { quote_id, phone, date, time, service } = res.data
            const quoteElem = 
            `<div id="quote-${quote_id}">
                <p class="quote-phone">Phone: ${phone}</p>
                <p class="quote-date">Date: ${date}</p>
                <p class="quote-time">Time: ${time}</p>
                <p class="quote-service">Service: ${service}</p>
            </div>`

            quotesDiv.innerHTML += quoteElem    
        }       
    })*/.catch((err)=> console.log("something bad happened with the backend", err))
}




viewQuotesForm.addEventListener("submit", getQuotes)