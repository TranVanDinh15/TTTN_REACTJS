import classNames from "classnames/bind";
import styles from './Button.module.scss'
import { Link } from "react-router-dom";
const cx = classNames.bind(styles)
function Button(
    {
        children,
        span,
        primary,
        to,
        href,
        outline = false,
        upload,
        small = false,
        large,
        onClick,
        leftIcon,
        rightIcon,
        menu,
        login,
        normal,
        ...propsAdd
    }
) {

    const props = {
        onClick,
        ...propsAdd,
    };
    let Comp = 'button';
    const classes = cx('wrapper', {
        primary,
        outline,
        small,
        large,
        upload,
        span,
        menu,
        login,
        normal
    });
    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        Comp = 'a';
        props.href = href;
    } else if (span) {
        Comp = 'span';
    }
    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            {<span className={cx('title', { menu })}>{children}</span>}
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}
export default Button