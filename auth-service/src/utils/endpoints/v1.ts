export const endpointsV1 = [
  { method: "GET", path: "/", description: "Aide / cette liste" },
  { method: "POST", path: "/auth/login", description: "Se connecter" },
  { method: "POST", path: "/auth/register", description: "Créer un compte" },
  { method: "POST", path: "/auth/refresh", description: "Rafraîchir le token" },
];
