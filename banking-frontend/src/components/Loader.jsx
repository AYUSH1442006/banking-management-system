import { Circles } from 'react-loader-spinner';

function Loader() {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <Circles color="#FFD700" height={120} width={120} />
    </div>
  );
}

export default Loader;