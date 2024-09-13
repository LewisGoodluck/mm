from celery import shared_task
from django.core.mail import send_mail
from django.urls import reverse
from rest_framework.authtoken.models import Token
from .models import Members

@shared_task
def send_verification_email(user_id):
    user = Members.objects.get(id=user_id)
    token, created = Token.objects.get_or_create(user=user)
    verification_link = reverse('email-verify',kwargs={"token":token.key})
    activation_url = f"http://192.168.1.53:8000/{verification_link}"

    try:
        send_mail(
            'MONEY MIND',
            f'{user.username} please click the link to verify your account {activation_url}',
            'lewisluiz21@gmail.com',
            [user.email]
        )
    except Exception as e:
        user.delete()
        raise Exception(f"error sending email dog {e}")