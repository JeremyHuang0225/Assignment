from turtle import update
from django.utils import timezone
from datetime import datetime,timedelta
from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.db import transaction
from rest_framework.generics import GenericAPIView
from toDolist.serializers import ToDoListSerializer 
from toDolist.models import ToDoList
from time import sleep

class ToDoListCreate(GenericAPIView):
    def post(self, request, *args, **krgs):
        data = request.data
        now = timezone.now()
        ToDoList.objects.create(title=data.get("title"),status=0,cleared=0,created_at=now,updated_at=now)
        res = {
            "id":data.get("id"),
            "status":"success"
        }
        return JsonResponse(res, safe=False)

class ToDoListRemoveUpdate(GenericAPIView):
    def get(self, request, *args, **krgs):
        data = request.query_params
        queryset = ToDoList.objects.filter(id=data.get("id")).update(cleared=1,updated_at=timezone.now())
        res = {
            "id":data.get("id"),
            "status":"success"
        }
        return JsonResponse(res, safe=False)

class ToDoListFinishUpdate(GenericAPIView):
    def get(self, request, *args, **krgs):
        data = request.query_params
        queryset = ToDoList.objects.filter(id=data.get("id")).update(status=1,updated_at=timezone.now())
        res = {
            "id":data.get("id"),
            "status":"success"
        }
        return JsonResponse(res, safe=False)

class ToDoListPrepareView(GenericAPIView):
    queryset = ToDoList.objects.filter(status=0).exclude(cleared=1).order_by('-id')
    serializer_class = ToDoListSerializer

    def get(self, request, *args, **krgs):
        todolist = self.get_queryset()
        serializer = self.serializer_class(todolist, many=True)
        data = serializer.data
        return JsonResponse(data, safe=False)

class ToDoListView(GenericAPIView):
    filter_date = (datetime.now() + timedelta(days=-7)).strftime('%Y-%m-%d %H:%M:%S')
    queryset = ToDoList.objects.filter(status=1).exclude(cleared=1).filter(updated_at__gte=filter_date).order_by('-updated_at')
    serializer_class = ToDoListSerializer

    def get(self, request, *args, **krgs):
        todolist = self.get_queryset()
        serializer = self.serializer_class(todolist, many=True)
        data = serializer.data
        # sleep(5)
        return JsonResponse(data, safe=False)

# Create your views here.
def todolist_index(request):
    prepares = ToDoList.objects.filter(status=0)
    return render(request,"../templates/index.html",{"prepares":prepares,})