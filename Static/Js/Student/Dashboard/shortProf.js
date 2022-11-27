//Shorten the words
let maxLength = 20;
//Cut cv name
let cvNameCut = document.getElementById('cvName').innerHTML;
let newCVName = cvNameCut.substring(0, maxLength) + '...';

document.getElementById('cvName').innerHTML = newCVName

//Cut Recommned name
let recNameCut = document.getElementById('recName').innerHTML;
let newRecName = cvNameCut.substring(0, maxLength) + '...';

document.getElementById('recName').innerHTML = newRecName


//University name
let changeUniNameID1 = document.getElementById('changeUniNameID').innerHTML;
let newUniName = changeUniNameID1.substring(0, maxLength) + '...';

document.getElementById('changeUniNameID').innerHTML = newUniName


//department name
let changeDepartNameID1 = document.getElementById('changeDepartNameID').innerHTML;
let newDepName = changeDepartNameID1.substring(0, maxLength) + '...';

document.getElementById('changeDepartNameID').innerHTML = newDepName

//Cousce name
let changeCourseNameID1 = document.getElementById('changeCourseNameID').innerHTML;
let newCourseName = changeCourseNameID1.substring(0, maxLength) + '...';

document.getElementById('changeCourseNameID').innerHTML = newCourseName
