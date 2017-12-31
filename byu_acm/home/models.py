from django.db import models


class OfficerBio(models.Model):
    name = models.CharField(max_length=40)
    title = models.CharField(max_length=40)
    image = models.CharField(max_length=40)
    bio = models.CharField(max_length=1024)
