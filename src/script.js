const URL = "http://localhost:3000"
const Ex_URL = `${URL}/exercises`
const Work_URL = `${URL}/workouts`
const Both_URL = `${URL}/exercise_workouts`

let workOut = false;
let wo_button;

const mainDiv = () => document.querySelector("main");
const timerContainer = () => document.querySelector("#wotimer");
const workOutCard = () => document.querySelector("#selected");
const loginButton = () => document.querySelector(".login2");
const loginPage = () => document.querySelector(".login");


document.addEventListener("DOMContentLoaded", function() {

    console.log("page is loaded");
    wo_button = document.querySelector("#wobutton");
    let submit = document.querySelector(".submit");
    fetchExercises();
    fetchWorkouts();
    timerTech();
    // mainDiv().style.display = "none";
    timerContainer().style.display = "none";
    // workOutCard().style.display = "none";
    // let workOutCard = document.querySelector("#selected");
    submit.addEventListener("click", (event) => {
        createWorkout(event)
    });
    wo_button.addEventListener("click", (event) => {
        startWorkout(event);
        toggleWoDisplay();
        if (wo_button.innerText === "START") {
            wo_button.innerText = "QUIT?";
        } else {
            wo_button.innerText = "START"
        }

    });
    loginButton().addEventListener("click", (event) => {
        loginPage().style.display = "none";
        mainDiv().style.display = "grid";
    });
});

function toggleWoDisplay() {
    workOut = !workOut
    if (workOut) {
        timerContainer().style.display = "block"
    } else {
        timerContainer().style.display = "none"
    }
}

function fetchExercises() {
    fetch(Ex_URL)
        .then(resp => resp.json())
        .then(function(exercises) { exercises.forEach(function(exercise) { eachExercise(exercise) }) })
        .catch(function(error) {
            alert("turn server on please");
            console.log(error.message)
        })
};

function eachExercise(exercise) {
    let form = document.querySelector("#exercises");
    let option = document.createElement("option");
    // option.innerText = exercise.name;
    // option.value = exercise.name;
    // form.append(option);

    let checkList = document.getElementById('list1');
    checkList.getElementsByClassName('anchor')[0].onclick = function(evt) {
        if (checkList.classList.contains('visible'))
            checkList.classList.remove('visible');
        else
            checkList.classList.add('visible');
    }

    // checkList.onblur = function(evt) {
    //     checkList.classList.remove('visible');
    // }
    let ul2 = document.querySelector(".items");
    let li2 = document.createElement("li");
    li2.innerText = exercise.name
    let input = document.createElement("input");
    input.type = "checkbox";
    li2.append(input)
    ul2.append(li2)
}

function fetchWorkouts() {
    fetch(Work_URL)
        .then(resp => resp.json())
        .then(function(workouts) { workouts.forEach(function(workout) { eachWorkout(workout) }) })
        .catch(function(error) {
            alert("turn server on please");
            console.log(error.message)
        })
};

function eachWorkout(wo) {
    let ul = document.querySelector(".wolist");
    let li = document.createElement("li");
    let ul2 = document.createElement("ul");
    let div = document.createElement("div");
    let button = document.createElement("button");
    li.className = "workout";
    div.className = "pop";
    div.append(ul2);
    wo.exercises.forEach(function(ex) {
        let li2 = document.createElement("li");
        li2.innerText = ex.name;
        ul2.append(li2);
    })
    button.innerText = wo.name;
    li.append(button);
    ul.append(li, div);
    button.addEventListener("click", function(event) { showWorkout(event, wo) })
}

function createWorkout(event) {
    event.preventDefault();
    console.log("U made it");
    let newArray = [];
    let array = document.querySelector(".items").querySelectorAll("input");
    let g = document.querySelector(".items").querySelectorAll("input")[0].checked;
    let c = document.querySelector(".items").querySelectorAll("input")[1].parentElement.innerText
    for (let i = 0; i < array.length; i++) {

        if (array[i].checked) {
            newArray.push(array[i].parentElement.innerText);
        } else { console.log(array[i].parentElement.innerText) }

    }
    let options = {
        name: event.target.parentNode.name.value,
        focus: event.target.parentNode.focus.value,
        work_time: event.target.parentNode.work_time.value,
        rest_time: event.target.parentNode.rest_time.value,
        rounds: event.target.parentNode.rounds.value,
        exercises: newArray
    }
    let config = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(options)
    }
    fetch(Work_URL, config)
        .then(resp => resp.json())
        .then(function(data) {
            eachWorkout(data);
            console.log(data)
        })
        .catch(function(error) {
            alert("turn server on please");
            console.log(error.message)
        })
    event.target.parentNode.reset()
}

