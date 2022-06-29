function validate(input) {
    let error = {};
  
    var nameRule = /[A-Za-z0-9]+/g;
    var numberRule = /^[1-5]+$/;
    const integerRule = /^\d+$/;
  
    console.log(input.name);
    if (!nameRule.test(input.name)) {
      error.name = 'Name is required';

    } else if (!numberRule.test(input.difficulty)) {
      error.difficulty = 'Difficulty is required';

    } else if (!input.duration) {
      error.duration = 'Duration is required';

    } else if (!integerRule.test(input.duration)) {
      error.duration = 'Duration must be a number';

    } else if (!input.season) {
      error.season = 'Season is required';
      
    } else if (input.idCountry.length === 0) {
      error.idCountry = 'At least one country is required';
    }
  
    return error;
  }

  module.exports = {
    validate,
  };