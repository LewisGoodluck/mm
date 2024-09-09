from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView,ListAPIView
from rest_framework.response import Response
from rest_framework import status
from .serializer import SerializeMember,SerializeLogin
from .models import Members
from rest_framework.authtoken.models import Token

class Reg_Member(CreateAPIView):
    queryset = Members.objects.all()
    serializer_class = SerializeMember
    # def post(self,request):
    #     formdata = SerializeMember(data=request.data)
    #     if formdata.is_valid():
    #         formdata.save()
    #         return Response({"message":"successfully register"},status=status.HTTP_201_CREATED)
    #     else:
    #         return Response(formdata.errors)

class ViewMember(ListAPIView):
    queryset = Members.objects.all()
    serializer_class = SerializeMember

class Login(APIView):
    def post(self,request):
        form_Data = SerializeLogin(data=request.data)
        if form_Data.is_valid():
            return Response({"message":"login success"},status=status.HTTP_200_OK)
        return Response({"error":"wrong credentials"})
    

class EmailVerify(APIView):
    def get(self, request, token):
        try:
            token_obj = Token.objects.get(key=token)
            user = token_obj.user
            user.is_active = True
            user.save()
            token_obj.delete()
            return Response({"message":"activation success"})
        except Token.DoesNotExist:
            return Response({"error":"INVALID or EXPIRED TOKEN"})