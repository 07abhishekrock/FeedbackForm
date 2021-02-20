//static text data sample

time_sense = [
  'Punctuality in taking classes.',
  'Regularity in taking classes',
  'Syllabus Completion',
  'Scheduled Organisation of assignments and quizzes',
  'Alternate Arrangement in case of absence',
  'Alternate Arrangement in case of absence',
  'Alternate Arrangement in case of absence',
  'Alternate Arrangement in case of absence'
]
subject_command = [
  'Focus on syllabi', 
  'Self confidence', 
  'Communication Skills',
  'Conducting Classroom discussions',
  'Delivery and preparation'
]
qualities = [
  'Professional',
  'Strict',
  'Friendly',
  'Creative',
  'Unprofessional',
  'Experienced',
  'Prepared',
  'Lenient',
  'Ethical',
  'Dedicated'
]

teachers_name_list = {
  'Miss Jane Doe':0,
  'Mr John Smith':0,
  'Mr Steve Stane':0,
  'Miss Anna Lanes':0,
  'Mr Jonathan Cred':0
}

questions = [time_sense, subject_command];
titles = ['TIME SENSE','SUBJECT COMMAND','QUALITIES'];


//end of sample data
//create sample response
function sample_response(){
response_time_sense = [];
response_subject_command = [];
response_qualities = [];
questions[0].forEach((_,index)=>response_time_sense[index] = 11);
questions[1].forEach((_,index)=>response_subject_command[index] = 11);
qualities.forEach((_,index)=>response_qualities[index] = 0);
return [response_time_sense, response_subject_command, response_qualities];
}

responses = sample_response();
//end of sample response




//declarations
teachers_list = document.querySelector('ul.combo-elements');
progress_list = document.querySelector('ul.feedback_list');
selected_teacher = document.querySelector('span.selected');
arrow = document.querySelector('div.arrow');
progress_bar_list = document.querySelectorAll('div.progress-bar>div.progress');
progress_bar = progress_bar_list[0];
arrow_up = document.querySelector("button.arrow[type='up']")
arrow_dwn = document.querySelector("button.arrow[type='down']")
page_heading = document.querySelector('span.feedback_heading');
question_list = document.querySelectorAll('span.question');
index_list = document.querySelectorAll('span.number');
selections_list = document.querySelectorAll('li.block');
page_labels = document.querySelectorAll('div.page_label_value');
container = document.querySelector('div.feedback_container');
done_page = document.querySelector('div.done_message');

//ends here
//utility functions
function reset_all_data(){
responses = sample_response();
progress_bar_list.forEach((element)=>{
  element.innerHTML = "11";
  element.style.width = "11%";
})
selections_list.forEach((element)=>{
  element.classList.remove('selected');
  element.classList.add('disappear');
})
}
function retract_to_expand(){
    teachers_list.classList.remove('retract');
    teachers_list.classList.add('expand');
}
function expand_to_retract(){
    teachers_list.classList.remove('expand');
    teachers_list.classList.add('retract');
}
function remove_event(e){
  progress_list.removeEventListener('mousemove', dragndrop);
}
function dragndrop(e){
  if(Array.from(e.target.classList).includes('progress') || Array.from(e.target.classList).includes('progress-bar') ){
    pos_x = e.target.getBoundingClientRect().x;
    mouse_x = e.clientX;
    percentage = Math.floor(100 * ((mouse_x - pos_x)/progress_bar.parentNode.offsetWidth));
    if(Array.from(e.target.classList).includes('progress')){
      progress_target = e.target;
    }
    else{
      progress_target = e.target.children[0];
    }
    if(percentage < 101 && percentage > 10){
    progress_target.style.width = `${mouse_x - pos_x}px`;
    progress_target.innerHTML = `${Math.floor(100 * ((mouse_x - pos_x)/progress_bar.parentNode.offsetWidth))}`;
    let page = parseInt(arrow_dwn.getAttribute('page'),10);
    let counter = parseInt(arrow_dwn.getAttribute('count'),10);
    let index = parseInt(progress_target.getAttribute('index'), 10);
    console.log(counter, index);
    responses[page][counter * 3 + index] = percentage;
    }
  }
}
function touchndrag(e){
  if(Array.from(e.target.classList).includes('progress') || Array.from(e.target.classList).includes('progress-bar') ){
    e.preventDefault();
    pos_x = e.target.getBoundingClientRect().x;
    mouse_x = e.touches[0].clientX;
    percentage = Math.floor(100 * ((mouse_x - pos_x)/progress_bar.parentNode.offsetWidth));
    if(Array.from(e.target.classList).includes('progress')){
      progress_target = e.target;
    }
    else{
      progress_target = e.target.children[0];
    }
    if(percentage < 101 && percentage > 10){
    progress_target.style.width = `${mouse_x - pos_x}px`;
    progress_target.innerHTML = `${Math.floor(100 * ((mouse_x - pos_x)/progress_bar.parentNode.offsetWidth))}`;
    let page = parseInt(arrow_dwn.getAttribute('page'),10);
    let counter = parseInt(arrow_dwn.getAttribute('count'),10);
    let index = parseInt(progress_target.getAttribute('index'), 10);
    console.log(counter, index);
    responses[page][counter * 3 + index] = percentage;
    }
  }
}
function holdndrag(e){
dragndrop(e);
progress_list.addEventListener('mousemove', dragndrop);
}
function reset_progress(page,counter,index){
    element = progress_bar_list[index];
    element.innerHTML = `${responses[page][counter * 3 + index]}`;
    element.style.width = `${responses[page][counter * 3 + index]}%`;
}

