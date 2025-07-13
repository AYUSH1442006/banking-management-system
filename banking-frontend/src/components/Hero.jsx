import { Parallax } from 'react-parallax';

function Hero() {
  return (
    <Parallax bgImage="https://images.unsplash.com/photo-1612832021041-df3b8d6bfb4c" strength={500}>
      <div className="h-screen flex flex-col items-center justify-center text-white">
        <h1 className="text-5xl font-bold mb-4 backdrop-blur-sm bg-black/40 p-4 rounded-lg">
          Welcome to CrownStone Bank
        </h1>
        <p className="text-xl backdrop-blur-sm bg-black/40 p-2 rounded-lg">Experience Next-Level Banking</p>
      </div>
    </Parallax>
  );
}

export default Hero;