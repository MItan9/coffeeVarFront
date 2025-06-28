export const authFetch = async (url, options = {}) => {
  let response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    credentials: "include", // если refresh токен в cookie
  });

  if (response.status === 401) {
    // попытка обновить access токен
    const refreshRes = await fetch("http://localhost:3000/refresh-token", {
      method: "POST",
      credentials: "include", // важно: cookie с refresh токеном
    });

    if (refreshRes.ok) {
      const data = await refreshRes.json();
      localStorage.setItem("accessToken", data.accessToken);

      // повтор оригинального запроса с новым access токеном
      response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${data.accessToken}`,
        },
        credentials: "include",
      });
    } else {
      localStorage.removeItem("accessToken");
      window.location.href = "/login"; // или navigate("/login")
      return;
    }
  }

  return response;
};
