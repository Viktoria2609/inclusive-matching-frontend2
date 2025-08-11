import { WelcomePage } from "@/pages/welcome";
import { CreateProfilePage } from "@/pages/create-profile";
import { MainPage } from "@/pages/main";
import { MatchPage } from "@/pages/match";
import { ProfileDetailPage } from "@/pages/profile-detail";
import { routes } from "@/shared/routes";
import { LoginPage } from "@/pages/login";
import { SignUpPage } from "@/pages/signUp";
import ResetPasswordPage from "@/pages/reset-password";

export const routerData = [
  {
    url: routes.main,
    secure: false,
    component: <WelcomePage />,
  },
  {
    url: routes.login,
    secure: false,
    component: <LoginPage />,
  },
  {
    url: routes.signup,
    secure: false,
    component: <SignUpPage />,
  },
  {
    url: routes.profiles,
    secure: true,
    component: <MainPage />,
  },
  {
    url: routes.profileDetail,
    secure: true,
    component: <ProfileDetailPage />,
  },
  {
    url: routes.match,
    secure: true,
    component: <MatchPage />,
  },
  {
    url: routes.createProfile,
    secure: true,
    component: <CreateProfilePage />,
  },
  {
    url: routes.resetPassword,
    secure: false,
    component: <ResetPasswordPage />,
  },
];
