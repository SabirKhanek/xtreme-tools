import { useEffect, useState } from "react";
import { Button } from "../../../../components/button";
import { IoReload } from "react-icons/io5";
import { FaRegCopy } from "react-icons/fa6";
import { toast } from "react-toastify";
export interface SecurePasswordGeneratorProps {
  className?: string;
}
export function SecurePasswordGenerator({
  className,
}: SecurePasswordGeneratorProps) {
  const [isUppercase, setIsUppercase] = useState(false);
  const [isSymbols, setIsSymbols] = useState(false);
  const [isNumber, setIsNumber] = useState(false);
  const [isLowercase, setIsLowercase] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(13);

  const [password, setPassword] = useState("");

  const generatePassword = () => {
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()-=_+[]{}|;:,.<>?";

    let allChars = "";
    let password = "";

    if (isUppercase) allChars += uppercaseChars;
    if (isLowercase) allChars += lowercaseChars;
    if (isNumber) allChars += numberChars;
    if (isSymbols) allChars += symbolChars;

    if (!isUppercase && !isLowercase && !isNumber && !isSymbols) {
      allChars = uppercaseChars + lowercaseChars + numberChars + symbolChars;
    }

    if (!allChars) {
      return "";
    }

    for (let i = 0; i < passwordStrength; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      password += allChars.charAt(randomIndex);
    }

    return password;
  };

  useEffect(() => {
    const _password = generatePassword();
    setPassword(_password);
  }, [isLowercase, isUppercase, isSymbols, isNumber, passwordStrength]);

  return (
    <div className={`${className}`}>
      <div>
        <h1 className="text-primary text-4xl font-semibold">
          Secure Password Generator
        </h1>
        <p className="text-sm text-black/70 my-2">
          Generate Secure Unbreakable Passwords in Seconds!
        </p>
      </div>
      <div className="w-full border border-black rounded-xl p-6">
        <div className="my-5">
          <div className="flex gap-3 justify-center items-center flex-wrap">
            <Button
              className={`border border-primary ${
                isUppercase ? "bg-primary" : "bg-transparent"
              }`}
              onClick={() => setIsUppercase(!isUppercase)}
            >
              <span
                className={`${
                  isUppercase ? "text-white" : "text-primary"
                } font-semibold`}
              >
                Uppercase
              </span>
            </Button>

            <Button
              className={`border border-primary ${
                isLowercase ? "bg-primary" : "bg-transparent"
              }`}
              onClick={() => setIsLowercase(!isLowercase)}
            >
              <span
                className={`${
                  isLowercase ? "text-white" : "text-primary"
                } font-semibold`}
              >
                Lowercase
              </span>
            </Button>
            <Button
              className={`border border-primary ${
                isNumber ? "bg-primary" : "bg-transparent"
              }`}
              onClick={() => setIsNumber(!isNumber)}
            >
              <span
                className={`${
                  isNumber ? "text-white" : "text-primary"
                } font-semibold`}
              >
                Number
              </span>
            </Button>
            <Button
              className={`border border-primary ${
                isSymbols ? "bg-primary" : "bg-transparent"
              }`}
              onClick={() => setIsSymbols(!isSymbols)}
            >
              <span
                className={`${
                  isSymbols ? "text-white" : "text-primary"
                } font-semibold`}
              >
                Symbols
              </span>
            </Button>
          </div>
        </div>
        <div className="max-w-[450px] mx-auto my-10 ">
          <input
            type="range"
            min={8}
            max={32}
            data-theme="mytheme"
            value={passwordStrength}
            onChange={(e: any) => setPasswordStrength(e.target.value)}
            className="range range-primary"
          />
        </div>
        <div className="bg-[#E6B0D92E] rounded-3xl w-full mx-auto my-0 max-w-[600px] flex items-center justify-center">
          <div className="grow text-center break-all">{password}</div>
          <div className="flex gap-2 items-center p-2">
            <div
              className="p-1 bg-primary rounded-full cursor-pointer"
              onClick={() => setPassword(generatePassword())}
            >
              <IoReload className="text-white" />
            </div>
            <div
              className="p-1 bg-primary rounded-full cursor-pointer text-white flex justify-center items-center"
              onClick={() => {
                navigator.clipboard.writeText(password || "");
                toast(`Copied ${password.replace(/./g, "*")} to clipboard`);
              }}
            >
              <FaRegCopy className="text-white" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full border border-black rounded-xl p-6 my-5">
        <div>
          <h2 className="font-semibold text-lg">
            What is the free Password Generator Tool?
          </h2>
          <p className="text-black/70 my-2">
            A password generator is a tool that helps you create strong, unique
            passwords for your accounts. A good password should be at least
            12-16 characters long and include a mix of uppercase and lowercase
            letters, numbers, and special characters.
          </p>
        </div>
        <div className="my-2">
          <h2 className="font-semibold text-lg">
            How To Generate a Strong Password?
          </h2>
          <p className="text-black/70 my-2">
            When you visit this page (the tool), it will generate a random
            password based on the default parameters. This password has 36 lower
            and upper case letters, digits, and special characters. You can
            change the length and kind of characters used in the password if you
            have specific needs. To copy the password to the clipboard, click
            the copy button.
          </p>
        </div>
        <div className="my-2">
          <h2 className="font-semibold text-lg">
            How To make sure you are safe?
          </h2>
          <p className="text-black/70 my-2">
            You should be aware of the following to keep your passwords safe
            from social engineering, brute force, or dictionary attacks and to
            keep your online accounts protected: <br />
            1. Do not use the same password, security question, and answer for
            multiple important accounts. <br />
            2. Use a password with at least 16 characters. Use at least one
            number, one uppercase letter, one lowercase letter, and one special
            symbol. <br />
            3. Do not use the names of your families, friends, or pets in your
            passwords. <br />
            4. Do not use postcodes, house numbers, phone numbers, birthdates,
            ID card numbers, social security numbers, and so on in your
            passwords. <br />
            5. Do not use any dictionary words in your passwords.A secure
            password should be 8 characters long, but ideally, 12 or 16
            characters long. Aside from length, it's critical not to reuse
            passwords across many online accounts. Millions of passwords have
            been made public in the past due to data breaches or hacking
            assaults.
            <br /> Examples of strong passwords: CZ*1Qdrk5fLzBIE5G ,
            t0^gwgx0NGCS*pzzZ*D78 , ApaQ7uKPE^!*LKXqx$X!V^9dSM. Examples of weak
            passwords: pass12345, abc@123, 12345678910, yournamepassword.
          </p>
        </div>
        <div className="my-2">
          <h2 className="font-semibold text-lg">
            What Makes a Password Secure?
          </h2>
          <p className="text-black/70 my-2">
            A secure password should be 8 characters long, but ideally, 12 or 16
            characters long. Aside from length, it's critical not to reuse
            passwords across many online accounts. Millions of passwords have
            been made public in the past due to data breaches or hacking
            assaults.
          </p>
        </div>
        <span className="text-black/70 font-semibold text-lg">
          <span className="text-primary">Contact Us </span>
          <span>
            for suggestions, complaints, or just feedback without hesitation.
          </span>
        </span>
      </div>
    </div>
  );
}
//appearance-none w-full rounded-lg bg-slate-400  [&::-webkit-slider-runnable-track]:rounded-full   [&::-webkit-slider-runnable-track]:bg-primary [&::-webkit-slider-runnable-track]:h-[10px] [&::-webkit-slider-thumb]:rounded-none [&::-webkit-slider-thumb]:w-[2px] [&::-webkit-slider-thumb]:h-[15px] [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:mt-[-3px]
