
//Get Employee_____________________________________________________________________________________________________________________________________________________________________
function GetEmployee() {
    let url = "http://localhost:8090/api/Employee";
    $.ajax({
        method: "GET",
        url: url,
        dataType: "json",
        success: function (res) {

            if (res) {
                let tableBody = $('#employee-table-body-1');
                tableBody.empty();
                let html = '';
                res.forEach((item, index) => {

					let addr = ''

					if(item.Province != null && item.Province != '')addr+=item.Province+','					
					if(item.City != null && item.City != '')addr+=item.City+','					
					if(item.District != null && item.District != '')addr+=item.District+','					
					if(item.Street != null && item.Street != '')addr+=item.Street+','					
					if(item.ZipCode != null && item.ZipCode != '')addr+=item.ZipCode
					if(addr.charAt(addr.length-1) == ',')addr = addr.substring(0, addr.length-2)
					let BirthTime = ''
					if(item.BirthMonth != null && item.BirthMonth !=''){
						BirthTime+=item.BirthMonth
						if(item.BirthYear != null && item.BirthYear !='')BirthTime+='/'+item.BirthYear
					}else if(item.BirthYear != null && item.BirthYear !=''){
						BirthTime = item.BirthYear
					}
					let EmployedTime = ''
					if(item.EmployedMonth != null && item.EmployedMonth !=''){
						EmployedTime+=item.EmployedMonth
						if(item.EmployedYear != null && item.EmployedYear !='')EmployedTime+='/'+item.EmployedYear
					}else if(item.EmployedYear != null && item.EmployedYear !=''){
						EmployedTime = item.EmployedYear
					}

					if(item.Position == null)item.Position = ''
					if(item.Manager == null)item.Manager = ''
					if(item.Salary == null)item.Salary = ''
					if(item.CreditCardNumber == null)item.CreditCardNumber = ''
                    html += `<tr>
					<td  class = "Name">${item.Name}</td>
					<td  class = "Position">${item.Position}</td>
					<td class = "PhoneNumber" >${item.PhoneNumber}</td>
					<td  class = "SSN">${item.SSN}</td>
                    <td  class = "Address">${addr}</td>
                    <td  class = "EmployedTime">${EmployedTime}</td>
					<td  class = "BirthTime" >${BirthTime}</td>
                    <td class = "Salary" >${item.Salary}</td>
                    <td class = "CreditCardNumber" >${item.CreditCardNumber}</td>
					<td class = "Manager" >${item.Manager}</td>
                    <td>
                    <div class="dropdown pull-xs-right">
                    <button class="btn bmd-btn-icon dropdown-toggle" type="button" id="lr1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i class="material-icons">more_vert</i>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="lr1">
                      <button  class="dropdown-item" type="button" data-toggle="modal" onclick='onUpdateEmployee1(${JSON.stringify(item)}, ${index})' data-target="#editEmployeeDialog">
                      <i class="material-icons">edit</i>&nbsp;&nbsp;&nbsp;Edit</button>
                      
                      <button id = "${item.SSN}" class="dropdown-item" type="button" onClick="onEmployeeDelete(this.id)" data-toggle="modal" data-target="#deleteEmployeeDialog"><i class="material-icons">delete</i>&nbsp;&nbsp;&nbsp;Delete</button>
                    </div>
                  </div>
                  
                  </td>                  
                </tr>`;
                });

				

                tableBody.html(html);
            }

          
        },
        complete: function () {

        }
    })
}



//Search Employee_____________________________________________________________________________________________________________________________________________________________________


