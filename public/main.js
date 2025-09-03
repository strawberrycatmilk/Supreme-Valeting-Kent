// when the window is opened, it calls the backend. 
window.onload = async () => {
    if (window.location.pathname === '/index.html' || window.location.pathname === '/') {
        try {
            //  this calls the backend server, to get the reviews.
            const response = await fetch('netlify/functions/reviews.js');
            const reviews = await response.json();
    
            
            for (let i = 0; i < reviews.length; i++) {
                const reviewHolder = document.createElement("div")
                reviewHolder.className = "review"
                document.querySelector(".testimonials").append(reviewHolder)
    
                for (let j = 0; j < reviews[i][1]; j++) {
                    const stars = document.createElement("img")
                    stars.setAttribute('src', 'Site Files/star-solid-full.svg')
                    stars.setAttribute('height', '25px')
    
                    reviewHolder.append(stars)
                }
    
                const name = document.createElement("p")
                name.innerText = "\t- " + reviews[i][0]
                reviewHolder.append(name)
    
                const reviewText = document.createElement("p")
                let review = ""
                for (let j = 2; j < reviews[i].length; j++) {
                    review += "," + reviews[i][j]
                }
                reviewText.innerText = review.slice(1)
                reviewHolder.append(reviewText)
            }
        } catch (error) {
            console.error('Failed to load reviews:', error);
        }
    }
};

if (window.location.pathname === '/bookonline.html') {
    document.addEventListener("DOMContentLoaded", () => {
        document.getElementById("quoteForm").addEventListener("submit", async function(event) {
            event.preventDefault();
    
            const formData = {
                service: document.forms["quoteForm"]["service"].value,
                make: document.forms["quoteForm"]["make"].value,
                model: document.forms["quoteForm"]["model"].value,
                name:  document.forms["quoteForm"]["name"].value,
                email: document.forms["quoteForm"]["email"].value,
                phone: document.forms["quoteForm"]["phone"].value
            }
            
            if (email == "" && phone == "") {
                return false;
            }
    
            const response = fetch('/netlify/functions/sendemail.js', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })
            
            document.getElementById("result").style.height = 'fit-content'
            document.getElementById("result").style.width = '80vw'
            document.getElementById("result").style.visibility = 'visible'
        })
    })
}
