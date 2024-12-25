// express declerations 
const express = require('express');
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.set("view engine", "pug");
const fs = require("fs");

// variables
let vendorsArray = [];          // holds vendors objects from files		
let vendorsID = [];             // holds vendors id from files	
let newVendor = null;           // placeholder for new vendor	
let id = 2;                     // unique id for each vendor 	

// reads in vendor json files
fs.readdir("./vendors", (err, files) => {
	if (err)
	  console.log(err);
	else {
		files.forEach(file => {
			requiredVendor = require("./vendors/" + file);
			vendorsArray.push(requiredVendor);
            vendorsID.push(requiredVendor.id);
	  	})
	}
    // reverses array to maintain order 
    vendorsArray.reverse();
})

/* GET
*/

// responds with home page if requested
app.get("/", (req, res, next)=> { 
    res.render("pages/index"); 
});

// responds with vendors if requested (either a JSON or an HTML response)
app.get("/vendors", (req, res)=> { 
    res.format({
        "text/html": () =>{
            res.render("pages/vendors", {vendors: vendorsArray}); 
        },
        "application/json": () =>{
            res.json({vendors: vendorsID})
        }
    })
});

// responds with add vendor page 
app.get("/addVendor", (req, res, next)=> { 
    res.render("pages/addVendor"); 
});

// sends a specific vendor (either HTML/JSON)
app.get('/vendors/:id', (req, res, next) => {
    res.format({
        "text/html": () =>{
            res.render("pages/vendorInfo", {vendor: vendorsArray[req.params.id]});
        },
        "application/json": () =>{
            res.json({vendors: vendorsArray[req.params.id]})
        }
    })
	next();
})

/* POST
*/

// adds a new array from the client to the server array
app.post('/vendors', function (req, res) {

    // checks if object is valid (if not sends error)
    if(req.body.name === "" || req.body.min_order === "" || req.body.delivery_fee === "") {
        res.status(400).send("Bad request error");
        return;
    }
    
    newVendor = req.body;                   // extracts the vendor object
    id++;							        // increments unique ID
	vendorsArray[id] = newVendor;	        // adds new vendor to database 
	vendorsArray[id].id = id;			    // sets new vendor ID
    vendorsArray[id].supplies = [];		    // sets supplies to blank
});

/* PUT
*/

// updates the vendor with the given ID 
app.put('/vendors/:id', function (req, res) {

    // checks if vendor is in vendor array (send 404 if not)
    if (req.body.id >= vendorsArray.length) {
        res.status(404).send("Could not find vendor");
        return;
	}

    // if found, updates vendor attributes 
	else {
		vendorsArray[req.body.id].name = req.body.name
        vendorsArray[req.body.id].delivery_fee = req.body.delivery_fee
        vendorsArray[req.body.id].min_order = req.body.min_order
	}	 
});       

// server listens on port 3000
app.listen(3000);
console.log("Server listening at http://localhost:3000");
