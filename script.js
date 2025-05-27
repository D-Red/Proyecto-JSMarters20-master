const students=[];

document.getElementById("studentForm").addEventListener("submit", function(e){
    e.preventDefault();
    
    const name=document.getElementById("name").value.trim();
    const lastName=document.getElementById("lastname").value.trim();
    const grade=parseFloat(document.getElementById("grade").value);
    const date = document.getElementById("date").value;

    if (!name || !lastName || isNaN(grade) || grade < 1 || grade > 7 || !date) {
        alert("Error: Datos Incorrectos");
        return;
    }

    const student={name, lastName, grade, date};
    students.push(student)
    //console.log(students)
    addStudentToTable(student);
    calcularPromedio();
    this.reset()

});
const tableBody=document.querySelector('#studentsTable tbody');
function addStudentToTable(student){
    const row=document.createElement("tr");
    row.innerHTML=`
    <td>${student.name}</td>
    <td>${student.lastName}</td>
    <td>${student.grade}</td>
    <td>${student.date}</td>
    <td>
        <button class="edit-btn">Editar</button>
        <button class="delete-btn">Eliminar</button>
    </td>
    `;

    // Botón para Eliminar
    row.querySelector(".delete-btn").addEventListener("click",function(){
        borrarEstudiante(student,row);
    });

    // Botón editar
    row.querySelector(".edit-btn").addEventListener("click", function () {
        editarEstudiante(student, row);
    });    

    tableBody.appendChild(row);
}
function borrarEstudiante(student,row){
    const index=students.indexOf(student);
    if(index > -1){
        students.splice(index,1);
    }
    row.remove();
    calcularPromedio();
}

function editarEstudiante(student, row) {
    // Rellenar el formulario con los datos del estudiante
    document.getElementById("name").value = student.name;
    document.getElementById("lastname").value = student.lastName;
    document.getElementById("grade").value = student.grade;
    document.getElementById("date").value = student.date;

    // Eliminar el estudiante actual y su fila
    borrarEstudiante(student, row);
}

const averageDiv=document.getElementById("average");
const totalCountSpan = document.getElementById("totalCount");
const approvedCountSpan = document.getElementById("approvedCount");
const failedCountSpan = document.getElementById("failedCount");


function calcularPromedio() {
    let suma = 0;
    let aprobados = 0;
    let reprobados = 0;

    for (const student of students) {
        suma += student.grade;
        if (student.grade >= 4) {
            aprobados++;
        } else {
            reprobados++;
        }
    }

    const count = students.length;
    const promedio = count > 0 ? (suma / count).toFixed(2) : "N/A";

    averageDiv.textContent = "Promedio General del Curso : " + promedio;
    totalCountSpan.textContent = count;
    approvedCountSpan.textContent = aprobados;
    failedCountSpan.textContent = reprobados;
}
