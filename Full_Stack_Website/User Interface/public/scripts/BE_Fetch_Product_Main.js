
//Get Product_____________________________________________________________________________________________________________________________________________________________________


function GetProduct() {
    let url = "http://localhost:8090/api/Product";
    $.ajax({
        method: "GET",
        url: url,
        dataType: "json",
        success: function(res) {

            if (res) {
                let tableBody = $('#product-table-body-1');
                tableBody.empty();
                let html = '';
                res.forEach((item, index) => {
                    let id = `${item.Name},${item.MadeBy}`;
                    html += `<tr>
                    <td class = "NameProduct">${item.Name}</td>
                    <td class = "BuyingCost">${item.BuyingCost}</td>
                    <td class = "SellPrice">${item.SellPrice}</td>
                    <td class = "Description">${item.Description}</td>
                    <td class = "StockQuantity">${item.StockQuantity}</td>
                    <td class = "CompanyProduct">${item.MadeBy}</td>
                    <td>
                    <div class="dropdown pull-xs-right">
                    <button class="btn bmd-btn-icon dropdown-toggle" type="button" id="lr1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i class="material-icons">more_vert</i>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="lr1">
                      <button  class="dropdown-item" type="button" data-toggle="modal" onclick='onUpdateProduct1(${JSON.stringify(item)}, ${index})' data-target="#editProductDialog">
                      <i class="material-icons">edit</i>&nbsp;&nbsp;&nbsp;Edit</button>
                      
                      <button id = "${id}" class="dropdown-item" type="button" onClick="onProductDelete(this.id)" data-toggle="modal" data-target="#deleteProductDialog"><i class="material-icons">delete</i>&nbsp;&nbsp;&nbsp;Delete</button>
                    </div>
                  </div>
                  
                  </td>    
                </tr>`;
                });
               // console.log("here is test" + html);
                tableBody.html(html);
            }
            
           // console.log(res);
        },
        complete: function() {

        }
    })
}

//Search Product_____________________________________________________________________________________________________________________________________________________________________

function onSearchProduct(event) {
    // get value from html buttons
    let Name = document.getElementById("productName").value;
    let BuyingCost = document.getElementById("buyingCostProduct").value;
    let SellPrice = document.getElementById("sellPriceProduct").value;
    let StockQuantity = document.getElementById("stockQuantity").value;
    let MadeBy = document.getElementById("companyProduct").value;

    let request = {};

    //only assign attribute that is not null or empty to request
    if (Name != null && Name != "") request.Name = Name;
    if (BuyingCost != null && BuyingCost != "") request.BuyingCost = BuyingCost;
    if (SellPrice != null && SellPrice != "") request.SellPrice = SellPrice;
    if (StockQuantity != null && StockQuantity != "") request.StockQuantity = StockQuantity;
    if (MadeBy != null && MadeBy != "") request.MadeBy = MadeBy;
   

    let url = "http://localhost:8090/api/Product/search";

    $.ajax({
		method: "POST",
		url:"http://localhost:8090/api/Product/search",
		data: request,
		dataType: 'json',
		success: function(res) {
			console.log("success = ", res);
            if (res) {
                let tableBody = $('#product-table-body-1');
                tableBody.empty();
                let html = '';
                res.forEach((item, index) => {
                    let id = `${item.Name},${item.MadeBy}`;
                    html += `<tr>
                    <td>${item.Name}</td>
                    <td>${item.BuyingCost}</td>
                    <td>${item.SellPrice}</td>
                    <td>${item.Description}</td>
                    <td>${item.StockQuantity}</td>
                    <td>${item.MadeBy}</td>
                    <td>
                    <div class="dropdown pull-xs-right">
                    <button class="btn bmd-btn-icon dropdown-toggle" type="button" id="lr1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i class="material-icons">more_vert</i>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="lr1">
                      <button  class="dropdown-item" type="button" data-toggle="modal" onclick='onUpdateProduct1(${JSON.stringify(item)}, ${index})' data-target="#editProductDialog">
                      <i class="material-icons">edit</i>&nbsp;&nbsp;&nbsp;Edit</button>
                      
                      <button id = "${id}" class="dropdown-item" type="button" onClick="onProductDelete(this.id)" data-toggle="modal" data-target="#deleteProductDialog"><i class="material-icons">delete</i>&nbsp;&nbsp;&nbsp;Delete</button>
                    </div>
                  </div>
                  
                  </td>   
                </tr>`;
                });
                console.log("here is test" + html);
                tableBody.html(html);
            }
		},
		complete: function() {
            console.log("completed")
		}
	});

 

    return false;
}

//Add Product_____________________________________________________________________________________________________________________________________________________________________

