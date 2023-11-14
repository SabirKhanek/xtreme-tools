export interface PasswordStrengthProps {
  className?: string;
  password: string;
}
export function PasswordStrength({
  className,
  password,
}: PasswordStrengthProps) {
  const score = checkPasswordStrength(password);
  return (
    <div className={`grid grid-cols-4 gap-x-2 ${className}`}>
      {[1, 2, 3, 4].map((val) => {
        return (
          <div
            key={val}
            className={`bg-[#E4E6EF] rounded-3xl w-full h-2 ${
              score > val && "bg-green-400"
            } transition-all duration-200 ease-in-out`}
          ></div>
        );
      })}
    </div>
  );
}

function checkPasswordStrength(password: string) {
  let score = 0;

  // Check length
  if (password.length >= 8) {
    score++;
  }

  // Check for special character
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
  if (specialCharRegex.test(password)) {
    score++;
  }

  // Check for a mix of capital and lowercase characters
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  if (hasUpperCase && hasLowerCase) {
    score++;
  }

  // Check for a number
  const hasNumber = /\d/.test(password);
  if (hasNumber) {
    score++;
  }

  return score;
}
