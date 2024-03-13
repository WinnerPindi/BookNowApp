import BackgroundImage from "../assets/Bg-lit.jpg";

export function HomeBanner() {
  return (
    <div className="relative mt-12 h-screen">
      <img
        src={BackgroundImage}
        alt="Description"
        className="w-full h-full object-cover absolute z-0 rounded-3xl"
      />
      <div
        className="z-10 text-white text-center absolute w-full"
        style={{ top: "50%", transform: "translateY(-50%)" }}
      >
        <h1 className="text-5xl font-bold">Trouvez votre prochain séjour</h1>
        <p className="text-xl">
          Explorez des opportunités sur des hôtels et des logements autonome.
        </p>
      </div>
    </div>
  );
}
