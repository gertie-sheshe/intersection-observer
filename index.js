const products = [
  {
    title: "Spare Charging Cable",
    image: "./charger-480.png",
    cost: "€19.99",
  },
  {
    title: "Clip XL x3",
    image: "./charger-480.png",
    cost: "€24.99",
  },
  {
    title: "Clip x3",
    image: "./charger-480.png",
    cost: "€24.99",
  },
  {
    title: "Clip x3",
    image: "./charger-480.png",
    cost: "€24.99",
  },
  {
    title: "Spare Charging Cable",
    image: "./charger-480.png",
    cost: "€24.99",
  },
  {
    title: "Clip",
    image: "./charger-480.png",
    cost: "€24.99",
  },
];

function createProductComponent(product) {
  const listItem = document.createElement("li");
  listItem.classList.add("product");

  const imageElement = document.createElement("img");
  imageElement.dataset.src = product.image;
  imageElement.src = "";
  imageElement.alt = product.title;

  listItem.appendChild(imageElement);

  const titleElement = document.createElement("h3");
  titleElement.textContent = product.title;
  listItem.appendChild(titleElement);

  const costElement = document.createElement("p");
  costElement.textContent = product.cost;
  listItem.appendChild(costElement);

  const addToCartButton = document.createElement("button");
  addToCartButton.textContent = "Add to Cart";
  listItem.appendChild(addToCartButton);

  return listItem;
}

function lazyLoadImages(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const product = entry.target;
      const imageElement = product.querySelector("img");

      if (imageElement) {
        const src = imageElement.dataset.src;
        imageElement.src = src;
        imageElement.removeAttribute("data-src");

        observer.unobserve(product);
      }
    }
  });
}

function initialize() {
  const productContainer = document.querySelector(".product-container");
  const productList = document.getElementById("productList");
  const title = document.querySelector(".title");
  const viewportWidth = window.innerWidth;

  title.innerHTML =
    viewportWidth > 768
      ? "You might find these interesting"
      : "Complete your dog look";

  // Lazy Load images when they are 100px away from viewport
  const imageObserver = new IntersectionObserver(lazyLoadImages, {
    root: productContainer,
    rootMargin: "100px",
    threshold: 0.1,
  });

  products.forEach((product) => {
    const li = createProductComponent(product);
    productList.appendChild(li);
    imageObserver.observe(li);
  });
}

initialize();
