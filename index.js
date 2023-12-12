const AddList = document.getElementById('AddList');
const AddInput = document.querySelector('#AddList input');
const changeInput = document.querySelector('#EditForm input');
const list = document.getElementById('list');
const TODoCount = document.querySelector('.ToDoCount');
const addBtn = document.querySelector('.add');
const addForm = document.querySelector('.addForm');
const changeForm = document.querySelector('.changeForm');
const tagNavRadio = document.querySelectorAll('.tagNav input[name="info"]');
const AllView = document.querySelector('.AllView');
const radioLabel = document.querySelectorAll('input[type="radio"]');
const addFormClose = document.querySelector(".addFormClose")
const changeFormClose = document.querySelector(".changeFormClose")

for (let i = 0; i < radioLabel.length; i++) {
  radioLabel[i].addEventListener('click',(e) => {
    e.target.parentElement.animate(
      [
        {
          scale: 1,
        },
        {
          scale: 0.8,
        },
        {
          scale: 1,
        },
      ],
      {
        duration: 300,
      }
    );
  });
}
for (let i = 0; i < tagNavRadio.length; i++) {
  tagNavRadio[i].addEventListener('click', (e) => {
    const ClickCategory = document
      .getElementById('list')
      .getElementsByClassName(e.target.value);
    for (let i = 0; i < ClickCategory.length; i++) {
      ClickCategory[i].parentElement.parentElement.style.display = "flex";
    }
    $('li .textFrame input')
      .not('.' + e.target.value)
      .parent()
      .parent()
      .css('display', 'none');
  });
}

$('label').click(function () {
  $(this).css('backgroundColor', 'gray');
  $(this).siblings().css('backgroundColor', 'transparent');
});
// 이것도 제이쿼리 문법임 위와 같음. 형제요소의 속성을 변환시킨것.
let currentWord = '';
let taskCount = 0;
TODoCount.innerText = '할 일이 ' + taskCount + '개 남았습니다';
function AddSubmit(e) {
  e.preventDefault();
  ToDovalue = AddInput.value;
  AddInput.value = '';
  addList(ToDovalue);
}
function addList(ToDovalue) {
  taskCount = taskCount + 1;
  TODoCount.innerText = '할 일이 ' + taskCount + '개 남았습니다';
  const li = document.createElement('li');
  const textContainer = document.createElement('div');
  textContainer.classList.add("textFrame")
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add("buttonFrame")
  const inp = document.createElement('input');
  const span = document.createElement('span');
  const DeleteButton = document.createElement('button');
  DeleteButton.className = "deletebtn"
  const PinButton = document.createElement("input");
  PinButton.type = "checkbox"
  PinButton.className = "pinbtn"
  const EditButton = document.createElement("button");
  EditButton.className = "editbtn"
  const radioValue = document.querySelector(
    '.tagContainer input[type="radio"]:checked'
  );

  textContainer.append(inp,span)
  buttonContainer.append(PinButton,EditButton,DeleteButton)
  li.append(textContainer,buttonContainer);
  try {
    inp.classList.add(radioValue.value);
    inp.type = 'checkbox';
  } catch (error) {
    inp.classList.add('none');
    inp.type = 'checkbox';
  }

  DeleteButton.addEventListener('click', delList);
  PinButton.addEventListener("click",pinList)
  span.innerText = ToDovalue;
  // span.addEventListener('dblclick', changeList);
  EditButton.addEventListener("click",changeList);
  list.appendChild(li);
}
function changeList(e) {
  const ClickLi = e.target.parentElement.parentElement
  ClickLi.querySelector("span").classList.add("check")
  const ClickSpan = ClickLi.querySelector(".check")
  const EditRadio = document.querySelectorAll(
    '#EditForm .tagContainer input[type=radio]'
  );
  const ClickCategory = ClickLi.querySelector(".textFrame").querySelector("input[type=checkbox]")
  for (let i = 0; i < EditRadio.length; i++) {
    if (EditRadio[i].value == ClickCategory.classList) {
      EditRadio[i].checked = true;
      EditRadio[i].parentElement.style.backgroundColor = 'gray';
      $(EditRadio[i]).parent().siblings().css('backgroundColor', 'transparent');
    }
  }
  console.log(ClickLi.querySelector(".check"))
  e.target.previousElementSibling.classList;
  changeForm.classList.remove('hidden');
  changeInput.value = ClickSpan.innerText;
  ClickSpan.innerText = changeInput.value;
  const input = document.querySelector("#EditForm input[type=text]")
  input.focus()
}
function changeSubmit(event) {
  event.preventDefault();
  const checkList = document.querySelector('#list .check');
  checkList.innerText = changeInput.value;
  const radioValue = document.querySelector(
    '#EditForm .tagContainer input[type="radio"]:checked'
  );
  try {
    checkList.previousElementSibling.className = radioValue.value;
  } catch (error) {
    checkList.previousElementSibling.className = 'none';
  }
  checkList.classList.remove('check');
  changeForm.classList.add('hidden');
  radioValue.checked = false;
}

function delList(event) {
  const li = event.target.parentNode.parentNode;
  taskCount = taskCount - 1;
  TODoCount.innerText = '할 일이 ' + taskCount + '개 남았습니다';
  li.remove();
}
function pinList(){
  const pinLi = document.querySelectorAll(".pinbtn:checked");
  pinLi.forEach((item)=>{
    list.insertBefore(item.parentElement.parentElement,list.firstChild)
  })
}
AddList.addEventListener('submit', AddSubmit);
addBtn.addEventListener('click', () => {
  addForm.classList.remove('hidden');
  const input = document.querySelector("#AddList input[type=text]")
  input.focus()
  const radioValue = document.querySelector(
    '.tagContainer input[type="radio"]:checked'
  );
  radioValue.checked = false;
  const label = document.querySelectorAll('.tagContainer label');
  for (let i = 0; i < label.length; i++) {
    label[i].style.border = 'none';
    label[i].style.backgroundColor = 'transparent';
  }
});
addForm.addEventListener('submit', () => {
  addForm.classList.add('hidden');
});
addForm.addEventListener('click', (e) => {
  if (e.target.classList == 'addForm') {
    addForm.classList.add('hidden');
    tag = document.querySelectorAll('.tagContainer label');
    for (let i = 0; i < tag.length; i++) {
      tag[i].style.border = 'none';
    }
  }
});
addFormClose.addEventListener("click",()=>{
  addForm.classList.add("hidden")
})
changeForm.addEventListener('submit', changeSubmit);
changeForm.addEventListener('click', (e) => {
  if (e.target.classList == 'changeForm') {
    changeForm.classList.add('hidden');
    document.querySelector('#list .check').classList.remove('check');
    
  }
});
changeFormClose.addEventListener("click",()=>{
  changeForm.classList.add("hidden")
  document.querySelector('#list .check').classList.remove('check');
})
AllView.addEventListener('click', () => {
  const li = document.querySelectorAll('#list li');
  for (let i = 0; i < li.length; i++) {
    li[i].style.display = 'flex';
  }
  for (let i = 0; i < tagNavRadio.length; i++) {
    tagNavRadio[i].checked = false;
    tagNavRadio[i].parentElement.style.backgroundColor = 'transparent';
  }
});

document.addEventListener("keydown",(e)=>{
  if(e.key == "Escape"){
    addForm.classList.add("hidden")
    changeForm.classList.add("hidden")
    document.querySelector('#list .check').classList.remove('check');
  }

})