from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.core.mail import send_mail
from django_filters import rest_framework as filters
from rest_framework import viewsets, generics
from rest_framework.permissions import IsAuthenticated
from .models import *
from .serializers import *
from .forms import CustomRegistrationForm, OTPVerificationForm
import random

def index(request):
    return render(request, 'index.html')

def register(request):
    if request.method == 'POST':
        form = CustomRegistrationForm(request.POST)
        if form.is_valid():
            otp = ''.join(random.choices('0123456789', k=6)) # make otp
            send_mail(  # send otp - email
                'Your OTP for registration',
                f'Your OTP is: {otp}',
                'v35355166@gmail.com',  
                [form.cleaned_data['email']], 
                fail_silently=False,
            )
            user = form.save(commit=False)
            user.otp = otp
            user.save()
            return redirect('verify_otp')
    else:
        form = CustomRegistrationForm()

    return render(request, 'register.html', {'form': form})

def verify_otp(request):
    if request.method == 'POST':
        form = OTPVerificationForm(request.POST)
        if form.is_valid():
            entered_otp = form.cleaned_data['otp']
            user = CustomUser.objects.get(otp=entered_otp)
            if user:
                user.otp = ''
                user.save()
                login(request, user)
                return redirect('http://localhost:3000/?user=' + str(user.id)) 
            else:
                return render(request, 'verify_otp.html', {'error': 'Invalid OTP'})
    else:
        form = OTPVerificationForm()

    return render(request, 'verify_otp.html', {'form': form})


def custom_login(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST.get('password', '')
        user = authenticate(request, email=email, password=password)

        if user is not None:
            login(request, user)
            return redirect('http://localhost:3000/?user=' + str(user.id)) 
        else:
            return render(request, 'login.html', {'error': 'Invalid login credentials'})

    return render(request, 'login.html')

@login_required
def success_page_view(request):
    name = request.user.name if request.user.is_authenticated else ""
    return render(request, 'success_page.html', {'user': request.user}) #, {'name': name}

class ElementViewSet(viewsets.ModelViewSet):
    serializer_class = ElementSerializer
    queryset = Element.objects.all()

class TemplateViewSet(viewsets.ModelViewSet):
    serializer_class = TemplateSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ['owner']
    queryset = Template.objects.all()

class CustomUserViewSet(viewsets.ModelViewSet):
    serializer_class = CustomUserSerializer
    queryset = CustomUser.objects.all()

# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.authentication import TokenAuthentication
# from .models import Template
# from .serializers import TemplateSerializer

# class TemplateCreateView(APIView):
#     authentication_classes = [TokenAuthentication]
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         serializer = TemplateSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save(owner=request.user)  # Assign current user as owner
#             return Response(serializer.data, status=201)
#         return Response(serializer.errors, status=400)

# class UserTemplateListView(APIView):
#     authentication_classes = [TokenAuthentication]
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         templates = Template.objects.filter(owner=request.user)
#         serializer = TemplateSerializer(templates, many=True)
#         return Response(serializer.data)
