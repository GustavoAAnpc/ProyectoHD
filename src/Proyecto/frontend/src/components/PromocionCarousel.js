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

            const promocionesData = response?.data || response || [];
            console.log(`Promociones cargadas para tipo "${type}":`, promocionesData);
            console.log(`Total de promociones: ${promocionesData.length}`);
            if (promocionesData.length > 0) {
                promocionesData.forEach((p, idx) => {
                    console.log(`Promoción ${idx + 1}:`, {
                        id: p.idPromocion,
                        nombre: p.nombre,
                        mostrarEnWeb: p.mostrarEnWeb,
                        activa: p.activa,
                        fechaInicio: p.fechaInicio,
                        fechaFin: p.fechaFin
                    });
                });
            }
            setPromociones(promocionesData);
            setError(null);
        } catch (err) {
            console.error('Error cargando promociones:', err);
            console.error('Error completo:', err.response || err.message || err);
            setError(`Error al cargar las promociones: ${err.message || 'Error desconocido'}`);
            setPromociones([]);
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
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) =>
                    prevIndex === promociones.length - 1 ? 0 : prevIndex + 1
                );
            }, 5000); // Change slide every 5 seconds
            return () => clearInterval(interval);
        }
    }, [promociones.length]);

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
        // Mostrar mensaje en desarrollo para ayudar con la depuración
        if (process.env.NODE_ENV === 'development') {
            return (
                <div style={{ padding: '20px', textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
                    No hay promociones disponibles para mostrar en este momento.
                    <br />
                    <small>Tipo: {type}</small>
                </div>
            );
        }
        return null; // No mostrar nada en producción si no hay promociones
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
                            {promocion.imagenUrl ? (
                                <img
                                    src={promocion.imagenUrl}
                                    alt={promocion.nombre || 'Promoción'}
                                    className="carousel-image"
                                />
                            ) : (
                                <div className="carousel-content">
                                    <h3>{promocion.nombre || 'Promoción Especial'}</h3>
                                    {promocion.descripcion && (
                                        <p className="carousel-description">{promocion.descripcion}</p>
                                    )}
                                    {promocion.descuentoPorcentaje && (
                                        <div className="carousel-discount">
                                            <span className="discount-badge">
                                                {promocion.descuentoPorcentaje}% OFF
                                            </span>
                                        </div>
                                    )}
                                    {promocion.fechaInicio && promocion.fechaFin && (
                                        <p className="carousel-dates">
                                            Válido del {new Date(promocion.fechaInicio).toLocaleDateString()} al {new Date(promocion.fechaFin).toLocaleDateString()}
                                        </p>
                                    )}
                                </div>
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
