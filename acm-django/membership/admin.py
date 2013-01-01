from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from membership.models import *

class MemberInline(admin.StackedInline):
	model = Member
	max_num = 1
	can_delete = False

class MyUserAdmin(UserAdmin):
	inlines = [MemberInline]

admin.site.unregister(User)
admin.site.register(User, MyUserAdmin)

admin.site.register(Attendance)
admin.site.register(Course)
admin.site.register(Enrollment)
admin.site.register(Meeting)
admin.site.register(Semester)
admin.site.register(ShirtSize)