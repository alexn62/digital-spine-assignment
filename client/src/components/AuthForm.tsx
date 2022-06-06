import React from 'react';
import CustomButton from './CustomButton';

const AuthForm = ({
  signup = false,
  onSubmit,
  setEmail,
  setPassword,
  setConfirmPassword,
  error,
}: {
  signup?: boolean;
  onSubmit: () => void;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setConfirmPassword?: React.Dispatch<React.SetStateAction<string>> | undefined;
  error: string;
}) => {
  return (
    <div className="flex flex-col p-4 border border-gray-200 rounded-md space-y-2 min-w-[300px]">
      <form
        className="flex flex-col space-y-2"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <p>Email</p>
        <input
          className="bg-gray-200 py-1 px-2 rounded-md"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="john@doe.com"
        ></input>
        <p>Password</p>
        <input
          className="bg-gray-200 py-1 px-2 rounded-md"
          onChange={(e) => setPassword(e.target.value)}
          type={'password'}
          placeholder="********"
        ></input>
        {signup && (
          <div>
            <p>Confirm Password</p>
            <input
              className="bg-gray-200 py-1 px-2 rounded-md w-full"
              onChange={(e) => setConfirmPassword!(e.target.value)}
              type={'password'}
              placeholder="********"
            ></input>
          </div>
        )}
        {error && <p className="text-red-600">{error}</p>}
        <CustomButton submit={true} title={signup ? 'Sign Up' : 'Login'} onClick={() => {}} />
      </form>
    </div>
  );
};

export default AuthForm;
