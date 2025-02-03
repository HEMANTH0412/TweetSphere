from django.urls import path
from . import views

urlpatterns = [
    path("tweets/", views.TweetListCreate.as_view(), name="tweets-list"),
    path("tweets/delete/<int:pk>/", views.TweetDelete.as_view(), name="delete-tweet"),
    path("tweets/update/<int:pk>/", views.TweetUpdate.as_view(), name="update-tweet"),  # New URL for updating tweets
]