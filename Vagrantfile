# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.require_version ">= 1.5"

Vagrant.configure("2") do |config|
    config.vm.box = "ubuntu/xenial64"
    config.vm.provider "virtualbox" do |v|
        v.memory = 4096
        v.cpus = 2
    end

    config.vm.network "forwarded_port", guest: 8000, host: 8000
    config.vm.provision :shell, :path => "bootstrap.sh"
end

