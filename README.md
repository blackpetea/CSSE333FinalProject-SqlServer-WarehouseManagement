

## Zhen:
    Connect Back-Front Instruction:
        1. Copy this line into your vscode current path and press enter:
        node Full_Stack_Website/Server/api.js
        2. Then do the "go live" option in the lowerleft corner in vscode with live server extension.
    
    BackEnd Coding Instruction in case you forgot:
        1. Get your sp ready in the database.
        2. Go to Server/dboperation.js
            Just copy and paste one of the function and edit it to whatever you want.
            You will know what to edit just by taking a look of the other functions. 
            In the bottom, module.export, add your function according to the format. 
        3. Go to Server/api.js 
            Copy and paste one of the router code and edit it. 
            For the queryString like '/Employee/add' means, this one does the add for employee table.
        4. Go to User Interface/public/scripts
            Check out those with the prefix "BE_". 
            BE_URL_AJAX_Calling.js is used to display the whole table for employee. so it just calling it self at the beginning.
            The other two for delete and insert respectively, they are called in the html form. 
            Just copy the one you need and change the variable to whatever you want.
        5. Include the new ajax function file in html.
            For insert, and delete, you can take a look at my html code. 
            I am calling it under my html form's onsubmit action. 
            Like <form onsubmit="return onInsert(event)" method="POST" >
            Remember to add method="POST"
        6. I am not sure if the extra ajax library is included in jquery main library.
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        If not, just include it, if you create a new html page(dont' remember if you need to )
 


    TODO: 
        1. Some insert, search, delete UI needs to be done
        2. We need more data from kelly's mom to fit our database schema
        3. Not using callable/prepared statement yet, all query stuff is just plain "select" or calling sps in the backend for now.
        actually I am not sure if we actually need that for the current state of our code
        4. Decide how to display a table, like showing which and not showing which columns.
        5. Decide like how do we wanna search an item. like for Employee, we can either give many textfields, like
        SalaryUpperLimit, SSN, Name etc. for user to type in. Or Using several drop list for those properties.
        6. I am thinking about the address, to make it more convenient, we can either use a script for create a whole db table for like the (province, city, 
        district) of China from the internet, or using some npm package to import all the area information of China. So that we can use the dropdown list when 
        dealing with the address stuff. like you select Indiana from the province droplist, then, indy, terrehaute auto pop up in the city dropdown list
        but this one is not necessary. and i can't find much resources in English. Btw, if we create a China address(province, city, district)table containing all 
        the address info of China, then we can get rid of the current adddress table. 
        7. The login and register stuff, I literally don't remember anything of that from 280, do we store that info also in the database? like get a new table for login?
        or we like 280 stuff, to allow them to login through facebook, google or whatever.
        8. 
        9. We hadn't include the wechatid wechatname, email stuff in the database employee table yet. need to update this. 
        10. Directory User Interface has a space in it. sometimes causing problem when referencing this directory, but i am lazy to change all the references...

    Authorization concerns:
        1. Like when we create a new employee tuple in the table, it feels like we also needs to create an employee of the same infomation in the login place.
        but default the passwords to "password123" or sth. 
        2. Does driver and seller has any authorization that different from other employees? do you guys wanna specify on this?

    Possible errors:
        1. Sometimes it would probably pop up an error says port 8090 is already in use,
        in this case, close your last unclose VScode termnal which is running nodejs server 
        OR open your windows task manager, and find a "nodejs javascript runtime" process
        whose label is a green hexagon, end it, and retry the process above.
        then the problem should be solved

    Unsolved errors:
        1. nodemon doesn't work quite well somehow, just leave it along.

    Other Notes:
        1. Classes like address, customer, employee is not using for now, plz ignore them,
        probably be deleted in the future.
        2. SearchEmployee.html is just a trial ground for myself. its not relevant to our project, plz just ignore that.
        3. Like for employee, consider the current address table, we need to first insert an address, then insert the employee with that address,
        but we provide the infomation in the same time.  haven't deal with this yet. 

## Michelle:

## Kelly: