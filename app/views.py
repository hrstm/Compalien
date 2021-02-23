from django.shortcuts import render
from .models import User, Subreddit, Post
from .forms import SubmissionForm
from django.http import HttpResponse, JsonResponse
import praw
import time
import concurrent.futures
import json
import os


reddit = praw.Reddit(client_id=os.environ.get('compalien_client_id'),
                     client_secret=os.environ.get('compalien_client_secret'),
                     user_agent=os.environ.get('compalien_user_agent'),
                     )

# ~ CLASSES ~


class nUser:

    def __init__(self, name, avatar, linkKarma, commentKarma):
        self.name = name
        self.url = f"https://old.reddit.com/u/{name}"
        self.avatar = avatar
        self.linkKarma = linkKarma
        self.commentKarma = commentKarma


class nPost:

    def __init__(self, title, author, subreddit, url, numComments, upvotes, postID, thumbnail):
        self.title = title
        self.subreddit = subreddit
        self.user = author
        self.postUrl = url
        self.commentsUrl = f'https://old.reddit.com/r/{subreddit}/comments/{postID}/'
        self.numComments = numComments
        self.upvotes = upvotes
        self.id = postID
        self.thumbnail = thumbnail


# ~ FUNCTIONS ~


def newGetUsers(request):

    nUserSet = {}

    if request.method == "GET":

        startingSub = request.GET['subreddit']
        timeParameter = request.GET['timeParam']

        subreddit = reddit.subreddit(startingSub).top(
            timeParameter, limit=None)

        for post in subreddit:
            if post.author == None or post.author == 'AutoModerator':
                continue

            user = str(post.author)

            if user in nUserSet:
                continue

            user = reddit.redditor(user)

            try:
                if user.subreddit['over_18']:
                    nUserSet[user.name] = {
                        "name": user.name,
                        "url": f"https://old.reddit.com/u/{user.name}",
                        "avatar": user.icon_img,
                        "linkKarma": user.link_karma,
                        "commentKarma": user.comment_karma,
                    }

                    print(f'Made User {user.name}')

            except AttributeError:
                continue

        return HttpResponse(json.dumps(nUserSet), content_type='application/json')


def getPosts(request):

    Subs = {}

    if request.method == "GET":
        user = request.GET['user']

        user = reddit.redditor(str(user))

        for submission in user.submissions.top('all', limit=100):

            subNameKey = submission.subreddit.display_name

            if submission.over_18:
                if not subNameKey in Subs.keys():

                    Subs[subNameKey] = []

                    Subs[subNameKey].append({
                        "title": str(submission.title),
                        "author": str(submission.author),
                        "subreddit": str(submission.subreddit),
                        "url": str(submission.url),
                        "comments": str(submission.num_comments),
                        "comments_url": f'https://old.reddit.com/r/{submission.subreddit}/comments/{submission.id}/',
                        "upvotes": str(submission.score),
                        "id": str(submission.id),
                        "thumbnail": str(submission.thumbnail),
                    })

                    print('Made Post')

                else:

                    Subs[subNameKey].append({
                        "title": str(submission.title),
                        "author": str(submission.author),
                        "subreddit": str(submission.subreddit),
                        "url": str(submission.url),
                        "comments": str(submission.num_comments),
                        "comments_url": f'https://old.reddit.com/r/{submission.subreddit}/comments/{submission.id}/',
                        "upvotes": str(submission.score),
                        "id": str(submission.id),
                        "thumbnail": str(submission.thumbnail),
                    })

                    print('Made Post')

    return HttpResponse(json.dumps(Subs, indent=3), content_type='application/json')

########################################################################################

# URL Funcs


def home(request):

    form = SubmissionForm()

    context = {
        'form': form,
    }

    return render(request, 'app/compalienV1.html', context)
