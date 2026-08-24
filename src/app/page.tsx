import Banner from "@/src/Components/Home/Banner";
import Products from "@/src/Components/Home/Products";

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <section>
        <Banner></Banner>
      </section>

      <section>
        <Products></Products>
      </section>
    </div>
  );
}
