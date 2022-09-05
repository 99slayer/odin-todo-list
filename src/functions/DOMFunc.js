const sidebar = document.getElementById('sidebar');
const newTaskButton = document.querySelector('.newTaskButton');
const main = document.getElementById('main');

const editFunc = (()=>{
    const editText =(event)=>{    
        const textElement = event.target;
        const input = document.createElement('input');
        textElement.style.display = 'none';
        input.classList.add('textEdit');
        input.value = textElement.innerHTML;
        input.type = 'text';
        textElement.parentNode.insertBefore(input,textElement);
        input.focus();

        //for enter key
        input.onkeydown = (ev) =>{
            if(ev.key == 'Enter'){
                finishEdit()
            }
            return;
        }
        //for clicking off input
        input.onblur = () =>{
            finishEdit();
        };
        const finishEdit = function(){
            textElement.innerHTML = input.value;
            input.parentNode.removeChild(input);
            textElement.style.display = '';
        };
    };
    return {editText};
})();

const taskCreation = (() =>{
    const generateTaskCard = () =>{
        const card = document.createElement('div');
        const cardHeader = document.createElement('div');
        const cardMain = document.createElement('div');
    
        const title = document.createElement('h2');
        title.textContent = 'placeholder title';
        title.classList.add('editable');
        title.addEventListener('click',editFunc.editText);
    
        //going to try and make this a fancy check box thing with 4 levels
        //priority will have 4 levels: critical, important, normal, and finished.
        const priority = document.createElement('p');
        priority.textContent = 'priority';
        priority.classList.add('editable');
        priority.addEventListener('click',editFunc.editText);
    
        //we're gonna try something with an outside library here later.
        const dueDate = document.createElement('p');
        dueDate.textContent = 'dueDate';
        dueDate.classList.add('editable');
        dueDate.addEventListener('click',editFunc.editText);
    
        //setting 'contenteditable' attribute to true seems to yeild better results for description?
        const description = document.createElement('p');
        description.setAttribute('contenteditable','true')
        description.textContent = 'description Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat officiis modi fugit distinctio dignissimos molestias animi cum! Perspiciatis sint unde nisi accusamus eaque facere, porro, sequi, sit illo quas eveniet.'
        description.classList.add('editable');
    
        // seperate all creation into one module then return an object with all created elements and run in through the class adding function?
        const elementObj = {
            card,
            cardHeader,
            cardMain,
            title,
            priority,
            dueDate,
            description,
        };
        const elementNameArray = Object.keys(elementObj);
    
        for(let i=elementNameArray.length-1;i>=0;--i){
            elementObj[elementNameArray[i]].classList.add(`${elementNameArray[i]}`);
        };
        main.append(card);
        card.append(cardHeader,cardMain);
        cardHeader.append(title,priority,dueDate);
        cardMain.append(description);
    };
    const clearTask = () =>{
        main.replaceChildren();
    };
    return{generateTaskCard,clearTask};
})();

// const taskTabCreation = (() =>{
//     const tab = document.createElement('div');
// })();

newTaskButton.onclick = function(){
    taskCreation.clearTask();
    taskCreation.generateTaskCard();
};