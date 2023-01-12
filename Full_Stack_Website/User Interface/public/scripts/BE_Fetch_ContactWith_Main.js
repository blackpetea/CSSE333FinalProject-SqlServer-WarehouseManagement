
//Get ContactWith_____________________________________________________________________________________________________________________________________________________________________
function GetContactWith() {
    let url = "http://localhost:8090/api/ContactWith";
    $.ajax({
        method: "GET",
        url: url,
        dataType: "json",
        success: function (res) {

            if (res) {
                let tableBody = $('#contactWith-table-body-1');
                tableBody.empty();
                let html = '';
                res.forEach((item, index) => {
					// console.log(item);
					let id = `${item.Contacter},${item.Company}`;
                    html += `<tr>
					<th class="Company" scope="col">${item.Company}</th>
					<th class="Representative" scope="col">${item.Representative}</th>
					<th class="RepNumber" scope="col">${item.RepNumber}</th>
					<th class="Contacter" scope="col">${item.Contacter}</th>
					<th class="ContacterNumber" scope="col">${item.ContacterNumber}</th>
					<th class="LevelOfInterest" scope="col">${item.LevelOfInterest}</th>
                    <td>
                    <div class="dropdown pull-xs-right">
                    <button class="btn bmd-btn-icon dropdown-toggle" type="button" id="lr1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i class="material-icons">more_vert</i>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="lr1">
                      <button id="${id}" class="dropdown-item" type="button"" onClick="onContactWithDelete(this.id)" data-toggle="modal" data-target="#deleteContactWithDialog">
					  <i class="material-icons">delete</i>&nbsp;&nbsp;&nbsp;Delete</button>
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



//Search ContactWith_____________________________________________________________________________________________________________________________________________________________________


function onSearchContactWith(event) {

    // get value from html buttons
	let contacter = document.getElementById("contactWithSearContacter").value;
    let company = document.getElementById("contactWithSearCompany").value;
	let levelofinterest = document.getElementById("contactWithSearLevelOfInterest").value;

    let request = {};

    //only assign attribute that is not null or empty to request
    if (contacter != null && contacter != "") request.Contacter = contacter;
	if (company != null && company != "") request.Company = company;
	if (levelofinterest != null && levelofinterest != "") request.LevelOfInterest = levelofinterest;

    let url = "http://localhost:8090/api/ContactWith/search";

    $.ajax({
		method: "POST",
		url:"http://localhost:8090/api/ContactWith/search",
		data: request,
		dataType: 'json',
		success: function(res) {
			console.log("success = ", res);
            if (res) {
                let tableBody = $('#contactWith-table-body-1');
                tableBody.empty();
                let html = '';
                res.forEach((item, index) => {             
                
					let id = `${item.Contacter},${item.Company}`;
                    html += `<tr>
					<th class="Company" scope="col">${item.Company}</th>
					<th class="Representative" scope="col">${item.Representative}</th>
					<th class="RepNumber" scope="col">${item.RepNumber}</th>
					<th class="Contacter" scope="col">${item.Contacter}</th>
					<th class="ContacterNumber" scope="col">${item.ContacterNumber}</th>
					<th class="LevelOfInterest" scope="col">${item.LevelOfInterest}</th>
                    <td>
                    <div class="dropdown pull-xs-right">
                    <button class="btn bmd-btn-icon dropdown-toggle" type="button" id="lr1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i class="material-icons">more_vert</i>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="lr1">
                      <button id="${id}" class="dropdown-item" type="button"" onClick="onContactWithDelete(this.id)" data-toggle="modal" data-target="#deleteContactWithDialog">
					  <i class="material-icons">delete</i>&nbsp;&nbsp;&nbsp;Delete</button>
                    </div>
                  </div>
                  
                  </td>                  
                </tr>`;
                });

                tableBody.html(html);
            }
		},
		complete: function() {
            console.log("completed")
		}
	});

    return false;
}

//Add ContactWith_____________________________________________________________________________________________________________________________________________________________________

function onInsert(event) {

	// get value from html buttons
	let Contacter = document.getElementById("inputAddContacter").value;
	let Company = document.getElementById("inputAddCompany").value;

	let request = {Contacter, Company};
	console.log(request);

	//only assign attribute that is not null or empty to request
	// if(contacter != null && contacter !="")request.Contacter = contacter;
	// if(company != null && company !="")request.Company = company;


	//$('#submitAddContactWith').addClass('disabled');

	$.ajax({
		method:'post',
		dataType:'json',
		url:"http://localhost:8090/api/ContactWith/add",
		dataType:'json',
		data: request,
		success:(res) => {
			console.log(res);
			if (res.code === 0) {
				window.location.reload();
				alert('Add sucessful!');
			} else {
				alert(res.msg);
			}
		},
		complete: function() {
		//	$('#submitAddContactWith').removeClass('disabled');
		}
	});
	return false;
}

//Delete ContactWith_____________________________________________________________________________________________________________________________________________________________________
//need to use both name and company for now
function onContactWithDelete(id) {
	//event.preventDefault();

	// let Contacter = document.getElementById("input").value;
	
	console.log(id);
	let array = id.split(",");
	let Contacter = array[0];
	let Company = array[1];

	let request = {
		Contacter,
		Company
	}
	// request.ContacterName = Contacter;
	// request.CompanyName = Company;

	// let url ="http://localhost:8090/api/ContactWith/delete" ;

	// $('#contactWith-delete-btn').addClass('disabled');

	// $.ajax({
	// 	method: "POST",
	// 	url,
	// 	data: request,
	// 	dataType: 'json',
	// 	success: function(res) {
	// 		console.log("success = ", res);
	// 	},
	// 	complete: function() {
	// 		$('#contactWith-delete-btn').removeClass('disabled');
			
	// 	}
	// });

	console.log(request);

	$.ajax({
		method:'post',
		dataType:'json',
		url:"http://localhost:8090/api/ContactWith/delete",
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
			$('#contactWith-delete-btn').removeClass('disabled');
			
		}
	})

	
	return false;

}

// call GetContactWith() here to directly show data_____________________________________________________________________________________________________________________________________________________________________
GetContactWith();