
export const CheckAuthState = async () => {
    const response = await fetch(`http://localhost:8888/check_auth_state`);
    const data = await response.json();
    return data.isAuthenticated;
}

