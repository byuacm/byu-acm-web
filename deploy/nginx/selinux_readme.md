### SELinux

On kernels with SELinux enabled, Nginx may have problems reverse proxying gunicorn (SELinux is enabled and is enforcing on most RedHat derived distros). 

To fix this, you can load the custom policy in with `sudo semodule -i nginx_sepolicy.pp`.  This should only have to happen once per new installation.