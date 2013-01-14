from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import datetime

class Raffle(models.Model):
	class Meta:
		managed = False

class ShirtSize(models.Model):
	class Meta:
		managed = False

class MemberList(models.Model):
	class Meta:
		managed = False