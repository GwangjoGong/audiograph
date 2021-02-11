import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { isLoggedInVar, jwtTokenVar } from "../apollo";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
import { LOCAL_STORAGE_TOKEN } from "../constants";
import {
  createAccountMutation,
  createAccountMutationVariables,
} from "../__generated__/createAccountMutation";
import {
  loginMutation,
  loginMutationVariables,
} from "../__generated__/loginMutation";
import wave from "../assets/wave.png";

const LOGIN_MUTATION = gql`
  mutation loginMutation($input: LoginInput!) {
    login(input: $input) {
      ok
      error
      token
    }
  }
`;

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation($input: CreateAccountInput!) {
    createAccount(input: $input) {
      ok
      error
    }
  }
`;

interface IForm {
  email: string;
  password: string;
}

export const Login = () => {
  const {
    register,
    watch,
    errors,
    handleSubmit,
    formState: { isValid },
  } = useForm<IForm>({ mode: "onChange" });

  const [login, { data: loginResult }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted: (data: loginMutation) => {
      const {
        login: { ok, token },
      } = data;
      if (ok && token) {
        jwtTokenVar(token);
        isLoggedInVar(true);
        localStorage.setItem(LOCAL_STORAGE_TOKEN, token);
      }
    },
  });

  const onCreateAccount = (data: createAccountMutation) => {
    const {
      createAccount: { ok },
    } = data;
    if (ok) {
      login({
        variables: {
          input: {
            email: watch().email,
            password: watch().password,
          },
        },
      });
    }
  };

  const [
    createAccount,
    { data: createAccountResult, loading: createAccountLoading },
  ] = useMutation<createAccountMutation, createAccountMutationVariables>(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted: onCreateAccount,
    }
  );

  const onSubmit = () => {
    if (!createAccountLoading) {
      createAccount({
        variables: {
          input: {
            email: watch().email,
            password: watch().password,
          },
        },
      });
    }
  };

  return (
    <div className="container flex flex-col items-center justify-center">
      <div
        className="w-24 h-24 transition-all duration-700 bg-contain bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(${wave})`,
          filter: `grayscale(${isValid ? 0 : 1})`,
        }}
      />
      <h2 className="mt-2 font-medium text-lg opacity-80">Audiograph</h2>
      <div className="h-72 flex items-end">
        <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
          <input
            ref={register({
              required: "Email is required",
            })}
            className="input"
            name="email"
            required
            type="email"
            placeholder="Email"
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}
          <input
            ref={register({
              required: "Password is required",
            })}
            className="input mb-2"
            name="password"
            required
            type="password"
            placeholder="Password"
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}
          <Button
            canClick={isValid}
            actionText="Get Started"
            loading={createAccountLoading}
          />
          {loginResult?.login.error && (
            <FormError errorMessage={loginResult.login.error} />
          )}
          {createAccountResult?.createAccount.error && (
            <FormError errorMessage={createAccountResult.createAccount.error} />
          )}
        </form>
      </div>
    </div>
  );
};
