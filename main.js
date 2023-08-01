let form = document.getElementById( "form" );
let textInput = document.getElementById( "textInput" );
let msg = document.getElementById( "msg" );
let dateInput = document.getElementById( "dateInput" );
let textarea = document.getElementById( "textarea" );
let tasks = document.getElementById( "tasks" );
let addT = document.getElementById( "add" );

form.addEventListener( "submit", ( e ) =>
{
   // e.preventDefault();
    formValidation();


} )

let formValidation = () =>
{
    if ( textInput.value === "" )
    {
        msg.innerHTML = "Task cannot be blank"

    } else
    {
        msg.innerHTML = ""
        acceptData();
        addT.setAttribute("data-dismiss","modal")
        addT.click()

        // IIFE=Immediately invoked functional Expression

        ( ()=>{
            addT.setAttribute("data-dismiss","")
        })()
    }
}

let data=[];



let acceptData = () =>{
    data.push({
        text :textInput.value,
        date :dateInput.value,
        description :textarea.value,
       })

       localStorage.setItem("data", JSON.stringify(data))
      

    //    console.log(data);
    createTasks();

}

let createTasks =()=>{
    tasks.innerHTML="";

    data.map((x,y)=>{
        return   (tasks.innerHTML +=
        `
        <div id=${y}>
                        <span class="fw-bold">${x.text}</span>
                        <span class="small text-secondary">${x.date}</span>
                        <p>${x.description}</p>
                        <span class="options">
                            <i onClick="editTask(this)" data-toggle="modal" data-target="#form" class="fas fa-edit"></i>
                            <i onClick="deleteTask(this); createTasks()" class="fas fa-trash-alt"></i>
                        </span>
                    </div>

                    
        `)

        
    })
    resetForm()


  

}

let resetForm =()=>{
    textInput.value=""
    dateInput.value=""
    textarea.value=""
}


let deleteTask= (e)=>{
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id,1)
    localStorage.setItem("data", JSON.stringify(data))



}

let editTask =(e)=>{

    let selectedTask = e.parentElement.parentElement;
    textInput.value=selectedTask.children[0].innerHTML;
    dateInput.value=selectedTask.children[1].innerHTML;
    textarea.value=selectedTask.children[2].innerHTML;
    
    deleteTask(e);



}

//IIFE
(()=>{
    data = JSON.parse (localStorage.getItem("data")) || []
    createTasks();
})();





