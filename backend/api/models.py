from django.db import models
from django.contrib.auth.models import User

class Tweet(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)  # New column for updated_at
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="tweets")
    image = models.ImageField(upload_to='tweet_images/', null=True, blank=True)

    def __str__(self):
        return self.title