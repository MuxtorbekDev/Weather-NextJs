import Head from "next/head";
import SearchBox from "../components/SearchBox";
import FamousPLaces from "../components/FamousPlaces.jsx";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Weather App - Next</title>
      </Head>
      <div className="home">
        <div className="container">
          <SearchBox />
          <FamousPLaces />
          <Footer />
        </div>
      </div>
    </div>
  );
}
