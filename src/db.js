const db = {
  owner: "Cinthia",
  questions: [
    {
      title: "How was your day?",
      day: 18,
      month: 2,
      answers: {
        2019: "Very good",
        2018: "mehh!"
      }
    },
    {
      title: "What did you eat?",
      day: 19,
      month: 2,
      answers: {
        2019: "Pizza",
        2018: "fish",
        2017: "Chicken"
      }
    },
    {
      title: "Do you belive in something?",
      day: 20,
      month: 2,
      answers: {
        2019: "Could be",
        2018: "Yes! god its everyting!!!",
        2017: "Ozanaaa ozanaaa oh lorddd!!"
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

function saveAnswer(year, answer, title) {}
