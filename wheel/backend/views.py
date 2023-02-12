from rest_framework.response import Response
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework import generics,status
from .models import *
from authbk.models import User
from .randomwheel import *

from .permisions import *
from .serializers import *

class CombackBoxView(generics.ListAPIView):
    queryset = CombackBox.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = CombackBoxSerializer

class UserCaseView(generics.RetrieveDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserCaseSerializers
    permission_classes = (PermOwner,)
    def delete(self,request,pk):
        user = User.objects.get(id=pk)

        if request.user != user:
            return Response({
                    'status':400,
                    'message':'is not your acaunt',
                })

        AllOpenCaseUser.objects.filter(user=user).delete()
        return Response({
                    'status':200,
                    'message':'good delete all case from acaint user',
                })


class AddBoxView(generics.CreateAPIView):
    serializer_class = GetCaseSerializer
    permission_classes = (IsAuthenticated,)

    def post(self,request):
        data = request.data
        serializer = GetCaseSerializer(data=data)
        if serializer.is_valid():
            user = User.objects.filter(username=serializer.data['name'])

            user = user.first()
            user.count_box = int(user.count_box) + 10
            user.save()
            count = user.count_box
            username = user.username
            return Response({
                    'status':200,
                    'message':'you heve +10 box',
                    'data':{
                        'name':str(username),
                        'count_box':str(count),
                    }
                })


class GetBoxView(generics.CreateAPIView):
    # queryset = UserProfile.objects.all()
    serializer_class = GetCaseSerializer
    permission_classes = (OnlyOwner,)

    def post(self,request):
        data = request.data
        serializer = GetCaseSerializer(data=data)
        if serializer.is_valid():
            user = serializer.data['name']
            # user = request.user.username
            user = User.objects.filter(username=user)
            if not user.exists():
                return Response({
                    'status':400,
                    'message':'wrong',
                    'data':'you not register for site'
                })
            if int(user[0].count_box) <= 0:
                return Response({
                    'status':400,
                    'message':'wrong',
                    'data':'you need more case'
                })
            user = user.first()
            user.count_box = int(user.count_box) - 1
            user.save()

            # print(usersbox)
            randomcase = get_randombox()
            usersbox = User.objects.get(username=request.user.username)
            combox = CombackBox.objects.get(id=randomcase[0])
            AllOpenCaseUser.objects.create(user=usersbox,combox=combox)
            return Response({
                    'status':200,
                    'message':'good verifield',
                    'data':{
                        'name':str(randomcase[1]),
                        'id_box':str(randomcase[0]),
                    }
                })