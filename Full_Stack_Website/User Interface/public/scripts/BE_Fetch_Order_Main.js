//Get Order_____________________________________________________________________________________________________________________________________________________________________________________
function GetOrder() {
	let url = "http://localhost:8090/api/Order";
	$.ajax({
		method: "GET",
		url: url,
		dataType: "json",
		success: function (res) {

			if (res) {
				let tableBody = $('#Order-table-body-1');
				tableBody.empty();
				let html = '';
				res.forEach((item, index) => {
					html += `<tr>
                    <td  class = "ID">${item.ID}</td>
                    <td  class = "ProductID">${item.ProductID}</td>
                    <td  class = "Product">${item.Product}</td>
                    <td  class = "Quantity">${item.Quantity}</td>
                    <td  class = "OrderUnitPrice">${item.OrderUnitPrice}</td>
                    <td  class = "DateOfOrder">${item.DateOfOrder}</td>
                    <td  class = "Driver">${item.Driver}</td>
                    <td  class = "SellTo">${item.SellTo}</td>
                    <td  class = "ShippingAddress">${item.Province}, ${item.City}, ${item.District}, ${item.Street}, ${item.ZipCode}</td>
                    <td  class = "ArriveDeadline">${item.ArriveDeadline}</td>
                    <td  class = "DateArrived">${item.DateArrived}</td>
                    <td>
                    <div class="dropdown pull-xs-right">
                    <button class="btn bmd-btn-icon dropdown-toggle" type="button" id="lr1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i class="material-icons">more_vert</i>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="lr1">
                      <button  class="dropdown-item" type="button" data-toggle="modal" onclick='onUpdateOrder1(${JSON.stringify(item)}, ${index})' data-target="#editOrderDialog">
                      <i class="material-icons">edit</i>&nbsp;&nbsp;&nbsp;Edit</button>
                      
                      <button id = "${item.ID}" class="dropdown-item" type="button" onClick="onOrderDelete(this.id)" data-toggle="modal" data-target="#deleteOrderDialog"><i class="material-icons">delete</i>&nbsp;&nbsp;&nbsp;Delete</button>
                    </div>
                  </div>
                  
                  </td>                  
                </tr>`;
				});

				// id="menuEdit"

				tableBody.html(html);
			}

			//  console.log(res);
		},
		complete: function () {

		}
	})
}


//Search Order__________________________________________________________________________________________________________________________________________________________________________________



//Add Order_____________________________________________________________________________________________________________________________________________________________________________________
function onInsert(event) {

	// get value from html buttons
	let ProductID = document.getElementById("inputAddProductID").value;
	let Quantity = document.getElementById("inputAddQuantity").value;
	let OrderUnitPrice = document.getElementById("inputAddOrderUnitPrice").value;
	let DateOfOrder = document.getElementById("inputAddDateOfOrder").value;
	let Driver = document.getElementById("inputAddDriver").value;
	let Company = document.getElementById("inputAddSellTo").value;
	let Province = document.getElementById("inputAddAddress-Province").value;
	let City = document.getElementById("inputAddAddress-City").value;
	let District = document.getElementById("inputAddAddress-District").value;
	let Street = document.getElementById("inputAddAddress-Street").value;
	let ZipCode = document.getElementById("inputAddAddress-ZipCode").value;
	let ArriveDeadline = document.getElementById("inputAddArriveDeadline").value;
	let DateArrived = document.getElementById("inputAddDateArrived").value;

	let request = {
		ProductID,
		Quantity,
		OrderUnitPrice,
		DateOfOrder,
		Driver,
		Company,
		Province,
		City,
		District,
		Street,
		ZipCode,
		ArriveDeadline,
		DateArrived
	};
	console.log(request);

	$.ajax({
		method: 'post',
		dataType: 'json',
		url: "http://localhost:8090/api/Order/add",
		dataType: 'json',
		data: request,
		success: (res) => {
			console.log(res);
			if (res.code === 0) {
				window.location.reload();
				alert('Add sucessful!');
			} else {
				alert(res.msg);
			}
		},
		complete: function () {
			//	$('#submitAddContactWith').removeClass('disabled');
		}
	});
	return false;
}


