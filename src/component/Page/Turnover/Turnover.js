import classNames from "classnames/bind";
import styles from './Turnover.module.scss'
import Header from '../../defaultlayouts/Header/Header'
import Content from "../../defaultlayouts/Content/Content";
import { useSelector } from "react-redux";
const cx = classNames.bind(styles)
function Turnover() {
    let currentUser = useSelector(state => state.rootLoginReducer.user)
    return <>
        <Header />
        <Content>
            <div className={cx('wrapperTurnover')}>
                <input type={"month"}></input>
            </div>
        </ Content>
    </>
}
export default Turnover