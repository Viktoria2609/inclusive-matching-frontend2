import { WelcomePage } from "@/pages/welcome";
import { CreateProfilePage } from "@/pages/create-profile"; 
import { MainPage } from "@/pages/main";
import { MatchPage } from "@/pages/match";
import { ProfileDetailPage } from "@/pages/profile-detail";
import { routes } from "@/shared/routes";
import { LoginPage } from "@/pages/login";
import { SignUpPage } from "@/pages/signUp";

export const routerData = [
  {
    url: routes.main, 
    component: <WelcomePage />,
  },
  {
    url: routes.login,
    component: <LoginPage />,
  },
  {
    url: "/signup",
    component: <SignUpPage />,
  },
  {
    url: routes.profiles, 
    component: <MainPage />,
  },
  {
    url: routes.profileDetail,
    component: <ProfileDetailPage />,
  },
  {
    url: routes.match,
    component: <MatchPage />,
  },
  {
    url: routes.createProfile, 
    component: <CreateProfilePage />,
  },
];