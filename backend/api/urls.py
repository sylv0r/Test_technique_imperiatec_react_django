from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import ArrivalList, ArrivalDetail, MyTokenObtainPairView, RegisterView
from . import views
from django.contrib import admin




from rest_framework_simplejwt.views import (
    TokenRefreshView,
)



urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('test/', views.testEndPoint, name='test'),
    path('api/register/', RegisterView.as_view(), name='auth_register'),
    path('arrivals/', views.ArrivalList.as_view(), name='arrival_list'),
    path('arrivals/<int:pk>/', views.ArrivalDetail.as_view(), name='arrival_detail'),
    path('', views.getRoutes),
    path('admin/', admin.site.urls),
]
