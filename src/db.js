import questions from './questions';

const LOCAL_STORAGE_KEY = 'DB';
// state es nuestro estado en memoria.
const state = initState();

//Esta funcion retornara el valor inicial de la base de datos
function initState() {
    //1. Verificar si existe informacion en el local storage
    const storageValue = getStateFromDB();

    if (storageValue === null) {
        //2.Si no existe inicializar el local storage con el json de las preguntas setItem()
        const dbinitialValue = { questions: questions };
        saveStateInDB(dbinitialValue);
        //3. y luego utilizar esa informacion como el valor de DB
        return dbinitialValue;
    }

    return storageValue;
}

//guarda el estado en el local storage
//esto se utiliza para si en el futuro queremos de cambiar de base de datos, se pueda cambiar los datos en la funcion en vez de todo el codigo
function saveStateInDB(newState) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
}

//trae la informacion de la base de datos(local storage)
function getStateFromDB() {
    const storageValue = localStorage.getItem(LOCAL_STORAGE_KEY);
    return JSON.parse(storageValue);
}

// funcion que encuentra la pregunta con la fecha que le pasan como parametro
export function findQuestionByDate(date) {
    // quien es date? es el todayDate o newDate

    const day = date.getDate(); // guardamos en una variable el numero que obtenemos del dia de la fecha
    const month = date.getMonth() + 1; // guardamos en la variable mes el mes que obtenemos de la fecha  y le sumamos uno, porque esa mierda comienza con cero

    return state.questions.find(function(question) {
        // asi que le ponemos al array question que esta dentro del objeto un find para encontrar la pregunta
        return question.day === day && question.month === month; // cada question es cada objeto de preguntas, la cual sera seleccionada si machea el mes y el dia.
    });
}
//esta funcion guarda la respuesta en la base de datos
//tiene 3 parametros que se obtendran en el otro modulo.
export function saveAnswer(answer, date) {
    //aqui buscanmos la pregunta por fecha para poder setear en donde guardar la respuesta y cual pregunta pertenece dicha respuesta
    const questionToAnswer = findQuestionByDate(date);
    //guardamos arriba en una variable la pregunta encontrada para poder saber la ruta donde vamos a guardar la respuesta en el objeto
    if (!questionToAnswer.answers) {
        questionToAnswer.answers = {};
    }
    questionToAnswer.answers[date.getFullYear()] = answer;
    //Guardamos el nuevo estado en el local storage
    saveStateInDB(state);
    //lo retorno porque questionobjet necesita el valor de respuesta de esta funcion.
    return questionToAnswer;
}
// esta funcion encuentra el nombre de la persona del diario en la base de datos la cual utilizaremos para saber si setear o no
export function findOwnersName() {
    //retornamos porque un if necesita el owner para decidir que pantalla mostrar, es decir alguien espera una respuesta de nuestra funcion.
    return state.owner;
}
//esta funcion trae como parametro el nombre del dueno del diario que ha obtenido en el otro modulo
// y esta funcion se encarga de guardar en la base de datos el nombre por primera vez
export function saveOwnersName(name) {
    state.owner = name;
    saveStateInDB(state);
}
