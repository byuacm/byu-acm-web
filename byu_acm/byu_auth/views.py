from django.contrib.auth import logout
from django.http import HttpResponse
from django.shortcuts import redirect


def default_login(_):
    return redirect('auth:social:begin', backend='byu')
