class UserState {
  constructor (cash, mortgage, house_value) {
    this.cash = cash
    this.mortgage = mortgage
    this.house_value = house_value
  }

  get_wealth () {
    let wealth = this.cash - this.mortgage + this.house_value;
    console.log(wealth);
    return wealth
  }
}

class FiredEvent {
  constructor (insurance, description, actual_damages) {
    console.log('New FiredEvent', insurance, description, actual_damages)
    this.insurance = insurance
    this.description = description
    this.actual_damages = actual_damages
  }
}


function questions_and_answers_to_insurances(questions, answers) {
  //let insurance_questions = questions.filter((q)=>{return q.insurance != undefined;})
  let insurances_paid = []
  for (let [i, q] of questions.entries()) {
    if (q.insurance && answers[i] == "Yes") {
      insurances_paid.push(q.insurance)
    }
  }
  return new Set(insurances_paid);
}

export { UserState, FiredEvent, questions_and_answers_to_insurances }
