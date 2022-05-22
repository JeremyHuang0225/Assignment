from django.db import models
from django.utils import timezone


# Create your models here.
class ToDoList(models.Model):
    id = models.AutoField(auto_created=True, primary_key=True)
    title = models.CharField(max_length=100)
    status = models.IntegerField()
    cleared = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(default=timezone.now)