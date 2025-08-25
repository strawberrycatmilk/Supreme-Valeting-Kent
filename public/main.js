// when the window is opened, it calls the backend. 
window.onload = async () => {
    try {
        //  this calls the backend server, to get the reviews.
        const response = await fetch('http://127.0.0.1:3000/api/reviews');
        const reviews = await response.json();

        // output all the reviews onto the console.
        console.log(reviews);
        
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
                review += reviews[i][j]
            }
            reviewText.innerText = review
            reviewHolder.append(reviewText)
        }
    } catch (error) {
        console.error('Failed to load reviews:', error);
    }
  };
  
