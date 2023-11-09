import AuthForm from "./components/AuthForm";

const Auth = () => {
  return (
    <>
      <div
        className='
        flex 
        min-h-[100vh] 
        min-w-full
        flex-col 
        justify-center 
        py-12 
        sm:px-6 
        lg:px-8
        bg-repeat
        -z-10
      '
      >
        <div className='absolute bg-white top-0 left-0 w-full h-full opacity-80'></div>
        <div className='z-10'>
          <AuthForm initVariant='LOGIN' />
        </div>
      </div>
    </>
  );
};

export default Auth;
