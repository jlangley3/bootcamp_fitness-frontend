const URL = "http://localhost:3000"
const Ex_URL = `${URL}/exercises`
const Work_URL = `${URL}/workouts`
const Both_URL = `${URL}/exercise_workouts`


document.addEventListener("DOMContentLoaded", function() {
    console.log("page is loaded");
    fetchExercises();
    fetchWorkouts();
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

    var checkList = document.getElementById('list1');
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
    let li = document.createElement("li")
    li.innerText = wo.name
    ul.append(li)
}

function createExercise(event) {
    event.preventDefault();
    console.log("U made it");
    // event.target.parentNode.focus.value
    // event.target.parentNode.focus.value
    let options = {
        name: "Shoulders",
        focus: "Upper Body",
        work_time: "10",
        rest_time: "5",
        rounds: "5",
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
        .then(console.log)
        .catch(function(error) {
            alert("turn server on please");
            console.log(error.message)
        })
}
// }