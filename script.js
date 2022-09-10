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
function defineString()
{
    var uppercaseIsChecked = includeUppercase.checked;
    var lowercaseIsChecked = includeLowercase.checked;
    var numbersIsChecked = includeNumbers.checked;
    var symbolsIsChecked = includeSymbols.checked;

    var uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    var numberChars = '0123456789';
    var symbolChars = '!@#$%^&*()';

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

function checkIfEmpty(length)
{
    if(length > 0)
    {
        displayPwd.forEach(content => {
            content.style.display = 'flex';
        });
    }

    if(length == 0)
    {
        displayPwd.forEach(content => {
            content.style.display = 'none';
        });
    }
};

const generatePassword = document.getElementById('generate-password');

generatePassword.onclick = function()
{
    chars = defineString();

    var pwdLength = length.innerHTML;
    var result = '';

    checkIfEmpty(pwdLength);

    for(var i = 0; i < pwdLength; i++)
    {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    generatedPwd.innerHTML = result;
};