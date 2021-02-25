# Compalien

[Visit Demo Web App](https://www.compalien.com)

## About

Compalien is a web app that connects to Reddit's API using Python (Praw) and allows you to search a subreddit for all users that have posted in that subreddit within a set of given timeframes: Day, Week, Month, Year, All.

## Code directory

Compalien is created using Django, which serves our primary backend functionality. The frontend is created using HTML, CSS, and Javascript utilizing the jQuery library.

The v1 directory is where our default Django project files are. The app directory is where our main Compalien app files are found including our views.py folder which serves our app critical functions.

Note: While our application is set up to connect to a default SQLite database, the currently deployed demo version of the app does NOT store any user queries in a database.

## Views.py Functions

### newGetUsers():

This is the intial function that is executed after receiving the request from the user form submission. This will take the requested subreddit and collect all Redditors that have posted to the Subreddit in the requested timeframe and return a JSON object which is then displayed to the user on the frontend.

### getPosts():

This is the function called when a user clicks on the 'Get Posts' button on a Redditor block that has been displayed from the newGetUsers() function. This will send another request that will gather all of the posts that the requesed Redditor has made from their account and return them in another JSON object. The object is then displayed to user inside the individual Redditor block.
