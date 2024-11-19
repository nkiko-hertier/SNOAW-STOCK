function fetchURL(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response); // Resolve the promise with the response
      } else {
        reject(`Request failed. Returned status of ${xhr.status}`); // Reject on error
      }
    };

    xhr.onerror = () => {
      reject("Request failed due to a network error.");
    };

    xhr.send();
  });
}

function toggleLoader(){
  document.getElementById('loader').classList.toggle('hidden');
}

function FillInput(id, addValue){
  const element = document.getElementById(id);
  element.value = addValue;
  if(id == "category"){
    AddClass(addValue);
  } else if(id == "class"){
    AddYears(addValue)
  }
}
//Function to generate [LIST ITEM]
function Generate_list_item(input_id, key, value = key){
  return `<div class="snoaw-item p-2 hover:bg-[#4242ff0f] hover:text-indigo-500 cursor-pointer hover:pl-3" onclick="FillInput('${input_id}','${key}')">${value}</div>`;
}
// Function to assign list items from an array
function Assign_items(object, data_key, height){
  console.log(`.field:[data-key="${data_key}"] > .snoaw-list`);
  const dropdown= document.querySelector(`.field[data-key="${data_key}"] > .snoaw-list`);
  let codes = '';
  if (object[0].key) {}
  object.forEach(item => {
      codes += Generate_list_item(data_key, item.key, item.value);
  });
  dropdown.innerHTML = codes;
}


//Exam handlers
function Card_Gen(title){
  const element = `
      <div class="aspect-square w-full">
          <div class="bg-white rounded-md shadow-sm border h-[200px]"></div>
          <div class="content mt-2">
              <h1 class="text-lg">${title}</h1>
              <div class="flex gap-2">
                  <span class="text-zinc-600 flex gap-1 items-center"><i class="bi bi-heart-fill text-sm text-red-500"></i>1.5k</span>
                  <span class="text-zinc-600 flex gap-1 items-center"><i class="bi bi-bar-chart-fill text-sm text-blue-500"></i>1k</span>
              </div>
          </div>
      </div>
  `;
  return element;
}
function InsertCards(data){
  const _exam_container = document.getElementById('examsPlace');
  const not_found = "<p>No Item found for the selected class</p>";
  let NewData = '';
  if(data !== '' && data !== null){
    const exams = (typeof(data) == 'object')? [data] : data;
    exams.forEach(exam => {
        NewData += Card_Gen(exam.exam_name);
    });
    _exam_container.innerHTML = NewData;
  } else {
    _exam_container.innerHTML = not_found;
  }
}

// Form handlers
function AddClass(type){
  toggleLoader();
  fetchURL(`/api/exam/class/${type}`)
  .then((response)=> {
      const data = JSON.parse(response)
      Assign_items(data, 'class', data.length);
      const element = document.getElementById("class");
      element.value = '';
      toggleLoader();
  })
}
function AddYears(_class){
  toggleLoader();
  fetchURL(`/api/exam/year/${_class}`)
  .then((response)=> {
      const data = JSON.parse(response);
      Assign_items(data, 'year', data.length);
      const element = document.getElementById("year");
      element.value = '';
      toggleLoader();
  })
}
function HandleForm() {
  document.querySelector('form').addEventListener('submit', (e)=>{
      e.preventDefault();
      const _class = document.getElementById('class').value; 
      const _year = document.getElementById('year').value;
      toggleLoader();
      fetchURL(`/api/exam/${_class}/${_year}`)
      .then((response) => {
          console.log(response);
          let data = response;
          if(response !== ''){
            data = JSON.parse(response);
          }
          InsertCards(data);
          toggleLoader();
      })
  })
}


function toggleTheme() {
  const html = document.documentElement;

  if (html.classList.contains("dark")) {
    html.classList.remove("dark");
    localStorage.setItem("theme", "light"); // Save the light theme
  } else {
    html.classList.add("dark");
    localStorage.setItem("theme", "dark"); // Save the dark theme
  }
}