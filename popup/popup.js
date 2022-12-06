chrome.storage.local.get('mute_time').then((result) => {
    if (result.mute_time) {
        document.getElementById('start_hour').value = result.mute_time[0];
        document.getElementById('start_minute').value = result.mute_time[1];
        document.getElementById('end_hour').value = result.mute_time[2];
        document.getElementById('end_minute').value = result.mute_time[3];
    }
});

document.getElementById('setBtn').onclick = function () {
    startHour = document.getElementById('start_hour').value;
    startMinute = document.getElementById('start_minute').value;
    endHour = document.getElementById('end_hour').value;
    endMinute = document.getElementById('end_minute').value;

    chrome.storage.local.set({ 'mute_time': [startHour, startMinute, endHour, endMinute] }, function () {
        console.log(`Set start hour = ${startHour} minute = ${startMinute}`);
        console.log(`Set end hour = ${endHour} minute = ${endMinute}`);
    });
}