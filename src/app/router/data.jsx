import { ProfileDetailPage } from "@/pages/profile-detail";
import { MatchPage } from "@/pages/match";
import { MainPage } from "@/pages/main";

import { routes } from "@/shared/routes";

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
];
