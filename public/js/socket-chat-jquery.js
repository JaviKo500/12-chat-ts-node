const paramsChat = new URLSearchParams( window.location.search );

// * html references
const userContainer =$('#userContainer')


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

// * listener

userContainer.on( 'click', 'a', function () {
    const id = $(this).data('id');
    console.log(id);
    if ( id ) {
    }
});