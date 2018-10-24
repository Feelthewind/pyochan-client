import React from "react";
import { Formik } from "formik";

import styles from "./LoginModal.scss";
import classNames from "classnames/bind";
import Button from "components/login/Button";
import Input from "components/common/Input";
import TextButton from "components/login/TextButton";
import ModalWrapper from "components/modal/ModalWrapper";

const cx = classNames.bind(styles);

const LoginModal = ({
  mode,
  error,
  onChangeMode,
  onLogin,
  onRegister,
  onClose,
  onKeyPress,
  visible
}) => {
  const isLogin = mode === "login";
  const modeText = isLogin ? "ログイン" : "新規登録";
  const invertedText = isLogin ? "新規登録" : "ログイン";

  const onButtonClick = isLogin ? onLogin : onRegister;

  return (
    <ModalWrapper visible={visible} onClose={onClose}>
      <div className={cx("login-modal")}>
        <div className={cx("bar")} />
        <div className={cx("close")} onClick={onClose}>
          ✕
        </div>
        <div className={cx("content")}>
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={values => {
              let errors = {};
              if (!values.email) {
                errors.email = "必須事項です";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "ex) abc@yahoo.co.jp";
              }
              if (!values.password) {
                errors.password = "必須事項です";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              onButtonClick(values);
              setSubmitting(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit}>
                <Input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  fullWidth
                  big
                  placeholder="メールアドレス"
                />
                {errors.email && touched.email && errors.email}
                <Input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  fullWidth
                  big
                  placeholder="パスワード"
                />
                {errors.password && touched.password && errors.password}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cx("button")}
                >
                  {modeText}
                </button>
                {error && (
                  <div className={cx("authMessage")}>{error.message}</div>
                )}
              </form>
            )}
          </Formik>
          <div className={cx("login-foot")}>
            <TextButton right onClick={onChangeMode}>
              {invertedText}
            </TextButton>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default LoginModal;
