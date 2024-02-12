from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *

admin.site.register(Element)
admin.site.register(Template)
admin.site.register(TemplateElement)

class CustomUserAdmin(UserAdmin):
    # list_display = ('email', 'username', 'is_active', 'is_staff')  # Updated list_display
    list_display = ('email', 'is_active', 'is_staff')  # Updated list_display
    ordering = ('email',)
    list_filter = ('is_active', 'groups')

admin.site.register(CustomUser, CustomUserAdmin)