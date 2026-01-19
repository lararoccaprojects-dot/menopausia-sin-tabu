-- Síntomas Hormonales
INSERT INTO symptoms (name, category, description, createdAt, updatedAt) VALUES
('Sofocos', 'hormonal', 'Sensación súbita de calor intenso en el cuerpo, especialmente en la cara, cuello y pecho.', NOW(), NOW()),
('Cambios en el Ciclo Menstrual', 'hormonal', 'Irregularidades en la frecuencia, duración o intensidad de la menstruación.', NOW(), NOW()),
('Sudores Nocturnos', 'hormonal', 'Transpiración excesiva durante la noche que empaña la ropa de cama.', NOW(), NOW()),
('Cambios de Humor', 'hormonal', 'Variaciones emocionales, irritabilidad, tristeza o ansiedad sin causa aparente.', NOW(), NOW()),
('Sequedad Vaginal', 'hormonal', 'Reducción de lubricación natural en la vagina.', NOW(), NOW()),
('Cambios en la Libido', 'hormonal', 'Disminución del deseo sexual.', NOW(), NOW()),

-- Síntomas Emocionales
('Ansiedad', 'emocional', 'Sensación de preocupación, nerviosismo o inquietud persistente.', NOW(), NOW()),
('Depresión', 'emocional', 'Tristeza persistente, pérdida de interés en actividades, baja energía.', NOW(), NOW()),
('Irritabilidad', 'emocional', 'Tendencia a enojarse fácilmente, baja tolerancia a la frustración.', NOW(), NOW()),

-- Síntomas Físicos
('Fatiga', 'fisico', 'Cansancio extremo que no mejora con descanso.', NOW(), NOW()),
('Dolores de Cabeza', 'fisico', 'Dolores de cabeza frecuentes o migrañas.', NOW(), NOW()),
('Dolor Articular', 'fisico', 'Dolor en articulaciones, especialmente manos, rodillas, caderas.', NOW(), NOW()),
('Insomnio', 'fisico', 'Dificultad para conciliar o mantener el sueño.', NOW(), NOW()),
('Cambios de Peso', 'fisico', 'Aumento de peso, especialmente en abdomen.', NOW(), NOW()),
('Problemas de Memoria', 'fisico', 'Dificultad para concentrarse, olvidos frecuentes (brain fog).', NOW(), NOW());
