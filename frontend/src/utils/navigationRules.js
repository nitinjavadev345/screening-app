export const getNextStep = (currentStep, data) => {

  switch (currentStep) {

    case 1:
      // If only 1 member, skip Members page
      if (data.householdSize === 1) return 3;
      return 2;

    case 2:
      return 3;

    case 3:
      // If no income entered, skip review? (optional)
      //data.hasIncome = data.members.some(m => m.income > 0);
      //if (!data.hasIncome) return 5;
      return 4;

    case 4:
      return 5;

    default:
      return currentStep + 1;
  }
};
  export const getPreviousStep = (currentStep, data) => {

  switch (currentStep) {

    case 3:
      if (data.householdSize === 1) return 1;
      return 2;

    case 4:
      return 3;

    case 5:
      return 4;

    default:
      return currentStep - 1;
  }
};
