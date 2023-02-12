from django.db import models
# from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractUser


# Create your models here.

class User(AbstractUser):
    count_box = models.IntegerField(null=True,blank=True,default=0)