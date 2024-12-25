// adds 'on click' event handler to save button
let save = document.getElementById("save");
save.onclick = saveVendor;

// function that updates an existing vendor to the server
function saveVendor(){
	
	// saves values of text fields
	let name = document.getElementById("name").value;
	let deliveryFee = document.getElementById("deliveryFee").value;
	let minOrder = document.getElementById("minOrder").value;
	let id = document.getElementById("id").innerHTML;

	// creates a new vendor object 
	let vendor = {"id": id, "name": name, "delivery_fee": deliveryFee, "min_order": minOrder};

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
	
	req.open("PUT", "/vendors/:id");									// put request 
	req.setRequestHeader("Content-Type", "application/json");			// header
	req.send(JSON.stringify(vendor));									// sends new vendor to server
}
