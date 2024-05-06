let selectedRow = null;

// Show Data on Page Load
function showData()
{
    let listOfStudent;
   
    if(localStorage.getItem("studentListData") == null)
    {
        listOfStudent = [];
    }
    else
    {
        listOfStudent = JSON.parse(localStorage.getItem("studentListData"));
    }

    let html = "";
    listOfStudent.forEach(function (element,index){
        html += "<tr>";
        html += '<td  class="text-center"> '+ element.name +' </td>';
        html += '<td  class="text-center"> '+ element.id +' </td>';
        html += '<td  class="text-center"> '+ element.class + '</td>';
        html += '<td  class="text-center"> '+ element.rollNo + '</td>';
        html += '<td class="text-center"><button onclick="updateData('+index+')" class="btn btn-warning btn-sm edit">Edit</button><button onclick="deleteData('+index+')"  class="btn btn-danger btn-sm delete m-2">Delete</button></td>';
        html += "</tr>";

        document.querySelector("#student_list").innerHTML = html;
    });
}

document.onload = showData();

// Add Data
function addStudent()
{

    let studentName =  document.querySelector("#name").value;
    let studentID =  document.querySelector("#studentID").value;
    let studentClass =  document.querySelector("#className").value;
    let StudentRollNo =  document.querySelector("#rollNo").value;

    if(studentName == '' || studentID == '' || studentClass == '' || StudentRollNo == '')
    {
        alert('Please Fill All Details');
    }
    else
    {
        let studentListData;

        if(localStorage.getItem("studentListData") == null){
            studentListData = [];
        }
        else
        {
            studentListData = JSON.parse(localStorage.getItem("studentListData"));
        }

        studentListData.push({
            name: studentName,
            id: studentID,
            class: studentClass,
            rollNo: StudentRollNo
        });

        localStorage.setItem("studentListData",JSON.stringify(studentListData));
        showData();
        clearFields();
    }
}
    
// Edit Data
function updateData(index)
{
    // hide Submit button AND show update button
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block"; 

    let studentListData;
    
    if(localStorage.getItem("studentListData") == null){
        studentListData = [];
    }
    else
    {
        studentListData = JSON.parse(localStorage.getItem("studentListData"));
    }

    document.querySelector("#name").value = studentListData[index].name
    document.querySelector("#studentID").value = studentListData[index].id
    document.querySelector("#className").value = studentListData[index].class
    document.querySelector("#rollNo").value = studentListData[index].rollNo

    document.querySelector("#Update").onclick = function(){
        let studentName =  document.querySelector("#name").value;
        let studentID =  document.querySelector("#studentID").value;
        let studentClass =  document.querySelector("#className").value;
        let StudentRollNo =  document.querySelector("#rollNo").value;
    
        if(studentName == '' || studentID == '' || studentClass == '' || StudentRollNo == '')
        {
           alert('Please fill All Details');
        }
        else
        {
            studentListData[index].name = document.querySelector("#name").value;
            studentListData[index].id = document.querySelector("#studentID").value;
            studentListData[index].class = document.querySelector("#className").value;
            studentListData[index].rollNo = document.querySelector("#rollNo").value;

            localStorage.setItem("studentListData",JSON.stringify(studentListData));
            showData();
            clearFields();

            document.getElementById("Update").style.display = "none";
            document.getElementById("Submit").style.display = "block";
        }
    }

}

// Clear All Fields
function clearFields(){
    document.querySelector("#name").value = "";
    document.querySelector("#studentID").value = "";
    document.querySelector("#className").value = "";
    document.querySelector("#rollNo").value = "";
}

// Delete Data
function deleteData(index)
{
    let studentListData;

    if(localStorage.getItem("studentListData") == null){
        studentListData = [];
    }
    else
    {
        studentListData = JSON.parse(localStorage.getItem("studentListData"));
    }

    studentListData.splice(index, 1);
    localStorage.setItem("studentListData",JSON.stringify(studentListData));
    
    showData();

    if (studentListData === undefined || studentListData.length == 0) {
        window.location.reload();
    }
}