let curDate = new Date();
let schedule;
init();

//Format date with st, nd, rd, or th.
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
    } else {
        schedule = {};
    }
    
    curHour = curDate.getHours();
    //Grab all textarea and iterating through the entire array and update textarea value and color;
    $.each( $(".time-block > textarea"),  ( index , textArea) => {
       
        //Grab the textarea inside the div.time-block
        let timeSlot = parseInt($(textArea).attr("time"));
        //Update info for timeSlot if there is value in schedule
        if(schedule[timeSlot])
            $(textArea).text(schedule[timeSlot]);

        //  Update class(.past .present .future) 
        if(timeSlot === curHour) {
            replaceClass(textArea, "past future", "present");
        } else if(timeSlot < curHour) {
            replaceClass(textArea, "present future", "past");
        } else {
            replaceClass(textArea, "past present", "future");
        } 
    })
}

//Replace class/s from element with other classes.
function replaceClass(element, classToRemove, classToAdd) {
    $(element).removeClass(classToRemove);
    $(element).addClass(classToAdd);
}

//Save notice from textarea to localStorage.
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
    localStorage.setItem("schedule", JSON.stringify(schedule));
}

$(".saveBtn").on("click", saveInfo);