from django.urls import path
from .views import *

urlpatterns = [

    path('combackbox/', CombackBoxView.as_view()),
    path('comb/',GetBoxView.as_view()),
    path('addbox/',AddBoxView.as_view()),
    path('usersbox/<int:pk>',UserCaseView.as_view()),
]