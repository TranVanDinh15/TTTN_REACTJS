import { faBars, faUtensils } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { changeAction } from "../../../../redux/actions/navBarAtion";
import styles from './Search.module.scss'
const cx = classNames.bind(styles)
function Search() {
    const selector = useSelector(state => state.displayNavbar.isAction
    )
    const dispatch = useDispatch()
    return <div className={cx('wrapperSearch')}>
        <div className={cx("tabMenu")}
            onClick={() => {
                const action = changeAction(true)
                dispatch(action)
            }}
        >
            <FontAwesomeIcon icon={faBars} />
        </div>
        {/* <div className={cx("searchContainer")}>
            <input type={"text"} placeholder="tìm kiếm ..." />
        </div> */}
    </div>
}
export default Search