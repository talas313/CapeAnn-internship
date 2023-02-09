import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
function RegPages() {
  const navigate = useNavigate()
  const passwordRules =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email("Please enter a valid email")
        .required("Required"),
      password: yup
        .string()
        .min(8)
        .matches(passwordRules, {
          message: "Please create a stronger password",
        })
        .required("Required"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: () => {
      const data = formik.values;

      let url = "http://localhost:5000/users/register";
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.error) {
            console.log(data.error);
          }
          navigate("/login")
          console.log(data);
        });
    },
  });

  return (
    <div className="fixed inset-0 bg-zinc-900 flex justify-center items-center z-10">
      <Link to="/">
        <img
          src={logo}
          alt="#"
          width={150}
          className="absolute top-0 left-0 m-10 cursor-pointer"
        />
      </Link>
      <div className="border border-gray-500 rounded-lg p-10">
        <h1 className="text-center text-3xl mb-5">CREATE AN ACCOUNT</h1>
        <div className="flex justify-between pl-5 pr-5 mb-5">
          <p>Already have an account?</p>
          <Link to="/login">
            <p className="text-orange-500 hover:scale-110 transition-all cursor-pointer">
              Sign In
            </p>
          </Link>
        </div>
        <div className="Form">
          <form onSubmit={formik.handleSubmit} autoComplete="off">
            <div className="grid md:grid-cols-2 md:gap-6"></div>
            <div className="relative z-0 mb-6 w-full group">
              <input
                type="email"
                name="email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email address
              </label>
              {formik.touched.email && formik.errors.email ? (
                <p>{formik.errors.email}</p>
              ) : null}
            </div>
            <div className="relative z-0 mb-6 w-full group">
              <input
                type="password"
                name="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Password
              </label>
              {formik.touched.password && formik.errors.password ? (
                <p>{formik.errors.password}</p>
              ) : null}
            </div>
            <div className="relative z-0 mb-6 w-full group">
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_repeat_password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Confirm password
              </label>
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <p>{formik.errors.confirmPassword}</p>
              ) : null}
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="btn btn-warning md:btn-wide mr-5 mb-5"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegPages;
