FROM python:3.10

WORKDIR /Assignment

COPY ./requirements.txt ./
RUN python -m pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt
COPY . /Assignment
EXPOSE 8000:8000