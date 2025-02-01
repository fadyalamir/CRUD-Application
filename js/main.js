let productNameInput = document.getElementById("productName");
let productPriceInput = document.getElementById("productPrice");
let productCategoryInput = document.getElementById("productCategory");
let productDescInput = document.getElementById("productDesc");
let productImageInput = document.getElementById("productImage");
let searchInput = document.getElementById("searchInput");
let addBtn = document.getElementById("addBtn");
let updateBtn = document.getElementById("updateBtn");

let productsContainer = [];
let updatedIndex;

// leh data (zbon adim)
if (localStorage.getItem("products") !== null) {
  productsContainer = JSON.parse(localStorage.getItem("products"));
  displayProducts(productsContainer);
}

function addProduct() {
  let product = {
    code: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    desc: productDescInput.value,
    image: `images/${productImageInput.files[0]?.name}`,
  };
  productsContainer.push(product);
  displayProducts(productsContainer);
  localStorage.setItem("products", JSON.stringify(productsContainer));
  clearForm();
}

function clearForm() {
  productNameInput.value = null;
  productPriceInput.value = null;
  productCategoryInput.value = null;
  productDescInput.value = null;
  productImageInput.value = null;
}

function displayProducts(arr) {
  // arr = productsContainer
  // arr = termProducts
  let cartona = ``;
  for (let i = 0; i < arr.length; i++) {
    cartona += `<div class="col-md-2 col-sm-6">
          <div class="product">
            <img src="${arr[i].image}" class="w-100" alt="Product Image">
            <h2 class="h4 mt-3">${arr[i].code}</h2>
            <p class="text-secondary mb-2">${arr[i].desc}</p>
            <h3 class="h5"><span class="fw-bolder">Price: </span>${arr[i].price}</h3>
            <h3 class="h5"><span class="fw-bolder">Category: </span>${arr[i].category}</h3>
            <button onclick="deleteProduct(${i})" class="btn btn-outline-danger btn-sm w-100 my-2">Delete <i class="fas fa-trash"></i></button>
            <button onclick="setFormForUpdate(${i})" class="btn btn-outline-warning btn-sm w-100 my-2">Update <i class="fas fa-pen"></i></button>
          </div>
        </div>`;
  }
  document.getElementById("rowData").innerHTML = cartona;
}

function deleteProduct(deletedIndex) {
  productsContainer.splice(deletedIndex, 1);
  displayProducts(productsContainer);
  localStorage.setItem("products", JSON.stringify(productsContainer));
}

function searchProducts() {
  var term = searchInput.value;
  // let cartona = ``;
  let termProducts = [];
  for (let i = 0; i < productsContainer.length; i++) {
    if (productsContainer[i].code.toLowerCase().includes(term.toLowerCase()) == true) {
      termProducts.push(productsContainer[i]);
    }
  }
  // document.getElementById("rowData").innerHTML = cartona;
  displayProducts(termProducts);
}

function setFormForUpdate(i) {
  updatedIndex = i;
  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
  productNameInput.value = productsContainer[updatedIndex].code;
  productPriceInput.value = productsContainer[updatedIndex].price;
  productCategoryInput.value = productsContainer[updatedIndex].category;
  productDescInput.value = productsContainer[updatedIndex].desc;
  productImageInput.value = null;
}

function updateProduct() {
  addBtn.classList.remove("d-none");
  updateBtn.classList.add("d-none");
  productsContainer[updatedIndex].code = productNameInput.value;
  productsContainer[updatedIndex].price = productPriceInput.value;
  productsContainer[updatedIndex].desc = productDescInput.value;
  productsContainer[updatedIndex].category = productCategoryInput.value;
  if (productImageInput.files[0]) {
    productsContainer[updatedIndex].image = `images/${productImageInput.files[0].name}`;
  }
  displayProducts(productsContainer);
  localStorage.setItem("products", JSON.stringify(productsContainer));
  clearForm();
}
