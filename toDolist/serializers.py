from toDolist.models import ToDoList
from rest_framework import serializers


class ToDoListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToDoList
        fields = '__all__'
