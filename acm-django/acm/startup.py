# Startup code
from django.contrib.auth.models import User
import settings

if not User.objects.filter(username='admin').exists():
    admin = User(username='admin', email=settings.DEFAULT_FROM_EMAIL, is_staff=True, is_superuser=True)
    admin.set_password(settings.EMAIL_HOST_PASSWORD)
    admin.save()
