from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from api.serializer import MyTokenObtainPairSerializer, RegisterSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions
from .serializer import ArrivalSerializer
from .models import Arrival
from .serializer import UserSerializer


# Create your views here.


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/',
        '/api/prediction/'
    ]
    return Response(routes)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        data = f"Congratulation {request.user}, your API just responded to GET request"
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = request.POST.get('text')
        data = f'Congratulation your API just responded to POST request with text: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)



#Methode CRUD bien apliqué
class ArrivalList(generics.ListCreateAPIView):
    queryset = Arrival.objects.all()
    serializer_class = ArrivalSerializer
    permission_classes = [permissions.IsAuthenticated]


    # def perform_create(self, serializer):
    #     serializer.save(user=self.request.user)

class ArrivalDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Arrival.objects.all()
    serializer_class = ArrivalSerializer
    permission_classes = [permissions.IsAuthenticated]

    # def perform_update(self, serializer):
    #     serializer.save(user=self.request.user)

    # def perform_destroy(self, instance):
    #     instance.delete()




class UserList(generics.ListCreateAPIView):
    """
    Liste tous les utilisateurs ou crée un nouvel utilisateur
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Récupère, met à jour ou supprime un utilisateur
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

