const URL = "http://localhost:3000"
const Ex_URL = `${URL}/exercises`
const Work_URL = `${URL}/workouts`
const Both_URL = `${URL}/exercise_workouts`


document.addEventListener("DOMContentLoaded", function() {
    console.log("page is loaded");
    // fetchExercises();
    fetchWorkouts();
    timerTech();
    let submit = document.querySelector(".submit");
    submit.addEventListener("click", (event) => {
        createExercise(event)
    });
});

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
    let ul = document.querySelector(".exlist");
    let li = document.createElement("li")
    li.innerText = exercise.name
    ul.append(li)
    let option = document.createElement("option");
    option.innerText = exercise.name;
    option.value = exercise.name;
    form.append(option);

    let checkList = document.getElementById('list1');
    checkList.getElementsByClassName('anchor')[0].onclick = function(evt) {
        if (checkList.classList.contains('visible'))
            checkList.classList.remove('visible');
        else
            checkList.classList.add('visible');
    }

    checkList.onblur = function(evt) {
        checkList.classList.remove('visible');
    }
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
    div.className = "pop"
    div.append(ul2);
    wo.exercises.forEach(function(ex) {
        let li2 = document.createElement("li");
        li2.innerText = ex.name;
        ul2.append(li2);
    })
    button.innerText = wo.name;
    li.append(button, div);
    ul.append(li);
}

function createExercise(event) {
    event.preventDefault();
    console.log("U made it");
    let options = {
        name: event.target.parentNode.name.value,
        focus: event.target.parentNode.focus.value,
        work_time: event.target.parentNode.work_time.value,
        rest_time: event.target.parentNode.rest_time.value,
        rounds: event.target.parentNode.rounds.value,
        exercises: ["Push Up", "Cobra Push-Up", "Skull Crushers"],
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
        .then(function(data) { eachWorkout(data) })
        .catch(function(error) {
            alert("turn server on please");
            console.log(error.message)
        })
}
// }

function timerTech() {

    let seconds = 20;
    let rest = true;
    let interval;

    let intervalTime = 20;
    let breakTime = 10;

    let settingsButton = document.getElementById("settings");
    let intervalInput = document.getElementById("intervalTime");
    let breakInput = document.getElementById("breakTime");

    let startButton = document.getElementById("start");
    let pauseButton = document.getElementById("pause");
    let resetButton = document.getElementById("reset");

    let statusHeader = document.getElementById("status");
    let secondsSpan = document.getElementById("sec");

    settingsButton.onclick = function() {
        intervalTime = Math.floor(intervalInput.value * 1);
        breakTime = Math.floor(breakInput.value * 1);
        reset();
    }

    startButton.onclick = function() {
        rest = false;
        changeToGo();
        interval = setInterval(countdownSeconds, 1000);
    }

    resetButton.onclick = function() {
        reset();
    }

    function reset() {
        clearInterval(interval);
        seconds = intervalTime;
        secondsSpan.innerText = seconds;
        rest = true;
        changeToRest();
    }

    pauseButton.onclick = function() {
        clearInterval(interval);
    }

    function countdownSeconds() {
        seconds -= 1;
        secondsSpan.innerText = seconds;
        checkForStateChange();
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
        $("body").css("background", "cyan");
        statusHeader.innerText = "Rest";
    }

    function changeToGo() {
        $("body").css("background", "pink");
        statusHeader.innerText = "Go!";
    }

}