// Middleware function - to validate the data entered by the user
export const validateData = (req, res, next) => {
  const { income, savings, mobile } = req.body;

  if (income < savings) {
    console.error("Invalid income: " + income + " and savings: " + savings);
    next(new Error(`Invalid income: ${income} and savings: ${savings}`));
    return;
  }
  if (isNaN(mobile)) {
    next(new Error("Not a mobile number: " + mobile));
    return;
  }
  if (mobile.length !== 10) {
    next(new Error("Not a mobile number: " + mobile));
    return;
  }
  next();
};
