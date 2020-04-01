let curDate = new Date();

init();

function formatDate(date){
    let dateString = "" +date;
    if(date % 10 === 1) {
        dateString += "st";
    } else if (date ===13) {
        dateString += "th";
    } else if (date % 10 === 3) {
        dateString += "rd";
    } else if( date === 12) {
        dateString += "th";
    } else if(date % 10 === 2) {
        dateString += "nd";
    } else {
        dateString += "th";
    }
    return dateString;
}

function getDate() {

    let daysArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let monthsArr = ["January", "February", "March", "April", "May", "June", "July", "August",
                "September", "October", "November", "December"];


    let printString = `${daysArr[curDate.getDay()]}, ${monthsArr[curDate.getMonth()]}\
 ${formatDate(curDate.getDate())}`;
    return printString;
}

function init() {
    $("#currentDay").text(getDate());
}

