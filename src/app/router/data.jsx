import { CreateProfilePage } from "@/pages/create-profile"; 

export const routerData = [
  {
    url: routes.main,
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
