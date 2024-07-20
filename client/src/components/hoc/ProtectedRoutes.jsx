import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
const ProtectedRoutes = ({ children }) => {
    const access_token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    if (access_token !== "" && access_token !== undefined && access_token !== null) {
        return children;
    } else {
        toast.error('Please Login before proceed', {
            theme: 'colored',
            position: 'top-center'
        });
        return (
            <>
                <Navigate to={'/signIn'} />
            </>
        )
    }

}

ProtectedRoutes.propTypes = {
    children: PropTypes.any
}
export default ProtectedRoutes