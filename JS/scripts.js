var maxId=200;
var doings={
    Array:
    []
};

var completed={
  Array:
  []
};

var not_completed={
  Array:
  []
};

var filter=0;

var isFirst=true;

function changeFilter()
{
    var inp = document.getElementsByName('filter');
    for (var i = 0; i < inp.length; i++) {
        if (inp[i].type == "radio" && inp[i].checked) {
            filter=inp[i].value;
        }
    }
    showList();
}

const url ='https://jsonplaceholder.typicode.com/todos';
var infoJson="";

function show_(){
  if(isFirst){
    document.getElementById("doings").classList.toggle("show");
  }
  isFirst=false;
  showList();
}

async function showList() {
  outputIt();
  await getDoings();
  if(filter==0||filter==1){
    for (let i = 0; i < not_completed.Array.length; i++) {
      infoJson+='<div class="drops"><p><input class="button" type="button" onclick="popIt('+not_completed.Array[i].id+')" id="'+not_completed.Array[i].id + '"/>'+not_completed.Array[i].title +'</p></div>'    
    }
  }
  if(filter==0||filter==2){
    for (let i = 0; i < completed.Array.length; i++) {
      infoJson+='<div class="drops"><s><input class="button" type="button" onclick="popIt('+completed.Array[i].id+')" id="'+completed.Array[i].id + '"/>'+completed.Array[i].title +'</s></div>'
    }
  }
  el=document.getElementById("doings");
  el.innerHTML=infoJson;
  infoJson="";
  completed={
    Array:
    []
  };
  not_completed={
    Array:
    []
  };
}

if(localStorage.length==0){
    localStorage.setItem('doings', JSON.stringify(doings));
}

async function getDoings(){
  const response = await fetch(url);
  const data = await response.json();
  el=document.getElementById("doings");
  var infoJson="";
  for (let i = 0; i < data.length; i++) {
    if(data[i].userId==1){
      if(data[i].completed){
        completed.Array.push(data[i]);
      }else{
        not_completed.Array.push(data[i]);
      }
    }
  }
}

function outputIt() {
    var restoredDoings = JSON.parse(localStorage.getItem('doings'));
    var outputs = "";
    for(var i = 0; i < restoredDoings.Array.length; i++)
    {
      if (restoredDoings.Array[i].id>maxId){
        maxId=restoredDoings.Array[i].id;
      }
      if (restoredDoings.Array[i].completed){
        completed.Array.push(restoredDoings.Array[i]);
      }else{
        not_completed.Array.push(restoredDoings.Array[i]);
      }
    }
  }

  function findIndex(array,Id){
    for(var i = 0; i < array.length; i++)
    {
      if (array[i].id==Id){
          return i;
      }
    }
    return -1;
  }

  function findById(array,Id){
    for(var i = 0; i < array.length; i++)
    {
      if (array[i].id==Id){
          return array[i];
      }
    }
    return null;
  }

  function remove(array,Id){
      array.splice(findIndex(array,Id),1);
      return array;
  }

function popIt(id){
    var restoredDoings = JSON.parse(localStorage.getItem('doings'));
    element=findById(restoredDoings.Array,id);
    restoredDoings.Array=remove(restoredDoings.Array,id);
    if(!element.completed){
      element.completed=true;
      restoredDoings.Array.push(element);
    }
    localStorage.setItem('doings', JSON.stringify(restoredDoings));
    showList()
}

function pushIt() {
  var restoredDoings = JSON.parse(localStorage.getItem('doings'));
  restoredDoings.Array.push({
    id:  maxId+1,
    title: document.getElementById("input").value,
    completed: false
  });
  maxId=maxId+1;
  localStorage.setItem('doings', JSON.stringify(restoredDoings));
  showList();
}