# Compalien

[Visit Demo Web App](https://www.compalien.com)

## About

Compalien is a web app that connects to Reddit's API using Python (Praw) and allows users to search a subreddit for all Redditors that have posted in that subreddit within a set of given timeframes: Day, Week, Month, Year, All.

## Code directory

Compalien is created using Django, which serves the app's primary backend functionality. The frontend is created using HTML, CSS, and Javascript utilizing the jQuery library.

The v1 directory is where the default Django project files are. The app directory is where the main Compalien app files are found including the views.py file which contains the app's driving functions.

Note: While this application is set up to connect to a default SQLite database, the currently deployed demo version of the app does NOT store any user queries in a database.

## Views.py Functions

### newGetUsers():

This is the intial function that is executed after receiving the request from the user form submission. This will take the requested Subreddit and collect all Redditors that have posted to the Subreddit in the requested timeframe into a Python dictionary. This dictionary is returned as a JSON object which is then read by our frontend and displayed to the user in segmented Redditor blocks.

### getPosts():

This is the function called when a user clicks on the 'Get Posts' button on a Redditor block that has been displayed from the newGetUsers() function's returned data. This will send another request that gathers all of the posts that the selected Redditor has made from their account and return them in another JSON object. The object is then displayed to user inside the individual Redditor's block.
