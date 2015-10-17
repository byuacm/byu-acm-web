from django import forms
from django.forms import widgets
from django.contrib.auth.forms import UserChangeForm, UserCreationForm
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

    # TODO 10/16/2015 - investigate if this can be removed
    def clean_password(self):
        return '' # This is a temporary fix for a django 1.4 bug
        
    class Meta:
        model = User
        exclude = (
            'is_active',
            'is_staff',
            'is_superuser',
            'password',
            'last_login',
            'date_joined',
        )


class MemberForm(forms.ModelForm):
    class Meta:
        model = Member
        exclude = ('user',)


class AttendanceForm(forms.ModelForm):
    username = forms.ChoiceField(choices=(), widget=widgets.TextInput)

    def __init__(self, *args, **kwargs):
        super(forms.ModelForm, self).__init__(*args, **kwargs)
        self.fields['username'].choices = User.objects.values_list('username', 'username')
        current_meetings = Meeting.current()
        self.fields['meeting'].queryset = current_meetings
        if current_meetings:
            # http://stackoverflow.com/questions/739260/customize-remove-django-select-box-blank-option
            self.fields['meeting'].empty_label = None

    class Meta:
        model = Attendance
        exclude = ('member', 'points',)
