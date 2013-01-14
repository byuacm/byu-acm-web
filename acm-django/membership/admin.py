from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group, User
from membership.models import *

class MemberInline(admin.StackedInline):
	model = Member
	max_num = 1
	can_delete = False

def make_admin(modeladmin, request, queryset):
	admin_group = Group.objects.get(name='Administrator')
	for user in queryset:
		user.is_staff = True
		user.groups.add(admin_group)
		user.save()
make_admin.short_description = 'Make selected users Administrators'

class MyUserAdmin(UserAdmin):
	inlines = [MemberInline]
	actions = [make_admin,]

admin.site.unregister(User)
admin.site.register(User, MyUserAdmin)

admin.site.register(Attendance)
admin.site.register(Course)
admin.site.register(Enrollment)
admin.site.register(Meeting)
admin.site.register(Semester)
admin.site.register(ShirtSize)