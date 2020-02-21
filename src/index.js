import {
  findQuestionByDate,
  saveAnswer,
  findNamesOwner,
  savesName,
  saveStartDate
} from "./db"; // importando métodos de la base de datos
import { format, compareAsc } from "date-fns";

//1. QUERY SELECTORS
//1.1 seleccionar la pregunta y mostrar la pregunta en pantalla
const questionElm = document.querySelector('[class="question"]');
//1.2 Estamos seleccionando el input del calendario.
const datepickerElm = document.querySelector('[name= "datepicker"]');
//1.3 seleccionar div vacio donde voy a meter las respuestas anteriores
const emptyDiv = document.querySelector('[class="emptyDiv"]');
//1.5 seleccionamos el form donde se encuentra el input y el boton
const form = document.querySelector("form");
//1.7 seleccionamos el ano en curso
const nowYear = document.querySelector('[class="year"]');
//1.8 Calcular la fecha de hoy
const todayDate = new Date();
//1.9 Calcular el año actual
const currentYear = todayDate.getFullYear();
//1.10 Seleccionamos el DOM del nombre
const OwnersName = document.querySelector('[class="name-owner"]');
//1.11 Seleccionamos el form de la pantlla welcome
const formWelcome = document.querySelector('[class="form-nameSubmit"]');

// LOGICA PARA RENDERIZAR EL TITULO Y LAS RESPUESTAS
function renderQuestionObj(questionObj) {
  //2.1 Inyecta la pregunta como título en el HTML
  questionElm.innerHTML = questionObj.title;

  //2.2 variable done guardare el string del template resultado del for
  let answersHTML = "";
  //realizamos esta variable donde guardamos el objeto con las respuestas ya que el obj entries las convierte en un array
  //y asi poder aplicar reverse y poder manejar del mas actualizado al mas viejo
  let questionEntries = Object.entries(questionObj.answers).reverse();

  //2.3 Realizamos el for para escoger mostrar el key y value, se hace un loop sobre un objeto y extraer los valores.
  for (let [key, value] of questionEntries) {
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
  // utilizamos este metodo para borrar valores del input despues que se hizo submit del mismo
  form.reset();
});

// 7 Escuchamos el evento del form y este mostrara cuando el boton sea submiteado
//Tiene los parametros submit que es el evento que paso y el callback con el evento
formWelcome.addEventListener("submit", function submitInput(event) {
  //prevenimos que el boton actualice por default
  event.preventDefault();
  //guardamos en una variable el nombre que se introduce en el input
  //Utilizamos el name, ya que podemos obtener el valor del mismo, si utilizamos la clase name que tiene el input en el HTML
  const namesOwner = event.target.name.value;
  savesName(namesOwner);
  document.getElementById("welcome-section").style.display = "none";
  showTodayQuestion(namesOwner);
});

// 5.LOGICA DEL DIA DE HOY
function showTodayQuestion(namesOwner) {
  //5.1 funcion que llama la base de datos y la fecha de hoy que es por defoult
  const questionObjToday = findQuestionByDate(todayDate);
  //5.2.estamos seteando el calendario en la fecha de hoy
  datepickerElm.value = format(todayDate, "yyyy-MM-dd");
  // seteamos la fecha maxima la cual podra escoger el usuario para contestar respuesta
  //que es la de hoy es decir cuando se empieza el diario
  datepickerElm.max = format(todayDate, "yyyy-MM-dd");
  //seteamos la fecha minima que seria unos dias antes de la fecha max y asi poder dar un rango de tiempo para contestar fechas pasadas
  datepickerElm.min = "2020-02-01";

  //5.3 poner el ano en automatico asi podre tomar como key el valor
  nowYear.innerHTML = `<h3>${currentYear}</h3>`;
  //se esta inyectando el nombre de la persona
  OwnersName.innerHTML = `${namesOwner}'s Diary`;
  // 5.4 renderizar la pregunta del día de hoy
  renderQuestionObj(questionObjToday);
  // mostar la seccion pregunta
  document.getElementById("section-question").style.display = "block";
  //guardar la fecha de comienzo en la base de datos
  saveStartDate(todayDate);
}

// Aca empieza a correr la aplicacion
//6 if que seleccione la pantalla a mostrar
//6.1 guardamos la funcion para tener el resultado en una variable
const owner = findNamesOwner();

//6.2 realizamo el if el cual mostrara una de las 2 pantallas
// variable owner resultado de la funcion debe ser distinta a undefined
if (owner) {
  //si esta es distinta cambiar el style css con block y mostrar la pantalla
  showTodayQuestion(owner);
} else {
  //si la misma no es diferente a undefined entonces cambiar el estilo css para mostrar la pantalla
  document.getElementById("welcome-section").style.display = "block";
}

//guardar la informacion en el localstorage
//Avisar cuando se guarde la respuesta
//hacer un mejor diseno responsive
//cambiar el bootstrap y css para usar con vpn
//usar un nuevo daypicker
