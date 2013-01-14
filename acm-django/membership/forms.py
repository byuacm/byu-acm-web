from django import forms
from django.forms import widgets
from django.utils import timezone
from django.contrib.auth.forms import *
from django.contrib.auth.models import User
from membership.models import *

class MyUserCreationForm(UserCreationForm):
	first_name = forms.CharField(max_length=30)
	last_name = forms.CharField(max_length=30)
	email = forms.EmailField()

	def save(self, commit=True):
		user = super(MyUserCreationForm, self).save(commit=False)
		user.first_name = self.cleaned_data['first_name']
		user.last_name = self.cleaned_data['last_name']
		user.email = self.cleaned_data['email']
		if commit:
				user.save()
		return user

class MyUserChangeForm(UserChangeForm):
	def clean_password(self):
		return "" # This is a temporary fix for a django 1.4 bug
		
	class Meta:
		model = User
		exclude = ('is_active', 'is_staff', 'is_superuser', 'password', 'last_login', 'date_joined',)

class MemberForm(forms.ModelForm):
	class Meta:
		model = Member
		exclude = ('user',)

class AttendanceForm(forms.ModelForm):
	username = forms.ChoiceField(choices=User.objects.values_list('username','username'), widget=widgets.TextInput)
	class Meta:
		model = Attendance
		exclude = ('member', 'points',)