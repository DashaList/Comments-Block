let form = document.querySelector('.comments__form');
let comentsField = document.querySelector('.comments__field');
let commentName = document.getElementById('name');
let nameError = document.querySelector('.name-error');
let commentText = document.getElementById('text');
let textError = document.querySelector('.text-error');
let commentDate = document.getElementById('date');


let validateName = () => {
  if (commentName.value.trim() == '') {
    commentName.classList.add('error');
    nameError.textContent = "Данное поле должно быть заполнено!";
    return false;
  }
  if (commentName.value.length > 140) {
    commentName.classList.add('error');
    nameError.textContent = "Количество символов не должно превышать 140";
    return false;
  }
  
  commentName.classList.remove('error');
  nameError.textContent = "";
  return true;
};

let validateText = () => {
  if (commentText.textContent.trim() == '') {
    commentText.classList.add('error');
    textError.textContent = "Данное поле должно быть заполнено!";
    return false;
  }
  if (commentText.textContent.length > 200) {
    commentText.classList.add('error');
    textError.textContent = "Количество символов не должно превышать 200";
    return false;
  }

  commentText.classList.remove('error');
  textError.textContent = "";
  return true;
};



commentName.addEventListener('blur', () => {
  validateName();
});

commentText.addEventListener('blur', () => {
  validateText();
});

commentText.addEventListener('focus', () => {
  document.querySelector('.placeholder').textContent = "";
});



commentName.addEventListener('input', () => {
  if (commentName.classList.contains('error')) {
    commentName.classList.remove('error');
    nameError.textContent = "";
  }
});

commentText.addEventListener('input', () => {
  if (commentText.classList.contains('error')) {
    commentText.classList.remove('error');
    textError.textContent = "";
  }
  
});


commentName.addEventListener('keydown', (event) => {
  if (event.code === 'Enter') {
    event.preventDefault();
  } 
  
  if (event.code === 'Enter' && !event.shiftKey) {
    event.preventDefault();

    let validName = validateName();
    let validText = validateText();
  
    if (!validName || !validText) {
      return;
    }
  
    submit();
  }
});

commentText.addEventListener('keydown', (event) => {

  if (event.code === 'Enter' && event.shiftKey) {
    event.preventDefault();
    //commentText.innerText += "\n";
  } 

  if (event.code === 'Enter' && !event.shiftKey) {
    event.preventDefault();

    let validName = validateName();
    let validText = validateText();
  
    if (!validName || !validText) {
      return;
    }
  
    submit();  
  }  
});


form.addEventListener('submit', (event) => {
  event.preventDefault();

  let validName = validateName();
  let validText = validateText();

  if (!validName || !validText) {
    return;
  }

  submit();  
});

function submit() {
  let commentDateValue = commentDate.value;
  let currentDate = new Date();
  if (!commentDateValue) {
    date = currentDate;
  } else {
    date = new Date(commentDateValue);
    date.setHours(currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds());
  }

  let comment = {
    name: commentName.value,
    text: commentText.textContent,
    date: date
  };
  
  commentName.blur();
  commentText.blur();
  commentDate.blur();

  commentName.value = '';
  commentText.innerHTML = '<div class="placeholder">Введите текст комментария</div>';
  commentDate.value = '';

  showComment(comment);
};  


let showComment = (comment) => {
  comentsField.style.display = 'block';

  let commentEl = document.createElement('div');
  commentEl.className = "comment";

  let commentHead = document.createElement('div');
  commentHead.className = "comment__head";
  let commentHeadLeft = document.createElement('div');
  commentHeadLeft.className = "comment__head-left";

  let commentName = document.createElement('h3');
  commentName.className = "comment__name";
  commentName.textContent = comment.name;

  let commentDate = document.createElement('span');
  commentDate.className = "comment__date";
  commentDate.textContent = dateConverter(comment.date);

  let commentDel = document.createElement('button');
  commentDel.className = "comment__delete";
  let commentDelImg = document.createElement('img');
  commentDelImg.src = 'img/delete.svg';
  commentDelImg.className = "comment__delete-img";
  commentDel.append(commentDelImg);

  commentHeadLeft.append(commentName);
  commentHeadLeft.append(commentDate);
  commentHead.append(commentHeadLeft);
  commentHead.append(commentDel);
  
  let commentText = document.createElement('p');
  commentText.className = "comment__text";
  commentText.textContent = comment.text;

  let commentLike = document.createElement('button');
  commentLike.className = "comment__like";

  commentEl.append(commentHead);
  commentEl.append(commentText);
  commentEl.append(commentLike);
  comentsField.append(commentEl);
}


let dateConverter = (date) => {
  let commentDate = '';
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  let hour = date.getHours();
  let minutes = date.getMinutes();

  let currentDate = new Date();
  let date1 = date;
  date1.setDate(date1.getDate() + 1);

  if (year == currentDate.getFullYear() && 
      month == currentDate.getMonth() &&
      day == currentDate.getDate()) {
        commentDate = 'сегодня, ';
  } else if (date1.getFullYear() == currentDate.getFullYear() && 
            date1.getMonth() == currentDate.getMonth() &&
            date1.getDate() == currentDate.getDate()) {
              commentDate = 'вчера, ';
  } else {
    if (day < 10) {
      day = `0${day}`;
    } if (month < 10) {
      month = `0${month}`;
    }
    commentDate = `${day}.${month}.${year} `;
  }

  if (hour < 10) {
    hour = `0${hour}`;
  } if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  commentDate += `${hour}:${minutes}`;

  return commentDate;
}



comentsField.addEventListener('click', (event) => {
  if (event.target.className != 'comment__delete-img') {
    return;
  }
  let comment = event.target.closest('.comment');
  comment.remove();
  
  if (document.querySelectorAll('.comment').length == 0) {
    comentsField.style.display = "none";
  }
});

comentsField.addEventListener('click', (event) => {
  if (!event.target.classList.contains('comment__like')) {
    return;
  }
  event.target.classList.toggle('active');
});