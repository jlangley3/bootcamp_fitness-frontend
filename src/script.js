const URL = "http://localhost:3000"
const Ex_URL = `${URL}/exercises`
const Work_URL = `${URL}/workouts`
const Both_URL = `${URL}/exercise_workouts`
const Users_URL = `${URL}/users/names`
const UsersAll_URL = `${URL}/users`

let workOut = false;
// let wo_button;
let current_user = "1"

const mainDiv = () => document.querySelector("main");
const timerContainer = () => document.querySelector("#wotimer");
const workOutCard = () => document.querySelector("#selected");
const loginButton = () => document.querySelector(".login2");
const loginPage = () => document.querySelector(".login");
const wo_button = () => document.querySelector("#wobutton");
const create_button = () => document.querySelector("#createbutton");
const delete_button = () => document.querySelector("#deletebutton");
const update_button = () => document.querySelector("#updatebutton");
const createCard = () => document.querySelector("#create");
const deleteCard = () => document.querySelector("#delete");



document.addEventListener("DOMContentLoaded", function() {

    console.log("page is loaded");

    let submit = document.querySelector(".submit");
    fetchExercises();
    fetchWorkouts();
    timerTech();
    // getDlUserWorkouts()


    mainDiv().style.display = "none";
    createCard().style.display = "none";
    deleteCard().style.display = "none";
    timerContainer().style.display = "none";
    // workOutCard().style.display = "none";

    create_button().addEventListener("click", function() { toggleCreate() });
    delete_button().addEventListener("click", function() { toggleDelete() });
    // update_button().addEventListener("click", {});
    submit.addEventListener("click", (event) => {
        createWorkout(event)
    });
    wo_button().addEventListener("click", (event) => {
        toggleWoDisplay();
    });
    loginButton().addEventListener("click", (event) => {
        let name = event.target.parentNode.children.user_name.value;
        let password = event.target.parentNode.children.psw.value;
        if (name && password) {
            fetchUsers(name, password);
            loginPage().style.display = "none";
            mainDiv().style.display = "grid";

        } else { alert("You must insert a User Name and Password") }

    });
    let toggleSwitch = document.querySelector("input[name=checkbox]")
    toggleSwitch.addEventListener('change', function() {
        if (this.checked) {
            console.log("checked")
            clearWorkouts()
            getUserWorkouts()
            document.querySelector("#banner").innerText = "Your WorkOuts"
        } else {
            console.log("unchecked")
            clearWorkouts()
            fetchWorkouts();
            document.querySelector("#banner").innerText = "All WorkOuts"
        }
    });
});

function toggleWoDisplay() {
    workOut = !workOut
    if (workOut) {
        timerContainer().style.display = "block";
        startWorkout(event);
        wo_button().innerText = "QUIT?";

    } else {
        timerContainer().style.display = "none";
        wo_button().innerText = "START"
    }

}

function toggleCreate() {

    if (createCard().style.display === "none") {
        createCard().style.display = "grid";
        create_button().innerText = "Close Create Card"
    } else {
        createCard().style.display = "none";
        create_button().innerText = "Create Exercises"
    }

}

function toggleDelete() {

    if (deleteCard().style.display === "none") {
        deleteCard().style.display = "grid";
        delete_button().innerText = "Close Delete Card"
    } else {
        deleteCard().style.display = "none";
        delete_button().innerText = "Delete Exercises"
    }

}

function fetchUsers(name, password) {
    event.preventDefault();
    console.log("You Made it");
    let options = {
        name: name,
        password: password
    };
    fetch(Users_URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(options)
        })
        .then(resp => resp.json())
        .then((user) => userData(user))
        .catch(function(error) {
            alert("turn server on please");
            console.log(error.message)
        })
};

function userData(user) {
    current_user = user
    getDlUserWorkouts();
}

function getUserWorkouts() {
    fetch(UsersAll_URL + `/${current_user.id}`)
        .then(resp => resp.json())
        .then(function(user) { displayUserWorkouts(user) })
        .catch(function(error) { console.log(error.message) })
}

