from django.http import HttpResponse
from django.urls import path

app_name = 'staff'
urlpatterns = [
    path('', lambda _: HttpResponse(app_name), name='index'),
]
