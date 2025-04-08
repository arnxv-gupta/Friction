"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Auth() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      let loginObj = {
        email: e.target[2].value,
        password: e.target[3].value,
      };
      console.log(loginObj);

      fetch("http://localhost:3030/loginAccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginObj),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.type + data.msg);
          if (data.type === "SUCCESS") {
            localStorage.setItem("userID", data.res);
            router.push("/inbox/@me");
          }
        });
    } else {
      let signUpObj = {
        pfpImage: localStorage.getItem("pfpImage"),
        username: e.target[1].value,
        email: e.target[2].value,
        password: e.target[3].value,
      };

      console.log(signUpObj);

      fetch("http://localhost:3030/createAccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpObj),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.type + data.msg);
        });
    }
  };

  return (
    <div
      className="flex h-screen items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <form
        className="relative w-full max-w-md p-10 space-y-4 bg-[#313338] text-white rounded-md"
        onSubmit={handleSubmit}
        style={{
          maxHeight: isLogin ? "600px" : "700px",
          overflow: "hidden",
        }}
      >
        <h2 className="text-4xl font-bold text-center">
          {isLogin ? "Welcome back!" : "Create an Account"}
        </h2>
        <p className="text-center text-[#888] mb-4">
          {isLogin
            ? "We're so excited to see you again!"
            : "Pleasure to meet you!"}
        </p>

            {/* signUp  */}
        <div className={isLogin ? "hidden" : "block"}>
          <input
            type="file"
            name="pfpImage"
            accept="image/*"
            onChange={(e) => {
              let data = new FormData();
              data.append("image", e.target.files[0]);
              fetch("http://localhost:3030/uploadImage", {
                method: "POST",
                body: data,
              })
                .then((res) => res.json())
                .then((data) => {
                  console.log(data);
                  if (data.type == "SUCCESS") {
                    localStorage.setItem("pfpImage", data.res);
                  }
                });
            }}
            required={!isLogin}
          />
            <input label="USERNAME" type="text" id="username" name="username" required={!isLogin} />

        </div>

        <div>
            <input label="EMAIL" type="email" id="email" name="email" required={true}/>
            <input label="PASSWORD" type="password" id="password" name="password" required={true} />
        </div>

        <button
          type="submit"
          className="bg-[#5865F2] w-full py-3 px-4 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition-all duration-200"
        >
          {isLogin ? "Log In" : "Sign Up"}
        </button>

        <button
          type="button"
          className="text-sm text-blue-400 hover:underline text-center w-full mt-4"
          onClick={() => {
            setIsLogin(!isLogin);
          }}
        >
          {isLogin
            ? "Need an account? Sign up"
            : "Already have an account? Log in"}
        </button>
      </form>
    </div>
  );
}
