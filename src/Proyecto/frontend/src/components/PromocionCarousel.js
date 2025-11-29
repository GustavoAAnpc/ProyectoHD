import React, { useState, useEffect } from 'react';
import { promocionService } from '../services/api';
import './PromocionCarousel.css';

const PromocionCarousel = ({ type = 'web' }) => {
    const [promociones, setPromociones] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadPromociones();
    }, [type]);

    const loadPromociones = async () => {
        try {
            setLoading(true);
            let response;

            switch (type) {
                case 'web':
                    response = await promocionService.getWeb();
                    break;
                case 'dashboard-usuario':
                    response = await promocionService.getDashboardUsuario();
                    break;
                case 'dashboard-entrenador':
                    response = await promocionService.getDashboardEntrenador();
                    break;
                default:
                    response = await promocionService.getActivas();
            }

            setPromociones(response.data || []);
            setError(null);
        } catch (err) {
            console.error('Error cargando promociones:', err);
            setError('Error al cargar las promociones');
        } finally {
            setLoading(false);
        }
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === promociones.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? promociones.length - 1 : prevIndex - 1
        );
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    // Auto-advance carousel
    useEffect(() => {
        if (promociones.length > 1) {
            const interval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
            return () => clearInterval(interval);
        }
    }, [promociones.length, currentIndex]);

    if (loading) {
        return (
            <div className="promocion-carousel-loading">
                <p>Cargando promociones...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="promocion-carousel-error">
                <p>{error}</p>
            </div>
        );
    }

    if (promociones.length === 0) {
        return null; // Don't show anything if there are no promotions
    }

    return (
        <div className="promocion-carousel">
            <div className="carousel-container">
                <div className="carousel-slides">
                    {promociones.map((promocion, index) => (
                        <div
                            key={promocion.idPromocion}
                            className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
                        >
                            {promocion.imagenUrl && (
                                <img
                                    src={promocion.imagenUrl}
                                    alt={promocion.titulo || 'Promoción'}
                                    className="carousel-image"
                                />
                            )}
                        </div>
                    ))}
                </div>

                {promociones.length > 1 && (
                    <>
                        <button className="carousel-button prev" onClick={prevSlide}>
                            ❮
                        </button>
                        <button className="carousel-button next" onClick={nextSlide}>
                            ❯
                        </button>

                        <div className="carousel-indicators">
                            {promociones.map((_, index) => (
                                <button
                                    key={index}
                                    className={`indicator ${index === currentIndex ? 'active' : ''}`}
                                    onClick={() => goToSlide(index)}
                                    aria-label={`Ir a promoción ${index + 1}`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default PromocionCarousel;
