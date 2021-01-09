export function dateToFullHour(date) {
    if(!date || Object.prototype.toString.call(date) !== "[object Date]") return "";
    let hours = date.getHours().toString().padStart(2, "0");
    let minutes = date.getMinutes().toString().padStart(2, "0");
    return hours + ":" + minutes;
}

export function fullHourWithDateToDate(fullHour, date) {
    if(!date || Object.prototype.toString.call(date) !== "[object Date]") return "";
    if(!fullHour || fullHour.split(":").length !== 2) return "";

    let allParts = fullHour.split(":");
    let hours = parseInt(allParts[0]);
    let minutes = parseInt(allParts[1]);

    let newDate = new Date(date.getTime());
    newDate.setHours(hours, minutes);
    
    return newDate;
}

export function getFirstDayOfWeek(dateOrWeekNum = 0)
{
    if(Object.prototype.toString.call(dateOrWeekNum) === "[object Date]")
    {
        return getFirstDayOfWeekByDate(dateOrWeekNum);
    } else {
        return getFirstDayOfWeekByWeekNum(dateOrWeekNum);
    }
}

function getFirstDayOfWeekByDate(dateToUse)
{
    let date = new Date(dateToUse.getTime());

    let day = date.getDay();
    if(day === 0) day = 7;
    
    let firstDay = new Date(date.setDate(date.getDate() - day + 1));
    return firstDay;
}

function getFirstDayOfWeekByWeekNum(weekNum)
{
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    today.setDate(today.getDate() + (7 * weekNum));
    
    let day = today.getDay();
    if(day === 0) day = 7;
    
    let firstDay = new Date(today.setDate(today.getDate() - day + 1));
    return firstDay;
}

export function getDayNum(date)
{
    if(!date || Object.prototype.toString.call(date) !== "[object Date]") return "";
    
    let dayNum = date.getDay();
    if(dayNum === 0) dayNum = 7;
    
    return dayNum;
}