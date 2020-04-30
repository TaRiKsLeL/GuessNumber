$(document).ready(function(){ // Якщо документ загрузився

var users=[];
var currentUserName='';    

var onReload = false;

var rand_num = Math.floor(Math.random() * 100); // загадуємо число
console.log(rand_num); // :) робимо сибі підказку

function createNewUser(userName, attempts){
    users.push({
        name: userName,
        attempts: attempts,
    });
}

function createUsersTable(){
    
    let headerTable = `<tr><th>Ім'я</th><th>Спроби</th></tr>`
    let innerTable =  users.reduce(function(res,curr){
        return res += `<tr> 
                <td> ${curr.name}</td>
                <td> ${curr.attempts}</td>
                </tr>`;
    },'');
    return "<table>"+headerTable+innerTable+"</table>";
}

$("#input_num").click(function() { //після нажання кнопки
    if(onReload){
        $(this).html('Випробувати вдачу');
        rand_num = Math.floor(Math.random() * 100);
        console.log(rand_num);
        $("#user_name").prop('disabled', false);
        $("#you_num").prop('disabled', false);
        onReload=false;
        return;
    }

    let inputName = $('#user_name').val();
    var num = $('#you_num').val(); // берем своє введене число

    if(currentUserName!== inputName && users.some(user=>user.name===inputName)){ // Якщо ввели користувача, який раніше був введений, очистити дані про нього 
        users.find(user=>user.name===inputName).attempts =0;
    }
    
    currentUserName = inputName;
    
    if(users.some(user=>user.name===currentUserName)){                  //Якщо міститься такий користувач в списку, якщо ні - створити
        users.find(user=>user.name===currentUserName).attempts +=1;
    }else{
        console.log("adding user");
        createNewUser(currentUserName,1);
    }

    let hint = '';
    let subHint='';

    if (num == rand_num) { // і перевіряємо чи вгадали
        hint += `success <br> Game over` ; // відповідно вітаємо з перемогою
        win();
    } else {
        hint += `неправильно <br>` ; // або кажемо що не вгадав
        $('#rez .hint').css('color','red');
      if(num>rand_num){ // і хочу щоб була підказка
            subHint += `дане число більше загаданого`;
        }
        if(num<rand_num){
            subHint += `дане число менше загаданого`;
        }
    }
    $('#rez .hint').html(hint);
    $('#rez .sub-hint').html(subHint);
});

function win(){
        onReload=true;
        $('#input_num').html("Попробувати ще раз");
        users.sort((prevUser,nextUser)=>prevUser.attempts-nextUser.attempts);
        $("#user_name").prop('disabled', true);
        $("#you_num").prop('disabled', true);
        $('.rating').html(createUsersTable());
        $('#rez .hint').css('color','green');
        $('#user_name').val('');
        $('#you_num').val('');
}

});