function displayUserWorkouts(user) {
    let banner = document.querySelector(".wolist");
    if (user.workouts) {
        banner.innerText = "";
        user.workouts.forEach(function(workout) {
            eachWorkout(workout);
        })
    } else { banner.innerText = "Create workouts to display them here" }
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

function clearWorkouts() {
    let ul = document.querySelector(".wolist");
    ul.innerHTML = ""

}

function eachWorkout(wo) {
    let ul = document.querySelector(".wolist");
    let li = document.createElement("li");
    let ul2 = document.createElement("ul");
    let div = document.createElement("div");
    let button = document.createElement("button");
    li.className = "workout";
    div.className = "pop";
    div.append(ul2);
    if (wo.exercises) {
        wo.exercises.forEach(function(ex) {
            let li2 = document.createElement("li");
            li2.innerText = ex.name;
            ul2.append(li2);
        })
    }
    button.innerText = wo.name;
    li.append(button);
    ul.append(li, div);
    button.addEventListener("click", function(event) { showWorkout(event, wo) })
}

// function myWorkouts(wo) {
//     let ul = document.querySelector(".mywolist");
//     let li = document.createElement("li");
//     let ul2 = document.createElement("ul");
//     let div = document.createElement("div");
//     let button = document.createElement("button");
//     li.className = "workout";
//     div.className = "pop";
//     div.append(ul2);
//     if (wo.exercises) {
//         wo.exercises.forEach(function(ex) {
//             let li2 = document.createElement("li");
//             li2.innerText = ex.name;
//             ul2.append(li2);
//         })
//     }

//     button.innerText = wo.name;
//     li.append(button);
//     ul.append(li, div);
//     button.addEventListener("click", function(event) { showWorkout(event, wo) })
// }

function getDlUserWorkouts() {
    let banner = document.querySelector(".dlwolist");
    if (current_user.workouts) {
        banner.innerText = "";
        current_user.workouts.forEach(function(workout) {
            eachDlWorkout(workout);
        })
    } else { banner.innerText = "Create workouts to display them here" }
}

function eachDlWorkout(wo) {
    let ul = document.querySelector(".dlwolist");
    let li = document.createElement("li");
    let ul2 = document.createElement("ul");
    let div = document.createElement("div");
    let button = document.createElement("button");
    li.className = "workout";
    div.className = "pop";
    div.append(ul2);
    if (wo.exercises) {
        wo.exercises.forEach(function(ex) {
            let li2 = document.createElement("li");
            li2.innerText = ex.name;
            ul2.append(li2);
        })
    }

    button.innerText = wo.name;
    li.append(button);
    ul.append(li, div);
    button.addEventListener("click", function(event) { deleteWorkout(event, wo) })
}

function deleteWorkout(event, wo) {
    event.preventDefault();
    fetch(Work_URL + `/${wo.id}`, {
            method: "DELETE"
        }).then(resp => resp.json())
        .then(function(message) {
            console.log(message);
            event.target.remove();
            let array = current_user.workouts
            for (var i = 0; i < array.length; i++) {
                if (array[i] === wo) { array.splice(i, 1); }
            }
        })
        .catch(function() {
            alert("Workout was not Deleted");
            console.log(error.message)
        })
}

function createWorkout(event) {
    event.preventDefault();
    console.log("U made it");
    let newArray = [];
    let array = document.querySelector(".items").querySelectorAll("input");

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
        exercises: newArray,
        user_id: current_user.id
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
            eachWorkout(data)
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
    let details = document.querySelector(".details");

    ol.innerHTML = "";
    details.innerText = "";

    let exs = document.createElement("p");
    let focus = document.createElement("p");
    let p = document.createElement("p");
    let p1 = document.createElement("p");
    let p2 = document.createElement("p");

    // exs.innerText = "Exercises:";
    // focus.innerText = wo.focus;

    p.dataset.rounds = wo.rounds;
    p.dataset.on = wo.work_time;
    p.dataset.rest = wo.rest_time;

    p.innerText = wo.rounds + " " + "Rounds";
    p1.innerText = wo.work_time + " " + " Second Intervals";
    p2.innerText = wo.rest_time + " " + "Second Rest Periods";

    details.append(p, p1, p2, focus, exs)
    wo.exercises.forEach(function(ex) {
        let li2 = document.createElement("li");
        li2.innerText = ex.name;
        ol.append(li2);
    })

}

function startWorkout(event) {
    debugger;
    // if (event.target.parentNode.querySelector("p") === !null) {
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
    // }
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
        oneRoundTime = intervalTime + breakTime + 2;
        reset();
        changeToGo();
    }

    startButton.onclick = function() {
        rest = false;
        changeToGo();
        interval = setInterval(countdownSeconds, 1000);
        totalTime = (oneRoundTime * rounds - breakTime) * 1000;
        round = setTimeout(roundTimeOut, totalTime);
        oneTime = setInterval(showRoundsLeft, (oneRoundTime * 1000));

    }

    function countdownSeconds() {
        seconds -= 1;
        secondsSpan.innerText = seconds;
        checkForStateChange();
    }

    function roundTimeOut() {
        statusHeader.innerText = "Great Workout!";
        secondsSpan.innerText = "Done!"
        setTimeout(function() { alert("Great Workout!"); }, 1000);
        setTimeout(function() { reset(); }, 2000);

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