var lectures = [];
var students = [];

class Lecture {
  constructor(code, name, teacher, pointScale) {
    this.code = code;
    this.name = name;
    this.teacher = teacher;
    this.pointScale = pointScale;
    this.studentList = [];
  }
}

function addLecture(code, name, teacher, pointScale) {
  const lec = new Lecture(code, name, teacher, pointScale);
  lectures.push(lec);
}

function addLectureInput() {
  const codeInput = document.getElementById("coursecode").value;
  const nameInput = document.getElementById("coursename").value;
  const teacherInput = document.getElementById("teacher").value;
  const pointScaleInput = document.getElementById("pointScale").value;
  
  // Check if any of the input fields are empty
  if (codeInput.length === 0 || nameInput.length === 0 || teacherInput.length === 0 || pointScaleInput.length === 0) {
    alert("Please enter all the required fields!");
    return;
  }

  if (lectures.length === 0) {
    addLecture(codeInput, nameInput, teacherInput, pointScaleInput);
    alert("Lecture successfully added!");
  } else {
    for (let lecture of lectures) {
      if (codeInput === lecture.code) {
        alert("This lecture already exists!");
        return;
      }
    }

    addLecture(codeInput, nameInput, teacherInput, pointScaleInput);
  }
  
  // Clear input fields
  document.getElementById("coursecode").value = "";
  document.getElementById("coursename").value = "";
  document.getElementById("teacher").value = "";
  document.getElementById("pointScale").value = "";

  updateLectureOptions();
}

class Student {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.courseList = [];
  }
}

function addStudent(id, name) {
  const std = new Student(id, name);
  students.push(std);
}

function addStudentInput() {
  const idInput = document.getElementById("studentid").value;
  const stdNameInput = document.getElementById("studentname").value;
  
  // Check if any of the input fields are empty
  if (idInput.length === 0 || stdNameInput.length === 0) {
    alert("Please enter all the required fields!");
    return;
  }

   if (idInput >= 0) {
    if (students.length === 0) {
    addStudent(idInput, stdNameInput);  
    alert("Student successfully added!")
  } else {
    for (let std of students) {
      if (idInput === std.id) {
        alert("This student already exists!");
        return; 
      }
    }

    addStudent(idInput, stdNameInput);
    
  }
  } else {
    alert("Please enter a positive number for the ID");
  }
  
  // Clear input fields
  document.getElementById("studentid").value = "";
  document.getElementById("studentname").value = "";

  updateStudentOptions();
}

function updateStudentOptions() {
const studentOptions = document.getElementById("studentOptions");
studentOptions.innerHTML = "";
const defaultOption = document.createElement("option");
defaultOption.value = "";
studentOptions.appendChild(defaultOption);

for (let student of students) {
const option = document.createElement("option");
option.value = student.id;
option.textContent = student.id;
studentOptions.appendChild(option);
}
}

function updateLectureOptions() {
const lectureOptions = document.getElementById("lectureOptions");
lectureOptions.innerHTML = "";
const defaultOption = document.createElement("option");
defaultOption.value = "";
lectureOptions.appendChild(defaultOption);

for (let lecture of lectures) {
const option = document.createElement("option");
option.value = lecture.code;
option.textContent = lecture.name;
lectureOptions.appendChild(option);
}
}

function LetterNote(midGrade, finalGrade, pScale) {
const result = ((midGrade * 40) + (finalGrade * 60)) / 100;

if (pScale === "7") {
if (100 >= result && result >= 93) {
return "A";
} else if (92 >= result && result >= 85) {
return "B";
} else if (84 >= result && result >= 77) {
return "C";
} else if (76 >= result && result >= 70) {
return "D";
} else if (69 >= result) {
return "F";
}
} else if (pScale === "10") {
if (100 >= result && result >= 90) {
return "AA";
} else if (89 >= result && result >= 85) {
return "BA";
} else if (84 >= result && result >= 80) {
return "BB";
} else if (79 >= result && result >= 75) {
return "CB";
} } else if (74 >= result && result >= 70) {
return "CC";
} else if (69 >= result && result >= 65) {
return "DC";
} else if (64 >= result && result >= 60) {
return "DD";
} else if (59 >= result && result >= 55) {
return "FD";
} else if (54 >= result) {
return "FF";
}
}

