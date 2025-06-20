import { jwtDecode } from 'jwt-decode';


class AuthService {
    // retrieve data saved in token
    getProfile() {
        return jwtDecode(this.getToken());
    }

    //Gets the member_id from the payload
    getUserId() {
        try {
            const profile = this.getProfile();
            return profile.member_id;
        } catch (err) {
            return null;
        }
    }


    // check if the user is still logged in
    loggedIn() {
        // Checks if ther is a saved token and it's still valid
        const token = this.getToken();
        // use type coersion to check if token is NOT undefined and the token is NOT expired
        return !!token && !this.isTokenExpired(token);
    }

    // check if token has expired
    isTokenExpired(token) {
        try {
            const decoded = jwtDecode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;

        }
    }
    // retrieve token from localStorage
    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token');
    }

    // set token to localStorage and reload page to homepage
    login(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken);

        window.location.assign('/MemberHome');
    }

    // clear token from localStorage and force logout with reload
    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
        // this will reload the page and reset the state of the application
        window.location.assign('/');
    }
}

export default new AuthService();