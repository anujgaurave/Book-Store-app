import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      const res = await axios.post(
        "http://localhost:4000/user/login",
        userInfo
      );

      console.log(res.data);

      if (res.data && res.data.token) {
        localStorage.setItem("authToken", res.data.token);
        localStorage.setItem("Users", JSON.stringify(res.data.user));

        toast.success("Logged in successfully");

        navigate("/");
        setTimeout(() => {
          window.location.reload(); 
        }, 1000);
      } else {
        toast.error("Login failed: No token received");
      }
    } catch (err) {
      if (err.response) {
        console.log(err.response);
        toast.error(
          "Error: " + (err.response.data.message || "Something went wrong")
        );
      } else {
        console.error("Error: ", err.message);
        toast.error("Error: Something went wrong");
      }
    }
  };

  return (
    <div className=" h-screen flex justify-center items-center">
      <div className="w-[600px]">
        <div className="modal-box">
          <form onSubmit={handleSubmit(onSubmit)} method="dialog">
           
            <Link
              to={"/"}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </Link>

            <h3 className="font-bold text-lg">Login!</h3>

            
            <div className="mt-4 space-y-2">
              <span>Email</span>
              <br />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                {...register("email", { required: true })}
              />
              <br />
              {errors.email && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>

            
            <div className="mt-4 space-y-2">
              <span>Password</span>
              <br />
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                {...register("password", { required: true })}
              />
              <br />
              {errors.password && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>

            <div className="flex justify-around mt-6">
              <button className="bg-pink-500 text-white px-3 py-1 rounded-md hover:bg-pink-700 duration-200">
                Login
              </button>
              <p>
                Not registered?{" "}
                <Link
                  to={"/signup"}
                  className="underline text-blue-500 cursor-pointer"
                >
                  Signup
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
}

export default Login;