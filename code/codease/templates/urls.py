# yourapp/urls.py
from django.urls import path
from .views import index, custom_login, success_page_view, register, verify_otp
from django.urls import path, include
from .views import *
from rest_framework import routers
from rest_framework.routers import SimpleRouter
from .views import ElementViewSet, TemplateElementViewSet, TemplateViewSet




router = routers.DefaultRouter()
router.register(r'elements', ElementViewSet)
router.register(r'templates', TemplateViewSet)
router.register(r'template_elements', TemplateElementViewSet)


urlpatterns = [
    path('', index, name='index'),
    path('home/', index, name='index'),
    path('login/', custom_login, name='custom_login'),
    path('register/', register, name='register'),
    path('verify-otp/', verify_otp, name='verify_otp'), 
    path('success/', success_page_view, name='success_page'),
    path('api/', include(router.urls)),
]
