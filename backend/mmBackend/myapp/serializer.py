from rest_framework import serializers
from .models import Members,OTP,InvestorProfile,CustomerProfile
from django.core.mail import send_mail
from django.contrib.auth.hashers import make_password
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate
from .task import send_verification_email



class SerializeMember(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only = True)
    class Meta:
        model = Members
        fields =['username','email','phone','password','is_active','date_joined','password2']

    def validate(self,data):
        # compare passwords
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"error":"password do not match"})
        validate_password(data['password'])
        return data
    
    def create(self,data):
        data.pop('password2') #remove password2 from instance to be saved
        data['password'] = make_password(data['password'])

        user = Members.objects.create(**data, is_active=False)
        send_verification_email.delay(user.id)

        return user
    
class SerializeLogin(serializers.Serializer):
    password = serializers.CharField()
    username = serializers.CharField()

    def validate(self,data):
        username = data.get('username')
        password = data.get('password')

        user = authenticate(username = username, password=password)

        if user is not None and user.is_active is True:
            # generate token
           otp_instance = OTP(email = user.email)
           my_otp = otp_instance.generate_otp()

           send_mail(
               'OTP OTP!!',
               f'hello {user.username} your OTP number us {my_otp} do not share it \n it will expire in 5 minutes',
               'lewisluiz21@gmail.com',
               [otp_instance.email]
           )   
        else:
            raise serializers.ValidationError({"error":"user not found"})

        return data


class SerializeViewInvestorProfile(serializers.ModelSerializer):
    class Meta:
        model = InvestorProfile
        fields = ["user", "dob", "income_means", "income_range", "acc"]


class SerializeViewCustomerProfile(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    class Meta:
        model = CustomerProfile
        fields = ["username","dob","ig","business"]

class SerializeInvestorProfile(serializers.ModelSerializer):
    username = serializers.CharField(write_only=True)

    class Meta:
        model = InvestorProfile
        fields = ["username", "dob", "income_means", "income_range", "acc"]

    def create(self, validated_data):
        username = validated_data.pop('username')
        try:
            user = Members.objects.get(username=username)
        except Members.DoesNotExist:
            raise serializers.ValidationError({"error": "User not found"})
        
        investor_profile = InvestorProfile.objects.create(user=user, **validated_data)
        return investor_profile
    
class SerializeCustomerProfile(serializers.ModelSerializer):
    username = serializers.CharField(write_only=True)

    class Meta:
        model = CustomerProfile
        fields = ["username","dob","ig","tin","business"]

    def create(self,validated_data):
        username = validated_data.pop("username")
        try:
            user = Members.objects.get(username=username)
        except Members.DoesNotExist:
            raise serializers.ValidationError({"error":"user does not exist"})
        
        customer_profile = CustomerProfile.objects.create(user=user,**validated_data)
        return customer_profile