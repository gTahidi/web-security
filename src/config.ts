export const CREDIT_CARD_DIGITS = 16;
export const GROUP_CREDIT_CARD_DIGITS = 4;
// The regexp uses positive lookahead to check if the string contains at least ${creditCardDigits} digits and allows as many spaces and/or dashes after a digit, as well at most 1 character (after each digit) that is different from digits, spaces and dashes anywhere in the string. The last \d is used to make sure overlapping substrings are matched and that characters are consumed one by one by the regexp
export const CREDIT_CARD_REGEX_STR = `(?=((\\d[-\\s]*[^\\s\\d-]{0,1}[-\\s]*){${CREDIT_CARD_DIGITS}}))\\d`;

export const LAST_SSN_DIGITS = 4;
// The  KRA regexp checks for a string that starts with 'A' or 'a', followed by 9 digits, and ends with a letter
export const SSN_REGEX: RegExp = /[Aa]\d{9}[a-zA-Z]/;

// The Acc/No regexp matches exactly 10 digits as a whole word
const SECRET_KEY_REGEX_STR: string = `\\b\\d{10}\\b`;
export const SECRET_KEY_REGEX: RegExp = new RegExp(SECRET_KEY_REGEX_STR);

export const LAST_CHARS_ADDRESS = 200;
export const CHAR_LIMIT_RECOMMENDED = 2000;
export const CHAR_LIMIT_SUPPORT = 20000;



//TODO:Add these REGEX FUNCTIONS  TO CAPTURE ADDITIONAL DATA

// ^\d{5,8}$ -- this is for Id numbers
//fix the Phone number regex

// ^(?:\+254|0)7\d{8}$ -- hii ni for phone number