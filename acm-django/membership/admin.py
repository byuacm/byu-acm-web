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

def make_point_0(modeladmin, request, queryset):
	for attendance in queryset:
		attendance.points = 0
		attendance.save()
make_point_0.short_description = 'Change to no points'

def make_point_1(modeladmin, request, queryset):
	for attendance in queryset:
		attendance.points = 1
		attendance.save()
make_point_1.short_description = 'Change to 1 point'

def make_point_2(modeladmin, request, queryset):
	for attendance in queryset:
		attendance.points = 2
		attendance.save()
make_point_2.short_description = 'Change to 2 points'

def make_point_3(modeladmin, request, queryset):
	for attendance in queryset:
		attendance.points = 3
		attendance.save()
make_point_3.short_description = 'Change to 3 points'

class AttendanceAdmin(admin.ModelAdmin):
	list_display = ('meeting', 'member', 'has_shirt', 'points')
	actions = [make_point_0, make_point_1, make_point_2, make_point_3,]

class CourseAdmin(admin.ModelAdmin):
	list_display = ('name', 'sequence', 'is_active',)

class EnrollmentAdmin(admin.ModelAdmin):
	list_display = ('semester', 'member', 'shirt_size', 'paid_dues', 'received_shirt')

class MeetingAdmin(admin.ModelAdmin):
	list_display = ('name', 'datetime', 'attendance_start', 'attendance_end',)

class SemesterAdmin(admin.ModelAdmin):
	list_display = ('name', 'enrollment_start', 'enrollment_end',)

class ShirtSizeAdmin(admin.ModelAdmin):
	list_display = ('full_name', 'abbr_name', 'sequence', 'is_active',)

admin.site.unregister(User)
admin.site.register(User, MyUserAdmin)

admin.site.register(Attendance, AttendanceAdmin)
admin.site.register(Course, CourseAdmin)
admin.site.register(Enrollment, EnrollmentAdmin)
admin.site.register(Meeting, MeetingAdmin)
admin.site.register(Semester, SemesterAdmin)
admin.site.register(ShirtSize, ShirtSizeAdmin)
