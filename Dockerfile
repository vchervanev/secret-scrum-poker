# Use phusion/baseimage as base image. To make your builds reproducible, make
# sure you lock down to a specific version, not to `latest`!
# See https://github.com/phusion/baseimage-docker/blob/master/Changelog.md for
# a list of version numbers.
FROM phusion/baseimage:0.10.0

# Use baseimage-docker's init system.
# CMD ["/sbin/my_init"]

RUN mkdir -p /app/webapp/build
COPY ./webapp/build /app/webapp/build

RUN mkdir /app/server/
COPY ./server/server /app/server

# TODO create /etc/service app's daemon

EXPOSE 8080
WORKDIR /app/server/
CMD ./server

# Clean up APT when done.
# RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*