function onSearchEmployee(event) {

    // get value from html buttons
    let SSN = document.getElementById("empSearSSN").value;
	let Name = document.getElementById("empSearName").value;
	let Province = document.getElementById("empSearProvince").value;
	let City = document.getElementById("empSearCity").value;
	let Position = document.getElementById("empSearPosition").value;
	let EmployedYearMax = document.getElementById("empSearEmployedYearMax").value;
	let EmployedYearMin = document.getElementById("empSearEmployedYearMin").value;
	let BirthYearMax = document.getElementById("empSearBirthYearMax").value;
	let BirthYearMin = document.getElementById("empSearBirthYearMin").value;
	let PhoneNumber = document.getElementById("empSearPhoneNumber").value;
	let SalaryMax = document.getElementById("empSearSalaryMax").value;
	let SalaryMin = document.getElementById("empSearSalaryMin").value;
	let Manager = document.getElementById("empSearManager").value;



    let request = {};

    //only assign attribute that is not null or empty to request
    if (Name != null && Name != "") request.Name = Name;
	if (SSN != null && SSN != "") request.SSN = SSN;
	if (PhoneNumber != null && PhoneNumber != "") request.PhoneNumber = PhoneNumber;
	if (Province != null && Province != "") request.Province = Province;
	if (City != null && City != "") request.City = City;
	if (Position != null && Position != "") request.Position = Position;
	if (EmployedYearMax != null && EmployedYearMax != "") request.EmployedYearMax = EmployedYearMax;
	if (EmployedYearMin != null && EmployedYearMin != "") request.EmployedYearMin = EmployedYearMin;
	if (BirthYearMax != null && BirthYearMax != "") request.BirthYearMax = BirthYearMax;
	if (BirthYearMin != null && BirthYearMin != "") request.BirthYearMin = BirthYearMin;
	if (SalaryMax != null && SalaryMax != "") request.SalaryMax = SalaryMax;
	if (SalaryMin != null && SalaryMin != "") request.SalaryMin = SalaryMin;
	if (Manager != null && Manager != "") request.Manager = Manager;



    let url = "http://localhost:8090/api/Employee/search";



    $.ajax({
		method: "POST",
		url: "http://localhost:8090/api/Employee/search",
		data: request,
		dataType: 'json',
		success: function(res) {
			
            if (res) {
                let tableBody = $('#employee-table-body-1');
                tableBody.empty();
                let html = '';
                res[0].forEach((item, index) => {// !!!!!!there is a [0] on the left of res!!!!!!!!!!!
					//                               you can try remove it in your case if this doesn't work
					let addr = ''

					if(item.Province != null && item.Province != '')addr+=item.Province+','					
					if(item.City != null && item.City != '')addr+=item.City+','					
					if(item.District != null && item.District != '')addr+=item.District+','					
					if(item.Street != null && item.Street != '')addr+=item.Street+','					
					if(item.ZipCode != null && item.ZipCode != '')addr+=item.ZipCode
					if(addr.charAt(addr.length-1) == ',')addr = addr.substring(0, addr.length-2)
					let BirthTime = ''
					if(item.BirthMonth != null && item.BirthMonth !=''){
						BirthTime+=item.BirthMonth
						if(item.BirthYear != null && item.BirthYear !='')BirthTime+='/'+item.BirthYear
					}else if(item.BirthYear != null && item.BirthYear !=''){
						BirthTime = item.BirthYear
					}
					let EmployedTime = ''
					if(item.EmployedMonth != null && item.EmployedMonth !=''){
						EmployedTime+=item.EmployedMonth
						if(item.EmployedYear != null && item.EmployedYear !='')EmployedTime+='/'+item.EmployedYear
					}else if(item.EmployedYear != null && item.EmployedYear !=''){
						EmployedTime = item.EmployedYear
					}

					if(item.Position == null)item.Position = ''
					if(item.Manager == null)item.Manager = ''
					if(item.Salary == null)item.Salary = ''
					if(item.CreditCardNumber == null)item.CreditCardNumber = ''
                    html += `<tr>
					<td  class = "Name">${item.Name}</td>
					<td  class = "Position">${item.Position}</td>
					<td class = "PhoneNumber" >${item.PhoneNumber}</td>
					<td  class = "SSN">${item.SSN}</td>
                    <td  class = "Address">${addr}</td>
                    <td  class = "EmployedTime">${EmployedTime}</td>
					<td  class = "BirthTime" >${BirthTime}</td>
                    <td class = "Salary" >${item.Salary}</td>
                    <td class = "CreditCardNumber" >${item.CreditCardNumber}</td>
					<td class = "Manager" >${item.Manager}</td>
                    <td>
                    <div class="dropdown pull-xs-right">
                    <button class="btn bmd-btn-icon dropdown-toggle" type="button" id="lr1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i class="material-icons">more_vert</i>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="lr1">
                      <button  class="dropdown-item" type="button" data-toggle="modal" onclick='onUpdateEmployee1(${JSON.stringify(item)}, ${index})' data-target="#editEmployeeDialog">
                      <i class="material-icons">edit</i>&nbsp;&nbsp;&nbsp;Edit</button>
                      
                      <button id = "${item.SSN}" class="dropdown-item" type="button" onClick="onEmployeeDelete(this.id)" data-toggle="modal" data-target="#deleteEmployeeDialog"><i class="material-icons">delete</i>&nbsp;&nbsp;&nbsp;Delete</button>
                    </div>
                  </div>
                  
                  </td>                  
                </tr>`;
                });

                tableBody.html(html);
            }
		},
		complete: function() {
			//window.location.reload();
		}
	});



    return false;
}

