// remove first word from string, used to remove !command from string
function removeFirstWord(string) {
    let len = string.split(" ")[0].length + 1;
    return string.slice(len);
}

// check if a string begins with a substring
function beginsWith(string, what) {
    return (string.slice(0, what.length) == what);
}

module.exports = {
    removeFirstWord,
    beginsWith
}