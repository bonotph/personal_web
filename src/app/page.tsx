import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full relative h-[100vh] mr-8">
        <Image 
          src="/background.jpg" 
          alt="background" 
          fill
          className="object-cover"
          priority
        />
        {/* Left text */}
        <div className="absolute inset-y-0 left- w-50 flex items-center ml-8 p-[200px]">
          <div className="text-center z-10">
            <h1 className="text-5xl font-bold text-white mb-4 font-serif">
              Bono Tang
            </h1>
            <p className="text-xl text-white font-sans tracking-wide">
              Portfolio
            </p>
          </div>
          <div className="absolute inset-0 bg-black opacity-30" />
        </div>
        
        {/* Right text */}
        <div className="absolute top-2 right-0 w-1/2 flex items-center justify-center mt-8 pt-8">
          <div className="text-center z-10">
            <p className="text-2xl text-black font-sans tracking-wider leading-relaxed">
              The personal blog of a <br/>
              Year-2 CityU CS Student. <br/>
              A record of my youthful times.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}