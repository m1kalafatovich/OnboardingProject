import Image from "next/image";

export default function Home() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <div className="flex items-center justify-center">
                <h1 className="text-4xl font-bold">Mateo Kalafatovich's Website</h1>
            </div>
            <div className="flex items-center justify-center">
                <Image
                    src="/mateo.png"
                    alt="Logo"
                    width={400}
                    height={400}
                />
            </div>
            <div>
                <h2 className="text-2xl font-semibold">About Me</h2>
                <p className="text-lg">
                    My name is Mateo Kalafatovich, and I am a software developer with a 
                    passion for building web applications. I have experience
                    with various programming languages and frameworks, and I
                    am always looking for new challenges to tackle.
                </p>
            </div>
        </div>
    );
}
