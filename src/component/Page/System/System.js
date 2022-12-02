import classNames from "classnames/bind";
import { useNavigate } from "react-router";
import styles from './System.module.scss'
const cx = classNames.bind(styles)
function System() {
    const navigate = useNavigate()
    const listSystem = [
        {
            name: 'System',
            to: '/System/user-manage'
        },
        {
            name: 'Trở Về',
            to: '/'
        }
    ]

    return <div className={cx('wrapperSystem')}>
        <div className={cx('wrapperSystem__Item')}>
            {
                listSystem ?
                    listSystem.map((data, index) => {
                        return (
                            <div className={cx('wrapperSystem__Item__Box')} key={index}
                                onClick={() => {
                                    navigate(data.to)
                                }}
                            >
                                <span>{data.name}</span>
                            </div>
                        )
                    })
                    : ''
            }

        </div>
    </div>
}
export default System