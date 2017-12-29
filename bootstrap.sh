#!/usr/bin/env bash

# note, this script is run as `sudo`

yum update
yum upgrade -y

yum -y install https://centos7.iuscommunity.org/ius-release.rpm
yum -y install python35u
yum -y install python35u-pip
yum -y install python35u-devel
yum -y install gcc
yum -y install openssl-devel

pip3.5 install -U pip
pip3.5 install -r /vagrant/requirements.txt

