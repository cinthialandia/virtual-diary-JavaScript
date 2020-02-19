import { db } from "./db"; // importando la base de datos
import { findQuestionByDate } from "./utils/findQuestionByDate"; // importando la funcion que hace la logica de buscar la pregunta

//1. querys selector
// 1.1seleccionar la pregunta y mostrar la pregunta en pantalla
const questionElm = document.querySelector('[class="question"]');
//1.2Estamos seleccionando el input del calendario.
const datepickerElm = document.querySelector('[name= "datepicker"]');
//1.3seleccionar div vacio donde voy a meter las respuestas anteriores
const emptyDiv = document.querySelector('[class="emptyDiv"]');

//2.LOGICA DEL DIA DE HOY

//2.1 Calcular la fecha de hoy
const todayDate = new Date();
//2.2 funcion que llama la base de datos y la fecha de hoy que es por defoult
const questionObjToday = findQuestionByDate(db.questions, todayDate);
//2.3 estoy inyectando la pregunta del dia en el html
questionElm.innerHTML = questionObjToday.title;
//2.4.estamos seteando el calendario en la fecha de hoy
datepickerElm.valueAsDate = todayDate;

//3 funcion donde creamos el template que vamos a inyectar en el html de las respuestas anteriores.
function templateHtmlToday() {
  //3.1variable done guardare el string del template resultado del for
  let htmltStrToday = "";
  //3.2 Realizamos el for para escoger mostrar el key y value, se hace un loop sobre un objeto y extraer los valores.
  for (let [key, value] of Object.entries(questionObjToday.answers)) {
    //3.3guardamos en la variable que se asigno arriba el valor del for, y para que se guarden todos se hace una concatenacion de los strings
    htmltStrToday = `${htmltStrToday}<div class="lastestAnswer">
    <span>${key}: ${value}</span>
    </div>`;
  }
  //3.4estoy inyectando el html en el div vacio.
  emptyDiv.innerHTML = htmltStrToday;
}
//llamando la funcion
templateHtmlToday();

//4.LOGICA DEL DIA ELEGIDO

//4.1 Estamos escuchando cuando se cambia la fecha del calendario
datepickerElm.addEventListener("input", function(e) {
  //4.2 guardamos en una variable el evento de lo que seleccionamos y lo creamos como formato de fecha
  let newDate = e.target.valueAsDate;
  //4.3 llamamos la funcion aqui, para tener acceso a la variable newdate

  //5 Es la funcion que llama la base de datos y la fecha elegida
  const questionObjNewDate = findQuestionByDate(db.questions, newDate);
  //5.1 estamos inyectando en el html el objecto de la pregunta elegida
  questionElm.innerHTML = questionObjNewDate.title;

  //6 funcion donde creamos el template para inyectar el html la parte de la fecha elegida
  function templateHtmlNewDate() {
    //6.1 creamos la variable donde se va a guardar el template html dado por el for
    let htmlStrNewDate = "";
    // 6.2 hacemos un for para hacer un loop sobre el objecto y poder extraer el key y el value del mismo, y aplicarle el template html
    for (let [key, value] of Object.entries(questionObjNewDate.answers)) {
      //6.3 guardamos el string concatenado del template en la variable creada.
      htmlStrNewDate = `${htmlStrNewDate}<div class="lastestAnswer">
      <span>${key}: ${value}</span>
      </div>`;
    }
    //y lo inyectamos en el div vacio creado arriba
    emptyDiv.innerHTML = htmlStrNewDate;
  }
  templateHtmlNewDate();
});