function onInsertProduct(event) {

	// get value from html buttons
	let Product = document.getElementById("inputAddProduct").value;
	let BuyingCost = document.getElementById("inputAddBuyingCost").value;
	let SellPrice = document.getElementById("inputAddSellPrice").value;
	let Description = document.getElementById("inputAddDescription").value;
	let StockQuantity = document.getElementById("inputAddStockQuantity").value;
    let MadeBy = document.getElementById("inputAddCompanyProduct").value;

	let request = {};

	//only assign attribute that is not null or empty to request
	if(Product != null && Product !="")request.Name = Product;
	if(BuyingCost != null && BuyingCost !="")request.BuyingCost = BuyingCost;
	if(SellPrice != null && SellPrice !="")request.SellPrice = SellPrice;
	if(Description != null && Description !="")request.Description = Description;
	if(StockQuantity != null && StockQuantity !="")request.StockQuantity = StockQuantity;
	if(MadeBy != null && MadeBy !="")request.MadeBy = MadeBy;
	

	let url ="http://localhost:8090/api/Product/add" ;

	$('#product-insert-btn').addClass('disabled');

	$.ajax({
		method: "POST",
		url:"http://localhost:8090/api/Product/add",
		data: request,
		dataType: 'json',
		success: function(res) {
			console.log("success = ", res);
      if (res.code === 0) {
        alert('Product added!');
      }else{
        alert(res.msg);
      }
		},
		complete: function() {
			//$('#submitAddCompany').removeClass('disabled');
			
		}
	});
	//window.location.reload();
	//no use if just comment out this without the window reload
	//event.preventDefault();

	return false;
}

//Delete Product_____________________________________________________________________________________________________________________________________________________________________


function onProductDelete(id) {
	
	console.log(id);
	let array = id.split(",");
	let Name = array[0];
	let MadeBy = array[1];

	let request = {
		Name,
		MadeBy
	}


	console.log(request);

	$.ajax({
		method:'post',
		dataType:'json',
		url:"http://localhost:8090/api/Product/delete",
		dataType:'json',
		data: request,
		success:(res) => {
			if (res.code === 0) {
				window.location.reload();
				alert('Delete sucessful!');
			} else {
				alert(res.msg);
			}
		},
		complete: function() {
			$('#product-delete-btn').removeClass('disabled');
			
		}
	})

	
	return false;

}

//Update Product_____________________________________________________________________________________________________________________________________________________________________
function onUpdateProduct() {

  let Name = $('#editProductDialog #inputEditProduct').val();
  let MadeBy =  $('#editProductDialog #inputEditCompanyProduct').val();
  if (Name !== "" && MadeBy !=="") {

	  
    let request = {};
    request.Name = Name;
    request.MadeBy = MadeBy;

	let BuyingCost = $('#editProductDialog #inputEditBuyingCost').val();
	let SellPrice = $('#editProductDialog #inputEditSellPrice').val();
	let Description = $('#editProductDialog #inputEditDescription').val();
	let StockQuantity = $('#editProductDialog #inputEditStockQuantity').val();

	  
    console.log(request);
    console.log(Name);
    if(Name != null && Name !="")request.Name = Name;
    if(BuyingCost != null && BuyingCost !="")request.BuyingCost = BuyingCost;
    if(SellPrice != null && SellPrice !="")request.SellPrice = SellPrice;
    if(Description != null && Description !="")request.Description = Description;
    if(StockQuantity != null && StockQuantity !="")request.StockQuantity = StockQuantity;
    if(MadeBy != null && MadeBy !="")request.MadeBy = MadeBy;

    
 
		  let url = "http://localhost:8090/api/Product/update";
	   
			  $.ajax({
			   method: "POST",
			   url:"http://localhost:8090/api/Product/update",
			   data: request,
			   dataType: 'json',
			   success: function(res) {
          console.log("success = ", res);
          if (res.code === 0) {
            window.location.reload();
            alert(`The product: ${Name} with company: ${MadeBy} was updated!`);
          }else{
            alert(res.msg);
          }
			   },
			   complete: function() {
			   }
		   });
	   
		 // window.location.reload();
		   return false;

      }else{
        //create
      }

    console.log("update product clicked");

   

}

function onUpdateProduct1(item, index) {
	let name = item.Name;
  let MadeBy = item.MadeBy;
	$('#editProductDialog #inputEditProduct').val(item.Name);
	$('#editProductDialog #inputEditBuyingCost').val(item.BuyingCost);
	$('#editProductDialog #inputEditSellPrice').val(item.SellPrice);
	$('#editProductDialog #inputEditDescription').val(item.Description);
	$('#editProductDialog #inputEditStockQuantity').val(item.StockQuantity);
	$('#editProductDialog #inputEditCompanyProduct').val(item.MadeBy);
}

// call GetProduct() here to directly show data_____________________________________________________________________________________________________________________________________________________________________
GetProduct();