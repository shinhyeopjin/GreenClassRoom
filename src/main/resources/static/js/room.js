//과제 말풍선
let utilMenu = document.querySelector('.utilMenu');
window.onload = function(){
  utilMenu.classList.add('bounce');
}



// 미니미 클릭시 각각의 말풍선 나타남
var lastClickedBubble = null;

$('.minime-img').click(function() {
    var currentBubble = $(this).siblings('.minmeBubble');

    if (lastClickedBubble !== null && !lastClickedBubble.is(currentBubble)) {
        lastClickedBubble.hide();
    }

    currentBubble.toggle();
    lastClickedBubble = currentBubble;
});

// 쪽지보내기 버튼을 클릭할 때 이벤트 처리
$('.minmeBubble p.letterText').click(function() {
    // 클릭된 .minmeBubble 요소의 부모인 .member에서 클래스가 .name인 요소의 텍스트 값을 가져오기
    var memberName = $(this).closest('.member').find('.name').text();
    
    // 모달 창 안의 #memberName 입력 필드에 선택된 회원의 이름 할당
    $('#letterModal #memberName').val(memberName);
});

$(document).ready(function() {
    // 쪽지보내기 버튼을 클릭할 때 이벤트 처리
    $('.minmeBubble p.letterText').click(function() {
        // data-membername 속성을 통해 memberName 값을 가져옴
        var memberName = $(this).data('membername');
        
        // sendLetter 함수 호출
        sendLetter(memberName);
    });
    
    // sendLetter 함수 정의
    function sendLetter(memberName) {
        // 여기서 memberName을 사용하여 모달 창의 제목과 input 값 업데이트
        $('#letterModal h3').text(memberName + '에게 쪽지보내기'); // 모달 창 제목 업데이트
        $('#memberName').val(memberName); // 숨겨진 input 값 업데이트

        // 모달 창을 보이게 변경
        $('#letterModal').removeClass('fade');
        $('#letterModal').addClass('show');
        $('#letterModal').css('display', 'block');
        
    }
});
// Bootstrap 모달 창을 닫음
function closeLetterBox(){
    $('#letterModal').removeClass('show');
    $('#letterModal').addClass('fade');
    $('#letterModal').css('display', 'none');
 }



// 등록 클릭시 todoList insert
function insertTodo(){
    const result = confirm('등록하시겠습니까?');
    let todoContent =document.querySelector('#todoContent').value;
    let todoFinishDate =document.querySelector('#todoFinishDate').value;

    if(result){
        location.href=`/room/insertTodo?todoContent=${todoContent}&todoFinishDate=${todoFinishDate}`
    };
};
// 삭제버튼 클릭시 todoList delete
function deleteTodo(todoNum){
    const result = confirm('정말 삭제하시겠습니까?');
    if(result){
        location.href=`/room/deleteTodoList?todoNum=${todoNum}`;
    };
};

// 상태 메세지 변경
function showInput(){
    let inputStatus =document.getElementById('input-status-msg');
    inputStatus.style.display='block';

};
// 상태 메세지 input 닫기
function closeInput(){
    let inputStatus =document.getElementById('input-status-msg');
    inputStatus.style.display='none';

};

// 상태 메세지 update
function updateStatusMsg(memberId){
    let inputStatus =document.getElementById('input-status-msg');
    let inputStatusValue =document.getElementById('input-status-msg').value;
    
        if(window.event.keyCode==13){
            inputStatus.style.display='none';
            location.href=`/room/updateStatusMsg?memberId=${memberId}&statusMsg=${inputStatusValue}`;
        };
};

// 쪽지함 체크박스 선택
function checkLetter(){

    // 내용부에 있는 모든 체크박스
    const checkboxes = document.querySelectorAll('input[name="innerCheck"]');
    // 내용부에 체크되어 있는 체크박스
    const checked = document.querySelectorAll('input[name="innerCheck"]:checked');
    

    if(checkboxes.length==checked.length){
        selectAll.checked = true;
    }
    else{
        selectAll.checked =false;
    }

}

