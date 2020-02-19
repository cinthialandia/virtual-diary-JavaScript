export function findQuestionByDate(questions, date) {
  const pickedDay = date.getDate();
  const pickedMonth = date.getMonth() + 1;

  return questions.find(function(question) {
    return pickedDay === question.day && pickedMonth === question.month;
  });
}
