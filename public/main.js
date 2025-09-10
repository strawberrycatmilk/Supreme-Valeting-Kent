if (window.location.pathname === '/index.html' || window.location.pathname === '/index' || window.location.pathname === '/') {
    let currentCarInterval = Math.floor(Math.random() * (22 - 1)) + 1
    const rotateInterval = 30 * 1000
    
    setInterval(() => {
        for (let imageNum = 1; imageNum < 12; imageNum++) {
            const imageContainor = document.getElementById(`image${imageNum}`)
            const image = imageContainor.querySelector("img");
    
            let image_path = `Site Files/Previous Work Images/Car${currentCarInterval}-${imageNum}.jpg`
    
            image.setAttribute('src', image_path)
        }
    
        currentCarInterval =  Math.floor(Math.random() * (22 - 1)) + 1
    }, rotateInterval)
}

if (window.location.pathname === '/bookonline' || window.location.pathname === '/bookonline.html') {
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

                        if (formData.email == "" && formData.phone == "") {
                alert("Please provide either an email or a phone number. ")
                return;
            }
    
            const response = await fetch('/.netlify/functions/sendemail', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })
            
            if (response.ok) {
                document.getElementById("result").style.height = 'fit-content'
                document.getElementById("result").style.width = '80vw'
                document.getElementById("result").style.visibility = 'visible'
            }
            else {
                data = await response.json()
                return {
                    statusCode: 500,
                    body: data
                }
            }
        })
    })
}