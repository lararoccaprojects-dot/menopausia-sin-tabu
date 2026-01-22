import { drizzle } from "drizzle-orm/mysql2/promise";
import mysql from "mysql2/promise";
import { symptoms } from "./drizzle/schema.ts";

const symptomsData = [
  // Síntomas Hormonales
  { name: "Sofocos", category: "hormonal", description: "Sensación súbita de calor intenso en el cuerpo, especialmente en la cara, cuello y pecho." },
  { name: "Cambios en el Ciclo Menstrual", category: "hormonal", description: "Irregularidades en la frecuencia, duración o intensidad de la menstruación." },
  { name: "Sudores Nocturnos", category: "hormonal", description: "Transpiración excesiva durante la noche que empaña la ropa de cama." },
  { name: "Cambios de Humor", category: "emocional", description: "Variaciones emocionales, irritabilidad, tristeza o ansiedad sin causa aparente." },
  { name: "Sequedad Vaginal", category: "sexual", description: "Reducción de lubricación natural en la vagina." },
  { name: "Cambios en la Libido", category: "sexual", description: "Disminución del deseo sexual." },
  
  // Síntomas Emocionales
  { name: "Ansiedad", category: "emocional", description: "Sensación de preocupación, nerviosismo o inquietud persistente." },
  { name: "Depresión", category: "emocional", description: "Tristeza persistente, pérdida de interés en actividades, baja energía." },
  { name: "Irritabilidad", category: "emocional", description: "Tendencia a enojarse fácilmente, baja tolerancia a la frustración." },
  
  // Síntomas Físicos
  { name: "Fatiga", category: "fisico", description: "Cansancio extremo que no mejora con descanso." },
  { name: "Dolores de Cabeza", category: "fisico", description: "Dolores de cabeza frecuentes o migrañas." },
  { name: "Dolor Articular", category: "fisico", description: "Dolor en articulaciones, especialmente manos, rodillas, caderas." },
  { name: "Insomnio", category: "fisico", description: "Dificultad para conciliar o mantener el sueño." },
  { name: "Cambios de Peso", category: "fisico", description: "Aumento de peso, especialmente en abdomen." },
  { name: "Problemas de Memoria", category: "fisico", description: "Dificultad para concentrarse, olvidos frecuentes (brain fog)." },
];

async function seedSymptoms() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "menopausia",
      port: parseInt(process.env.DB_PORT || "3306"),
    });

    const db = drizzle(connection);

    console.log("Seeding symptoms...");
    
    for (const symptom of symptomsData) {
      await db.insert(symptoms).values({
        name: symptom.name,
        category: symptom.category,
        description: symptom.description,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      console.log(`✓ Added: ${symptom.name}`);
    }

    console.log(`\n✓ Successfully seeded ${symptomsData.length} symptoms!`);
    await connection.end();
  } catch (error) {
    console.error("Error seeding symptoms:", error);
    process.exit(1);
  }
}

seedSymptoms();
