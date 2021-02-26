# pull official base image
FROM tiangolo/uwsgi-nginx-flask:python3.8

# set work directory
WORKDIR /zpeek/api

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1


# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt /zpeek/api/requirements.txt
RUN pip install -r requirements.txt

# copy project
COPY . .

EXPOSE 5000

ENTRYPOINT [ "flask" ]
CMD ["run", "--host=0.0.0.0", "--port=5000"]