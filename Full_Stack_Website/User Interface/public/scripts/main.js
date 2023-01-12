/**
 * @fileoverview
 * Provides the JavaScript interactions for all pages.
 *
 * @author 
 * PUT_YOUR_NAME_HERE
 */

/** namespace. */
var rhit = rhit || {};

/** globals */
rhit.variableName = "";

rhit.employeeAttributeIsDisplayed = false;
rhit.customerAttributeIsDisplayed = false;
rhit.productAttributeIsDisplayed = false;
rhit.orderAttributeIsDisplayed = false;
rhit.islogin = localStorage.getItem('token');
rhit.username = null;
rhit.passwordhash = null;

/** 3 levels: 
 * 1st level: level = 1 is an admin (have access to every table)
 * 2nd level: level = 2 can only ...
 * 3rd level: level = 3 can only ...*/
rhit.level = -1;

// From: StackOverflow
function htmlToElement(html) {
	var template = document.createElement('template');
	html = html.trim(); // Never return a text node of whitespace as the result
	template.innerHTML = html;
	return template.content.firstChild;
}

rhit.PageController = class {
	constructor() {
		
		if (!rhit.islogin && !document.querySelector('#LoginPage')) {
			window.location.href = "/SignIn.html";
			console.log("here");
		} else if(!rhit.islogin && document.querySelector('#LoginPage')){
			document.getElementById("registerUser").addEventListener("click", function () {
				const username = $('#registerUsername').val()
				const password = $('#registerPassword').val()
				$.ajax({
					type:'post',
					dataType:'json',
					url:"http://localhost:8090/api/register",
					contentType:'application/json;charset=utf-8',
					data:JSON.stringify({
						username,
						password
					}),
					success:(res) => {
						if (res.code === 0) {
							rhit.islogin = true;
							alert('User registered!');
						} else {
							alert(res.msg);
						}
					}
				})
			})

			document.getElementById("submitButtonE").addEventListener("click", function () {
				console.log("submit button clicked");
				rhit.username = document.querySelector("#UserNameBox").value;
				rhit.passwordhash = document.querySelector("#UserPasswordBox").value;
				$.ajax({
					type:'post',
					dataType:'json',
					url:"http://localhost:8090/api/login",
					contentType:'application/json;charset=utf-8',
					data:JSON.stringify({
						"username":rhit.username,
						"password":rhit.passwordhash
					}),
					success:(res) => {
						if (res.code === 0) {
							localStorage.setItem('token',res.token);
							window.location.href = "/index.html";
						} else {
							alert(res.msg);
						}
					}
				})
			});
		}else {
			$(document).on( 'click','#signOutButton', function() {
				rhit.islogin = false;
				localStorage.removeItem('token');
				window.location.href = "/SignIn.html";
			})
			//enable the onclick listeners
			document.addEventListener('DOMContentLoaded', function () {
				//todo: remove duplicated code
				// document.getElementById("employeeEntityName").addEventListener("click", function () {
				// 	console.log("employee entity clicked");
				// 	if (rhit.employeeAttributeIsDisplayed) {
				// 		const attributes = document.querySelector(`.employee-attribute`);
				// 		attributes.style.display = "none";
				// 		rhit.employeeAttributeIsDisplayed = false;
				// 	} else {
				// 		const attributes = document.querySelector(`.employee-attribute`);
				// 		attributes.style.display = "block";
				// 		rhit.employeeAttributeIsDisplayed = true;
				// 	}
				// });

				// document.getElementById("customerEntityName").addEventListener("click", function () {
				// 	console.log("customer entity clicked");
				// 	if (rhit.customerAttributeIsDisplayed) {
				// 		const attributes = document.querySelector(`.customer-attribute`);
				// 		attributes.style.display = "none";
				// 		rhit.customerAttributeIsDisplayed = false;
				// 	} else {
				// 		const attributes = document.querySelector(`.customer-attribute`);
				// 		attributes.style.display = "block";
				// 		rhit.customerAttributeIsDisplayed = true;
				// 	}
				// });

				// document.getElementById("productEntityName").addEventListener("click", function () {
				// 	console.log("product entity clicked");
				// 	if (rhit.productAttributeIsDisplayed) {
				// 		const attributes = document.querySelector(`.product-attribute`);
				// 		attributes.style.display = "none";
				// 		rhit.productAttributeIsDisplayed = false;
				// 	} else {
				// 		const attributes = document.querySelector(`.product-attribute`);
				// 		attributes.style.display = "block";
				// 		rhit.productAttributeIsDisplayed = true;
				// 	}
				// });


				// document.getElementById("orderEntityName").addEventListener("click", function () {
				// 	console.log("order entity clicked");
				// 	if (rhit.orderAttributeIsDisplayed) {
				// 		const attributes = document.querySelector(`.order-attribute`);
				// 		attributes.style.display = "none";
				// 		rhit.orderAttributeIsDisplayed = false;
				// 	} else {
				// 		const attributes = document.querySelector(`.order-attribute`);
				// 		attributes.style.display = "block";
				// 		rhit.orderAttributeIsDisplayed = true;
				// 	}
				// });

			}, false);

			// $("#editEmployeeDialog").on("shown.bs.modal", (event) => {
			// 	document.querySelector("#inputName").value = "";
			// 	document.querySelector("#inputAddressID").value = "";
			// 	document.querySelector("#inputPosition").value = "";
			// 	document.querySelector("#inputEmployedYear").value = "";
			// 	document.querySelector("#inputEmployedMonth").value = "";
			// 	document.querySelector("#inputBirthYear").value = "";
			// 	document.querySelector("#inputBirthMonth").value = "";
			// 	document.querySelector("#inputPhoneNumber").value = "";
			// 	document.querySelector("#inputSalary").value = "";
			// 	document.querySelector("#inputCreditCardNumber").value = "";

			// })

			// $("#editEmployeeDialog").on("shown.bs.modal", (event) => {
			// 	document.querySelector("#inputName").focus();
			// });

		}

	}

	update() {

	}

};


