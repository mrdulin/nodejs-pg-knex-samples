FROM postgres:9.6.11-alpine

RUN apk update \
  && apk add py-pip python-dev gcc musl-dev --no-cache \
  && pip install --upgrade pip \
  && pip install pgcli


