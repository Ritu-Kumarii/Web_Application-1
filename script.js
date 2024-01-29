async function fetchData() {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    return data;
}


function renderProducts(products) {
    const container = document.getElementById('product-container');
    container.innerHTML = '';


    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.title}" style="max-width: 100%;">
            <h3>${product.title}</h3>
            <p>Price: $${product.price}</p>
            <p>Rating: ${product.rating.rate}</p>
        `;
        container.appendChild(productDiv);
    });
}


// Sort buttons event listeners
// The sort type is stored in the data-sort-type attribute of the button element
// The selected button has the class "selected" and the other buttons have the class "sort-button"
document.querySelectorAll('.sort-button').forEach(button => {
    // The event listener is added to each button
    button.addEventListener('click', (e) => {
        // all buttons are reset to the "sort-button" class
        document.querySelectorAll('.sort-button').forEach(button => {
            button.setAttribute("class", "sort-button")
        });


        // the clicked button is set to the "selected" class
        e.target?.setAttribute("class", "sort-button selected");


        // the sort type is retrieved from the data-sort-type attribute of the clicked button
        const sortType = e.target.getAttribute("data-sort-type");
        sortProducts(sortType);
    });
});


// functions to sort products by price and rating and render them again with the new order of products
async function sortProducts(sortType) {
    const products = await fetchData();
   
    switch (sortType) {
        case 'price-low':
            products.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            products.sort((a, b) => b.price - a.price);
            break;
        case 'rating-low':
            products.sort((a, b) => a.rating.rate - b.rating.rate);
            break;
        case 'rating-high':
            products.sort((a, b) => b.rating.rate - a.rating.rate);
            break;
    }


    renderProducts(products);
}


// Initial data load and render
fetchData().then(renderProducts);