console.log('background.js is executing');

const CHECK_INTERVAL = 5 * 1000;

chrome.storage.local.get('mute_time').then((result) => {
    if (result.mute_time) {
        startHour = result.mute_time[0];
        startMinute = result.mute_time[1];
        endHour = result.mute_time[2];
        endMinute = result.mute_time[3];
        console.log(`Set from local storage, start hour = ${startHour}, minute = ${startMinute}`);
        console.log(`Set from local storage, end hour = ${endHour}, minute = ${endMinute}`);
    }
    init();
});

chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        if (key == 'mute_time') {
            startHour = newValue[0];
            startMinute = newValue[1];
            endHour = newValue[2];
            endMinute = newValue[3];
            console.log(`Local storage onChanged, start hour = ${startHour}, minute = ${startMinute}`);
            console.log(`Local storage onChanged, end hour = ${endHour}, minute = ${endMinute}`);

            console.log(
                `Storage key "${key}" in namespace "${namespace}" changed.`,
                `Old value was "${oldValue}", new value is "${newValue}".`
            );
            init();
        }
    }
});

var startHour = 11;
var startMinute = 50;
var endHour = 13;
var endMinute = 20;
var timeoutId = undefined;
var start, end;

function init() {
    start = new Date();
    start.setHours(startHour, startMinute);
    end = new Date();
    end.setHours(endHour, endMinute);

    if (new Date() >= end) {
        console.log('The mute time is passed, go to next day')
        start = start.addDays(1);
        end = end.addDays(1);
    }

    console.log(`Set initial start date ${start}`);
    console.log(`Set initial end date ${end}`);

    if (timeoutId != undefined) {
        clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(tryMute, 5000);
}

function tryMute() {
    let now = new Date();
    if (start <= now && now < end) {
        console.log('mute');
        mute(true);

        console.log('Try unmute');
        timeoutId = setTimeout(tryUnmute, CHECK_INTERVAL);
    }
    else {
        timeoutId = setTimeout(tryMute, CHECK_INTERVAL);
    }
}

function tryUnmute() {
    if (new Date >= end) {
        console.log('Unmute');
        mute(false);

        start = start.addDays(1);
        end = end.addDays(1);
        console.log(`Set new start date ${start}`);
        console.log(`Set new end date ${end}`);

        console.log('Try mute');
        timeoutId = setTimeout(tryMute, CHECK_INTERVAL);
    }
    else {
        timeoutId = setTimeout(tryUnmute, CHECK_INTERVAL);
    }
}

function mute(muted) {
    chrome.tabs.query({}, result => result.forEach(tab => chrome.tabs.update(tab.id, { muted: muted })));
}

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