function register() {
const lectureSelect = document.getElementById("lectureOptions").value;
const studentSelect = document.getElementById("studentOptions").value;
const midterm = document.getElementById("midterm").value;
const final = document.getElementById("final").value;
  
// Check if any of the input fields are empty
if (lectureSelect.length === 0 || studentSelect.length === 0 || midterm.length === 0 || final.length === 0) {
    alert("Please enter all the required fields!");
    return;
}
  
  

// Define selectedLecture and selectedStudent
let selectedLecture = null;
let selectedStudent = null;

// Loop in lectures to find the selected lecture
for (const l of lectures) {
if (lectureSelect === l.code) {
selectedLecture = l;
}
}

// Loop through students to find the selected student
for (const s of students) {
if (studentSelect === s.id) {
selectedStudent = s;
}
}

if (selectedStudent.courseList.length === 0) {
const registeredLecture = {
course: selectedLecture,
mid: midterm,
fin: final,
ltr: LetterNote(midterm, final, selectedLecture.pointScale),
};
  selectedStudent.courseList.push(registeredLecture);
} else {
for (const prevLectures of selectedStudent.courseList) {
if (prevLectures.code === selectedLecture.code) {
alert("Already exists!");
return;
} else {
const registeredLecture = {
course: selectedLecture,
mid: midterm,
fin: final,
ltr: LetterNote(midterm, final, selectedLecture.pointScale),
};
selectedStudent.courseList.push(registeredLecture);
return;
}
}
}

if (selectedLecture.studentList.length === 0) {
const registeredStudent = {
std: selectedStudent,
mid: midterm,
fin: final,
ltr: LetterNote(midterm, final, selectedLecture.pointScale),
};
selectedLecture.studentList.push(registeredStudent);
} else {
for (const prevStudents of selectedLecture.studentList) {
if (prevStudents.id === selectedStudent.id) {
alert("This student already registered!");
return;
} else {
const registeredStudent = {
std: selectedStudent,
mid: midterm,
fin: final,
ltr: LetterNote(midterm, final, selectedLecture.pointScale),
};
selectedLecture.studentList.push(registeredStudent);
return;
}
}
}
  displayStudents();
}

// We can see the students as a table with this function.
function displayStudents() {
const selectedLectureCode = document.getElementById("lectureOptions").value;
let selectedLecture = null;

// Loop through lectures to find the selected lecture
for (const l of lectures) {
if (selectedLectureCode === l.code) {
selectedLecture = l;
}
}

if (selectedLecture === null) {
return;
}

// Create a table to display the students for the selected lecture
const table = document.createElement("table");

// Create table header
const header = table.createTHead();
const headerRow = header.insertRow();
const headerCell1 = headerRow.insertCell();
headerCell1.textContent = "Lecture Name";
const headerCell2 = headerRow.insertCell();
headerCell2.textContent = "Student ID";
const headerCell3 = headerRow.insertCell();
headerCell3.textContent = "Student Name";
const headerCell4 = headerRow.insertCell();
headerCell4.textContent = "Midterm Grade";
const headerCell5 = headerRow.insertCell();
headerCell5.textContent = "Final Grade";
const headerCell6 = headerRow.insertCell();
headerCell6.textContent = "Letter Grade";

// Create table body
const body = table.createTBody();
for (const s of selectedLecture.studentList) {
const row = body.insertRow();
const cell1 = row.insertCell();
cell1.textContent = selectedLecture.name;
const cell2 = row.insertCell();
cell2.textContent = s.std.id;
const cell3 = row.insertCell();
cell3.textContent = s.std.name;
const cell4 = row.insertCell();
cell4.textContent = s.mid;
const cell5 = row.insertCell();
cell5.textContent = s.fin;
const cell6 = row.insertCell();
cell6.textContent = s.ltr;

}


// Add the new table to the page
table.id = "table";
document.getElementById("tableContainer").appendChild(table);
}

