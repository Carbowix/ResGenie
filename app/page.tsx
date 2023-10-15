import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="w-screen h-screen bg-[#131112] text-white">
      <div className="w-full h-full flex flex-col gap-y-10 justify-center items-center md:w-1/2 md:flex-row md:items-center md:justify-between mx-auto">
        <div className="flex flex-col gap-y-5 w-full px-4 md:w-1/2">
          <h2 className="text-5xl font-bold">
            Res<span className="text-[#488DB7]">Genie</span>
          </h2>
          <p className="text-3xl font-semibold">
            Granting your <span className="text-[#B9762C]">wish</span> for a job
          </p>
          <Link href={'/login'}>
            <button className="rounded p-3 text-center bg-[#279af1] text-white ring-[#279af1] hover:bg-[#60656f] hover:text-gray-300 transition-all duration-500">
              Start Now
            </button>
          </Link>
        </div>
        <Image
          src={'/logo.png'}
          width={256}
          height={256}
          alt="ResGenie Logo"
          className="w-64 h-64 animate-hover"
        />
      </div>
    </div>
  );
}
