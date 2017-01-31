#!/usr/bin/env bash

# note, this script is run as `sudo`

apt-get update
apt-get upgrade -y

apt-get install python3 python3-pip -q -y
pip3 install -U pip
pip3 install -r requirements.txt

