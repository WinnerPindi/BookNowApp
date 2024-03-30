import { Card } from "./Card";

export function AppartGrid({ items }) {
  return (
    <div className="mt-10 cursor-pointer">
      <div className="text-4xl font-extrabold text-center">NOS CHAMBRES</div>
      <div className="mt-10 grid grid-cols-1 gap-y-10 gap-x-8 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item, index) => (
          <Card key={index} item={item}/>
        ))}
      </div>
    </div>
  );
}
