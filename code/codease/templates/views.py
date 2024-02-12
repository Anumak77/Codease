from django.http import HttpResponse
from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from .forms import CustomRegistrationForm
from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from .models import CustomUser
from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from .models import CustomUser
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
import random
from django.contrib.auth import login
from django.core.mail import send_mail
from django.shortcuts import render, redirect
from .forms import CustomRegistrationForm
import random
from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from django.core.mail import send_mail
from .forms import CustomRegistrationForm, OTPVerificationForm
from .models import CustomUser
from .forms import CustomRegistrationForm, OTPVerificationForm
from django.shortcuts import render, redirect
from django.contrib.auth import login
from .forms import OTPVerificationForm
from .models import CustomUser
from django.shortcuts import render, redirect
from django.contrib.auth import login
from .forms import CustomRegistrationForm, OTPVerificationForm
from .models import CustomUser
import random
from django.core.mail import send_mail
from django.core.mail import send_mail
from .forms import CustomRegistrationForm
from .models import CustomUser
from .models import *
from rest_framework import viewsets
from .serializers import *

def register(request):
    if request.method == 'POST':
        form = CustomRegistrationForm(request.POST)
        if form.is_valid():
            # Generate OTP
            otp = ''.join(random.choices('0123456789', k=6))
            # Send OTP via email
            send_mail(
                'Your OTP for registration',
                f'Your OTP is: {otp}',
                'v35355166@gmail.com',  # Sender's email address
                [form.cleaned_data['email']],  # Recipient's email address
                fail_silently=False,
            )
            # Save user information from the form along with OTP
            user = form.save(commit=False)
            user.otp = otp
            user.save()
            # Redirect to OTP verification page
            return redirect('verify_otp')
    else:
        form = CustomRegistrationForm()

    return render(request, 'register.html', {'form': form})


def verify_otp(request):
    if request.method == 'POST':
        form = OTPVerificationForm(request.POST)
        if form.is_valid():
            # Get OTP entered by the user
            entered_otp = form.cleaned_data['otp']
            # Retrieve user with OTP
            user = CustomUser.objects.get(otp=entered_otp)
            if user:
                # If OTP is valid, delete OTP field and complete registration
                user.otp = ''
                user.save()
                # Log in the user
                login(request, user)
                return redirect('success_page')  # Redirect to the success page
            else:
                # If OTP is invalid, display error message
                return render(request, 'verify_otp.html', {'error': 'Invalid OTP'})
    else:
        form = OTPVerificationForm()

    return render(request, 'verify_otp.html', {'form': form})

def index(request):
    return render(request, 'index.html')

def custom_login(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST.get('password', '')
        user = authenticate(request, email=email, password=password)

        if user is not None:
            login(request, user)
            return redirect('success_page')  # Redirect to the success page
        else:
            return render(request, 'login.html', {'error': 'Invalid login credentials'})

    return render(request, 'login.html')


@login_required
def success_page_view(request):
    name = request.user.name if request.user.is_authenticated else ""
    return render(request, 'success_page.html', {'name': name})

    # return render(request, 'success_page.html')
    # return render(request, 'success_page.html', {'user': request.user})


def register(request):
    if request.method == 'POST':
        form = CustomRegistrationForm(request.POST)
        if form.is_valid():
            # Save user information from the form
            user = form.save(commit=False)
            # Set the name from the form data
            user.name = form.cleaned_data['name']
            user.save()
            # Generate OTP
            otp = ''.join(random.choices('0123456789', k=6))
            # Send OTP via email
            send_mail(
                'Your OTP for registration',
                f'Your OTP is: {otp}',
                'v35355166@gmail.com',  # Sender's email address
                [form.cleaned_data['email']],  # Recipient's email address
                fail_silently=False,
            )
            # Save OTP to the user object
            user.otp = otp
            user.save()
            # Redirect to OTP verification page
            return redirect('verify_otp')
    else:
        form = CustomRegistrationForm()

    return render(request, 'register.html', {'form': form})

# from django.core.mail import send_mail
# from django.http import HttpResponse


# def testing(request):
#     # Replace 'your_email@gmail.com' with your email address
#     recipient_email = 'umakanu6@gmail.com'
    
#     # Send a test email
#     send_mail(
#         'Test Email',
#         'This is a test email sent from your Django project.',
#         'v35355166@gmail.com',  # Sender's email address
#         [recipient_email],  # Recipient's email address
#         fail_silently=False,
#     )
    
#     return HttpResponse('Test email sent successfully!')
class ElementViewSet(viewsets.ModelViewSet):
    serializer_class = ElementSerializer
    queryset = Element.objects.all()

class TemplateViewSet(viewsets.ModelViewSet):
    serializer_class = TemplateSerializer
    queryset = Template.objects.all()

class TemplateElementViewSet(viewsets.ModelViewSet):
    serializer_class = TemplateElementSerializer
    queryset = TemplateElement.objects.all()
