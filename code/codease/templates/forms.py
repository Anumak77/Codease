
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from templates.models import CustomUser
from django import forms


class CustomRegistrationForm(UserCreationForm):
    email = forms.EmailField(max_length=254, help_text='Required. Enter a valid email address.')
    name = forms.CharField(max_length=255, help_text='Required. Enter your name.')

    class Meta:
        model = CustomUser
        fields = ['email', 'password1', 'password2']


class OTPVerificationForm(forms.Form):
    otp = forms.CharField(max_length=6, help_text='Enter the OTP sent to your email.')
