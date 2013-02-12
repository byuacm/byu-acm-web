from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import datetime

class Attendance(models.Model):
	member = models.ForeignKey('Member', verbose_name='Member')
	meeting = models.ForeignKey('Meeting', verbose_name='Meeting')
	has_shirt = models.BooleanField('Wearing ACM Shirt')
	points = models.IntegerField('Points', default=1)

	def __unicode__(self):
		return u'%s - %s' % (self.meeting, self.member,)
		
	class Meta:
		ordering = ['-pk']

class Course(models.Model):
	name = models.CharField('Name', max_length=50)
	sequence = models.IntegerField('Sequence', unique=True)
	is_active = models.BooleanField('Active', default=True)

	def __unicode__(self):
		return u'%s' % (self.name,)
	
	class Meta:
		ordering = ['sequence',]

class Enrollment(models.Model):
	member = models.ForeignKey('Member', verbose_name='Member')
	semester = models.ForeignKey('Semester', verbose_name='Semester')
	shirt_size = models.ForeignKey('ShirtSize', verbose_name='Shirt Size', blank=True, null=True)
	paid_dues = models.BooleanField('Paid Dues')
	received_shirt = models.BooleanField('Received Shirt')

	def can_change_shirt_size(self):
		today = timezone.now()
		return not self.received_shirt and self.semester.enrollment_start <= today and today < self.semester.enrollment_end

	def attendance_proportion(self):
		now = timezone.now()
		num_attended = Attendance.objects.filter(member__enrollment=self).count()
		num_meetings = Meeting.objects.filter(semester__enrollment=self, datetime__lte=now).count()
		return '%d/%d' % (num_attended, num_meetings,)

	def __unicode__(self):
		return u'%s - %s' % (self.semester, self.member,)
		
	class Meta:
		ordering = ['semester', 'member',]

class Meeting(models.Model):
	semester = models.ForeignKey('Semester', verbose_name='Semester')
	name = models.CharField('Name', max_length=40, blank=True, null=True)
	datetime = models.DateTimeField('Date/time')
	attendance_start = models.DateTimeField('Attendance Start', blank=True, null=True)
	attendance_end= models.DateTimeField('Attendance End', blank=True, null=True)
	password = models.CharField('Password', max_length=20, blank=True, null=True)

	def in_past(self):
		now = timezone.now()
		return self.datetime < now

	def can_attend(self):
		now = timezone.now()
		return self.attendance_start <= now and now < self.attendance_end

	def __unicode__(self):
		return u'%s (%s)' % (self.datetime.strftime('%Y-%m-%d %a'), self.name,)
		
	class Meta:
		ordering = ['datetime',]

class Semester(models.Model):
	name = models.CharField('Name', max_length=12)
	enrollment_start = models.DateTimeField('Enrollment Start')
	enrollment_end = models.DateTimeField('Enrollment End')

	def can_enroll(self):
		now = timezone.now()
		return self.enrollment_start <= now and now < self.enrollment_end

	def __unicode__(self):
		return u'%s' % (self.name,)
		
	class Meta:
		ordering = ['enrollment_start', 'enrollment_end',]

class ShirtSize(models.Model):
	abbr_name = models.CharField('Abbreviated Name', max_length=4)
	full_name = models.CharField('Full Name', max_length=20, blank=True, null=True)
	sequence = models.IntegerField('Sequence', unique=True)
	is_active = models.BooleanField('Active', default=True)

	def __unicode__(self):
		return u'%s' % (self.full_name,)
		
	class Meta:
		ordering = ['sequence',]

class Member(models.Model):
	user = models.OneToOneField(User)
	memberships = models.ManyToManyField('Semester', through='Enrollment', blank=True, null=True)
	attendances = models.ManyToManyField('Meeting', through='Attendance', blank=True, null=True)
	graduation = models.ForeignKey('Semester', verbose_name='Graduating', blank=True, null=True, related_name='graduation')
	spoj_username = models.CharField('SPOJ Username', max_length=80, blank=True)
	is_byu = models.BooleanField('Is BYU Student', default=True)
	is_cs = models.BooleanField('Is CS Student', default=True)
	is_undergraduate = models.BooleanField('Is Undergraduate', default=True)
	highest_course = models.ForeignKey('Course', verbose_name='Highest CS Course', blank=True, null=True)
	website = models.CharField('Website', max_length=200, blank=True, null=True)

	def __unicode__(self):
		return self.user.get_full_name()
		
	class Meta:
		ordering = ['user',]
