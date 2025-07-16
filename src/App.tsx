import { Routes, Route } from "react-router-dom";
import Header from "./components/Navigation";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/mainLayour";
import { useSplashScreen } from "./hooks/useSplashScreen";
import SplashScreen from "./pages/SplashScreen";
import DetailPage from "./pages/DetailPage";

function App() {
  const isLoading = useSplashScreen(2000);
  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <MainLayout header={<Header />} footer={<Footer />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:category" element={<HomePage />} />
        <Route path="/:category/detail/:id" element={<DetailPage />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
