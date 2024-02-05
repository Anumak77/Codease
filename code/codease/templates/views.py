from django.http import HttpResponse
from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from .forms import CustomRegistrationForm

from .models import *
from rest_framework import viewsets
from .serializers import *

def index(request):
    return render(request, 'index.html')

def custom_login(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST.get('password', '')
        user = authenticate(request, email=email, password=password)

        if user is not None:
            login(request, user)
            return redirect('success_page')  
        else:
            return render(request, 'login.html', {'error': 'Invalid login credentials'})

    return render(request, 'login.html')

def success_page_view(request):
    return render(request, 'success_page.html')


def register(request):
    if request.method == 'POST':
        form = CustomRegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('success_page')  # Redirect to the success page
    else:
        form = CustomRegistrationForm()

    return render(request, 'register.html', {'form': form})

class ElementViewSet(viewsets.ModelViewSet):
    serializer_class = ElementSerializer
    queryset = Element.objects.all()

class TemplateViewSet(viewsets.ModelViewSet):
    serializer_class = TemplateSerializer
    queryset = Template.objects.all()