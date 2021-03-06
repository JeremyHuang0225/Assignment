# Generated by Django 4.0.4 on 2022-05-18 08:12

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ToDoList',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=100)),
                ('status', models.IntegerField(max_length=1)),
                ('cleared', models.IntegerField(max_length=1)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
    ]
