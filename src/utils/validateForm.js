export const validateLoginForm = (inputLogin) => {
    const newError = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
      if (!inputLogin.email) newError.email = "Email is required*";
      if (!emailRegex.test(inputLogin.email)) newError.email = "Invalid email format";
      if (!inputLogin.password) newError.password = "Password is required*";
      if (!passwordRegex.test(inputLogin.password))
        newError.password =
          "Password must be at least 8 characters include uppercase letter, lowercase letter, one digit, and one special character";
      
      return newError
  }

  export const validateRegisterForm = (inputLogin) => {
    const newError = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+1|1)?\s*\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
      if (!inputLogin.email) newError.email = "Email is required*";
      if (!emailRegex.test(inputLogin.email)) newError.email = "Invalid email format";
      if (!inputLogin.password) newError.password = "Password is required*";
      if (!passwordRegex.test(inputLogin.password))
        newError.password =
          "Password must be at least 8 characters include uppercase letter, lowercase letter, one digit, and one special character";
      if(!inputLogin.phone) newError.phone = "Phone is required*";
      if(!phoneRegex.test(inputLogin.phone)) newError.phone = "Invalid Phone no"
      if(!inputLogin.fullName) newError.fullName = "Name is required";
      if(inputLogin.password !== inputLogin.confirmPassword) newError.confirmPassword = "Invalid Password"
      return newError
  }