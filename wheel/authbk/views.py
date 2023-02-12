from rest_framework.response import Response
from rest_framework.permissions import AllowAny,IsAuthenticatedOrReadOnly
from rest_framework import generics,status
from .models import *

from rest_framework_simplejwt.tokens import RefreshToken


from .serializers import *

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

