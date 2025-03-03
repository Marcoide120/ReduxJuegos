"use client";

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchGames, nextSlide, setSlide } from "../../redux/gamesSlice";

function Home() {
  const dispatch = useDispatch();
  const { games, isLoading, currentIndex } = useSelector((state) => state.games);

  useEffect(() => {
    dispatch(fetchGames({ searchTerm: "", currentPage: 1 }));
  }, [dispatch]);

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(nextSlide());
    }, 5000);

    return () => clearInterval(timer);
  }, [dispatch]);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100%",
          backgroundColor: "#1a202c",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 50,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              animation: "spin 1s linear infinite",
              borderRadius: "50%",
              height: "4rem",
              width: "4rem",
              borderTop: "2px solid #48bb78",
              borderBottom: "2px solid #48bb78",
              margin: "0 auto",
              marginBottom: "1rem",
            }}
          ></div>
          <h2 style={{ color: "white", fontSize: "1.5rem", margin: 0 }}>Cargando...</h2>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#4b5563",
        overflow: "auto",
      }}
    >
      <section
        style={{
          width: "100%",
          height: "60vh",
          backgroundImage: "url('/portada.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
        />
        <div
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            alignItems: "center",
            maxWidth: "1200px",
            width: "100%",
            padding: "3rem 1rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          <h1
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              color: "white",
              fontWeight: "bold",
              margin: 0,
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            La Juegoteca virtual
          </h1>
          <h2
            style={{
              fontSize: "1.5rem",
              color: "white",
              fontWeight: "bold",
              margin: 0,
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            La mejor web sobre información de toda clase de videojuegos, actuales, indi, 8-bits, etc.
          </h2>
          <Link
            to="/Games"
            style={{
              backgroundColor: "#48bb78",
              color: "white",
              padding: "0.8em 1.6em",
              borderRadius: "0.5rem",
              display: "inline-block",
              textDecoration: "none",
              transition: "all 0.3s ease",
              border: "1px solid transparent",
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              fontWeight: "500",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#3da066")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#48bb78")}
          >
            Adéntrate en el universo virtual
          </Link>
        </div>
      </section>

      <section
        style={{
          flex: 1,
          padding: "3rem 1rem",
          display: "flex",
          flexDirection: "column",
          minHeight: "50vh",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              color: "#4ade80",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              margin: 0,
              fontWeight: "bold",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
            }}
          >
            Los más recientes
          </h2>

          <div
            style={{
              position: "relative",
              flex: 1,
              minHeight: "800px",
              borderRadius: "1rem",
              overflow: "hidden",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                transition: "transform 700ms ease-in-out",
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {games.map((game) => (
                <div
                  key={game.id}
                  style={{
                    flex: "0 0 100%",
                    height: "100%",
                    position: "relative",
                  }}
                >
                  <img
                    src={game.background_image || "/placeholder.svg"}
                    alt={game.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: "linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0))",
                      padding: "2rem 1.5rem 1.5rem",
                    }}
                  >
                    <h3
                      style={{
                        color: "white",
                        margin: 0,
                        fontSize: "clamp(1.2rem, 2.5vw, 2rem)",
                        fontWeight: "600",
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      {game.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "0.75rem",
              padding: "1rem 0",
            }}
          >
            {games.map((_, index) => (
              <button
                key={index}
                onClick={() => dispatch(setSlide(index))}
                style={{
                  width: "1rem",
                  height: "1rem",
                  margin: 0,
                  padding: 0,
                  borderRadius: "50%",
                  backgroundColor: index === currentIndex ? "#48bb78" : "#9ca3af",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
                onMouseOver={(e) => {
                  if (index !== currentIndex) {
                    e.currentTarget.style.backgroundColor = "#8ca3af";
                    e.currentTarget.style.transform = "scale(1.2)";
                  }
                }}
                onMouseOut={(e) => {
                  if (index !== currentIndex) {
                    e.currentTarget.style.backgroundColor = "#9ca3af";
                    e.currentTarget.style.transform = "scale(1)";
                  }
                }}
                aria-label={`Ir a la diapositiva ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
