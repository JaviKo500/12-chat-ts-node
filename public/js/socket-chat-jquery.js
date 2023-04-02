const paramsChat = new URLSearchParams( window.location.search );
const userMsg = {
    name: paramsChat.get('name'),
    sale: paramsChat.get('sale'),
};
// * html references
const userContainer =$('#userContainer')
const formSend =$('#formSend')
const txtMessage =$('#txtMessage')
const divChatBox =$('#divChatBox')


// * functions render users
const renderUsers = ( users ) => {
    let html = `<li>
        <a href="javascript:void(0)" class="active"> Chat de <span> ${paramsChat.get('sale')} </span></a>
    </li>`;

    for (const [i, user] of users.entries()) {
        const { id, name } = user;
        html += `<li>
            <a data-id="${id}" href="javascript:void(0)"><img src="assets/images/users/${i+1}.jpg" alt="user-img" class="img-circle"> <span>${name}<small class="text-success">online</small></span></a>
        </li>`
    }

    userContainer.html( html );
}

function renderMessages( msg ) {
    const {name, message} = msg;
    const html = `<li class="animated fadeIn">
        <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>
        <div class="chat-content">
            <h5>${name}</h5>
            <div class="box bg-light-info">${message}</div>
        </div>
        <div class="chat-time">10:56 am</div>
    </li>`;
    divChatBox.append( html );
}

// <!--chat Row -->
{/* <li> */}
    {/* <div class="chat-img"><img src="assets/images/users/2.jpg" alt="user" /></div> */}
    {/* <div class="chat-content"> */}
        {/* <h5>Bianca Doe</h5> */}
        {/* <div class="box bg-light-info">It’s Great opportunity to work.</div> */}
    {/* </div> */}
    {/* <div class="chat-time">10:57 am</div> */}
{/* </li> */}

// * listener

userContainer.on( 'click', 'a', function () {
    const id = $(this).data('id');
    console.log(id);
    if ( id ) {
    }
});

formSend.on('submit', function (event){
    event.preventDefault();
    const { name, sale } = userMsg;
    const message = txtMessage.val();
    if( message.trim().length === 0 ) {
        return;
    }  
    socket.emit('create-message', {
        name, message
    }, function (resp) {
        console.log(resp);
        renderMessages(resp)
    });
})