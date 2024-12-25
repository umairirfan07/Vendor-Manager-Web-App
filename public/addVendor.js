// adds 'on click' event handler to submit button
let submit = document.getElementById("submit");
submit.onclick = submitVendor;

// function that creates and sends a new vendor to the server
function submitVendor(){
	
	// saves values of text fields
	let name = document.getElementById("name").value;
	let deliveryFee = document.getElementById("deliveryFee").value;
	let minOrder = document.getElementById("minOrder").value;

	// creates a new vendor object 
	let vendor = {"name": name, "delivery_fee": deliveryFee, "min_order": minOrder};

	// clears texts fields 
	document.getElementById("name").value = "";
	document.getElementById("deliveryFee").value = "";
	document.getElementById("minOrder").value = "";
	
	// sends vendor data to server using an XTTP request 
	let req = new XMLHttpRequest();
	req.onreadystatechange = function(){

		// redirects to view vendors page 
		location.href = "http://localhost:3000/vendors";
	}
	
	req.open("POST", "/vendors");										// post request 
	req.setRequestHeader("Content-Type", "application/json");			// header
	req.send(JSON.stringify(vendor));									// sends new vendor to server
}
