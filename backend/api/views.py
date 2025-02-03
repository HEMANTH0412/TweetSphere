from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Tweet

class TweetListCreate(generics.ListCreateAPIView):
    from .serializers import TweetSerializer
    serializer_class = TweetSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Tweet.objects.filter(author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)
            
class TweetDelete(generics.DestroyAPIView):
    from .serializers import TweetSerializer
    serializer_class = TweetSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Tweet.objects.filter(author=user)

class TweetUpdate(generics.UpdateAPIView):
    from .serializers import TweetSerializer
    serializer_class = TweetSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Tweet.objects.filter(author=user)

class CreateUserView(generics.CreateAPIView):
    from .serializers import UserSerializer
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]