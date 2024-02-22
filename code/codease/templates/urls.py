from django.urls import path, include
from .views import *
from rest_framework import routers
from rest_framework.routers import SimpleRouter

router = routers.DefaultRouter()
router.register(r'elements', ElementViewSet)
router.register(r'templates', TemplateViewSet)
router.register(r'custom_users', CustomUserViewSet)

urlpatterns = [
    path('', index, name='index'),
    path('login/', custom_login, name='custom_login'),
    path('register/', register, name='register'),
    path('verify-otp/', verify_otp, name='verify_otp'), 
    path('account/', success_page_view, name='success_page'),
    path('api/', include(router.urls)),
]
