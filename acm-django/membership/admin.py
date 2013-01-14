from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from membership.models import *

class MemberInline(admin.StackedInline):
	model = Member
	max_num = 1
	can_delete = False

class MyUserAdmin(UserAdmin):
	inlines = [MemberInline]

class MyModelAdmin(admin.ModelAdmin):

	def changelist_view(self, request, extra_context=None):
		print 'change'
		return HttpResponse()

	def add_view(self, request, form_url='', extra_context=None):
		print 'view'
		return HttpResponse()

	def change_view(self, request, object_id, extra_context=None):
		print 'change'
		return HttpResponse()

admin.site.unregister(User)
admin.site.register(User, MyUserAdmin)

admin.site.register(Attendance)
admin.site.register(Course)
admin.site.register(Enrollment)
admin.site.register(Meeting)
admin.site.register(Semester)
admin.site.register(ShirtSize)