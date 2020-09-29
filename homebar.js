// Location Finder
function delivery() {
    var heading1 = document.getElementsByClassName("heading-tag1");
    heading1[0].style.display="block";
    var button1 = document.getElementsByClassName("btn2");
    button1[0].style.backgroundColor="#848ccf";
    button1[0].style.color="#ffffff"
    var heading2 = document.getElementsByClassName("heading-tag2");
    heading2[0].style.display="none";
    var button2 = document.getElementsByClassName("btn3");
    button2[0].style.backgroundColor="#ffffff";
    button2[0].style.color="#848ccf";
}
function pickup() {
    var heading2 = document.getElementsByClassName("heading-tag2");
    heading2[0].style.display="block";
    var button2 = document.getElementsByClassName("btn3");
    button2[0].style.backgroundColor="#848ccf";
    button2[0].style.color="#ffffff";
    var heading1 = document.getElementsByClassName("heading-tag1");
    heading1[0].style.display="none";
    var button1 = document.getElementsByClassName("btn2");
    button1[0].style.backgroundColor="#ffffff";
    button1[0].style.color="#848ccf";
}
// Roggler login and Signin
function login() {
    document.getElementById("login-form").style.transition = "all 5s";
    document.getElementById("login-form").style.display = "block";
    var button = document.getElementsByClassName("btn");
    button[0].style.borderRadius = "1px";
    button[1].style.borderRadius = "1px";
    var location = document.getElementsByClassName("location");
    location[0].style.transition = "all 5s";
    location[0].style.display="none";
    document.getElementById("signin-form").style.transition = "all 5s";
    document.getElementById("signin-form").style.display = "none";
    
}
function signin() {
    document.getElementById("login-form").style.display = "none";
    var location = document.getElementsByClassName("location");
    location[0].style.display="none";
    document.getElementById("signin-form").style.display = "block";
}

// document.getElementById("menuSelect").addEventListener("click", function displayhomebar() {
//     var homebar = document.getElementById("homebarItems");
//     if (homebar.style.display === "none") {
//         homebar.style.display = "block";
//         document.getElementById("menuSelect").style.transform = "rotate(90deg)";
//     } else {
//         homebar.style.display = "none";
//         document.getElementById("menuSelect").style.transform = "rotate(0deg)";
//     }
// });


// menu page home return //
function returnhomepage() {
    location.href = "Homebar.html";
}

// Shopping cart
// Remove Items
function Delete(e)  {
    let items = [];
    JSON.parse(localStorage.getItem('addeditems')).map(data=>{
        if(data.id != e.parentElement.parentElement.children[0].textContent){
            items.push(data);
        }
    });
    localStorage.setItem('addeditems',JSON.stringify(items));
    window.location.reload();
    totalAmount();
};

const count = document.querySelectorAll('.numberofitems');
const total = document.querySelectorAll('.total');
const container = document.querySelectorAll('.menu-container');
const foodButton = document.querySelectorAll('.food-button');
const shoppingCart = document.querySelector('.shoppingcart');
let addeditems = [];

// Click event on add button
    for(let i=0; i < foodButton.length; i++) {
        foodButton[i].addEventListener('click', (e) => {
            if(typeof(Storage) !== 'undefined'){
				let item = {
						id:i+1,
						name:e.target.name,
						price:+e.target.value,
						no:1
					};
				if(JSON.parse(localStorage.getItem('addeditems')) === null){
					addeditems.push(item);
					localStorage.setItem("addeditems",JSON.stringify(addeditems));
					window.location.reload();
				}   else{
					const checkItems = JSON.parse(localStorage.getItem("addeditems"));
					checkItems.map(data=>{
						if(item.id == data.id){
							item.no = data.no + 1;
						}   else{
							addeditems.push(data);
						}
					});
					addeditems.push(item);
					localStorage.setItem('addeditems',JSON.stringify(addeditems));
					window.location.reload();
				}
            }
            else{
				alert('local storage is not working on your browser');
			}
		});
	}

// Adding Data to Cart

const iconShopping = document.querySelectorAll('.numberofitems');
let no = 0;
if(JSON.parse(localStorage.getItem('addeditems')) !== null) {
    JSON.parse(localStorage.getItem('addeditems')).map(function(data) {
        no = no + data.no;
    });
}   
for(let j=0; j<iconShopping.length; j++) {
    iconShopping[j].innerHTML = no;
};


// Adding to Items to Cart

const cardBoxTable = shoppingCart.querySelector('div');
let unorderd = '';
if(JSON.parse(localStorage.getItem('addeditems')) === null) {
    unorderd += '<ul class="shopping-items"><li> No Items Found </li></ul>';
} else {
    JSON.parse(localStorage.getItem('addeditems')).map(function(data) {
        unorderd += '<ul class="shopping-items"><li class="hide-id"> ' +data.id+ ' </li> <li class="item-item"> ' +data.name+ ' </li> <li class="item-decrement"><i class="fas fa-arrow-circle-left decrement" onclick=decrement(this);></i></li><li class="item-quantity"> ' +data.no+ ' </li><li class="item-increment"><i class="fas fa-arrow-circle-right increment" onclick=increment(this);></i></li> <li class="item-amount"> ' +data.price*data.no+ '</li> <li class="item-delete"> <a href="#" onclick=Delete(this);><i class="fas fa-times-circle"></i></a></li></ul>'
        cardBoxTable.innerHTML = unorderd; 
    });
} 

// Add Total Amount Items

function totalAmount() { 
    let totalAmount = 0;
    if(JSON.parse(localStorage.getItem('addeditems')) !== null) {
        JSON.parse(localStorage.getItem('addeditems')).map(function(data) {
            totalAmount += data.price*data.no;
        })
        for(let k=0; k<total.length; k++) {
            total[k].textContent = totalAmount;
        }
    }
};
totalAmount();

// Decrement Quantitites
function decrement(e) {
    let items =[];
    JSON.parse(localStorage.getItem('addeditems')).map(function(data) {
            if (data.id == e.parentElement.parentElement.children[0].textContent && data.no == 1) {
                Delete(e);
                window.location.reload();
            } else if (data.id == e.parentElement.parentElement.children[0].textContent && data.no > 1) {
                data.no = data.no - 1;
                items.push(data);
            }
            else {
                items.push(data);
            }    
    })
    localStorage.setItem('addeditems',JSON.stringify(items));
    window.location.reload();
    totalAmount();
};

// Increment Quantities
function increment(e) {
    let items = [];
    JSON.parse(localStorage.getItem('addeditems')).map(function(data) {
        if(data.id == e.parentElement.parentElement.children[0].textContent && data.no >= 1) {
            data.no = data.no + 1;
            items.push(data);
        }
         else {
             items.push(data);
         }
    })
    localStorage.setItem('addeditems', JSON.stringify(items));
    window.location.reload();
    totalAmount();
};