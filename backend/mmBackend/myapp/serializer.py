from rest_framework import serializers
from .models import Members,OTP
from django.core.mail import send_mail
from django.urls import reverse
from django.contrib.auth.hashers import make_password
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate



class SerializeMember(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only = True)
    class Meta:
        model = Members
        fields =['username','email','phone','password','is_active','date_joined','password2']

    def validate(self,data):
        # compare passwords
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"error":"password do not match"})
        if Members.objects.filter(email= data['email']).exists():
            raise serializers.ValidationError({"error":"email already exist"})
        return data
    
    def create(self,data):
        data.pop('password2') #remove password2 from instance to be saved
        data['password'] = make_password(data['password'])

        user = Members.objects.create(**data, is_active=False)

        # # send activation link
        token, created = Token.objects.get_or_create(user=user)
        verification_link = reverse('email-verify',kwargs={"token":token.key})
        activation_url = f"http://192.168.1.53:8000/{verification_link}"

        try:
            send_mail(
                'Verify your MoneyMind account',
                f'hello {user.username} click the link to verify your account: {activation_url}',
                'lewisluiz21@gmail.com',
                [user.email],
                fail_silently=False
            )
        except Exception as e:
            user.delete()
            raise serializers.ValidationError(f"provide valid email please...{e}")

        return user
    
class SerializeLogin(serializers.Serializer):
    password = serializers.CharField()
    username = serializers.CharField()

    def validate(self,data):
        username = data.get('username')
        password = data.get('password')

        user = authenticate(username = username, password=password)

        if user is not None:
            # generate token
           otp_instance = OTP(email = user.email)
           my_otp = otp_instance.generate_otp()

           send_mail(
               'OTP OTP!!',
               f'hello {user.username} your OTP number us {my_otp} do not share it',
               'lewisluiz21@gmail.com',
               [otp_instance.email]
           )   
        else:
            raise serializers.ValidationError({"error":"user not found"})

        return user

        
