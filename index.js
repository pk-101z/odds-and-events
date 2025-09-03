// == State == //
const nums = [];
const oddArr = [];
const evenArr = [];
const itsNaN = []


// == State Logic == //

function addNum(number){
    nums.push(number)

    //after item is added update with (render)

render();
}

function numSort(number){
    if (isNaN(number)){
        itsNaN.push(number)
    }
    else if (number % 2 === 0){
        evenArr.push(number)
    }
    else{
        oddArr.push(number)
    }
}

function sortOne(){ 
    // function must take the first item from nums and sort into the correct array
    if (nums.length === 0){
        return;
    }
    numSort(nums.shift())
    // change to the UI = another render
    render();
}

function sortAll(){
    while (nums.length > 0){
        numSort(nums.shift());
    }
    render();
}

// create form for display in the UI (contains all "form" info like buttons and labels)
function NumForm(){
    const $form = document.createElement("form");
    $form.innerHTML = `
    
    <label for="NumBox">Add a number to the bank</label>
    <input id="NumBox" name="add_number" type="text">
    <button type="submit" data-action="add">Add Number</button>
    <button type="submit" data-action="sortOne">Sort 1</button>
    <button type="submit" data-action="sortAll">Sort All</button>
    
    
        `;
        $form.addEventListener("submit", function(event){
        //prevent refresh
            event.preventDefault();
        //retrieve data from data-action and submit it (instead of event listener)
        const action = event.submitter.dataset.action
        const formData = new FormData($form);

            // === convert input to number by adding number before formData

        const getNum = Number(formData.get("add_number"));
        if (action === "add" && getNum !== ""){
            addNum(getNum);
        } else if (action === "sortOne"){
            sortOne();
        } else if (action === "sortAll"){
            sortAll();
        }
    });
        return $form;
}

function numGroup(label, items){
    const $section = document.createElement("section");
    $section.innerHTML = `<h2>${label}</h2><ul></ul>`;
    
    const $ul = $section.querySelector("ul");

    items.forEach(item => {
        const $li = document.createElement("li");
        $li.textContent = item;
        $ul.appendChild($li);
    });

    return $section;
}



NumForm();
// Paint or Display in UI

function render() {
const $app = document.querySelector("#app");
$app.innerHTML = `
    <h1>Num Sorter 9000</h1>
    <div id="form"></div>
    <div id="numGroup"></div>
    `;
   $app.querySelector("#form").replaceWith(NumForm());
   $app.querySelector("#numGroup").appendChild(numGroup("NumBank", nums));
   $app.querySelector("#numGroup").appendChild(numGroup("Odds", oddArr));
   $app.querySelector("#numGroup").appendChild(numGroup("Evans", evenArr));
   $app.querySelector("#numGroup").appendChild(numGroup("nawt a number", itsNaN));
}
// DONT FORGET TO CALL FUNCTIONS OR THEY WONT BE IN YOUSE
render();