//Add Employee_____________________________________________________________________________________________________________________________________________________________________

function onInsert(event) {

	// get value from html buttons
	let SSN = document.getElementById("inputAddSSN").value;
	let Name = document.getElementById("inputAddName").value;
	let Position = document.getElementById("inputAddPosition").value;
	let EmployedYear = document.getElementById("inputAddEmployedYear").value;
	let EmployedMonth = document.getElementById("inputAddEmployedMonth").value;
	let BirthYear = document.getElementById("inputAddBirthYear").value;
	let BirthMonth = document.getElementById("inputAddBirthMonth").value;
	let PhoneNumber = document.getElementById("inputAddPhoneNumber").value;
	let Salary = document.getElementById("inputAddSalary").value;
	let CreditCardNumber = document.getElementById("inputAddCreditCardNumber").value;
	let Province = document.getElementById("inputAddAddress-Province").value
	let City = document.getElementById("inputAddAddress-City").value
	let District = document.getElementById("inputAddAddress-District").value
	let Street = document.getElementById("inputAddAddress-Street").value
	let ZipCode = document.getElementById("inputAddAddress-ZipCode").value
	let Manager = document.getElementById("inputAddManager").value;

	let request = {};

	//only assign attribute that is not null or empty to request
	if(SSN != null && SSN !="")request.SSN = SSN;
	if(PhoneNumber != null && PhoneNumber !="")request.PhoneNumber = PhoneNumber;
	if(Name != null && Name !="")request.Name = Name;
	if(Position != null && Position !="")request.Position = Position;
	if(EmployedYear != null && EmployedYear !="")request.EmployedYear = EmployedYear;
	if(EmployedMonth != null && EmployedMonth !="")request.EmployedMonth = EmployedMonth;
	if(BirthYear != null && BirthYear !="")request.BirthYear = BirthYear;
	if(BirthMonth != null && BirthMonth !="")request.BirthMonth = BirthMonth;

	if(Salary != null && Salary !="")request.Salary = Salary;
	if(CreditCardNumber != null && CreditCardNumber !="")request.CreditCardNumber = CreditCardNumber;
	if(Province != null && Province !="")request.Province = Province;
	if(City != null && City !="")request.City = City;
	if(District != null && District !="")request.District = District;
	if(Street != null && Street !="")request.Street = Street;
	if(ZipCode != null && ZipCode !="")request.ZipCode = ZipCode;
	if(Manager != null && Manager !="")request.Manager = Manager;
	
	let url ="http://localhost:8090/api/Employee/add" ;

	$.ajax({
		method: "POST",
		url,
		data: request,
		dataType: 'json',
		success: function(res) {
			if(res.code ===0){
				alert('Add Successful');
			}else{
				alert(res.msg);
			}
			
		},
		complete: function() {
			window.location.reload();
			
		}
	});

	return false;
}

//Delete Employee_____________________________________________________________________________________________________________________________________________________________________

function onEmployeeDelete(SSN) {

	let request = {
        SSN
	}

	let url ="http://localhost:8090/api/Employee/delete" ;

	$.ajax({
		method: "POST",
		url,
		data: request,
		dataType: 'json',
		success: function(res) {
			if (res.code === 0) {
			  alert(`The employee was deleted!`);
			}else{
			  alert(res.msg);
			}
		},
		complete: function() {
			window.location.reload();
		}
	});

	return false;

}

//Update Employee_____________________________________________________________________________________________________________________________________________________________________

