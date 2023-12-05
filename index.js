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

for (let i = 0; i < radioLabel.length; i++) {
  radioLabel[i].addEventListener('click', function (e) {
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
      ClickCategory[i].parentElement.parentElement.style.display = "flex"
    }
    $('li input')
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
var taskCount = 0;
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
  const div = document.createElement('div');
  const inp = document.createElement('input');
  const span = document.createElement('span');
  const DeleteButton = document.createElement('button');
  const radioValue = document.querySelector(
    '.tagContainer input[type="radio"]:checked'
  );

  li.appendChild(div);
  div.append(inp,span)
  li.appendChild(DeleteButton);
  try {
    inp.classList.add(radioValue.value);
    inp.type = 'checkbox';
  } catch (error) {
    inp.classList.add('none');
    inp.type = 'checkbox';
  }

  DeleteButton.addEventListener('click', delList);
  span.innerText = ToDovalue;
  span.addEventListener('dblclick', changeList);
  list.appendChild(li);
}
function changeList(e) {
  e.target.classList.add('check');
  const EditRadio = document.querySelectorAll(
    '#EditForm .tagContainer input[type=radio]'
  );
  for (let i = 0; i < EditRadio.length; i++) {
    if (EditRadio[i].value == e.target.previousElementSibling.classList) {
      EditRadio[i].checked = true;
      EditRadio[i].parentElement.style.backgroundColor = 'gray';
      $(EditRadio[i]).parent().siblings().css('backgroundColor', 'transparent');
    }
  }

  e.target.previousElementSibling.classList;
  changeForm.classList.remove('hidden');
  changeInput.value = e.target.innerText;
  e.target.innerText = changeInput.value;
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
  const li = event.target.parentNode;
  taskCount = taskCount - 1;
  TODoCount.innerText = '할 일이 ' + taskCount + '개 남았습니다';
  li.remove();
}

AddList.addEventListener('submit', AddSubmit);
addBtn.addEventListener('click', () => {
  addForm.classList.remove('hidden');
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
changeForm.addEventListener('submit', changeSubmit);
changeForm.addEventListener('click', (e) => {
  if (e.target.classList == 'changeForm') {
    changeForm.classList.add('hidden');
    document.querySelector('#list .check').classList.remove('check');
    const EditRadio = document.querySelectorAll(
      '#EditForm .tagContainer input[type="radio"]'
    );
    for (let i = 0; i < asd.length; i++) {
      if (EditRadio[i].checked == true) {
        EditRadio[i].checked = false;
      }
    }
  }
});
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
