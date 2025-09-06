const fs = require('fs');
const path = require('path');

async function build() {
    const response = await fetch('/.netlify/functions/reviews');
    const reviews = await response.json();
            
    const fragment = document.createDocumentFragment()

    let reviews_html = ""
    for (let i = 0; i < reviews.length; i++) {
        reviews_html.append("<div class = 'review'>")
        for (let j = 0; j < reviews[i][1]; j++) {
            reviews_html.append("<img src = 'Site Files/star-solid-full.svg' height = '25px'")
        }

        reviews_html.append(`<p> - ${reviews[i][0]} </p> <p> ${reviews[i][2].join(", ")} </p> </div>`)
    }

    let index = fs.readFileSync('public/index.html', 'utf-8')

    index.replace("<!--REVIEWS_PLACEHOLDER-->", reviews_html)

    fs.writeFileSync('public/index.html', index)
}
