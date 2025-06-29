const wow = document.querySelector("ul")

const addelem = document.querySelector('.add')
addelem.addEventListener("click", (event) =>{
    const intake = document.querySelector('input')
      const value = intake.value.trim();

      if(value == ""){
        return;
      }
      const round = document.createElement('div');
      round.className = 'round'

      const round2 = document.createElement('div');
      round2.className = 'click'
      const tick = document.createElement('i')
      tick.className ='fas fa-check'
      round2.appendChild(tick)

      
      const div = document.createElement('div')
      div.className = 'div1';
      
      const li = document.createElement("li");
      li.textContent = value;
      
      const ex = document.createElement('i')
      ex.className = "fa fa-times" 
      
      div.appendChild(round2)
      div.appendChild(round)
      div.appendChild(li)
      div.appendChild(ex)
    
      document.querySelector('.to-do').appendChild(div);
      intake.value = null;
      savedata()
   
      
});
wow.addEventListener("click", (event) => {
    const taskItemDiv = event.target.closest('.div1'); // Get the main task item container
    if (!taskItemDiv) {
        return; // Click was not inside a task item
    }

    // Get elements relative to the taskItemDiv for consistency
    const li = taskItemDiv.querySelector('li');
    const roundCircle = taskItemDiv.querySelector(".round"); // The empty circle
    const checkmarkDiv = taskItemDiv.querySelector(".click"); // The div containing the checkmark icon
    const checkmarkIcon = taskItemDiv.querySelector(".fa-check"); // The checkmark icon itself

    // Basic check to ensure elements exist
    if (!li || !roundCircle || !checkmarkDiv || !checkmarkIcon) {
        return;
    }

    // Handle delete
    if (event.target.classList.contains('fa-times')) {
        taskItemDiv.remove(); // remove the whole task item
        savedata();
        return; // Exit after deleting
    }

    // Handle toggle completion
    // Case 1: Task is currently completed (strike-through) and we want to un-complete it.
    // This happens if the LI text itself is clicked, or if the checkmarkDiv or checkmarkIcon is clicked.
    if (li.classList.contains('strike')) {
        if (event.target.tagName === 'LI' || event.target === checkmarkDiv || event.target === checkmarkIcon) {
            roundCircle.style.display = "flex";
            checkmarkDiv.style.display = 'none';
            li.classList.remove('strike'); // Use classList.remove
            savedata();
        }
    }
    // Case 2: Task is currently incomplete and we want to complete it.
    // This happens if the LI text itself is clicked, or if the roundCircle (empty circle) is clicked.
    else {
        if (event.target.tagName === 'LI' || event.target === roundCircle) {
            roundCircle.style.display = "none";
            checkmarkDiv.style.display = 'flex';
            li.classList.add('strike'); // Use classList.add
            savedata();
        }
    }
});

function savedata(){
localStorage.setItem("todo-data", wow.innerHTML)
}
function  show(){
    wow.innerHTML = localStorage.getItem('todo-data')
}
show()