enum SignUpError {
  EmailAlreadyInUse = "Email address already in use",
  WeakPassword = "Password must be at least 10 characters",
  InvalidCredentials = "Invalid credentials",
  EmptyFields = "Please fill in all fields",
}

enum Success {
  SuccessMessage = "You have successfully signed up!",
}

enum SignInError {}

export { SignUpError, Success };
