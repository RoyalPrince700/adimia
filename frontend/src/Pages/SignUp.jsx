import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';
import Context from '../context';
import Logo from '../components/Logo';

const perks = [
  'Create your Adimia profile in one step—no separate passwords to manage.',
  'Save time at checkout when your account details are available.',
  'Keep an eye on orders and updates from the same place you shop.',
];

const SignUp = () => {
  const { signInWithGoogle } = useContext(Context);

  return (
    <motion.section
      id="signup"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen bg-white px-4 py-10 sm:mt-6 sm:px-8 lg:mt-2 lg:px-16"
    >
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="w-full max-w-lg"
        >
          <div className="overflow-hidden rounded-[36px] border border-slate-200/80 bg-[linear-gradient(135deg,_rgba(255,255,255,0.96),_rgba(248,250,252,0.95)_45%,_rgba(241,245,249,0.98))] shadow-[0_30px_120px_rgba(15,23,42,0.10)]">
            <div className="border-b border-slate-200/80 px-8 pb-8 pt-10 sm:px-10 sm:pt-12">
              <div className="flex justify-center">
                <Logo imgClassName="h-9 w-auto max-w-[160px] object-contain object-center sm:h-10 sm:max-w-[180px]" />
              </div>
              <p className="mt-8 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                Join Adimia
              </p>
              <h1 className="mt-3 text-center text-2xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-3xl">
                Create your account
              </h1>
              <p className="mx-auto mt-3 max-w-sm text-center text-sm leading-7 text-slate-600">
                Use Google to sign up and get the same refined layout and typography you see on the home page—minimal
                friction, maximum clarity.
              </p>
            </div>

            <div className="px-8 py-8 sm:px-10">
              <ul className="mb-8 space-y-3 text-sm leading-6 text-slate-600">
                {perks.map((line) => (
                  <li key={line} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" aria-hidden />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                type="button"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={signInWithGoogle}
                className="flex w-full items-center justify-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-800 shadow-sm transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 hover:shadow-[0_12px_40px_rgba(15,23,42,0.08)]"
              >
                <FcGoogle className="text-2xl" aria-hidden />
                Sign up with Google
              </motion.button>

              <p className="mt-5 text-center text-xs leading-6 text-slate-500">
                Registration uses Google sign-in only. That helps us keep accounts consistent and protect your access to
                orders and support.
              </p>

              <p className="mt-8 text-center text-sm text-slate-600">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-semibold text-slate-950 underline decoration-slate-300 underline-offset-4 transition hover:decoration-slate-950"
                >
                  Sign in
                </Link>
              </p>

              <p className="mt-6 text-center">
                <Link
                  to="/"
                  className="text-sm font-medium text-slate-500 transition hover:text-slate-950"
                >
                  ← Back to shopping
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SignUp;