function onUpdateEmployee() {


	let SSN = $('#editEmployeeDialog #ssn').val();
	if (SSN !== "") {

	   
		  let request = {};
		  request.SSN = SSN;
		
		let Name = $('#editEmployeeDialog #inputUpdateName').val();
		let Province = $('#editEmployeeDialog #inputUpdateAddress-Province').val();
		let City = $('#editEmployeeDialog #inputUpdateAddress-City').val();
		let District = $('#editEmployeeDialog #inputUpdateAddress-District').val();
		let Street = $('#editEmployeeDialog #inputUpdateAddress-Street').val();
		let ZipCode = $('#editEmployeeDialog #inputUpdateAddress-ZipCode').val();
		let Position = 	$('#editEmployeeDialog #inputUpdatePosition').val();
		let EmployedYear = $('#editEmployeeDialog #inputUpdateEmployedYear').val();
		let EmployedMonth = $('#editEmployeeDialog #inputUpdateEmployedMonth').val();
		let BirthYear = $('#editEmployeeDialog #inputUpdateBirthYear').val();
		let BirthMonth = $('#editEmployeeDialog #inputUpdateBirthMonth').val();
		let Salary = $('#editEmployeeDialog #inputUpdateSalary').val();
		let PhoneNumber =	$('#editEmployeeDialog #inputUpdatePhoneNumber').val();
		let CreditCardNumber = $('#editEmployeeDialog #inputUpdateCreditCardNumber').val();
		let Manager = $('#editEmployeeDialog #inputUpdateManager').val();     


		if (Name != null && Name != "") request.Name = Name;
		if (SSN != null && SSN != "") request.SSN = SSN;
		if (PhoneNumber != null && PhoneNumber != "") request.PhoneNumber = PhoneNumber;
		if (Province != null && Province != "") request.Province = Province;
		if (City != null && City != "") request.City = City;
		if (District != null && District != "") request.District = District;
		if (Street != null && Street != "") request.Street = Street;
		if (ZipCode != null && ZipCode != "") request.ZipCode = ZipCode;
		if (Position != null && Position != "") request.Position = Position;
		if (EmployedYear!= null && EmployedYear!= "") request.EmployedYear = EmployedYear;
		if (EmployedMonth!= null && EmployedMonth!= "") request.EmployedMonth = EmployedMonth;
		if (BirthYear != null && BirthYear != "") request.BirthYear = BirthYear;
		if (BirthMonth != null && BirthMonth != "") request.BirthMonth = BirthMonth;
		if (Salary != null && Salary != "") request.Salary = Salary;
		if (CreditCardNumber != null && CreditCardNumber != "") request.CreditCardNumber = CreditCardNumber;
		if (Manager != null && Manager != "") request.Manager = Manager;
	   
		  let url = "http://localhost:8090/api/Employee/update";
	   	 
	$.ajax({
		method: "POST",
		url,
		data: request,
		dataType: 'json',
		success: function(res) {
			if(res.code ===0){
				alert('Update Employee Successful');
			}else{
				alert(res.msg);
			}
		},
		complete: function() {
			window.location.reload();
		}
	});
		   return false;
	} else {
	}

}

function onUpdateEmployee1(item, index) {
	let ssn = item.ssn;
	$('#editEmployeeDialog #ssn').val(item.SSN);
	$('#editEmployeeDialog #inputUpdateName').val(item.Name);
	$('#editEmployeeDialog #inputUpdatePosition').val(item.Position);
	$('#editEmployeeDialog #inputUpdatePhoneNumber').val(item.PhoneNumber);
	$('#editEmployeeDialog #inputUpdateSalary').val(item.Salary);
	$('#editEmployeeDialog #inputUpdateAddress-Province').val(item.Province);
	$('#editEmployeeDialog #inputUpdateAddress-City').val(item.City);
	$('#editEmployeeDialog #inputUpdateAddress-District').val(item.District);
	$('#editEmployeeDialog #inputUpdateAddress-Street').val(item.Street);
	$('#editEmployeeDialog #inputUpdateAddress-ZipCode').val(item.ZipCode);
	$('#editEmployeeDialog #inputUpdateEmployedYear').val(item.EmployedYear);
	$('#editEmployeeDialog #inputUpdateEmployedMonth').val(item.EmployedMonth);
	$('#editEmployeeDialog #inputUpdateBirthYear').val(item.BirthYear);
	$('#editEmployeeDialog #inputUpdateBirthMonth').val(item.BirthMonth);
	$('#editEmployeeDialog #inputUpdateCreditCardNumber').val(item.CreditCardNumber);
	$('#editEmployeeDialog #inputUpdateManager').val(item.Manager);

}


// call GetEmployee() here to directly show data_____________________________________________________________________________________________________________________________________________________________________
GetEmployee();