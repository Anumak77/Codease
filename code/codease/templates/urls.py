# yourapp/urls.py
from django.urls import path
from .views import index, custom_login, success_page_view, register


# from django.contrib.auth.views import LoginView

urlpatterns = [
    path('', index, name='index'),
    path('login/', custom_login, name='custom_login'),
    path('register/', register, name='register'),
    path('success/', success_page_view, name='success_page'),
    
]