function minify_heading(){
  page_heading.classList.add('mini');
}
function maximise_heading(){
  page_heading.classList.remove('mini');
}
function arrow_top_view(){
  arrow_up.classList.add('visible');
}
function arrow_top_disable(){
  arrow_up.classList.remove('visible');
}
function page_label_flush(page){
  page.forEach((element)=>element.classList.remove(element.classList[1])); 
}
function page_label_set(page_set, page){
  page.forEach((element,index)=>element.classList.add(page_set[index])); 
}
function page_move(value_count){
  page_label = arrow_dwn.parentNode.children[0];
  page_label_value_0 = page_label.children[0];
  page_label_value_1 = page_label.children[2];
  page_label_value_2 = page_label.children[4];
  page_label_line_0 = page_label.children[1];
  page_label_line_1 = page_label.children[3];
  page_label_array = [page_label_value_0, page_label_value_1, page_label_value_2, page_label_line_0, page_label_line_1];

  if(value_count === 0){
    page_label_flush(page_label_array);
    page_set_array = ['active', 'non-visited', 'non-visited', 'non-visited', 'non-visited'];
    page_label_set(page_set_array, page_label_array);
  }
  else if(value_count === 1){
    page_label_flush(page_label_array);
    page_set_array = ['visited', 'active', 'non-visited', 'visited', 'non-visited'];
    page_label_set(page_set_array, page_label_array);
  }
  else if(value_count === 2){
    page_label_flush(page_label_array);
    page_set_array = ['visited', 'visited', 'active', 'visited', 'visited'];
    page_label_set(page_set_array, page_label_array);
  }
}
function change_heading(page){
  page_heading.innerHTML = titles[page];
}
function view_disable(element){
  element.style.opacity = 0;
  element.style.pointerEvents = "none";
}
function view_enable(element){
  element.style.opacity = 1;
  element.style.pointerEvents = 'all';
}
function clear_all(){
  done_page.classList.remove('disappear');

}
function show_done(name_value){
  let span = document.querySelector('span.teacher_name');
  span.innerHTML =  name_value;
}
function clear_done(){
  done_page.classList.add('disappear');
}

function refresh_questions(page, counter){
     let index_array = [counter * 3, counter * 3 +1, counter * 3 +2] 
     if(index_array[0] > questions[page].length - 1){
       arrow_dwn.setAttribute('page', page + 1);
       arrow_dwn.setAttribute('count', 0);
       if(page < questions.length - 1){
       refresh_questions(page + 1,0);
       }
       else{
       final_window_view(page,0);
       }
       return;
     }
     if(counter === 0){
       arrow_dwn.classList.remove('next');
       arrow_dwn.children[0].classList.remove('next');
       maximise_heading();
       arrow_top_disable();
     }
     if(counter > 0){
       minify_heading();
       arrow_top_view();
     }
     question_list.forEach((element)=>{
       element.parentNode.classList.remove('disappear');
     })
     for(let i = 0;i<3;i++){
      if(index_array[i] > questions[page].length - 1){
        question_list[i].parentNode.classList.add('disappear');
      }
      else{
      if(index_array[i] === questions[page].length - 1){
        arrow_dwn.classList.add('next');
        arrow_dwn.children[0].classList.add('next');
        arrow_dwn.children[0].innerHTML = "Next";
      }
      question_list[i].innerHTML = questions[page][index_array[i]];;
      reset_progress(page,counter,i);
      }
  }
}
function final_window_view(page, counter){
  // console.log('home hello');
  let index_array = [counter * 6, counter * 6 +1, counter * 6 +2, counter * 6 + 3, counter * 6 + 4, counter * 6 + 5]; 
  selections_list.forEach((element)=>{
    element.classList.remove('disappear');
  })
  question_list.forEach((element)=>{
    element.parentNode.classList.add('disappear');
  })
  if(index_array[0] > qualities.length - 1){
    arrow_dwn.setAttribute('page', page + 1);
    arrow_dwn.setAttribute('count', 0);
    if(page > questions.length - 1){
      //ending code
      clear_all();
      show_done(selected_teacher.innerHTML);
      //code for data entry in database or local text file...
      teachers_name_list[selected_teacher.innerHTML] = 1;
    }
    return;
  }
  if(counter === 0){
    arrow_dwn.classList.remove('next');
    arrow_dwn.children[0].classList.remove('next');
    maximise_heading();
    arrow_top_disable();
  }
  if(counter > 0){
    minify_heading();
    arrow_top_view();
  }

  for(let i = 0;i<6;i++){
   if(index_array[i] > qualities.length - 1){
     selections_list[i].classList.add('disappear');
   }
   else{
   if(index_array[i] === qualities.length - 1){
     arrow_dwn.classList.add('next');
     arrow_dwn.children[0].classList.add('next');
     arrow_dwn.children[0].innerHTML = "Done";
   }
   selections_list[i].innerHTML = qualities[index_array[i]];
   reset_blocks(page,counter, i);
   }
}
}
function disable_button(element){
  element.disabled = "true";
}
function enable_button(element){
  element.removeAttribute('disabled');
}
function reset_blocks(page,counter,index){
  if(responses[page][counter * 6 + index] === 1){
    selections_list[index].classList.add('selected');
  }
  else{
    selections_list[index].classList.remove('selected');
  }
}

