$(document).on('submit', '#getUserForm', function (e) {

    e.preventDefault();

    // clears our storage of previous searches
    sessionStorage.clear();
    $('#userResults').empty();
    $('#resultsBox').hide();

    $('#noUserResponse').remove();

    //shows our loader
    $('.ajaxProgress').show();

    // sends-recieves info from python file
    $.ajax({
        type: 'GET',
        async: true,
        url: 'newGetUsers/',
        datatype: 'json',
        data: {
            csrfmiddewaretoken: '{{ csrf_token }}',
            subreddit: $('#subreddit').val(),
            timeParam: $('#timeParam').val(),
        },
        success: function (data) {

            $('#resultsBox').show();
            $('.ajaxProgress').hide();

            // Testing Data Receival

            if (Object.keys(data).length == 0) {

                let noUserResponse = document.createElement('h3');
                noUserResponse.setAttribute('id', 'noUserResponse');
                noUserResponse.setAttribute('class', 'noUserResponse p-1 m-1');
                noUserResponse.innerHTML = `No Users Found In r/${$('#subreddit').val()}`;

                document.getElementById('resultsBox').style.borderColor = 'transparent';
                document.getElementById('resultsBox').appendChild(noUserResponse);


            }

            //Adds users to session Storage
            for (var user in data) {

                //users to session storage
                sessionStorage.setItem(`${data[user].name}`, JSON.stringify(data[user]));

            }

            displayUsers();
        },
        error: function () {

            $('.ajaxProgress').hide();

            let errorResponse = document.createElement('h4');
            errorResponse.setAttribute('class', 'noUserResponse p-1 m-1');
            errorResponse.setAttribute('id', 'noUserResponse');
            errorResponse.innerHTML = `There was an error retrieving this subreddit. Try with another!`;
            document.body.appendChild(errorResponse);
        }
    })
})


function displayUsers() {

    // Iterates over users
    for (var user in sessionStorage) {

        // turns sS data into Object
        userObj = JSON.parse(sessionStorage.getItem(user));

        // Object attribute vars
        let userName = userObj.name;
        let userAvatar = userObj.avatar;
        let userUrl = userObj.url;
        let userLink = userObj.linkKarma;
        let userComment = userObj.commentKarma;


        //get userResults Box
        $('#userResults').show();
        let userResultsBox = document.querySelector('#userResults');


        //Make individual User
        let nUserBox = document.createElement('div');
        nUserBox.setAttribute('value', `${userName}`);
        nUserBox.setAttribute('id', `${userName}`);
        nUserBox.setAttribute('class', 'nUser m-2 p-3');
        userResultsBox.appendChild(nUserBox);

        //Avatar/URL
        let nUserUrl = document.createElement('a');
        nUserUrl.href = userUrl;
        nUserUrl.target = '_blank';

        let nUserAvatar = document.createElement('img');
        nUserAvatar.src = userAvatar;
        nUserAvatar.alt = `${userName}'s Avatar`;
        nUserAvatar.setAttribute('class', 'avatar mb-2');

        nUserUrl.appendChild(nUserAvatar);
        nUserBox.appendChild(nUserUrl);

        //Username
        let nUsername = document.createElement('h4');
        nUsername.setAttribute('class', 'username');
        nUsername.innerHTML = `${userName}`;
        nUserBox.appendChild(nUsername);


        //link Karma
        let nUserLink = document.createElement('h6');
        nUserLink.setAttribute('class', 'linkKarma');
        nUserLink.innerHTML = `Link: ${userLink}`;
        nUserBox.appendChild(nUserLink);

        //comment Karma
        let nUserComment = document.createElement('h6');
        nUserComment.setAttribute('class', 'linkKarma');
        nUserComment.innerHTML = `Comment: ${userComment}`;
        nUserBox.appendChild(nUserComment);

        //Search Posts Button
        let nUserButton = document.createElement('button');
        nUserButton.setAttribute('class', 'userPostButton p-2 mt-2 mb-2');
        nUserButton.setAttribute('id', 'userPostButton');
        nUserButton.setAttribute('value', userName);
        nUserButton.innerHTML = 'Get Posts';
        nUserBox.appendChild(nUserButton);

        //Create Post Loader
        let postLoaderDiv = document.createElement('div');
        postLoaderDiv.setAttribute('class', 'postLoader');
        postLoaderDiv.setAttribute('id', `${userName}-postLoader`);
        let postLoader = document.createElement('img');
        postLoader.src = 'http://ajaxload.info/cache/FB/78/78/9E/10/10/38-1.gif';
        postLoader.alt = "Loader";
        postLoaderDiv.appendChild(postLoader);
        nUserBox.appendChild(postLoaderDiv);


        //Button for showing/hiding subreddits
        let showButton = document.createElement('button');
        showButton.setAttribute('class', 'showButton p-2 mt-2 mb-2');
        showButton.setAttribute('id', `showButton-${userName}`);
        showButton.setAttribute('value', userName);
        showButton.innerHTML = 'Hide Posts';
        // showButton.addEventListener("click", subHider(userName));
        nUserBox.appendChild(showButton);


        //Make an empty subredditBox div
        let subredditBox = document.createElement('div');
        subredditBox.setAttribute('id', `${userName}Sub`);
        subredditBox.setAttribute('class', 'subredditBox mt-2 p-2');
        nUserBox.appendChild(subredditBox);



    }
}


