from django.contrib import admin
from .models import Project, ContactMessage


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display  = ('title', 'tech_stack', 'order', 'created_at')
    list_editable = ('order',)
    search_fields = ('title', 'description')
    ordering      = ('order',)


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display    = ('name', 'email', 'created_at', 'is_read')
    list_editable   = ('is_read',)
    readonly_fields = ('name', 'email', 'message', 'created_at')
    ordering        = ('-created_at',)