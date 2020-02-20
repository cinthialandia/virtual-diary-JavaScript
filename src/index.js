import { findQuestionByDate, saveAnswer } from "./db"; // importando métodos de la base de datos

//1. QUERY SELECTORS
//1.1 seleccionar la pregunta y mostrar la pregunta en pantalla
const questionElm = document.querySelector('[class="question"]');
//1.2 Estamos seleccionando el input del calendario.
const datepickerElm = document.querySelector('[name= "datepicker"]');
//1.3 seleccionar div vacio donde voy a meter las respuestas anteriores
const emptyDiv = document.querySelector('[class="emptyDiv"]');
//1.4 seleccionamos el input de respuesta de la pregunta
const answerInput = document.querySelector('[name = "answer"]');
//1.5 seleccionamos el form donde se encuentra el input y el boton
const form = document.querySelector("form");
//1.6 seleccionamos el boton de submit
const submitButton = document.querySelector('[class="submit-button"]');
//1.7 seleccionamos el ano en curso
const nowYear = document.querySelector('[class="year"]');
//1.8 Calcular la fecha de hoy
const todayDate = new Date();
//1.9 Calcular el año actual
const currentYear = todayDate.getFullYear();
//1.10 Seleccionamos el DOM del nombre
const OwnersName = document.querySelector('[class="name-owner"]');

// EN CONSTRUCCION
//1.11 empty otro div
const anotherEmptyDiv = document.querySelector('[class="anotherEmptyDiv"]');



// LOGICA PARA RENDERIZAR EL TITULO Y LAS RESPUESTAS
function renderQuestionObj(questionObj) {
  //2.1 Inyecta la pregunta como título en el HTML
  questionElm.innerHTML = questionObj.title;

  //2.2 variable done guardare el string del template resultado del for
  let answersHTML = "";

  //2.3 Realizamos el for para escoger mostrar el key y value, se hace un loop sobre un objeto y extraer los valores.
  for (let [key, value] of Object.entries(questionObj.answers)) {
    //2.4 guardamos en la variable que se asigno arriba el valor del for, y para que se guarden todos se hace una concatenacion de los strings
    answersHTML = `${answersHTML}<div class="lastestAnswer">
    <span>${key}: ${value}</span>
    </div>`;
  }

  //2.5 estoy inyectando el html en el div vacio.
  emptyDiv.innerHTML = answersHTML;
}

//3 LOGICA DEL DIA ELEGIDO
//3.1 Estamos escuchando cuando se cambia la fecha del calendario
datepickerElm.addEventListener("input", function(e) {
  //3.2 guardamos en una variable el evento de lo que seleccionamos y lo creamos como formato de fecha
  let newDate = e.target.valueAsDate;
  //3.3 llamamos la funcion aqui, para tener acceso a la variable newdate

  //3.4 Es la funcion que llama la base de datos para traer las preguntas de la fecha elegida
  const questionObjNewDate = findQuestionByDate(newDate);

  //3.5 renderizar la pregunta del día elegido
  renderQuestionObj(questionObjNewDate);
});

//4. LOGICA DEL SUBMIT
//4.1 escuchar el evento del input es decir cuando se le da submit al boton
form.addEventListener("submit", function handleInput(event) {
  event.preventDefault();
  const answer = event.target.answer.value;
  //traer la fecha cuando se dio submit la respuesta
  const currentDate = datepickerElm.valueAsDate;
  //se llama la function,con los parametros necesario
  //guardamos la funcion de save answer dentro de la variable questionobup.
  //para poder tener el valor del objeto de las preguntas con sus respuestas
  const questionObjectUpdate = saveAnswer(currentYear, answer, currentDate);
  // le pasamos a la funcion que esta encargada de renderizar las respuestas en el html
  // y le pasamos questionobup con el objecto y la nueva respuesta adicionada
  //para que renderice cuando haya un evento y muestre la nueva respuesta con las anteriores.
  renderQuestionObj(questionObjectUpdate);
});

// 5.LOGICA DEL DIA DE HOY

//5.1 funcion que llama la base de datos y la fecha de hoy que es por defoult
const questionObjToday = findQuestionByDate(todayDate);
//5.2.estamos seteando el calendario en la fecha de hoy
datepickerElm.valueAsNumber = todayDate.getTime();
//5.3 poner el ano en automatico asi podre tomar como key el valor
nowYear.innerHTML = `<h3>${currentYear}</h3>`;

// 5.4 renderizar la pregunta del día de hoy
renderQuestionObj(questionObjToday);

// WELCOME PART

// vamos a realizar el template para inyectar el html

//welcome screen
anotherEmptyDiv.insertAdjacentHTML(
  "afterbegin",
  `<div>
<h1 class="principal-title">Welcome to your diary</h1>
<img class="img" src="/public/images/diaryimg.png" />
<h2 class="name-answer">What is your name?</h2>

<!--input name -->
<div>
  <label for="name"></label>
  <div>
    <input class="name-input"
      id="name"
      type="text"
      placeholder="Enter your Name"
      name="name"
      required
    />
  </div>
</div>
<!--button name submit -->
<div class="container-button">
  <button id="submit" class="submit-button" type="submit">
    Submit
  </button>
</div>
</div>`
);

// welcome end
