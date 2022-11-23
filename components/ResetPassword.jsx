import React, { useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { withTranslation } from "react-i18next";
import useAuth from "../../hooks/useAuth";

const ResetPassword = ({ t }) => {

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { passwordReset } = useAuth();

  const emailRef = useRef();

  const handlePasswordReset = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const email = emailRef.current.value;
    passwordReset(email)
      .then((msg) => {
        setMessage(msg);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  };

  return (
    // <React.Fragment>
    //   <div className="ResetPassword wrapper loginform">
    //     <div className="container glassmorcontain">
    //       <div className="row morphisam">
    //         <div className="col-md-6 col-12">
    //           <div className="inner__login__img justify-content-center align-items-center d-flex">
    //             <img src={process.env.PUBLIC_URL + "/images/login/login_img.webp"} alt="login" />
    //           </div>
    //         </div>
    //         <div className="col-md-6 col-12 border-line position-relative">
    //           <div className="inner__login__form outerline">
    //             <h3 className="mb-4 text-uppercase ">
    //               {t("Trouble Logging In")}?
    //             </h3>
    //             <p className="text-white">{t("send link to get account")}</p>

    //             <Form onSubmit={(e) => handlePasswordReset(e)}>
    //               <Form.Group className="mb-3 position-relative d-inline-block w-100" controlId="formBasicEmail">
    //                 <Form.Control type="email" placeholder={t("Enter Your Email")} className="inputelem" ref={emailRef} required={true} />
    //                 <span className="emailicon">
    //                   <FaEnvelope />
    //                 </span>
    //               </Form.Group>
    //               <Button variant="primary w-100 mb-3" type="submit" disabled={loading} >
    //                 {loading ? t("Please Wait") : t("Send")}
    //               </Button>
    //               {message && <p className="text-white">{message}</p>}
    //               <div className="sign__up">
    //                 <p className="">
    //                   {t("Already have an account")}
    //                   <span>
    //                     <Link to={"/Login"}>{t("Back to Login")}</Link>
    //                   </span>
    //                 </p>
    //               </div>
    //             </Form>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </React.Fragment>
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">

            <div className="card mt-2">

              <div className="card-body cardbody-color">

                {/* <img src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png" className="img-fluid profile-image-pic img-thumbnail rounded-circle mb-3"
                    width="200px" alt="profile" /> */}

                <Form onSubmit={(e) => handlePasswordReset(e)}>
                  <Form.Group className="mb-3 position-relative d-inline-block w-100" controlId="formBasicEmail">
                    <Form.Control type="email" placeholder={t("Enter Your Email")} className="inputelem" ref={emailRef} required={true} />
                  </Form.Group>
                  <Button className="btn btn-color px-5 mb-3 w-100" type="submit" disabled={loading} >
                    {loading ? t("Please Wait") : t("Send")}
                  </Button>
                  {message && <p className="">{message}</p>}
                </Form>

                <div id="emailHelp" className="form-text mt-3 text-center text-dark">
                  {t("Already have an account")}
                  <div className="text-dark fw-bold">
                    <Link to="/LogIn" replace>
                      {t("Back to Login")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div id="recaptcha-container"></div>
      </div>
    </React.Fragment>
  );
};

export default withTranslation()(ResetPassword);
