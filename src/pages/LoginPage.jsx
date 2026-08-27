import { useForm } from "react-hook-form";
import FormInput from "../components/UI/FormInput";
import Button from "../components/UI/Button";
import { BUTTON_VARIANT } from "../constans/stylesVariant";
import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import ErrorState from "../components/UI/ErrorState";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate("");
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      email: "demo@demo.demo",
      password: "demouser1",
    },
  });

  const { loginUser } = useContext(AuthContext);

  const login = async (data) => {
    try {
      await loginUser(data);
      navigate("/meals");
    } catch {
      setError("root", {
        type: "server",
        message: "Invalid email or password",
      });
    }
  };

  return (
    <div className="container">
      <h3 className="text-2xl font-bold text-center mb-5 text-[var(--accent)]">
        Login
      </h3>
      <p className="text-center mb-10">
        For demo purpose the register form is not available. Please use a
        provided demo user.
      </p>
      {errors.root && <ErrorState message={errors.root.message} />}
      <form onSubmit={handleSubmit(login)} className="lg:max-w-130 mx-auto">
        <FormInput
          label="E-mail"
          name="email"
          {...register("email", {
            required: "E-mail is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid e-mail format",
            },
          })}
          error={errors.email}
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Minimum password length is 6" },
          })}
          error={errors.password}
        />
        <div className="text-end mt-4">
          <Button
            disabled={isSubmitting}
            variant={BUTTON_VARIANT.BUTTON}
            type="submit"
            customCSS="ms-auto"
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
