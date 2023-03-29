const {SERVER_PORT} = process.env

const viewQuotesForm = document.getElementById('view-quotes-btn')
const quotesDiv = document.getElementById('my-quotes')



function getQuotes(){
    axios.get(`http://localhost:${SERVER_PORT}/quotes`)
    .then(res => {
        for (let i = 0; i < res.data.length; i++) {
            const quote = res.data[i]
            const nextQuote = res.data[i + 1] || null
            const quoteElem = 
            `<div id="quote-${quote_id}">
                <p class="quote-phone">Phone: ${phone}</p>
                <p class="quote-date">Date: ${date}</p>
                <p class="quote-time">Time: ${time}</p>
                <p class="quote-service">Service: ${service}</p>
            </div>`

            quotesDiv.innerHTML += quoteElem    
        }       
    })
}