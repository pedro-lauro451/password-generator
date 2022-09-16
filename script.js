//Password display & Clipboard
var clipboardButton = document.getElementById('clipboard-copy-button');
var generatedPwd = document.getElementById('generated-password');
const displayPwd = document.querySelectorAll('.pwd-container');

clipboardButton.onclick = function()
{
    navigator.clipboard.writeText(generatedPwd.innerHTML);
};

//Range Slider
var length = document.getElementById('length-value');

var range = document.getElementById('range').oninput = function()
{
    var value = this.value-this.min;
    length.innerHTML = value;
};

//Checkboxes
const includeUppercase = document.querySelector('#include-uppercase');
const includeLowercase = document.querySelector('#include-lowercase');
const includeNumbers = document.querySelector('#include-numbers');
const includeSymbols = document.querySelector('#include-symbols');


//Submit & Password generation
var uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
var numberChars = '0123456789';
var symbolChars = '!@#$%^*()';

function defineString()
{
    var uppercaseIsChecked = includeUppercase.checked;
    var lowercaseIsChecked = includeLowercase.checked;
    var numbersIsChecked = includeNumbers.checked;
    var symbolsIsChecked = includeSymbols.checked;

    var finalChars = '';

    if(uppercaseIsChecked === true)
    {
        finalChars = finalChars.concat(uppercaseChars);
    }
    if(lowercaseIsChecked === true)
    {
        finalChars = finalChars.concat(lowercaseChars);
    }
    if(numbersIsChecked === true)
    {
        finalChars = finalChars.concat(numberChars);
    }
    if(symbolsIsChecked === true)
    {
        finalChars = finalChars.concat(symbolChars);
    }
    return finalChars;
};

const toggleLengthErrorMsg = document.querySelectorAll('.length-error-msg');
const toggleCheckboxErrorMsg = document.querySelectorAll('.checkbox-error-msg');

//Checks for empty length
function checkIfEmpty(length)
{
    if(length > 0)
    {
        displayPwd.forEach(content => {
            content.style.display = 'flex';
        });

        toggleLengthErrorMsg.forEach(content => {
            content.style.display = 'none';
        });
    }

    if(length == 0)
    {
        displayPwd.forEach(content => {
            content.style.display = 'none';
        });

        toggleLengthErrorMsg.forEach(content => {
            content.style.display = 'flex';
        });
    }
};

//Checks for empty checkboxes
var allUnchecked;

function checkifUnchecked()
{
    var uppercaseIsChecked = includeUppercase.checked;
    var lowercaseIsChecked = includeLowercase.checked;
    var numbersIsChecked = includeNumbers.checked;
    var symbolsIsChecked = includeSymbols.checked;

    if(uppercaseIsChecked == false && lowercaseIsChecked == false && numbersIsChecked == false 
    && symbolsIsChecked == false)
    {
        displayPwd.forEach(content => {
            content.style.display = 'none';
        });

        toggleCheckboxErrorMsg.forEach(content => {
            content.style.display = 'flex';
        });
        allUnchecked = true;
    }
    else
    {
        toggleCheckboxErrorMsg.forEach(content => {
            content.style.display = 'none';
        });
        allUnchecked = false;
    }
}

var passwordStrength = document.getElementById('password-strength');

function containsValue(string, regex)
{
    return regex.test(string);
}

const strengthColor = document.querySelectorAll('.password-strength');

function changeStrengthColor(color)
{
    strengthColor.forEach(content => {
        content.style.color = color;
    });
}

function calculatePwdStrength(pwd, length)
{
    if(length == 0 || allUnchecked == true)
    {
        changeStrengthColor('#bcbbc3');
        return 'None';
    }
    else if(containsValue(pwd,/\d/) == true && containsValue(pwd,/[A-Z]/) == true && containsValue(pwd,/[a-z]/) == true && containsValue(pwd,/[^A-Za-z0-9]/) == true
    && length >= 8)
    {
        changeStrengthColor('#5ebf6a');
        return 'Strong';
    }
    else if( (containsValue(pwd,/\d/) == true && containsValue(pwd,/[A-Z]/) == true && containsValue(pwd,/[a-z]/) == true && containsValue(pwd, /[^A-Za-z0-9]/) == true
    && length >= 6) 
    || 
    (containsValue(pwd,/[A-Z]/) == true && containsValue(pwd,/[a-z]/) == true && containsValue(pwd,/[^A-Za-z0-9]/) == true
    && length >= 8) )
    {
        changeStrengthColor('#ECE926');
        return 'Medium';
    }
    else 
    {
        changeStrengthColor('#D56283');
        return 'Weak';
    }
}

const generatePassword = document.getElementById('generate-password');

generatePassword.onclick = function()
{
    chars = defineString();

    var pwdLength = length.innerHTML;
    var result = '';

    checkIfEmpty(pwdLength);
    checkifUnchecked();

    for(var i = 0; i < pwdLength; i++)
    {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    generatedPwd.innerHTML = result;
    passwordStrength.innerHTML = calculatePwdStrength(result,pwdLength);
};