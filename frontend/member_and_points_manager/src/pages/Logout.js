import { Button } from 'reactstrap';
import AuthService from '../utils/auth';


const Logout = () => {
    const handleLogout = async (e) => {
        AuthService.logout();
    }

        return (
            <>
                <Button color="secondary" size="lg" onClick={(handleLogout())}>
                    Logout
                </Button>
            </>
        )
    }

    export default Logout;