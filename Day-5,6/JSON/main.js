//Product categories
var productList = [
  {
    id: 1,
    type: "category",
    name: "Electronics",
    products: [
      {
        id: 1,
        name: "Mobile",
        price: 100000,
        type: "product",
        imageUrl: "https://source.unsplash.com/8l9VxXI28tY/200x200",
      },
      {
        id: 2,
        name: "SmartWatch",
        price: 40000,
        type: "product",
        imageUrl: "https://source.unsplash.com/8OQt1zTnJeE/200x200",
      },
      {
        id: 3,
        name: "EarBuds",
        price: 50000,
        type: "product",
        imageUrl: "https://source.unsplash.com/AgLMrojqjAM/200x200",
      },
      {
        id: 4,
        name: "speaker",
        price: 20000,
        type: "product",
        imageUrl: "https://source.unsplash.com/0vO0z83M4bc/200x200",
      },
    ],
  },
  {
    id: 2,
    type: "category",
    name: "Home Appliances",
    products: [
      {
        id: 1,
        name: "Television",
        price: 80000,
        type: "product",
        imageUrl: "https://source.unsplash.com/KzGhmrQmB6I/200x200",
      },
      {
        id: 2,
        name: "Oven",
        price: 150000,
        type: "product",
        imageUrl: "https://source.unsplash.com/aPoF91L-n6k/200x200",
      },
      {
        id: 3,
        name: "AC",
        price: 90000,
        type: "product",
        imageUrl: "https://source.unsplash.com/_Ib-JulMgzo/200x200",
      },
    ],
  },
  {
    id: 3,
    type: "category",
    name: "Groceries",
    products: [
      {
        id: 1,
        name: "Coffee",
        price: 500,
        type: "product",
        imageUrl: "https://source.unsplash.com/TD4DBagg2wE/200x200",
      },
      {
        id: 2,
        name: "Chocolate",
        price: 200,
        type: "product",
        imageUrl: "https://source.unsplash.com/H22N-9s8AUw/200x200",
      },
      {
        id: 3,
        name: "Rice",
        price: 2000,
        type: "product",
        imageUrl: "https://source.unsplash.com/uYVXADKKJKI/200x200",
      },

      {
        id: 4,
        name: "Cereals",
        price: 600,
        type: "product",
        imageUrl: "https://source.unsplash.com/yPk-KUY8LtY/200x200",
      },
    ],
  },
  {
    id: 4,
    type: "category",
    name: "Decor",
    products: [
      {
        id: 1,
        name: "Candles",
        price: 400,
        type: "product",
        imageUrl: "https://source.unsplash.com/bdVmIkx_gIs/200x200",
      },
      {
        id: 2,
        name: "Clock",
        price: 1000,
        type: "product",
        imageUrl: "https://source.unsplash.com/8fvDJw3jrcI/200x200",
      },
      {
        id: 3,
        name: "Curtain",
        price: 5000,
        type: "product",
        imageUrl: "https://source.unsplash.com/SlpsgiZsSNk/200x200",
      },

      {
        id: 4,
        name: "Mirror",
        price: 1500,
        type: "product",
        imageUrl: "https://source.unsplash.com/CgXnJ4Z5KFI/200x200",
      },

      {
        id: 5,
        name: "Vase",
        price: 2000,
        type: "product",
        imageUrl: "https://source.unsplash.com/sIhndYXDYlY/200x200",
      },
    ],
  },
  {
    id: 5,
    type: "category",
    name: "Sports",
    products: [
      {
        id: 1,
        name: "Shoes",
        price: 4000,
        type: "product",
        imageUrl: "https://source.unsplash.com/PqbL_mxmaUE/200x200",
      },
      {
        id: 2,
        name: "T-shirt",
        price: 1500,
        type: "product",
        imageUrl: "https://source.unsplash.com/H7cIqigZOBo/200x200",
      },
      {
        id: 3,
        name: "Drink",
        price: 500,
        type: "product",
        imageUrl: "https://source.unsplash.com/0zsdIfJB_Kg/200x200",
      },
    ],
  },
];

// UI elements
const categoriesUI = document.querySelector(".category-content");
const productsUI = document.querySelector(".product-content");
const detailsUI = document.querySelector(".detail-content");

//show Categories in UI
const categoryUl = document.createElement("ul");
const productUl = document.createElement("ul");

for (let category in productList) {
  const li = document.createElement("li");
  li.textContent = productList[category].name;
  li.id = productList[category].id;
  categoryUl.appendChild(li);

  //show Products
  productUl.innerHTML = `<h3> Click on Category to View Products </h3>`;
}

categoriesUI.appendChild(categoryUl);
productsUI.appendChild(productUl);

//show products on select
const categories = categoryUl.querySelectorAll("li");

categories.forEach((item) => {
  const id = Number(item.id);

  item.addEventListener("click", (e) => {
    const productItem = productList.find((el) => el.id === id);

    productUl.innerHTML = "";

    if (productItem) {
      const products = productItem.products;

      products.forEach((product) => {
        productUl.innerHTML += `<li class="product-name" onclick = "viewProductDetails(event, ${id})" id = ${product.id}>${product.name}</li>`;
      });
    }
    detailsUI.innerHTML = `<h3>Select Product </h3>`;
  });
});

function viewProductDetails(event, parentId) {
  const target = event.target;
  const productId = Number(target.id);
  const categoryId = parentId;

  const productDetails = productList
    .find((item) => item.id === categoryId)
    .products.find((product) => product.id === productId);
  const { name, price, imageUrl } = productDetails;

  detailsUI.innerHTML = `
  <div> 
  <span>${name}: </span> 
  <span> Rs. ${price}</span> 
  </div>
  <img src="${imageUrl}"/>
  `;
}