//update order

function onUpdateOrder() {


	let ID = $('#editOrderDialog #ID').val();
	if (ID !== "") {

		let request = {};
		request.ID = ID;
		request.ProductID = $('#editOrderDialog #inputUpdateProductID').val();
		request.Quantity = $('#editOrderDialog #inputUpdateQuantity').val();
		request.OrderUnitPrice = $('#editOrderDialog #inputUpdateOrderUnitPrice').val();
		request.DateOfOrder = $('#editOrderDialog #inputUpdateDateOfOrder').val();
		request.Driver = $('#editOrderDialog #inputUpdateDriver').val();
		request.SellTo = $('#editOrderDialog #inputUpdateSellTo').val();
		request.AddressID = $('#editOrderDialog #inputUpdateAddressID').val();
		request.Province = $('#editOrderDialog #inputUpdateAddress-Province').val();
		request.City = $('#editOrderDialog #inputUpdateAddress-City').val();
		request.District = $('#editOrderDialog #inputUpdateAddress-District').val();
		request.Street = $('#editOrderDialog #inputUpdateAddress-Street').val();
		request.ZipCode = $('#editOrderDialog #inputUpdateAddress-ZipCode').val();
		request.ArriveDeadline = $('#editOrderDialog #inputUpdateArriveDeadline').val();
		request.DateArrived = $('#editOrderDialog #inputUpdateDateArrived').val();


		// if (Name != null && Name != "") request.Name = Name;
		// if (SSN != null && SSN != "") request.SSN = SSN;
		// if (PhoneNumber != null && PhoneNumber != "") request.PhoneNumber = PhoneNumber;
		// if (Province != null && Province != "") request.Province = Province;
		// if (City != null && City != "") request.City = City;
		// if (District != null && District != "") request.District = District;
		// if (Street != null && Street != "") request.Street = Street;
		// if (ZipCode != null && ZipCode != "") request.ZipCode = ZipCode;
		// if (Position != null && Position != "") request.Position = Position;
		// if (EmployedYear!= null && EmployedYear!= "") request.EmployedYear = EmployedYear;
		// if (EmployedMonth!= null && EmployedMonth!= "") request.EmployedMonth = EmployedMonth;
		// if (BirthYear != null && BirthYear != "") request.BirthYear = BirthYear;
		// if (BirthMonth != null && BirthMonth != "") request.BirthMonth = BirthMonth;
		// if (Salary != null && Salary != "") request.Salary = Salary;
		// if (CreditCardNumber != null && CreditCardNumber != "") request.CreditCardNumber = CreditCardNumber;
		// if (Manager != null && Manager != "") request.Manager = Manager;

		let url = "http://localhost:8090/api/Order/update";

		$.ajax({
			method: "POST",
			url,
			data: request,
			dataType: 'json',
			success: function (res) {
				if (res.code === 0) {
					alert('Update Employee Successful');
				} else {
					alert(res.msg);
				}
			},
			complete: function () {
				window.location.reload();
			}
		});
		return false;
	} else {}

}

function onUpdateOrder1(item, index) {

	$('#editOrderDialog #ID').val(item.ID);
	$('#editOrderDialog #inputUpdateProductID').val(item.ProductID);
	$('#editOrderDialog #inputUpdateQuantity').val(item.Quantity);
	$('#editOrderDialog #inputUpdateOrderUnitPrice').val(item.OrderUnitPrice);
	$('#editOrderDialog #inputUpdateDateOfOrder').val(item.DateOfOrder);
	$('#editOrderDialog #inputUpdateDriver').val(item.Driver);
	$('#editOrderDialog #inputUpdateSellTo').val(item.SellTo);
	$('#editOrderDialog #inputUpdateAddressID').val(item.AddressID);
	$('#editOrderDialog #inputUpdateAddress-Province').val(item.Province);
	$('#editOrderDialog #inputUpdateAddress-City').val(item.City);
	$('#editOrderDialog #inputUpdateAddress-District').val(item.District);
	$('#editOrderDialog #inputUpdateAddress-Street').val(item.Street);
	$('#editOrderDialog #inputUpdateAddress-ZipCode').val(item.ZipCode);
	$('#editOrderDialog #inputUpdateArriveDeadline').val(item.ArriveDeadline);
	$('#editOrderDialog #inputUpdateDateArrived').val(item.DateArrived);

}

