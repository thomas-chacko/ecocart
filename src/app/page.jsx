import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Products from "@/components/Products";
import WhyEcoCart from "@/components/WhyEcoCart";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <main className="bg-white dark:bg-gray-900">
      <ScrollProgress />
      <Header />
      <Hero />
      <Products />
      <About />
      <WhyEcoCart />
      <Contact />
      <Footer />
      <CartSidebar />
    </main>
  );
}
