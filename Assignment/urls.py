"""Assignment URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from toDolist import views

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('',views.todolist_index),
    path('todolist/',views.ToDoListView.as_view()),
    path('todolistprepare/',views.ToDoListPrepareView.as_view()),
    path('todolistfinishupdate/',views.ToDoListFinishUpdate.as_view()),
    path('todolistremoveupdate/',views.ToDoListRemoveUpdate.as_view()),
    path('todolistcreate/',views.ToDoListCreate.as_view()),
]