function showWorkout(event, wo) {
    workOutCard().querySelector("h3").innerText = "";
    workOutCard().querySelector("h3").innerText = wo.name;
    let div = document.querySelector("#selected");
    let ol = document.querySelector(".ex");
    ol.innerHTML = "";
    let h = document.querySelector(".wo");
    h.innerHTML = "";
    // h.innerText = wo.name;

    let p = document.createElement("p");
    let p1 = document.createElement("p");
    let p2 = document.createElement("p");
    p.style.color = "#b1fa07";
    p.dataset.rounds = wo.rounds;
    p1.style.color = "#b1fa07";
    p.dataset.on = wo.work_time;;
    p2.style.color = "#b1fa07";
    p.dataset.rest = wo.rest_time;
    p.innerText = wo.rounds + " " + "Rounds";
    p1.innerText = wo.work_time + " " + " Second Intervals";
    p2.innerText = wo.rest_time + " " + "Second Rest Perods";
    wo.exercises.forEach(function(ex) {
        let li2 = document.createElement("li");
        li2.innerText = ex.name;
        ol.append(li2);
    })
    h.append(p, p1, p2)
}

function startWorkout(event) {

    let onTime = document.querySelector("#intervalTime");
    let offTime = document.querySelector("#breakTime");
    let intervals = document.querySelector("#intervals");
    let exercises = event.target.parentNode.querySelector(".ex");
    let plan = document.querySelector("#see");
    let rounds = event.target.parentNode.querySelector("p");
    let workTime = event.target.parentNode.querySelector("p");
    let restTime = event.target.parentNode.querySelector("p");
    plan.innerText = exercises.innerText;
    onTime.value = workTime.dataset.on;
    offTime.value = restTime.dataset.rest;
    intervals.value = rounds.dataset.rounds;
    document.querySelector("#update").click();

}
// }

function timerTech() {

    let seconds = 20;
    let rest = true;
    let interval;
    let round;
    let totalTime;
    let oneTime;

    let intervalTime = 20;
    let breakTime = 10;
    let rounds = 3;
    let oneRoundTime = intervalTime + breakTime;

    let updateButton = document.getElementById("update");
    let intervalInput = document.getElementById("intervalTime");
    let breakInput = document.getElementById("breakTime");
    let roundsInput = document.getElementById("intervals");
    let show = document.querySelector("#intervals");

    let startButton = document.getElementById("start");
    let pauseButton = document.getElementById("pause");
    let resetButton = document.getElementById("reset");

    let statusHeader = document.getElementById("status");
    let secondsSpan = document.getElementById("sec");

    let body = document.querySelector("body");

    updateButton.onclick = function() {
        intervalTime = Math.floor(intervalInput.value * 1);
        breakTime = Math.floor(breakInput.value * 1);
        rounds = Math.floor(roundsInput.value * 1);
        oneRoundTime = intervalTime + breakTime + 1;
        reset();
        changeToGo();
    }

    // wo_button.onclick = function() {
    //     intervalTime = Math.floor(intervalInput.value * 1);
    //     breakTime = Math.floor(breakInput.value * 1);
    //     rounds = Math.floor(roundsInput.value * 1);
    //     oneRoundTime = intervalTime + breakTime + 1;
    //     reset();
    //     changeToGo();
    // }

    startButton.onclick = function() {
        rest = false;
        changeToGo();
        interval = setInterval(countdownSeconds, 1000);
        totalTime = (oneRoundTime * 1000) * rounds;
        round = setTimeout(roundTimeOut, totalTime);
        oneTime = setInterval(showRoundsLeft, (oneRoundTime * 1000));
    }

    function countdownSeconds() {
        seconds -= 1;
        secondsSpan.innerText = seconds;
        checkForStateChange();
    }

    function roundTimeOut() {
        alert("Great Workout!");
        reset();
    }

    function showRoundsLeft() {
        // let show = document.querySelector("#intervals");
        roundsInput.value = --rounds;
    }

    resetButton.onclick = function() {
        reset();
    }

    function reset() {
        clearInterval(interval);
        clearInterval(round);
        clearInterval(oneTime);
        seconds = intervalTime;
        secondsSpan.innerText = seconds;
        rest = false;
        changeToGo();
    }

    pauseButton.onclick = function() {
        clearInterval(interval);
    }


    function checkForStateChange() {
        if (seconds == 0 && rest == false) {
            seconds = breakTime + 1;
            rest = true;
            changeToRest();
        } else if (seconds == 0 && rest == true) {
            seconds = intervalTime + 1;
            rest = false;
            changeToGo();
        }
    }

    function changeToRest() {
        body.style.background = "red";
        statusHeader.innerText = "Rest";
    }

    function changeToGo() {
        body.style.background = "#b1fa07";
        statusHeader.innerText = "Go!";
    }

}