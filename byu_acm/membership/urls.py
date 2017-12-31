from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.urls import path

app_name = 'membership'
urlpatterns = [
    path('', login_required(lambda _: HttpResponse(app_name)), name='index'),
]
