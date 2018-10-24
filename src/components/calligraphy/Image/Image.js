import React from "react";

import styles from "./Image.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Image = () => <div className={cx("image")} />;

export default Image;
