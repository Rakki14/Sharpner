function toaddvalue(event){
    event.preventDefault();
    const amount=event.target.amt.value;
    const category=event.target.cate.value;
    const description=event.target.desc.value; 

    let myObj={
        amount:amount,
        category:category,
        description:description
    };
   
    const key='entry_'+Date.now();
    const myObjString=JSON.stringify(myObj);
    localStorage.setItem(key,myObjString);
    addEntryDOM(key,myObj);
    event.target.reset();
}

function addEntryDOM(key,myObj){
    const Ul=document.querySelector('ul');
    const newLi=document.createElement('li');
    newLi.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'mb-2', 'shadow', 'rounded');
    newLi.textContent=`${myObj.amount} - ${myObj.category} - ${myObj.description}`;

    const btn1=document.createElement('button');
    btn1.textContent="Delete";
    btn1.classList.add('btn','btn-danger','ms-2');
    btn1.onclick =(event)=>{
        const delElement=event.target.parentElement;
        Ul.removeChild(delElement);
        localStorage.removeItem(key);
    };
    const btn2=document.createElement('button');
    btn2.textContent="Edit";
    btn2.classList.add('btn','btn-danger','ms-2');
    btn2.onclick =(event)=>{
        const delElement=event.target.parentElement;

        const parseObj = JSON.parse(localStorage.getItem(key));
        document.getElementById('amt').value = parseObj.amount;
        document.getElementById('cate').value = parseObj.category;
        document.getElementById('desc').value = parseObj.description;
    
        localStorage.removeItem(key);
        Ul.removeChild(delElement);
    };

    newLi.appendChild(btn2);
    newLi.appendChild(btn1);
    Ul.appendChild(newLi);
}

function loadEntriesFromLocalStroage(){
   
    for(let i=0;i<localStorage.length;i++){
        const key=localStorage.key(i);
        if(key.startsWith('entry_')){
            const myObjString=localStorage.getItem(key);
            const myObj=JSON.parse(myObjString);
            addEntryDOM(key,myObj);
        }
    }
}
window.onload=loadEntriesFromLocalStroage;