function onSearchOrder(event) {

	console.log("here");
	// get value from html buttons

	let ID = document.getElementById("OrderSearID").value;
	let Province = document.getElementById("OrderSearProvince").value;
	let City = document.getElementById("OrderSearCity").value;
	let SellTo = document.getElementById("OrderSearSellTo").value;
	let ProductID = document.getElementById("OrderSearProductID").value;
	let QuantityMax = document.getElementById("OrderSearQuantityMax").value;
	let QuantityMin = document.getElementById("OrderSearQuantityMin").value;
	let OrderUnitPriceMax = document.getElementById("OrderSearOrderUnitPriceMax").value;
	let OrderUnitPriceMin = document.getElementById("OrderSearOrderUnitPriceMin").value;
	let Driver = document.getElementById("OrderSearDriver").value;
	let DateOfOrderMax = document.getElementById("OrderSearDateOfOrderMax").value;
	let DateOfOrderMin = document.getElementById("OrderSearDateOfOrderMin").value;
	let ArriveDeadlineMax = document.getElementById("OrderSearArriveDeadlineMax").value;
	let ArriveDeadlineMin = document.getElementById("OrderSearArriveDeadlineMin").value;
	let DateArrivedMax = document.getElementById("OrderSearDateArrivedMax").value;
	let DateArrivedMin = document.getElementById("OrderSearDateArrivedMin").value;


	let request = {};

	//only assign attribute that is not null or empty to request
	if (ID != null && ID != "") request.ID = ID;
	if (Province != null && Province != "") request.Province = Province;
	if (City != null && City != "") request.City = City;
	// if (Position != null && Position != "") request.Position = Position;
	if (SellTo != null && SellTo != "") request.SellTo = SellTo;
	if (ProductID != null && ProductID != "") request.ProductID = ProductID;
	if (QuantityMax != null && QuantityMax != "") request.QuantityMax = QuantityMax;
	if (QuantityMin != null && QuantityMin != "") request.QuantityMin = QuantityMin;
	if (OrderUnitPriceMin != null && OrderUnitPriceMin != "") request.OrderUnitPriceMin = OrderUnitPriceMin;
	if (OrderUnitPriceMax != null && OrderUnitPriceMax != "") request.OrderUnitPriceMax = OrderUnitPriceMax;
	if (Driver != null && Driver != "") request.Driver = Driver;
	if (DateOfOrderMax != null && DateOfOrderMax != "") request.DateOfOrderMax = DateOfOrderMax;
	if (DateOfOrderMin != null && DateOfOrderMin != "") request.DateOfOrderMin = DateOfOrderMin;
	if (ArriveDeadlineMax != null && ArriveDeadlineMax != "") request.ArriveDeadlineMax = ArriveDeadlineMax;
	if (ArriveDeadlineMin != null && ArriveDeadlineMin != "") request.ArriveDeadlineMin = ArriveDeadlineMin;
	if (DateArrivedMax != null && DateArrivedMax != "") request.DateArrivedMax = DateArrivedMax;
	if (DateArrivedMin != null && DateArrivedMin != "") request.DateArrivedMin = DateArrivedMin;

	let url = "http://localhost:8090/api/Order/search";

	$.ajax({
		method: "POST",
		url: "http://localhost:8090/api/Order/search",
		data: request,
		dataType: 'json',
		success: function (res) {
			console.log(res)
			if (res) {
				let tableBody = $('#Order-table-body-1');
				console.log(tableBody)
				tableBody.empty();
				let html = '';
				res.forEach((item, index) => { // !!!!!!there is a [0] on the left of res!!!!!!!!!!!
					//                               you can try remove it in your case if this doesn't work
					// let addr = ''

					// if(item.Province != null && item.Province != '')addr+=item.Province+','					
					// if(item.City != null && item.City != '')addr+=item.City+','					
					// if(item.District != null && item.District != '')addr+=item.District+','					
					// if(item.Street != null && item.Street != '')addr+=item.Street+','					
					// if(item.ZipCode != null && item.ZipCode != '')addr+=item.ZipCode
					// if(addr.charAt(addr.length-1) == ',')addr = addr.substring(0, addr.length-2)
					// let BirthTime = ''
					// if(item.BirthMonth != null && item.BirthMonth !=''){
					// 	BirthTime+=item.BirthMonth
					// 	if(item.BirthYear != null && item.BirthYear !='')BirthTime+='/'+item.BirthYear
					// }else if(item.BirthYear != null && item.BirthYear !=''){
					// 	BirthTime = item.BirthYear
					// }
					// let EmployedTime = ''
					// if(item.EmployedMonth != null && item.EmployedMonth !=''){
					// 	EmployedTime+=item.EmployedMonth
					// 	if(item.EmployedYear != null && item.EmployedYear !='')EmployedTime+='/'+item.EmployedYear
					// }else if(item.EmployedYear != null && item.EmployedYear !=''){
					// 	EmployedTime = item.EmployedYear
					// }

					// if(item.Position == null)item.Position = ''
					// if(item.Manager == null)item.Manager = ''
					// if(item.Salary == null)item.Salary = ''
					// if(item.CreditCardNumber == null)item.CreditCardNumber = ''
					html += `<tr>
                    <td  class = "ID">${item.ID}</td>
                    <td  class = "ProductID">${item.ProductID}</td>
                    <td  class = "Product">${item.Product}</td>
                    <td  class = "Quantity">${item.Quantity}</td>
                    <td  class = "OrderUnitPrice">${item.OrderUnitPrice}</td>
                    <td  class = "DateOfOrder">${item.DateOfOrder}</td>
                    <td  class = "Driver">${item.Driver}</td>
                    <td  class = "SellTo">${item.SellTo}</td>
                    <td  class = "ShippingAddress">${item.Province}, ${item.City}, ${item.District}, ${item.Street}, ${item.ZipCode}</td>
                    <td  class = "ArriveDeadline">${item.ArriveDeadline}</td>
                    <td  class = "DateArrived">${item.DateArrived}</td>
                    <td>
                    <div class="dropdown pull-xs-right">
                    <button class="btn bmd-btn-icon dropdown-toggle" type="button" id="lr1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i class="material-icons">more_vert</i>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="lr1">
                      <button  class="dropdown-item" type="button" data-toggle="modal" onclick='onUpdateOrder1(${JSON.stringify(item)}, ${index})' data-target="#editOrderDialog">
                      <i class="material-icons">edit</i>&nbsp;&nbsp;&nbsp;Edit</button>
                      
                      <button id = "${item.ID}" class="dropdown-item" type="button" onClick="onOrderDelete(this.id)" data-toggle="modal" data-target="#deleteOrderDialog"><i class="material-icons">delete</i>&nbsp;&nbsp;&nbsp;Delete</button>
                    </div>
                  </div>
                  
                  </td>                  
                </tr>`;
				});

				tableBody.html(html);
			}
		},
		complete: function () {
			console.log("completed")
		}
	});

	return false;
}



//Delete Order__________________________________________________________________________________________________________________________________________________________________________________
function onOrderDelete(ID) {

	let request = {
		ID
	}

	console.log(request);

	$.ajax({
		method: 'post',
		dataType: 'json',
		url: "http://localhost:8090/api/Order/delete",
		dataType: 'json',
		data: request,
		success: (res) => {
			if (res.code === 0) {
				window.location.reload();
			}
			alert(res.msg);
		},
		complete: function () {
			$('#order-delete-btn').removeClass('disabled');

		}
	})


	return false;

}


//Update Order__________________________________________________________________________________________________________________________________________________________________________________



// call GetOrder() here to directly show data___________________________________________________________________________________________________________________________________________________
GetOrder();