//ends here

//events 
arrow.addEventListener('click', function(){
  if(arrow.getAttribute('count') === "0"){
    arrow.setAttribute('count', "1");
    retract_to_expand();
  }
  else if(arrow.getAttribute('count') === "1"){
    arrow.setAttribute('count', "0");
    expand_to_retract();
  }
})
teachers_list.addEventListener('click', (e)=>{
  if(Array.from(e.target.classList).includes('element')){
    expand_to_retract();
    selected_teacher.innerHTML = e.target.innerHTML;
    let teacher_name_selected = selected_teacher.innerHTML;
    if(teachers_name_list[teacher_name_selected] === 0){
    clear_done();
    reset_all_data();
    refresh_questions(0,0);
    arrow_dwn.setAttribute('page', 0);
    arrow_dwn.setAttribute('count',0);
    page_move(0,0);
    page_heading.innerHTML = titles[0];
    }
    else{
      clear_all();
      show_done(teacher_name_selected);
    }

  }
})
progress_list.addEventListener('mousedown', holdndrag);
progress_list.addEventListener('mouseup', remove_event);
progress_list.addEventListener('touchmove', touchndrag);
progress_list.addEventListener('touchstart', touchndrag);



function arrow_down(e){
  disable_button(arrow_dwn);
  let page = parseInt(arrow_dwn.getAttribute('page'),10);
  let count = parseInt(arrow_dwn.getAttribute('count'),10);
  arrow_dwn.setAttribute('count', ++count);
  if(page <= 1){
  refresh_questions(page,count);
  }
  else{
  final_window_view(page,count);
  }

  change_heading(parseInt(arrow_dwn.getAttribute('page'),10))
  page_move(parseInt(arrow_dwn.getAttribute('page'),10));
  setTimeout(()=>{
    enable_button(arrow_dwn);
  },500);
}

function arrow_pressed_up(){
  disable_button(arrow_up);

  let page = parseInt(arrow_dwn.getAttribute('page'),10);
  let count = parseInt(arrow_dwn.getAttribute('count'),10);
  arrow_dwn.setAttribute('count', --count);
  if(page <= 1){
  refresh_questions(page,count);
  }
  else{
  final_window_view(page,count);
  }

//ends here
  setTimeout(()=>{
  enable_button(arrow_up);
  },500)
}

page_labels.forEach((element,index)=>{
  element.addEventListener('click', (e)=>{
    let page_number = index;
    arrow_dwn.setAttribute('page', page_number);
    arrow_dwn.setAttribute('count', 0);
    if(page_number <= 1){
    selections_list.forEach((element)=>element.classList.add('disappear'));
    refresh_questions(page_number,0);
    }
    else{
    final_window_view(page_number,0);
    } 
    page_move(page_number);
    change_heading(page_number);
  })
})

selections_list.forEach((element,index)=>{
element.addEventListener('click', (e)=>{

  element.classList.toggle('selected');
  let page = arrow_dwn.getAttribute('page');
  let counter = arrow_dwn.getAttribute('count');
  if(Array.from(element.classList).includes('selected')){
    responses[page][counter * 6 + index] = 1;
  } 
  else{
    responses[page][counter * 6 + index] = 0;
  }
})

});


//ends here

