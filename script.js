var clipboardButton = document.getElementById('clipboard-copy-button');
var clipboardText = document.getElementById('generated-password');

var length = document.getElementById('length-value');

clipboardButton.onclick = function()
{
    console.log(clipboardText.innerHTML);
    navigator.clipboard.writeText(clipboardText.innerHTML);
};