$(document).on('click', '#userPostButton', function (e) {

    userButt = $(this);
    nameValue = $(this).attr("value"); //this will get the attribut of the selected function

    e.preventDefault();

    userButt.css("display", "none");

    $(`#${nameValue}-postLoader`).css("display", "block");


    // console.log(nameValue);

    $.ajax({
        type: 'GET',
        async: true,
        url: 'getPosts/',
        datatype: 'json',
        data: {
            user: nameValue,
        },
        success: function (subData) {

            $(`#${nameValue}-postLoader`).css("display", "none");
            $(`#${nameValue}Sub`).show();

            document.getElementById(`showButton-${nameValue}`).style.display = "block";


            if (Object.keys(subData).length == 0) {

                let noUserResponse = document.createElement('h4');
                noUserResponse.setAttribute('class', 'noUserResponse p-1 m-1');
                noUserResponse.setAttribute('id', 'noUserResponse');
                noUserResponse.innerHTML = `${nameValue} has no posts!`;
                document.getElementById(`${nameValue}Sub`).appendChild(noUserResponse);

                document.getElementById(`${nameValue}Sub`).style.height = "100px";
                document.getElementById(`${nameValue}Sub`).style.borderColor = "transparent";
                document.getElementById(`${nameValue}Sub`).style.boxShadow = "none";

            }


            for (var sub in subData) {


                // make individual subreddit div
                let subreddit = document.createElement('div');
                subreddit.setAttribute('id', `${sub}`);
                subreddit.setAttribute('class', 'subredditBlock m-2 mt-3 p-2');
                document.getElementById(`${nameValue}Sub`).appendChild(subreddit);

                let subredditLink = document.createElement('a');
                subredditLink.href = `https://old.reddit.com/r/${sub}`;
                subredditLink.target = '_blank';
                let subredditHeader = document.createElement('h5');
                subredditHeader.setAttribute('class', 'subredditHeader m-1');
                subredditHeader.innerHTML = `r/${sub}`;
                subredditLink.appendChild(subredditHeader);
                subreddit.appendChild(subredditLink);

                let hideButton = document.createElement('button');
                hideButton.setAttribute('id', `${sub}-hideButton`);
                hideButton.setAttribute('value', `${sub}`);
                hideButton.setAttribute('class', 'hideButton p-1');
                hideButton.innerHTML = '[-]';
                subreddit.appendChild(hideButton);

                let postBox = document.createElement('div');
                postBox.setAttribute('id', `${sub}-postBox`);
                subreddit.appendChild(postBox);

                let postUrlList = [];

                for (var i = 0; i < subData[sub].length; i++) {

                    var post = subData[sub][i];

                    let postTitle = post.title;
                    let postAuthor = post.author;
                    let postSubreddit = post.subreddit;
                    let postUrl = post.url;
                    let postComments = post.comments;
                    let postCommentsUrl = post.comments_url;
                    let postUpvotes = post.upvotes;
                    let postId = post.id;
                    let postThumbnail = post.thumbnail;

                    //post div
                    let nPost = document.createElement('div');
                    nPost.setAttribute('id', `${postId}`);
                    nPost.setAttribute('class', 'post m-2 p-2');
                    postBox.appendChild(nPost);


                    //post Thumnbnail/Pic-Url
                    let nPostUrl = document.createElement('a');
                    nPostUrl.href = postUrl;
                    nPostUrl.target = '_blank';
                    nPostUrl.setAttribute('class', 'nPostUrl');

                    let nPostThumbnail = document.createElement('img');
                    if (postThumbnail == 'self') {
                        nPostThumbnail.src = 'https://www.redditstatic.com/desktop2x/img/content-gate-icons/nsfw.png';
                    }
                    else {
                        nPostThumbnail.src = postThumbnail;
                    }
                    nPostThumbnail.alt = `Post Thumbnail`;
                    nPostThumbnail.setAttribute('class', 'thumbnail mb-2');

                    //                              Lightbox Listener
                    nPostThumbnail.addEventListener('click', e => {

                        // for non reddit links (mostly gfycat)
                        if (postUrl.search(/gfycat/) == -1) {

                            e.preventDefault();

                            let lightBoxImg = document.getElementById('lightBox-img');
                            lightBoxImg.src = (postUrl);

                            let lightBox = document.getElementById('lightBox');
                            lightBox.classList.add("active");
                        }
                    })
                    nPostUrl.appendChild(nPostThumbnail);
                    nPost.appendChild(nPostUrl);



                    //post Title/Comments page link
                    let nPostCommentsUrl = document.createElement('a');
                    nPostCommentsUrl.href = postCommentsUrl;
                    nPostCommentsUrl.target = '_blank';

                    let nPostTitle = document.createElement('h6');
                    nPostTitle.setAttribute('class', 'postTitle');
                    nPostTitle.innerHTML = `${postTitle}`;

                    nPostCommentsUrl.appendChild(nPostTitle);
                    nPost.appendChild(nPostCommentsUrl);


                    //Post Upvotes
                    let nPostUpvotes = document.createElement('h6');
                    nPostUpvotes.setAttribute('class', 'postUpvotes');
                    nPostUpvotes.innerHTML = `Upvotes: ${postUpvotes}`;
                    nPost.appendChild(nPostUpvotes);


                    //Post Comments#
                    let nPostComments = document.createElement('h6');
                    nPostComments.setAttribute('class', 'postComments');
                    nPostComments.innerHTML = `Comments: ${postComments}`;
                    nPost.appendChild(nPostComments);


                }

            }

        }

    })

})


//Hide Users Subreddits
$(document).on('click', '.showButton', function (e) {

    let name = $(this).attr("value");
    let showButton = $(this);
    var subBox = document.getElementById(`${name}Sub`);

    e.preventDefault();

    if (subBox.style.display === 'block') {
        subBox.style.display = 'none';
        showButton.text('Show Posts');

    }
    else {
        subBox.style.display = 'block';
        showButton.text('Hide Posts');
    }

})


//Hide Individual Subreddit Posts
$(document).on('click', '.hideButton', function (e) {

    e.preventDefault();

    let sub = $(this).attr("value");

    let hideButton = $(this);
    let postBox = document.getElementById(`${sub}-postBox`);


    if (postBox.style.display === 'block') {
        postBox.style.display = 'none';
        hideButton.text('[+]');
    }

    else {
        postBox.style.display = 'block';
        hideButton.text('[-]');
    }

})


//Closing the lightBox button
function closeBtn() {

    let lB = document.getElementById('lightBox');
    lB.classList.remove("active");
    $('#lightBox-img').attr('src', '');
}