rhit.EmployeePageController = class{
	constructor() {
		console.log("Employee page created!");
		$("input:checkbox:not(:checked)").each(function() {
			var column = "table ." + $(this).attr("name");
			$(column).hide();
		});
		
		$("input:checkbox").click(function(){
			var column = "table ." + $(this).attr("name");
			$(column).toggle();
		});
	}
}

rhit.CompanyPageController = class{
	constructor() {
		console.log("Company page created!");
		$("input:checkbox:not(:checked)").each(function() {
			var column = "table ." + $(this).attr("name");
			$(column).hide();
		});
		
		$("input:checkbox").click(function(){
			var column = "table ." + $(this).attr("name");
			$(column).toggle();
		});


		// $("#editCompanyDialog").on("shown.bs.modal", (event) => {
		// 	document.querySelector("#inputNameCompany").value = "";
		// 	document.querySelector("#inputFieldCompany").value = "";
		// 	document.querySelector("#inputRepNameCompany").value = "";
		// 	document.querySelector("#inputRepNumberCompany").value = "";
		// 	document.querySelector("#inputEditProvince").value = "";
		// 	document.querySelector("#inputEditCity").value = "";
		// 	document.querySelector("#inputEditDistrict").value = "";
		// 	document.querySelector("#inputRegDateCompany").value = "";
		// 	document.querySelector("#inputTypeCompany").value = "";
		// 	document.querySelector("#inputLevelsOfInterestCompany").value = "";
		// 	document.querySelector("#inputNotes1Company").value = "";
		// 	document.querySelector("#inputNotes2Company").value = "";
		// 	document.querySelector("#inputNotes3Company").value = "";

		// })
	}
}

rhit.ContactWithPageController = class{
	constructor() {
		console.log("ContactWith page created!");
		$("input:checkbox:not(:checked)").each(function() {
			var column = "table ." + $(this).attr("name");
			$(column).hide();
		});
		$("input:checkbox").click(function(){
			var column = "table ." + $(this).attr("name");
			$(column).toggle();
		});
	}
}

rhit.OrderPageController = class{
	constructor() {
		console.log("Order page created!");
		$("input:checkbox:not(:checked)").each(function() {
			var column = "table ." + $(this).attr("name");
			$(column).hide();
		});
		$("input:checkbox").click(function(){
			var column = "table ." + $(this).attr("name");
			$(column).toggle();
		});
	}
}

rhit.ProductPageController = class{
	constructor() {
		console.log("Product page created!");
		$("input:checkbox:not(:checked)").each(function() {
			var column = "table ." + $(this).attr("name");
			$(column).hide();
		});
		$("input:checkbox").click(function(){
			var column = "table ." + $(this).attr("name");
			$(column).toggle();
		});
	}
}


function GetNamebb8() {
	var aaa = this.parentElement.querySelector("data-mySSN")
	console.log("asdfasdfasdfasdfa:" + aa);
};



/* Main */
/** function and class syntax examples */
rhit.main = function () {
	console.log("Ready");

	new rhit.PageController();
	if(document.querySelector("#employeePage")){
		new rhit.EmployeePageController();
	}
	if(document.querySelector("#companyPage")){
		new rhit.CompanyPageController();
	}
	if(document.querySelector("#contactWithPage")){
		new rhit.ContactWithPageController();
	}
	if(document.querySelector("#orderPage")){
		new rhit.OrderPageController();
	}

	if(document.querySelector("#productPage")){
		new rhit.ProductPageController();
	}
};

rhit.main();