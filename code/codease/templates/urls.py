# yourapp/urls.py
from django.urls import path, include
from .views import *
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r'/elements', ElementViewSet)
router.register(r'/templates', TemplateViewSet)

# from django.contrib.auth.views import LoginView

urlpatterns = [
    path('', index, name='index'),
    path('login/', custom_login, name='custom_login'),
    path('register/', register, name='register'),
    path('success/', success_page_view, name='success_page'),
    path('api', include(router.urls)),
]
