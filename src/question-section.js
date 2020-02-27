import { saveAnswer, findQuestionByDate, findOwnersName } from './db'; // importando métodos de la base de datos
import { format } from 'date-fns';

const template = `
<section id="section-question">
    <header class="header">
        <h1 class="name-owner"></h1>
        <label class="date" for="start">
            <input name="datepicker" type="date" />
        </label>
    </header>
    <h2 class="question"></h2>
    <form class="question-form">
        <h3 class="year"></h3>
        <div class="input-button">
            <div class="input-field">
                <textarea id="answer" class="materialize-textarea"></textarea>
                <label for="answer">Answer</label>
            </div>
            <!--button save submit -->
            <div class="container-button">
                <button class="btn btn-primary" type="submit">
                    Save
                </button>
            </div>
        </div>
    </form>
    <h2 class="answers-title">Previous answers</h2>
    <ul class="answers-container"></ul>
</section>
`;

function getDatePickerElm() {
    return document.querySelector('[name= "datepicker"]');
}

function getNowYearElm() {
    return document.querySelector('.year');
}

export function initQuestionForm() {
    const container = document.querySelector('main');
    container.innerHTML = template;

    //INITAL VALUES
    //1.8 Calcular la fecha de hoy
    const todayDate = new Date();
    //owners name
    const ownersName = findOwnersName();
    //today question
    //5.1 funcion que llama la base de datos y la fecha de hoy que es por defoult
    const questionObjToday = findQuestionByDate(todayDate);

    //1. QUERY SELECTORS
    //1.5 seleccionamos el form donde se encuentra el input y el boton
    const questionFormElm = container.querySelector('.question-form');
    //1.2 Estamos seleccionando el input del calendario.
    const datepickerElm = getDatePickerElm();
    //1.7 seleccionamos el ano en curso
    const nowYearElm = getNowYearElm();
    //1.10 Seleccionamos el DOM del nombre
    const ownersNameElm = container.querySelector('.name-owner');

    // INITIIAL VALUES IN DOM
    //5.2.estamos seteando el calendario en la fecha de hoy
    datepickerElm.value = format(todayDate, 'yyyy-MM-dd');
    //5.3 poner el ano en automatico asi podre tomar como key el valor
    nowYearElm.innerHTML = `${todayDate.getFullYear()}`;
    //se esta inyectando el nombre de la persona
    ownersNameElm.innerHTML = `${ownersName}'s Diary`;
    // 5.4 renderizar la pregunta del día de hoy
    renderQuestionObj(questionObjToday);

    //INITI EVENT LISTENERS
    datepickerElm.addEventListener('input', handleDatepickerInput);
    //
    questionFormElm.addEventListener('submit', handleQuestionFormSubmit);
}

// LOGICA PARA RENDERIZAR EL TITULO Y LAS RESPUESTAS
function renderQuestionObj(questionObj) {
    //1.1 seleccionar la pregunta y mostrar la pregunta en pantalla
    const questionElm = document.querySelector('.question');
    //1.3 seleccionar div vacio donde voy a meter las respuestas anteriores
    const answerContainerElm = document.querySelector('.answers-container');

    //2.1 Inyecta la pregunta como título en el HTML
    questionElm.innerHTML = questionObj.title;

    // Si la pregunta no tiene respuesta, return nada. y asi no va a tratar renderizar algo que no existe.
    if (!questionObj.answers) {
        answerContainerElm.innerHTML = '';
        return;
    }

    //realizamos esta variable donde guardamos el objeto con las respuestas ya que el obj entries las convierte en un array
    //y asi poder aplicar reverse y poder manejar del mas actualizado al mas viejo
    const answersEntries = Object.entries(questionObj.answers).reverse();
    //2.2 variable done guardare el string del template resultado del for
    let answersHTML = '';
    //2.3 Realizamos el for para escoger mostrar el key y value, se hace un loop sobre un objeto y extraer los valores.
    for (let [key, value] of answersEntries) {
        //2.4 guardamos en la variable que se asigno arriba el valor del for, y para que se guarden todos se hace una concatenacion de los strings
        answersHTML = `${answersHTML} <li  class="event" data-date="${key}">${value}</li>`;
    }

    //2.5 estoy inyectando el html en el div vacio.
    answerContainerElm.innerHTML = answersHTML;
}

//3 LOGICA DEL DIA ELEGIDO
//3.1 Estamos escuchando cuando se cambia la fecha del calendario

function handleDatepickerInput(e) {
    //3.2 guardamos en una variable el evento de lo que seleccionamos y lo creamos como formato de fecha
    let newDate = e.target.valueAsDate;
    //3.3 llamamos la funcion aqui, para tener acceso a la variable newdate

    //3.4 Es la funcion que llama la base de datos para traer las preguntas de la fecha elegida
    const questionObjNewDate = findQuestionByDate(newDate);

    //3.5 renderizar la pregunta del día elegido
    renderQuestionObj(questionObjNewDate);
    getNowYearElm().innerHTML = newDate.getFullYear();
}

//4. LOGICA DEL SUBMIT
//4.1 escuchar el evento del input es decir cuando se le da submit al boton

function handleQuestionFormSubmit(event) {
    event.preventDefault();
    const answer = event.target.answer.value;
    //traer la fecha cuando se dio submit la respuesta
    const selectedDate = getDatePickerElm().valueAsDate;
    //se llama la function,con los parametros necesario
    //guardamos la funcion de save answer dentro de la variable questionobup.
    //para poder tener el valor del objeto de las preguntas con sus respuestas
    const questionObjectUpdated = saveAnswer(answer, selectedDate);
    // le pasamos a la funcion que esta encargada de renderizar las respuestas en el html
    // y le pasamos questionobup con el objecto y la nueva respuesta adicionada
    //para que renderice cuando haya un evento y muestre la nueva respuesta con las anteriores.
    renderQuestionObj(questionObjectUpdated);
    // utilizamos este metodo para borrar valores del input despues que se hizo submit del mismo
    event.target.reset();
}
