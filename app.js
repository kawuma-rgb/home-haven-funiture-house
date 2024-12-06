const cart = document.getElementById("cart_container");
const login = document.getElementById("login_container");
const caution = document.getElementById("caution");
const no_account = document.getElementById('no_account')
const grand_total = document.getElementById("grand_total");
const item_no = document.getElementById('item_no');
const cart_no = document.getElementById('cart_no');
const item_list = document.getElementById('item_list');
const bugger = document.getElementById('bugger');
const navContainer = document.getElementById('nav_container');
const addToCartButtons = document.querySelectorAll('.addToCart');
let cartList = []; // Array to store items added to the cart
let arrivalDate = getDate();
// Function to open the cart modal
function openModal() {
    if(cartList.length>0){
           cart.style.display = "block";
           document.body.style.overflow = "hidden"; 
        }else{
            caution.style.display = "block";
            document.body.style.overflow = "hidden";      
    }
}
// Function to open the login modal
function openLogin() {
    login.style.display = "flex";
    
    document.body.style.overflow = "hidden"; 
}
// Function to close the cart modal
function closeModal() {
    cart.style.display = "none";
    document.body.style.overflow = "scroll"; 
}
// caution no items in the cart
function close_caution() {
    caution.style.display = "none";
    document.body.style.overflow = "scroll"; 
}
// Function to close the login modal
function closeLogin() {
    login.style.display = "none";
    document.body.style.overflow = "scroll"; 
}
// show balance
function showBalance(){
    if(cartList.length>=1){
        calculateGrandTotal()
        grand_total.style.display="flex";
    }
}
// Function to update item count in the cart
function updateCartCount() {
    let itemCount = cartList.length; // Cart count based on cartList array length
    item_no.innerText = itemCount;
    cart_no.innerText = itemCount;
}
function getDate(){
    let date = new Date(Date.now()+ 864e5*5).toUTCString();
    return date;

}
// Function to add items to the cart on "Add to Cart" button click
addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        const itemRow = this.closest('.product'); // Closest parent container with product info
        const itemName = itemRow.querySelector('.product_name').innerText;
        const itemPrice = parseFloat(itemRow.querySelector('.price').innerText);
        const itemQuantity = 1; // Default quantity is 1
        const itemTotal = itemPrice; // Initial total is just the price

        const existingItemIndex = cartList.findIndex(item => item.name === itemName);

        if (existingItemIndex >= 0) {
            // Item is already in the cart, just increase quantity
            cartList[existingItemIndex].quantity += 1;
            cartList[existingItemIndex].total = cartList[existingItemIndex].price * cartList[existingItemIndex].quantity;
        } else {
            // Add new item to cart
            cartList.push({
                name: itemName,
                price: itemPrice,
                quantity: 1,
                total: itemPrice
            });
        }
        // Push item into cartList array


        // Update cart count and display
        updateCartCount();
        updateCartDisplay();
    });
});
// Function to update cart display with new items
function updateCartDisplay() {
    // Clear existing cart display
    item_list.innerHTML = '';

    // Loop through the cart and create rows for each item
    cartList.forEach((item, index) => {
        const row = document.createElement('tr');
        row.classList.add('item'); // Add class for styling

        // Create name and description cell
        const nameCell = document.createElement('td');
        const itemName = document.createElement('p');
        itemName.classList.add('item_name');
        itemName.innerText = item.name;

        const itemDescription = document.createElement('p');
        itemDescription.classList.add('item_description');
        
        itemDescription.innerText = "Item will be delivered in " + arrivalDate; // Add any description here

        nameCell.appendChild(itemName);
        nameCell.appendChild(itemDescription);

        // Create price cell
        const priceCell = document.createElement('td');
        priceCell.classList.add('price');
        priceCell.innerText = `$${item.price.toFixed(2)}`;

        // Create quantity cell with plus and minus buttons
        const quantityCell = document.createElement('td');
        quantityCell.classList.add('quantity');

        const minusButton = document.createElement('img');
        minusButton.src = '../resources/images/minus.png'; // Path to minus icon
        minusButton.classList.add('minus');
        minusButton.alt = 'Decrease quantity';
        minusButton.addEventListener('click', function() {
            updateQuantity(index, 'minus');
        });

        const quantityDiv = document.createElement('div');
        quantityDiv.classList.add('quantity_no');
        quantityDiv.innerText = item.quantity;

        const plusButton = document.createElement('img');
        plusButton.src = '../resources/images/plus-sign.png'; // Path to plus icon
        plusButton.classList.add('plus');
        plusButton.alt = 'Increase quantity';
        plusButton.addEventListener('click', function() {
            updateQuantity(index, 'plus');
            console.log('pluss');
            
        });

        quantityCell.appendChild(minusButton);
        quantityCell.appendChild(quantityDiv);
        quantityCell.appendChild(plusButton);

        // Create total cell
        const totalCell = document.createElement('td');
        totalCell.classList.add('total');
        totalCell.innerText = `$${(item.price * item.quantity).toFixed(2)}`;

        // Append all cells to the row
        row.appendChild(nameCell);
        row.appendChild(priceCell);
        row.appendChild(quantityCell);
        row.appendChild(totalCell);

        // Append the row to the cart body
        item_list.appendChild(row);
    });
}
// Function to update quantity when plus or minus buttons are clicked
function updateQuantity(index, action) {
    if (action === 'plus') {
        cartList[index].quantity += 1;
    } else if (action === 'minus' && cartList[index].quantity > 1) {
        cartList[index].quantity -= 1;
    }

    // Update the total price for the item
    cartList[index].total = cartList[index].price * cartList[index].quantity;
}
// Initial update of cart item count
updateCartCount();
// calculate the total of the items
function calculateGrandTotal() {
    let grandTotal = 0;
    
    cartList.forEach(item => {
        grandTotal += item.price * item.quantity; 
    });
    
    // Update the grand total in the HTML
    document.getElementById('grand_total').innerText = `$${grandTotal.toFixed(2)}`;
}
// sign up and login
function signup(){
    login.innerHTML= `
     <form action="signUp.php" method="POST" id="login">
    <img src="../resources/images/cancel.png" class="close" onclick="closeLogin()" alt="">
    <h3>Sign Up to Home Haven</h3>
    <input type="text" name="username" placeholder="Enter both names" required>
    <input type="email" name="useremail" placeholder="Enter Email account" required>
    <input type="password" name="password" placeholder="Enter Password" required>
    <input type="password" name="repeat_password" placeholder="Repeat Password" required>
    <p class="no_account">Already Have an Account? <a href="#" onclick="login()" id="have_account"> Sign in</a></p>
    <button type="submit" name="signup">Sign Up</button>
</form>

    `;
}
// Function to display the login form
function login() {
    const loginContainer = document.getElementById('login_container');
    loginContainer.innerHTML = `
      <form action="login.php" method="POST" id="login">
        <img src="../resources/images/cancel.png" class="close" onclick="closeLogin()" alt="">
        <?php
          if (isset($_SESSION['user_name'])) {
            echo '<h3>Logout from Home Haven</h3>';
            echo '<button type="submit" name="logout">Logout</button>';
          } else {
            echo '<h3>Login to Home Haven</h3>';
            echo '<input type="email" placeholder="Enter UserEmail" name="useremail">';
            echo '<input type="password" placeholder="Enter Password" name="password">';
            echo '<p class="no_account">Don’t Have an Account? <a href="#" onclick="signup()" id="no_account">Sign up</a></p>';
            echo '<button type="submit" name="login">Login</button>';
          }
        ?>
      </form>
    `;
  }

function placeOrder() {
    if (cartList.length === 0) {
        alert("Your cart is empty! Please add items to your cart before placing an order.");
        return;
    }

    // Check if user is logged in
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'check_login.php', true);
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (!response.loggedIn) {
                alert("You must be logged in to place an order.");
                openLogin();
                return;
            }

            // Proceed with collecting order data
            const customerName = response.username; // Get username from response

            const orderData = cartList.map(item => ({
                customer_name: customerName,
                product_name: item.name,
                quantity: item.quantity,
                price: item.price,
                total: item.total,
                status: "Pending"
            }));

            // Send order data to the server
            sendOrderData(orderData);
        }
    };

    xhr.send();
}

// Function to send order data to the server
function sendOrderData(orderData) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'place_order.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            alert(xhr.responseText);
            cartList = []; // Clear cart after placing order
            updateCartDisplay(); // Update cart display
        }
    };

    xhr.send(JSON.stringify(orderData));
}

bugger.addEventListener('click',()=>{

    
navContainer.classList.toggle('active');

})