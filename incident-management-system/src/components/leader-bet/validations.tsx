export function checkName(inputtxt: string) {
  var passw = /^([a-z]+\s)*[a-z]+$/;
  if (inputtxt.match(passw)) {
    return true;
  } else {
    return false;
  }
}
