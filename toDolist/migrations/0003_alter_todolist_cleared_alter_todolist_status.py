# Generated by Django 4.0.4 on 2022-05-22 11:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('toDolist', '0002_alter_todolist_created_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todolist',
            name='cleared',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='todolist',
            name='status',
            field=models.IntegerField(),
        ),
    ]