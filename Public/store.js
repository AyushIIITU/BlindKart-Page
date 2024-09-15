var audioPlayed = false;
var totalcartprice = 0;
var audioo;
document.body.addEventListener("click", function () {
  if (!audioPlayed) {
    var audio = new Audio("sounds/blindkartintro.mp3");
    audio.play();
    audioPlayed = true;
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const cartItems = document.getElementById("cart-items");
  const checkoutBtn = document.getElementById("checkout-btn");
  const topproduct = document.getElementsByClassName("product");
  const totalSumDisplay = document.getElementById("total-sum");
  const cartimage = document.querySelectorAll("img");
  for (var ip = 0; ip < cartimage.length; ip++) {
    (function (index) {
      cartimage[index].addEventListener("mouseover", function () {
        this.style.transform = "scale(1.1)";
        makeSoundImg(cartimage[index].alt);
      });

      cartimage[index].addEventListener("mouseleave", function () {
        this.style.transform = "scale(1)";
        stopSoundImg();
      });
    })(ip);
  }
  function makeSoundImg(a) {
    // Assuming there is an audio element with id 'audio' and corresponding sources.
    switch (a) {
      case "Product 1":
        audioo = new Audio("sounds/stickdisc.mp3");
        audioo.play();
        break;
      case "Product 2":
        audioo = new Audio("sounds/myprojectdisc.mp3");
        audioo.play();
        break;
      case "Product 3":
        audioo = new Audio("sounds/brailledisc.mp3");
        audioo.play();
        break;
      case "Product 4":
        audioo = new Audio("sounds/keyboarddisc.mp3");
        audioo.play();
        break;
      default:
        console.log("no sound for", a);
        break;
    }
  }

  function stopSoundImg() {
    if (audioo) {
      audioo.pause();
      audioo.currentTime = 0;
    }
  }

  // Check if there are items in the cart stored in local storage
  // const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const savedCartItems = [];
  // const totalSum = parseFloat(localStorage.getItem('totalSum')) || 0;
  // Function to render the cart items
  function renderCartItems() {
    cartItems.innerHTML = ""; // Clear previous items
    let sum = 0;
    savedCartItems.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item.description;
      cartItems.appendChild(li);
    });
  }

  // Function to handle adding items to the cart
  function addToCart(productDescription) {
    const newItem = { description: productDescription };
    savedCartItems.push(newItem);

    // Save the updated cart to local storage
    localStorage.setItem("cartItems", JSON.stringify(savedCartItems));
    // var aid=new Audio("http://api.voicerss.org/?key=7ea9e1c975fd4ee99860a5c4415ac628&hl=en-us&src="+productDescription+" add");
    //   aid.play();
    // Update the displayed cart items
    switch (productDescription) {
      case "Keyboard":
        var aud = new Audio("sounds/keyadd.mp3");
        aud.play();
        break;
      case "Stick":
        var aud = new Audio("sounds/stickadd.mp3");
        aud.play();
        break;

      case "Myproject":
        var aud = new Audio("sounds/eyeadd.mp3");
        aud.play();
        break;
      case "Braille":
        var aud = new Audio("sounds/brailleadd.mp3");
        aud.play();
        break;
      default:
        console.log("No sound for", productDescription);

    }
    renderCartItems();
  }

  // Function to handle removing items from the cart
  function removeFromCart(productDescription) {
    // Find the index of the item in the cart
    const index = savedCartItems.findIndex(
      (item) => item.description === productDescription
    );

    // Remove the item if found
    if (index !== -1) {
      savedCartItems.splice(index, 1);

      // Save the updated cart to local storage
      localStorage.setItem("cartItems", JSON.stringify(savedCartItems));
      // var aud=new Audio("http://api.voicerss.org/?key=7ea9e1c975fd4ee99860a5c4415ac628&hl=en-us&src="+productDescription+" remove");
      // aud.play();
            console.log(productDescription);
      switch (productDescription) {
        case "Keyboard":
          var aud = new Audio("sounds/keyrem.mp3");
          aud.play();
          break;
        case "Stick":
          var aud = new Audio("sounds/stickrem.mp3");
          aud.play();
          break;

        case "Myproject":
          var aud = new Audio("sounds/eyerem.mp3");
          aud.play();
          break;
        case "Braille":
          var aud = new Audio("sounds/braillerem.mp3");
          aud.play();
          break;
      }

      // Update the displayed cart items

      // Update the displayed cart items
      renderCartItems();
    }
  }

  // Event listener for Add to Cart buttons
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  for (var ip = 0; ip < addToCartButtons.length; ip++) {
    (function (index) {
      addToCartButtons[index].addEventListener("mouseover", function () {
        audioo = new Audio("sounds/tapadd.mp3");
        audioo.play();
      });

      addToCartButtons[index].addEventListener("mouseleave", function () {
        audioo.pause();
        audioo.currentTime = 0;
      });
    })(ip);
  }
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productDescription =
        this.parentNode.querySelector("span").textContent;
      const price = this.parentNode.querySelector("strong").textContent;
      totalcartprice += parseFloat(price);
      addToCart(productDescription);
    });
  });

  // Event listener for Remove from Cart buttons
  const removeFromCartButtons = document.querySelectorAll(
    ".remove-from-cart-btn"
  );
  for (var ip = 0; ip < removeFromCartButtons.length; ip++) {
    (function (index) {
      removeFromCartButtons[index].addEventListener("mouseover", function () {
        audioo = new Audio("sounds/tapremove.mp3");
        audioo.play();
      });

      removeFromCartButtons[index].addEventListener("mouseleave", function () {
        audioo.pause();
        audioo.currentTime = 0;
      });
    })(ip);
  }

  removeFromCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productDescription =
        this.parentNode.querySelector("span").textContent;
      const price = this.parentNode.querySelector("strong").textContent;
      totalcartprice -= parseFloat(price);
      removeFromCart(productDescription);
    });
  });

  // Initial rendering of cart items
  renderCartItems();
  checkoutBtn.addEventListener("mouseover", function () {
    audioo = new Audio("sounds/checkouttap.mp3");
    audioo.play();
  });

  checkoutBtn.addEventListener("mouseleave", function () {
    audioo.pause();
    audioo.currentTime = 0;
  });
  // Event listener for Checkout button
  checkoutBtn.addEventListener("click", function () {
    // Redirect to the billing website (you should replace 'billing.html' with your actual billing page)

    if (savedCartItems.length === 0) {
      var audio = new Audio("sounds/emptykart.mp3");
      audio.play();
      totalcartprice = 0;
    } else {
      // window.location.href = 'billing.html';
      window.location.href = `billing.html?totalcartprice=${totalcartprice}`;
    }
  });
});
