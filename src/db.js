import { format, compareAsc } from "date-fns";

const db = {
  owner: "Cinthia",
  questions: [
    {
      title: "How was your day?",
      day: 18,
      month: 2,
      answers: {
        2018: "Very good",
        2019: "mehh!"
      }
    },
    {
      title: "What did you eat?",
      day: 19,
      month: 2,
      answers: {
        2018: "Pizza",
        2017: "fish",
        2019: "Chicken"
      }
    },
    {
      title: "Do you belive in something?",
      day: 20,
      month: 2,
      answers: {
        2017: "Could be",
        2018: "Yes! god its everyting!!!",
        2019: "Ozanaaa ozanaaa oh lorddd!!"
      }
    },
    {
      title: "Who is your best friend?",
      day: 21,
      month: 2,
      answers: {
        2018: "Maria",
        2017: "Diego",
        2019: "No one"
      }
    }
  ]
};
// funcion que encuentra la pregunta con la fecha que le pasan como parametro
export function findQuestionByDate(date) {
  // quien es date? es el todayDate o newDate

  const day = date.getDate(); // guardamos en una variable el numero que obtenemos del dia de la fecha
  const month = date.getMonth() + 1; // guardamos en la variable mes el mes que obtenemos de la fecha  y le sumamos uno, porque esa mierda comienza con cero

  return db.questions.find(function(question) {
    // asi que le ponemos al array question que esta dentro del objeto un find para encontrar la pregunta
    return question.day === day && question.month === month; // cada question es cada objeto de preguntas, la cual sera seleccionada si machea el mes y el dia.
  });
}
//esta funcion guarda la respuesta en la base de datos
//tiene 3 parametros que se obtendran en el otro modulo.
export function saveAnswer(year, answer, date) {
  //aqui buscanmos la pregunta por fecha para poder setear en donde guardar la respuesta y cual pregunta pertenece dicha respuesta
  const questionToAnswer = findQuestionByDate(date);
  //guardamos arriba en una variable la pregunta encontrada para poder saber la ruta donde vamos a guardar la respuesta en el objeto
  questionToAnswer.answers[year] = answer;
  //lo retorno porque questionobjet necesita el valor de respuesta de esta funcion.
  return questionToAnswer;
}
// esta funcion encuentra el nombre de la persona del diario en la base de datos la cual utilizaremos para saber si setear o no
export function findNamesOwner() {
  //retornamos porque un if necesita el owner para decidir que pantalla mostrar, es decir alguien espera una respuesta de nuestra funcion.
  return db.owner;
}
//esta funcion trae como parametro el nombre del dueno del diario que ha obtenido en el otro modulo
// y esta funcion se encarga de guardar en la base de datos el nombre por primera vez
export function savesName(name) {
  db.owner = name;
}
//esta funcion, trae como parametro la fecha seteada del dia de hoy
// y esta se encarga de guardar esta fecha dentro de la base de datos
export function saveStartDate(starDate) {
  //utilizamos el metodo format, que se esta importando de una libreria para poder setear el formato de la fecha de una manera en particular.
  db.startingDate = format(starDate, "yyyy-MM-dd");
}
