const logout = async () => {
    const response = await fetch("/api/users/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        // redirect to homepage
        document.location.replace("/");
    } else {
        alert(response.statusText);
    }
};

const logoutButton = document.querySelector("#logout");

if (logoutButton) {
    document.querySelector("#logout").addEventListener("click", logout);
}
