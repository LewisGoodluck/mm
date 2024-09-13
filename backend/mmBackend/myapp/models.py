from django.utils import timezone
from django.db import models
from django.contrib.auth.models import AbstractUser
import random

# Create your models here.
class Members(AbstractUser):
    email = models.EmailField(unique = True, null = False, blank = False)
    phone = models.CharField(max_length=50)
    is_investor = models.CharField(max_length=50)

    def __str__(self):
        return self.username
    
class InvestorProfile(models.Model):
    user = models.OneToOneField(Members,on_delete=models.CASCADE)
    dob = models.DateField()
    income_means = models.CharField(max_length=50)
    income_range = models.CharField(max_length=50)
    acc = models.CharField(max_length=16)

    def __str__(self):
        return f"{self.user.username}'s profile"

class CustomerProfile(models.Model):
    user = models.OneToOneField(Members,on_delete=models.CASCADE)
    dob = models.DateField()
    ig = models.CharField(max_length=50)
    tin = models.CharField(max_length=50)
    business = models.CharField(max_length=16)

    def __str__(self):
        return f"{self.user.username}'s profile"
    
class OTP(models.Model):
    email = models.EmailField()
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)

    def is_expired(self):
        return timezone.now() > self.created_at + timezone.timedelta(minutes=5)
    
    def generate_otp(self):
        self.otp = str(random.randint(100000,999999))
        self.save()
        return self.otp