// 선택삭제 버튼 클릭시 실행
function deleteletter(){
    // 체크된 체크박스들
    const checkedChks = document.querySelectorAll('.chk:checked');
    // 선택된 상품이 없을 경우
    if(checkedChks.length==0){
        alert('삭제할 쪽지를 선택하세요.');
        // 아무것도 없는 return 을 만나면 함수가 끝난다.
        return ;
    }
    if(confirm('선택한 쪽지를 삭제하시겠습니까?')){
        // 모든 CART_CODE를 가져갈 배열 생성
        let letterNumArr=[];

        // 삭제하고자하는 CART_CODE들 가져오기
        checkedChks.forEach(function(chk,index){
            letterNumArr[index]=chk.value;
        });
        // 삭제하러 이동
        location.href=`/room/deleteLetter?letterNums=${letterNumArr}`;
    }
}
// 답장 input 보이게 하기

function checkLetter(){
    $('.answerLetter').css('display', 'block');
 }
document.addEventListener("DOMContentLoaded", function() {
    var showButtons = document.querySelectorAll('.showinput');

    showButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var letterNum = this.getAttribute('th:value');
            var answerLetterDiv = document.getElementsByClassName('answerLetter_' + letterNum);
            answerLetterDiv.style.display = 'block';
        });
    });
});




// 채팅

var socket = new WebSocket('ws://192.168.30.55:8081/chat');


socket.onopen = function() {
    console.log('채팅 연결되었습니다.');
};

socket.onclose = function(event) {
    if (event.wasClean) {
        console.log('연결이 정상적으로 닫힘, 코드=' + event.code + ' 이유=' + event.reason);
    } else {
        console.error('연결이 끊어짐');
    }
};

socket.onerror = function(error) {
    console.error('오류 발생: ' + error);
};



// 메시지 전송
var messageForm = document.getElementById('message-form');
messageForm.addEventListener('submit', function (e) {
    e.preventDefault();
    sendMessage();
});

function sendMessage() {
    var messageInput = document.getElementById('message').value;
    var sender = "외부인"
    var senderElement = document.getElementById('sender');
    if (senderElement) {
        var name = senderElement.getAttribute('data-sender');
        if (name) sender = name;
    }

    socket.send(JSON.stringify({'content': messageInput, 'sender' : sender}));

    document.getElementById('message').value = '';
}

// 메시지 표시
socket.onmessage = function(event) {
    var message = JSON.parse(event.data);
    showMessage(message.content, message.sender);
    scrollToBottom();
};


function showMessage(message, sender) {
    console.log("보내는사람 : " + sender);
    console.log("메세지 : " + message);
    
    var chatMessages = document.getElementById('chat-messages');
    var msg = document.createElement('p');
    msg.appendChild(document.createTextNode(sender + " : " + message));

    chatMessages.appendChild(msg);
}


// 채팅 스크롤바 항상 밑에 있도록
function scrollToBottom() {
    var chatMessages = document.getElementById('chat-messages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}





// 풀캘린더
var openCalender = document.querySelector('#openCalender');
openCalender.addEventListener('click', function() {

    // 캘린더 크기 조정
  $('#calenderModal').on('shown.bs.modal', function() {           
    calendar.updateSize(); 
  });

  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    editable: true,
    events: {
      url: '/getEvents', 
      method: 'GET'
    },
  });

  calendar.render();


});

$('#eventForm').on('submit', function(e) {
    e.preventDefault();
    
    var title = $('#calTitle').val();
    var date = $('#calDate').val();


    if (title && date) {
        var eventData = {
            calTitle: title,
            calDate: date,
        };

        $.ajax({
            url: '/addEvent', 
            type: 'POST',
            data: JSON.stringify(eventData),
            contentType: 'application/json',
            success: function(response) {
                // 서버에서 응답을 받으면 필요한 동작 수행
                alert(response);
                
                calendar.refetchEvents();
            }
        });
    }
    calendar.refetchEvents();

});


