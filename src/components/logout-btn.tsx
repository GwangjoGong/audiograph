import { isLoggedInVar, jwtTokenVar } from "../apollo";
import { LOCAL_STORAGE_TOKEN } from "../constants";

import exitButton from "../assets/exit.svg";

export const LogoutButton = () => {
  const onClick = () => {
    window.localStorage.removeItem(LOCAL_STORAGE_TOKEN);
    isLoggedInVar(false);
    jwtTokenVar(null);
  };

  return (
    <button
      className="w-4 h-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${exitButton})` }}
      onClick={onClick}
    />
  );
};
