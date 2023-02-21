import service from "@/service";
import { endpoints } from "api-interface";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-hot-toast";

export const getServerSideProps: GetServerSideProps = async (context) =>
    service(
        endpoints.auth.currentUser,
        context,
    )({})
        .then(() => ({
            props: {},
            redirect: { destination: "/", statusCode: 301 },
        }))
        .catch(() => ({ props: {} }));

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const handleSignIn = () =>
        toast
            .promise(
                service(endpoints.auth.login)({ body: { username, password } }),
                {
                    success: "Success",
                    loading: "Loging In...",
                    error: "Error logging in",
                },
            )
            .then(() => router.push("/"))
            .catch(() => { });
    return (
        <div className="flex flex-col gap-4 items-center justify-center">
            <input
                className="text-xl p-2 rounded border-2 border-neutral-600"
                value={username}
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                className="text-xl p-2 rounded border-2 border-neutral-600"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <div>
                <button
                    onClick={handleSignIn}
                    className="bg-blue-500 p-2 rounded text-white"
                >
                    Sign In
                </button>
            </div>
        </div>
    );
};

export default Login;
