
//Get Company_____________________________________________________________________________________________________________________________________________________________________________________

function GetCompany() {
    let url = "http://localhost:8090/api/Company";
    $.ajax({
        method: "GET",
        url: url,
        dataType: "json",
        success: function (res) {

            if (res) {
                let tableBody = $('#company-table-body-1');
                tableBody.empty();
                let html = '';
                res.forEach((item, index) => {
                    html += `<tr>
                    <td class="NameCompany" >${item.Name}</td>
                    <td class="Field" >${item.Field}</td>
                    <td class="RepName" >${item.RepName}</td>
                    <td class="RepNumber" >${item.RepNumber}</td>
                    <td class="ProvinceCompany" >${item.Province}</td>
                    <td class="CityCompany" >${item.City}</td>
                    <td class="DistrictCompany" >${item.District}</td>
                    <td class="RegDate" >${item.RegDate}</td>
                    <td class="Type" >${item.Type}</td>
                    <td class="LevlOfInterest" >${item.LevelOfInterest}</td>
                    <td class="Notes1" >${item.Notes1}</td>
                    <td class="Notes2" >${item.Notes2}</td>
                    <td class="Notes3" >${item.Notes3}</td>
                    <td>
                    <div class="dropdown pull-xs-right">
                    <button class="btn bmd-btn-icon dropdown-toggle" type="button" id="lr1" onClick="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i class="material-icons">more_vert</i>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="lr1">
                    
                      <button id="menuEdit" class="dropdown-item" type="button" data-toggle="modal" onclick='onUpdateCompany1(${JSON.stringify(item)}, ${index})' data-target="#editCompanyDialog">
                      <i class="material-icons">edit</i>&nbsp;&nbsp;&nbsp;Edit</button>
                      
                      <button id = "${item.Name}" class="dropdown-item" type="button" onClick="onCompanyDelete(this.id)" data-toggle="modal" data-target="#deleteCompanyDialog"><i class="material-icons">delete</i>&nbsp;&nbsp;&nbsp;Delete</button>
                    </div>
                  </div>
                  
                  </td>                  
                </tr>`;
                });

                tableBody.html(html);
            }

          //  console.log(res);
        },
        complete: function () {

        }
    })
}

//Search Company__________________________________________________________________________________________________________________________________________________________________________________

