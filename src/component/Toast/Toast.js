import Toast from 'react-bootstrap/Toast';
function ToastMessage({ warning, text }) {
    return (
        <>
            {[
                // 'Primary',
                // 'Secondary',
                // 'Success',
                // 'Danger',
                // 'Warning',
                // 'Info',
                // 'Light',
                // 'Dark',
                warning
            ].map((variant, idx) => (
                <Toast
                    className="d-inline-block m-1"
                    bg={variant.toLowerCase()}
                    key={idx}
                >
                    <Toast.Header>
                        {/* <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                        /> */}
                        <strong className="me-auto">Thông báo</strong>
                        {/* <small>Hiện Tại </small> */}
                    </Toast.Header>
                    <Toast.Body className={variant === { warning } && 'text-white'}>
                        {text}
                    </Toast.Body>
                </Toast>
            ))}
        </>
    );
}

export default ToastMessage;