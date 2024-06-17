import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate()

    function handleLogout() {
        try {
            localStorage.removeItem("access_token")
            navigate('/login')

        } catch (err) {
            Toastify({
                text: err,
                duration: 2000,
                newWindow: true,
                close: true,
                gravity: "bottom",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "#EF4C54",
                    color: "#17202A",
                    boxShadow: "0 5px 10px black",
                    fontWeight: "bold",
                    position: "absolute",
                    right: 0
                }
            }).showToast();
        }
    }

    return (
        <>
            <div>

            </div>
        </>
    )
}