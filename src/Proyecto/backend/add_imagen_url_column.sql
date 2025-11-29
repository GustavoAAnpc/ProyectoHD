-- Modify imagen_url column to LONGTEXT to support large base64 images
ALTER TABLE promocion MODIFY COLUMN imagen_url LONGTEXT;

-- Example: Insert a test promotion (optional - you can do this via admin dashboard instead)
-- INSERT INTO promocion (nombre, descripcion, descuento_porcentaje, fecha_inicio, fecha_fin, activa, mostrar_en_web, mostrar_en_dashboard_usuario, mostrar_en_dashboard_entrenador, fecha_creacion, imagen_url)
-- VALUES ('Promoción de Prueba', 'Descuento especial', 20.00, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 30 DAY), true, true, true, true, CURDATE(), 'data:image/png;base64,...');
