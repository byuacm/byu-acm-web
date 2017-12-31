from django.contrib.auth.views import LogoutView
from django.urls import path, include, re_path
from . import views

app_name = 'byu_auth'
urlpatterns = [
    path('login/', views.default_login, name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    re_path('', include('social_django.urls', namespace='social')),
]
