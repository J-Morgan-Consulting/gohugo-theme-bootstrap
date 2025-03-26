export function formatTime(hour, minute) {
    var ampm = hour >= 12 ? 'pm' : 'am';
    hour = hour % 12;
    hour = hour ? hour : 12; // the hour '0' should be '12'
    minute = minute < 10 ? '0' + minute : minute;
    return hour + ':' + minute + ' ' + ampm;
}

export function getCurrentTime(timeZone) {
    var now = new Date();
    var localTime = new Date(now.toLocaleString('en-US', { timeZone: timeZone }));
    var currentDayIndex = localTime.getDay(); // Get the current day index (0 for Sunday, 1 for Monday, etc.)

    // Adjust the currentDayIndex to start with Monday as index 0
    if (currentDayIndex === 0) {
        currentDayIndex = 6; // Sunday becomes index 6
    } else {
        currentDayIndex -= 1; // Shift all other days back by one position
    }

    return {
        currentDay: localTime.toLocaleString('en-us', { weekday: 'long' }), // Gets the current day in local timezone
        currentTime: localTime.getHours() * 60 + localTime.getMinutes(), // Current time in minutes in local timezone
        currentDayIndex: currentDayIndex // Adjusted day index
    };
}

// Hashing function using SHA-256
export async function sha256(str) {
    const buf = new TextEncoder().encode(str);
    const digest = await crypto.subtle.digest('SHA-256', buf);
    return Array.from(new Uint8Array(digest)).map(x => x.toString(16).padStart(2, '0')).join('');
};

export function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

export function deleteDiv(id) {
    document.getElementById(id).remove();
}