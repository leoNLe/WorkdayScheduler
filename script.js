let curDate = new Date();
let schedule;
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
    //Check if there is already schedule in localStorage
    if(localStorage.getItem("schedule")) {
        schedule = JSON.parse(localStorage.getItem("schedule"));
        //Grab all textarea in time-block and iterating through the entire array of textArea;
        $.each( $(".time-block > textarea"),  ( index , element) => {
            let timeSlot = $(element).attr("time");
            if(schedule[timeSlot]){
                $(element).text(schedule[timeSlot]);    
            }
        })
    } else {
        schedule = {};
    }
}

function saveToLocal(){
    localStorage.setItem("schedule", JSON.stringify(schedule));
}

function saveInfo() {

    let textarea = $(this).siblings("textarea");
    let textAreaValue = textarea.val();
    let timeSlot = textarea.attr("time");

    if(textAreaValue === "" && schedule[timeSlot]){
        //Remove key value pair from schedule if textArea is blank
        delete schedule[timeSlot];
    } else if (textAreaValue !== ""){
        schedule[timeSlot] = textAreaValue;
    }
    saveToLocal();
}

$(".saveBtn").on("click", saveInfo);