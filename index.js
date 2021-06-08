const axios = require('axios');
const fs = require('fs');
const uuid = require('uuid');

function getCurrentTime() {
    let url = "http://date.jsontest.com";
    return axios.get(url);
}

function postTest(firstname) {
    const url = "https://jsonplaceholder.typicode.com/todos";
    // send a POST request
    return axios({
        method: 'post',
        url: url,
        data: {
            firstName: firstname,
            lastName: 'Williams',
            id: 1009
        }
    });
}

function nextStartTime(date) {
    let newDate = new Date(date);
    newDate.setMinutes(date.getMinutes() + 20);
    return newDate.toISOString();
}

function createClip(fileName, duration) {
    let rawdata = fs.readFileSync(fileName);
    let clip = JSON.parse(rawdata);
    clip.duration_ms=duration;
    //post create
    console.log(clip);
    return uuid.v4();
}

(async () => {
    const dict = new Object();
    let files=[
        './clips/clip1.json',
        './clips/clip2.json',
        './clips/clip3.json' ];

    // create clip resources
    files.forEach(f=>{
        let guid=createClip(f, 5*60*1000); // 5 minutes in ms
        dict[f]=guid;
    })

    console.log(dict);
    return;

    const date = new Date("2021-06-07T17:30:00");
    //RFC 3339 format
    const formatted = date.toISOString();
    console.info(formatted);
    console.info(`new date ${nextStartTime(date)}`);

    var todos = new Array();
    for (let i = 0; i < 10; i++) {
        let post = await postTest(`Przemek${i}`);
        console.info(post.data);
        todos.push(post.data);
    }

    todos.forEach(element => {
        console.info(element.firstName);

    });

    let post2 = await postTest("Tomek");
    console.info(post2.data);
})();
