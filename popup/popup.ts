chrome.storage.local.get('mute_time').then((result) => {
    if (result.mute_time) {
        (<HTMLInputElement>document.getElementById('start_hour')).value = result.mute_time[0];
        (<HTMLInputElement>document.getElementById('start_minute')).value = result.mute_time[1];
        (<HTMLInputElement>document.getElementById('end_hour')).value = result.mute_time[2];
        (<HTMLInputElement>document.getElementById('end_minute')).value = result.mute_time[3];
    }
});

var setBtn = document.getElementById('setBtn');
if (setBtn) {
    setBtn.onclick = function () {
        let startHour = (<HTMLInputElement>document.getElementById('start_hour')).value;
        let startMinute = (<HTMLInputElement>document.getElementById('start_minute')).value;
        let endHour = (<HTMLInputElement>document.getElementById('end_hour')).value;
        let endMinute = (<HTMLInputElement>document.getElementById('end_minute')).value;

        chrome.storage.local.set({ 'mute_time': [startHour, startMinute, endHour, endMinute] }, function () {
            console.log(`Set start hour = ${startHour} minute = ${startMinute}`);
            console.log(`Set end hour = ${endHour} minute = ${endMinute}`);
        });
    }
}