from django.db import models
from authbk.models import User

class CombackBox(models.Model):
    cases = models.TextField()
    chanse = models.FloatField()

    def __str__(self):
        return self.cases

class AllOpenCaseUser(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name='users_case')
    combox = models.ForeignKey(CombackBox,on_delete=models.CASCADE)

    def __str__(self):
        return str(self.combox)