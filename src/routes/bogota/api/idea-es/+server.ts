import { json } from '@sveltejs/kit';

export async function POST() {
	try {
		// Create a varied, creative prompt using multiple techniques
		const randomElements = getRandomPromptElements();
		
		const prompt = `Crea una idea simple para una game jam para principiantes.

TIPO DE JUEGO: ${randomElements.gameType}
TEMA: ${randomElements.theme}
ESCENARIO: ${randomElements.setting}

convierte estos tres elementos en una idea de juego en una sola oración. Comienza con "Un [tipo de juego] donde..." o "Una [tipo de juego] donde..." y mantenlo simple y claro. Usa palabras normales, sin lenguaje complicado.`;

		const response = await fetch('https://ai.hackclub.com/chat/completions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				messages: [
					{ 
						role: 'system', 
						content: 'Eres un diseñador de juegos práctico. Responde con SOLO una idea de juego en una sola oración. Usa un lenguaje simple y claro. Solo una mecánica básica. Sin palabras complicadas, sin poesía, sin descripciones floridas.' 
					},
					{ role: 'user', content: prompt }
				]
			})
		});

		if (!response.ok) {
			throw new Error(`AI API request failed: ${response.status}`);
		}

		const data = await response.json();
		let idea = data.choices[0]?.message?.content?.trim();

		if (!idea) {
			throw new Error('No idea generated from AI response');
		}

		// Clean up the response - remove any thinking tags or extra formatting
		idea = idea.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
		idea = idea.replace(/^["']/g, '').replace(/["']$/g, '').trim();

		return json({ idea });

	} catch (error) {
		console.error('Error generating game idea:', error);
		return json({ error: 'Failed to generate game idea' }, { status: 500 });
	}
}

function getRandomPromptElements() {
	const gameTypes = [
		"juego de puzzles", "juego arcade", "plataformas", "juego de carreras", "juego de ritmo",
		"juego de física", "juego de estrategia", "juego de defensa", "juego de sigilo", "juego de aventura",
		"simulación", "juego de gestión", "juego de supervivencia", "juego de exploración", "juego de laberinto",
		"juego de emparejamiento", "juego de construcción", "juego de recolección", "juego de saltos", "juego de vuelo",
		"juego de disparos", "juego de defensa", "juego de escape", "juego de rescate", "juego de cocina",
		"juego de dibujo", "juego de música", "juego de palabras", "juego de memoria", "juego de reacción",
		"juego de clasificación", "juego de apilamiento", "juego de rodar", "juego de deslizamiento", "juego de rotación",
		"juego de crecimiento", "juego de reducción", "juego de fusión", "juego de división", "juego de tiempo"
	];

	const themes = [
		"animales", "espacio", "submarino", "robots", "magia", "piratas", "ninjas", "caballeros",
		"zombis", "alienígenas", "dinosaurios", "dragones", "fantasmas", "monstruos", "superhéroes", "magos",
		"gatos", "perros", "pájaros", "peces", "insectos", "plantas", "flores", "árboles",
		"comida", "dulces", "pizza", "helado", "verduras", "frutas", "cocina", "repostería",
		"música", "baile", "arte", "pintura", "dibujo", "colores", "formas", "patrones",
		"clima", "estaciones", "lluvia", "nieve", "sol", "nubes", "tormentas", "arcoíris",
		"vehículos", "coches", "trenes", "aviones", "barcos", "cohetes", "bicicletas", "camiones",
		"deportes", "fútbol", "baloncesto", "tenis", "golf", "béisbol", "natación", "correr",
		"escuela", "biblioteca", "patio", "hogar", "jardín", "parque", "playa", "montaña",
		"amistad", "familia", "ayuda", "compartir", "aprendizaje", "crecimiento", "exploración", "descubrimiento"
	];

	const settings = [
		"bosque", "castillo", "nave espacial", "ciudad submarina", "desierto", "montaña", "cueva", "laboratorio",
		"escuela", "patio de juegos", "parque", "playa", "granja", "circo", "carnaval", "zoológico",
		"cocina", "panadería", "restaurante", "jardín", "invernadero", "biblioteca", "museo", "teatro",
		"fábrica", "taller", "garaje", "sótano", "ático", "casa del árbol", "isla", "pueblo",
		"ciudad", "pueblo", "vecindario", "calle", "callejón", "azotea", "puente", "torre",
		"laberinto", "mazmorra", "templo", "pirámide", "ruinas", "volcán", "glaciar", "selva",
		"pantano", "pradera", "valle", "colina", "acantilado", "río", "lago", "estanque",
		"estación espacial", "planeta alienígena", "base lunar", "asteroide", "cometa", "agujero negro", "nebulosa", "galaxia",
		"barco pirata", "isla del tesoro", "casa embrujada", "reino mágico", "tierra de cuentos", "mundo de sueños", "tierra de dulces", "juguetería"
	];

	const randomChoice = (array: any[]) => array[Math.floor(Math.random() * array.length)];

	return {
		gameType: randomChoice(gameTypes),
		theme: randomChoice(themes),
		setting: randomChoice(settings)
	};
}
