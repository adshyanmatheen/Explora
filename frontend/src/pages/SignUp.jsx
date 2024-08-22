import RegistrationForm from "../components/RegistrationForm/RegistrationForm";

const SignUp = () => {
  return (
    <div className="fixed left-0 top-0 z-0 h-screen w-screen bg-[url('https://cdn.dribbble.com/userupload/12608757/file/original-7c0e168619a01690aeee929e3f60cd13.jpg?resize=2400x1803')] bg-cover bg-center">
      <div className="absolute left-0 top-0 h-full w-full bg-black/10">
        <div className="flex h-screen flex-col items-center justify-center">
          <RegistrationForm></RegistrationForm>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