function onSearchCompany(event){

    // get value from html buttons
	let Name = document.getElementById("compName").value;
  let Field =  document.getElementById("compField").value;
	let Province = document.getElementById("compProvince").value;
  let RepName = document.getElementById("compRepName").value;
  let RepNumber = document.getElementById("compRepNumber").value;
  let RegDateMax = document.getElementById("compRegDateMax").value;
  let RegDateMin = document.getElementById("compRegDateMin").value;
  let District = document.getElementById("compDistrict").value;
	let City = document.getElementById("compCity").value;
  let LOIMax = document.getElementById("compLOIMax").value;
  let LOIMin = document.getElementById("compLOIMin").value;
  let Type = document.getElementById("compType").value;


    let request = {};

    //only assign attribute that is not null or empty to request
  if (Name != null && Name != "") request.Name = Name;
	if (Province != null && Province != "") request.Province = Province;
	if (City != null && City != "") request.City = City;
	if (Field != null && Field != "") request.Field = Field;
	if (RepName != null && RepName != "") request.RepName = RepName;
	if (RepNumber != null && RepNumber != "") request.RepNumber = RepNumber;
	if (RegDateMax != null && RegDateMax != "") request.RegDateMax = RegDateMax;
	if (RegDateMin != null && RegDateMin != "") request.RegDateMin = RegDateMin;
	if (District != null && District != "") request.District = District;
	if (LOIMax != null && LOIMax != "") request.LOIMax = LOIMax;
  if (LOIMin != null && LOIMin != "") request.LOIMin = LOIMin;
  if (Type != null && Type != "") request.Type = Type;

    let url = "http://localhost:8090/api/Company/search";

    $.ajax({
		method: "POST",
		url:"http://localhost:8090/api/Company/search",
		data: request,
		dataType: 'json',
		success: function(res) {
			console.log("success = ", res);
            if (res) {
                let tableBody = $('#company-table-body-1');
                tableBody.empty();
                let html = '';
                res.forEach((item, index) => {

                  // if(Name==null)item.Name = ''
                  // if(Province==null)item.Province=''
                  // if(City==null)item.City = ''
                  // if(Field==null) item.Field = ''
                  // if(RepName==null) item.RepName = ''
                  // if(RepNumber==null) item.RepNumber = ''
                  // if(RegDate==null) item.RegDate = ''
                  // if(District==null) item.District = ''
                  // if(LevelOfInterest==null) item.LevelOfInterest = ''                
                
					html += `<tr>
                      <td class="NameCompany" >${item.Name}</td>
                      <td class="Field" >${item.Field}</td>
                      <td class="RepName" >${item.RepName}</td>
                      <td class="RepNumber" >${item.RepNumber}</td>
                      <td class="ProvinceCompany" >${item.Province}</td>
                      <td class="CityCompany" >${item.City}</td>
                      <td class="DistrictCompany" >${item.District}</td>
                      <td class="RegDate" >${item.RegDate}</td>
                      <td class="Type" >${item.Type}</td>
                      <td class="LevelOfInterest" >${item.LevelOfInterest}</td>
                      <td class="Notes1" >${item.Notes1}</td>
                      <td class="Notes2" >${item.Notes2}</td>
                      <td class="Notes3" >${item.Notes3}</td>
                      <td>
                    <div class="dropdown pull-xs-right">
                    <button class="btn bmd-btn-icon dropdown-toggle" type="button" id="lr1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i class="material-icons">more_vert</i>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="lr1">
                      <button  class="dropdown-item" type="button" data-toggle="modal" onclick='onUpdateCompany1(${JSON.stringify(item)}, ${index})' data-target="#editCompanyDialog">
                      <i class="material-icons">edit</i>&nbsp;&nbsp;&nbsp;Edit</button>
                      
                      <button id = "${item.Name}" class="dropdown-item" type="button" onClick="onCompanyDelete(this.id)" data-toggle="modal" data-target="#deleteCompanyDialog"><i class="material-icons">delete</i>&nbsp;&nbsp;&nbsp;Delete</button>
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

//Add Company_____________________________________________________________________________________________________________________________________________________________________________________

function onInsertCompany(event) {
    console.log("Attempting insert company");

	// get value from html buttons
	  let Name = document.getElementById("inputAddNameCompany").value;
    let Field = document.getElementById("inputAddFieldCompany").value;
    let RepName = document.getElementById("inputAddRepNameCompany").value; 
    let RepNumber = document.getElementById("inputAddRepNumberCompany").value;
    let Province = document.getElementById("inputAddProvinceCompany").value;
    let District = document.getElementById("inputAddDistrictCompany").value;
    let City = document.getElementById("inputAddCityCompany").value;
    let RegDate = document.getElementById("inputAddRegDateCompany").value;
    let Type = document.getElementById("inputAddTypeCompany").value;
    let LevelOfInterest = document.getElementById("inputAddLevelsOfInterestCompany").value;
    let Notes1 = document.getElementById("inputAddNotes1Company").value;
    let Notes2 = document.getElementById("inputAddNotes2Company").value;
    let Notes3 = document.getElementById("inputAddNotes3Company").value;
    

	let request = {};
    
    console.log(Name);
    if(Name!= null && Name != "")request.Name  = Name; 
    if(Field!= null && Field != "")request.Field  = Field; 
    if(RepName!= null && RepName != "")request.RepName  = RepName; 
    if(RepNumber!= null && RepNumber != "")request.RepNumber  = RepNumber; 
    if(Province != null && Province !="")request.Province = Province;
	  if(City != null && City !="")request.City = City;
	  if(District != null && District !="")request.District = District;
    if(RegDate!= null && RegDate != "")request.RegDate  = RegDate; 
    if(Type!= null && Type != "")request.Type  = Type; 
    if(LevelOfInterest!= null && LevelOfInterest != "")request.LevelOfInterest  = LevelOfInterest; 
    if(Notes1!= null && Notes1 != "")request.Notes1  = Notes1; 
    if(Notes2!= null && Notes2 != "")request.Notes2  = Notes2;  
    if(Notes3!= null && Notes3 != "")request.Notes3  = Notes3; 
    
	

	let url ="http://localhost:8090/api/Company/add" ;

	//$('#submitAddCompany').addClass('disabled');

	$.ajax({
		method: "POST",
		url:"http://localhost:8090/api/Company/add",
		data: request,
		dataType: 'json',
		success: function(res) {
			console.log("success = ", res);
      if (res.code === 0) {
        alert('Company added!');
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

//Delete Company__________________________________________________________________________________________________________________________________________________________________________________


function onCompanyDelete(Name) {
	//event.preventDefault();

	//let SSN = document.getElementById("t_SSN_delete").value;

	let request = {
        Name
	}

	let url ="http://localhost:8090/api/Company/delete" ;



	$.ajax({
		method: "POST",
		url:"http://localhost:8090/api/Company/delete" ,
		data: request,
		dataType: 'json',
    success: function(res) {
			console.log("success = ", res);
      if (res.code === 0) {
        window.location.reload();
        alert('Company deleted!');
      }else{
        alert(res.msg);
      }
		},
		complete: function() {
		
		}
	});

	window.location.reload();
	return false;

}


//Update Company__________________________________________________________________________________________________________________________________________________________________________________

function onUpdateCompany() {

  let Name = $('#editCompanyDialog #inputNameCompany').val();
  if (Name !== "") {

	  
    let request = {};
    request.Name = Name;

	let Province = $('#editCompanyDialog #inputEditProvince').val();
	let City = $('#editCompanyDialog #inputEditCity').val();
	let District = $('#editCompanyDialog #inputEditDistrict').val();
	let Field = $('#editCompanyDialog #inputFieldCompany').val();
	let RepName = $('#editCompanyDialog #inputRepNameCompany').val();
	let RepNumber = 	$('#editCompanyDialog #inputRepNumberCompany').val();
	let RegDate = $('#editCompanyDialog #inputRegDateCompany').val();
	let Type = $('#editCompanyDialog #inputTypeCompany').val();
	let LevelOfInterest = $('#editCompanyDialog #inputLevelsOfInterestCompany').val();
	let Notes1 = $('#editCompanyDialog #inputNotes1Company').val();
	let Notes2 = $('#editCompanyDialog #inputNotes2Company').val();
	let Notes3 =	$('#editCompanyDialog #inputNotes3Company').val();
	  
    console.log(request);
    console.log(Name);
    if(Name!= null && Name != "")request.Name  = Name; 
    if(Field!= null && Field != "")request.Field  = Field; 
    if(RepName!= null && RepName != "")request.RepName  = RepName; 
    if(RepNumber!= null && RepNumber != "")request.RepNumber  = RepNumber; 
    if(Province != null && Province !="")request.Province = Province;
	  if(City != null && City !="")request.City = City;
	  if(District != null && District !="")request.District = District;
    if(RegDate!= null && RegDate != "")request.RegDate  = RegDate; 
    if(Type!= null && Type != "")request.Type  = Type; 
    if(LevelOfInterest!= null && LevelOfInterest != "")request.LevelOfInterest  = LevelOfInterest; 
    if(Notes1!= null && Notes1 != "")request.Notes1  = Notes1; 
    if(Notes2!= null && Notes2 != "")request.Notes2  = Notes2;  
    if(Notes3!= null && Notes3 != "")request.Notes3  = Notes3; 
    
 
		  let url = "http://localhost:8090/api/Company/update";
	   
			  $.ajax({
			   method: "POST",
			   url:"http://localhost:8090/api/Company/update",
			   data: request,
			   dataType: 'json',
			   success: function(res) {
          console.log("success = ", res);
          if (res.code === 0) {
            window.location.reload();
            alert(`The company: ${Name} was updated!`);
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

    console.log("update company clicked");

   

}

function onUpdateCompany1(item, index) {
	let name = item.name;

	$('#editCompanyDialog #inputNameCompany').val(item.Name);
	$('#editCompanyDialog #inputFieldCompany').val(item.Field);
	$('#editCompanyDialog #inputRepNameCompany').val(item.RepName);
	$('#editCompanyDialog #inputRepNumberCompany').val(item.RepNumber);


	// let addrArr = item.Address.split(",");
	// let province = "";
	// let city = "";
	// let district = "";

	// if(addrArr.length>1){
	// 	province = addrArr[0].trim();
	// 	city = addrArr[1].trim();
	// 	district = addrArr[2].trim();
	// }

	$('#editCompanyDialog #inputEditProvince').val(item.province);
	$('#editCompanyDialog #inputEditCity').val(item.city);
	$('#editCompanyDialog #inputEditDistrict').val(item.district);
  $('#editCompanyDialog #inputRegDateCompany').val(item.RegDate);
  $('#editCompanyDialog #inputTypeCompany').val(item.Type);
  $('#editCompanyDialog #inputLevelsOfInterestCompany').val(item.LevelOfInterest);
  $('#editCompanyDialog #inputNotes1Company').val(item.Notes1);
  $('#editCompanyDialog #inputNotes2Company').val(item.Notes2);
  $('#editCompanyDialog #inputNotes3Company').val(item.Notes3);

}




// call GetCompany() here to directly show data___________________________________________________________________________________________________________________________________________________
GetCompany();