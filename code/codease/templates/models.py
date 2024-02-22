from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    name = models.CharField(max_length=255, blank=True)
    otp = models.CharField(max_length=6, blank=True, null=True)
    
    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return str(self.id)

class Element(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    html = models.TextField()

class Template(models.Model):
    # id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    elements = models.TextField()
    owner = models.ForeignKey(CustomUser, null=True, blank=True, on_delete=models.CASCADE)


# from django.db import models
# from django.conf import settings

# class Template(models.Model):
#     owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='templates', null=True, blank=True)
#     name = models.CharField(max_length=255)
#     elements = models.TextField()
