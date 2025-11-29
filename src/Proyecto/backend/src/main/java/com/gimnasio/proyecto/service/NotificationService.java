package com.gimnasio.proyecto.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    private final JavaMailSender mailSender;

    public NotificationService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendCredentialsEmail(String toEmail, String username, String password, String fullName) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(toEmail);
            helper.setSubject("Bienvenido a FORCA & FITNESS - Tus Credenciales de Acceso");
            helper.setFrom("gustavoblas2024@gmail.com");

            String htmlContent = buildEmailTemplate(username, password, fullName);
            helper.setText(htmlContent, true);

            mailSender.send(message);

        } catch (MessagingException e) {
            throw new RuntimeException("Error al enviar el correo electrónico: " + e.getMessage(), e);
        }
    }

    private String buildEmailTemplate(String username, String password, String fullName) {
        return """
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            line-height: 1.6;
                            color: #333;
                        }
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                            background-color: #f9f9f9;
                        }
                        .header {
                            background-color: #4CAF50;
                            color: white;
                            padding: 20px;
                            text-align: center;
                            border-radius: 5px 5px 0 0;
                        }
                        .content {
                            background-color: white;
                            padding: 30px;
                            border-radius: 0 0 5px 5px;
                        }
                        .credentials {
                            background-color: #f0f0f0;
                            padding: 15px;
                            border-left: 4px solid #4CAF50;
                            margin: 20px 0;
                        }
                        .credentials p {
                            margin: 10px 0;
                        }
                        .credentials strong {
                            color: #4CAF50;
                        }
                        .footer {
                            text-align: center;
                            margin-top: 20px;
                            font-size: 12px;
                            color: #666;
                        }
                        .warning {
                            background-color: #fff3cd;
                            border-left: 4px solid #ffc107;
                            padding: 15px;
                            margin: 20px 0;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>¡Bienvenido a FORCA & FITNESS!</h1>
                        </div>
                        <div class="content">
                            <p>Hola <strong>%s</strong>,</p>

                            <p>Tu cuenta ha sido creada exitosamente. A continuación encontrarás tus credenciales de acceso al sistema:</p>

                            <div class="credentials">
                                <p><strong>Usuario:</strong> %s</p>
                                <p><strong>Contraseña:</strong> %s</p>
                            </div>

                            <div class="warning">
                                <p><strong>Importante:</strong></p>
                                <ul>
                                    <li>Por seguridad, te recomendamos cambiar tu contraseña después del primer inicio de sesión.</li>
                                    <li>No compartas tus credenciales con nadie.</li>
                                    <li>Guarda este correo en un lugar seguro.</li>
                                </ul>
                            </div>

                            <p>Puedes acceder al sistema en: <a href="http://localhost:3000">http://localhost:3000</a></p>

                            <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.</p>

                            <p>¡Bienvenido a bordo!</p>
                        </div>
                        <div class="footer">
                            <p>Este es un correo automático, por favor no respondas a este mensaje.</p>
                            <p>&copy; 2024 FORCA & FITNESS. Todos los derechos reservados.</p>
                        </div>
                    </div>
                </body>
                </html>
                """
                .formatted(fullName, username, password);
    }

    public void sendTrainerAssignmentEmail(String alumnoEmail, String alumnoName, String instructorEmail,
            String instructorName) {
        // Email al Alumno
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(alumnoEmail);
            helper.setSubject("Nuevo Entrenador Asignado - FORCA & FITNESS");
            helper.setFrom("gustavoblas2024@gmail.com");

            String htmlContent = buildTrainerAssignmentEmailTemplate(alumnoName, instructorName, true);
            helper.setText(htmlContent, true);

            mailSender.send(message);

        } catch (MessagingException e) {
            // Log error but don't stop the process
            System.err.println("Error al enviar email al alumno: " + e.getMessage());
        }

        // Email al Instructor
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(instructorEmail);
            helper.setSubject("Nuevo Alumno Asignado - FORCA & FITNESS");
            helper.setFrom("gustavoblas2024@gmail.com");

            String htmlContent = buildTrainerAssignmentEmailTemplate(instructorName, alumnoName, false);
            helper.setText(htmlContent, true);

            mailSender.send(message);

        } catch (MessagingException e) {
            // Log error but don't stop the process
            System.err.println("Error al enviar email al instructor: " + e.getMessage());
        }
    }

    private String buildTrainerAssignmentEmailTemplate(String recipientName, String otherPartyName,
            boolean isForStudent) {
        String title = isForStudent ? "¡Tienes un nuevo entrenador!" : "¡Tienes un nuevo alumno!";
        String messageBody = isForStudent
                ? "Te informamos que se te ha asignado a <strong>" + otherPartyName
                        + "</strong> como tu nuevo entrenador personal."
                : "Te informamos que se te ha asignado a <strong>" + otherPartyName + "</strong> como tu nuevo alumno.";

        return """
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; }
                        .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
                        .content { background-color: white; padding: 30px; border-radius: 0 0 5px 5px; }
                        .info-box { background-color: #e8f5e9; padding: 15px; border-left: 4px solid #4CAF50; margin: 20px 0; }
                        .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>%s</h1>
                        </div>
                        <div class="content">
                            <p>Hola <strong>%s</strong>,</p>

                            <p>%s</p>

                            <div class="info-box">
                                <p><strong>Nombre:</strong> %s</p>
                            </div>

                            <p>Accede a tu panel para ver más detalles y comenzar a trabajar juntos.</p>

                            <p>¡Vamos a lograr esos objetivos!</p>
                        </div>
                        <div class="footer">
                            <p>Este es un correo automático, por favor no respondas a este mensaje.</p>
                            <p>&copy; 2024 FORCA & FITNESS. Todos los derechos reservados.</p>
                        </div>
                    </div>
                </body>
                </html>
                """
                .formatted(title, recipientName, messageBody, otherPartyName);
    }
}
