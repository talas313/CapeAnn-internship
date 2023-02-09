import React,{useState,createContext} from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
export const RoleContext=createContext()
function LogPages() {
  const navigate = useNavigate();
  const [role,setRole]=useState("")
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: yup.object().shape({
      email: yup.string().required("Required"),
      password: yup.string().required("Required"),
    }),

    onSubmit: () => {
      const data = formik.values;

      let url = "http://localhost:5000/users/login";
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
          setRole(data.data[0].role)
          localStorage.setItem('token', JSON.stringify(data));
          if(data.data[0].role==='admin'){
            navigate("/dashboard");
          }else{
          navigate("/");}
          console.log(data);
        });
    },
  });

  return (
    <RoleContext.Provider value={role}>
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
        <h1 className="text-center text-3xl mb-5">SIGN IN</h1>
        <div className="flex justify-between pl-5 pr-5 mb-10">
          <p>New user?</p>
          <Link to="/registration">
            <p className="text-orange-500 hover:scale-110 transition-all cursor-pointer">
              Create an account
            </p>
          </Link>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid md:grid-cols- md:gap-6">
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
            <div className="flex items-start mb-5">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                />
              </div>
              <label
                htmlFor="remember"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="btn btn-warning md:btn-wide mr-5 mb-5"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
    </RoleContext.Provider>
  );
}

export default LogPages;
