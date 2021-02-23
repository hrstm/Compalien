from django.urls import path
# imports the views.py file from our current directory (app)
from . import views
# ^ imports the views.py file from our current directory (app)
from django.conf.urls import url


urlpatterns = [
    path('', views.home, name='app-home'),
    path('newGetUsers/', views.newGetUsers, name='newGetUsers'),
    path('getPosts/', views.getPosts, name='getPosts')

]


# Order of Operations:

# 1. We get the request of our website " localhost/'' "

# 2. Django looks at the urlpatterns in v1/urls.py and matches the '' request to our included route of app.urls
#       the name of this path is 'app-home'

# 3. Django then travels to the app/views.py file and grabs the home func there and executes it

# 4. views.home is an https response that takes us to the homepage of our website.
