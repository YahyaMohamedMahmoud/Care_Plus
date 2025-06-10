import { Hourglass } from "react-loader-spinner";
const Loader = () => {
  return (
    <div className=" h-[100vh] w-full flex justify-center items-center ">
      <Hourglass
   visible={true}
   height="80"
   width="80"
   ariaLabel="hourglass-loading"
   wrapperStyle={{}}
   wrapperClass=""
   colors={['#306cce', '#72a1ed']}
   />
   
    </div>
  );
};

export default Loader;
