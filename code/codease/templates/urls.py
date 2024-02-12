# yourapp/urls.py
from django.urls import path
from .views import index, custom_login, success_page_view, register, verify_otp


# from django.contrib.auth.views import LoginView

urlpatterns = [
    path('', index, name='index'),
    path('login/', custom_login, name='custom_login'),
    path('register/', register, name='register'),
    path('verify-otp/', verify_otp, name='verify_otp'), 
    path('success/', success_page_view, name='success_page'),
    
]


# from django.urls import path
# from .views import testing

# urlpatterns = [
#     # Other URL patterns...
#     path('testing/', testing, name='testing'),
# ]

