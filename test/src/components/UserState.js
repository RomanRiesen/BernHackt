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

export { UserState, FiredEvent }
