from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView,ListAPIView,RetrieveAPIView
from rest_framework.response import Response
from rest_framework import status
from .serializer import SerializeMember,SerializeLogin,SerializeInvestorProfile,SerializeCustomerProfile,SerializeViewCustomerProfile
from .models import Members,OTP,InvestorProfile,CustomerProfile
from rest_framework.authtoken.models import Token
from django.contrib.auth import login,logout
from rest_framework import permissions



class Reg_Member(CreateAPIView):
    queryset = Members.objects.all()
    serializer_class = SerializeMember



class ViewMember(ListAPIView):
    queryset = Members.objects.all()
    serializer_class = SerializeMember

# class ViewCustomer(ListAPIView):
#     queryset = Members.objects.all()
#     serializer_class = SerializeCustomerProfile

class ViewInvestorProfile(RetrieveAPIView):
    queryset = InvestorProfile.objects.all()
    serializer_class = SerializeInvestorProfile
    permission_classes = [permissions.IsAuthenticated]


class ViewCustomerProfile(ListAPIView):
    queryset = CustomerProfile.objects.all()
    serializer_class = SerializeCustomerProfile

class ViewCustomerProfilee(ListAPIView):
    queryset = CustomerProfile.objects.all()
    serializer_class = SerializeViewCustomerProfile


class Login(APIView):
    def post(self,request):
        form_Data = SerializeLogin(data=request.data)
        if form_Data.is_valid():
            return Response({"message":"login success" },status=status.HTTP_200_OK)
        return Response(form_Data.errors)
    

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
        
class OTP_Verify(APIView):
    def post(self,request):
        otp_form_user = request.data.get("otp")
        username_from_user = request.data.get("username")

        try:
            # get user
            user = Members.objects.get(username=username_from_user)
            
            # get otp instance
            otp_instance = OTP.objects.filter(email=user.email).latest('created_at')

            # check if otp expired
            if otp_instance.is_expired():
                return Response({"error":"otp expired log in again"})
            
            # get otp and compare values
            if otp_instance.otp == otp_form_user:
                otp_instance.delete()
                # login user
                login(request,user)
                return Response({"message":"Verified! Welcome","access":user.username},status=status.HTTP_202_ACCEPTED)
            else:
                return Response({"error":"invalid otp sent"}, status=status.HTTP_401_UNAUTHORIZED)
            
        except OTP.DoesNotExist:
            return Response({"error":"otp does not exist for this user"},status=status.HTTP_404_NOT_FOUND)
        except Members.DoesNotExist:
            return Response({"error":"username not found"},status=status.HTTP_404_NOT_FOUND)


class Set_InvestorProfile(CreateAPIView):
    queryset = InvestorProfile.objects.all()
    serializer_class = SerializeInvestorProfile

class Set_CustomerProfile(CreateAPIView):
    queryset = CustomerProfile.objects.all()
    serializer_class = SerializeCustomerProfile

class Logout(APIView):
    def post(self,request):
        logout(request)
        return Response({"message":"byebye"},status=status.HTTP_200_OK)
    