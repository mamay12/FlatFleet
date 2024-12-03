function HeaderImage() {

    return (
        <div
            style={{
                position: "relative",
                marginBottom: 20,
            }}
        >
            <img
                src="../../../public/assets/login/login-flat-picture.png"
                alt="Header"
                style={{
                    width: "100%",
                    height: "120px",
                    objectFit: "cover",
                    borderTopLeftRadius: "8px",
                    borderTopRightRadius: "8px",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    top: "90%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 80,
                    height: 80,
                    backgroundColor: "#fff",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}
            >
                <img
                    src="../../../public/assets/login/logo.svg"
                    alt="Logo"
                    style={{width: 80, height: 80}}
                />
            </div>
        </div>

    )
}

export default HeaderImage
