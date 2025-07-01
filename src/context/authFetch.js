export async function authFetch(url, options = {}) {
  const accessToken = localStorage.getItem("accessToken");

  const config = {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    credentials: "include", // важно для куки с refreshToken
  };

  let res = await fetch(url, config);

  // Если access токен истёк, пробуем обновить
  if (res.status === 403) {
    const refreshRes = await fetch("http://localhost:3000/refresh-token", {
      method: "POST",
      credentials: "include",
    });

    if (refreshRes.ok) {
      const data = await refreshRes.json();
      localStorage.setItem("accessToken", data.accessToken);

      // Повтор запроса с новым access токеном
      config.headers.Authorization = `Bearer ${data.accessToken}`;
      res = await fetch(url, config);
    } else {
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
      return;
    }
  }

  return res;
}
