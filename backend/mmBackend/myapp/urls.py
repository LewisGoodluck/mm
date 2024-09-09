from django.urls import path
from .views import Reg_Member,ViewMember,Login,EmailVerify

urlpatterns = [
    path("member/register",Reg_Member.as_view(),name="memberReg"),
    path("user/login",Login.as_view(),name="login"),
    path("member/view",ViewMember.as_view(),name="memberData"),
    path("emailVerify/<str:token>",EmailVerify.as_view(),name="email-verify"),
]
