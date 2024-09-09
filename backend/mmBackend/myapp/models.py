from datetime import timezone
from django.db import models
from django.contrib.auth.models import AbstractUser
import random

# Create your models here.
class Members(AbstractUser):
    phone = models.CharField(max_length=50)
    is_investor = models.CharField(max_length=50)

    def __str__(self):
        return self.username
    
    
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