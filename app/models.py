from django.db import models

# Create your models here.


class User(models.Model):
    username = models.CharField(max_length=100, unique=True)
    url = models.CharField(max_length=100)
    avatar = models.CharField(max_length=100)
    linkKarma = models.IntegerField()
    commentKarma = models.IntegerField()

    class Meta:
        verbose_name_plural = "Users"

    def __str__(self):
        return self.username


class Post(models.Model):

    userId = models.ForeignKey(
        User, verbose_name="Poster", default=1, on_delete=models.CASCADE)
    subreddit = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    user = models.CharField(max_length=100)
    postUrl = models.CharField(max_length=255)
    commentsUrl = models.CharField(max_length=255)
    numComments = models.IntegerField()
    upvotes = models.IntegerField()
    postID = models.CharField(max_length=100, unique=True)
    thumbnail = models.CharField(max_length=255)

    class Meta:
        verbose_name_plural = "Posts"

    def __str__(self):
        return self.title

    def userPostFilter(self, User):
        return Post.objects.filter(user=User)


class Subreddit(models.Model):
    name = models.CharField(max_length=255, unique=True)
    url = models.CharField(max_length=255, unique=True)

    contributor = models.ManyToManyField(
        User, verbose_name="Contributor")

    class Meta:
        verbose_name_plural = "Subreddits"

    def __str__(self):
        return self.name
