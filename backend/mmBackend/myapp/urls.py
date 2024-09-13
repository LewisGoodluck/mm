from django.urls import path
from .views import Reg_Member,ViewMember,Login,EmailVerify,OTP_Verify,Set_InvestorProfile,Logout,ViewInvestorProfile,Set_CustomerProfile,ViewCustomerProfile,ViewCustomerProfilee


urlpatterns = [
    path("member/register",Reg_Member.as_view(),name="memberReg"),
    path("user/login",Login.as_view(),name="login"),
    path("member/view",ViewMember.as_view(),name="memberData"),
    path("investor/view",ViewInvestorProfile.as_view(),name="investor"),
    path("customer/view",ViewCustomerProfilee.as_view(),name="customer"),
    path("emailVerify/<str:token>",EmailVerify.as_view(),name="email-verify"),
    path("verify-otp/",OTP_Verify.as_view(),name="verifyOtp"),
    path("investorData/",Set_InvestorProfile.as_view(),name="setInvestorProfile"),
    path("customerData/",Set_CustomerProfile.as_view(),name="setCustomerProfile"),
    path("logout/",Logout.as_view(),name="logout"),

]
