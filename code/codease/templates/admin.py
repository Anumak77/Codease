# admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    list_display = ('email', 'name', 'is_active', 'is_staff_display')
    ordering = ('email',)
    list_filter = ('is_active', 'groups')  # Use 'groups' for filtering by 'is_staff'

    def is_staff_display(self, obj):
        return obj.is_staff
    is_staff_display.boolean = True
    is_staff_display.short_description = 'Is Staff'
