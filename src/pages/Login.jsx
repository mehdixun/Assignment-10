import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider.jsx';
import { Link } from 'react-router';

const Login = () => {

  const { signInWithGoogle } = useContext(AuthContext);
  
      const handleGoogleSignIn = () => {
          signInWithGoogle()
              .then(result => {
                  console.log(result.user);
              })
              .catch(error => {
                  console.log(error);
              });
      };

    return (

    <div className="card mt-10 mb-100 h-110 bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input type="email my-5" className="input" placeholder="Email" />
          <label className="label">Password</label>
          <input type="password" className="input" placeholder="Password" />
          <div><a className="link link-hover hover:text-red-500">Forgot password?</a></div>
          <button className="btn bg-indigo-500 font-bold hover:bg-indigo-700 transition hover:scale-110 mt-4 my-5">Login</button>
          <p className='text-center'>Don't have an account ? Please <Link className='text-indigo-500 font-bold hover:underline' to="/register" >Register</Link></p>

          <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5] my-5 font-bold transition hover:scale-110">
                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                Login with Google
                </button>
        </fieldset>
      </div>
    </div>
    );
};

export default Login;