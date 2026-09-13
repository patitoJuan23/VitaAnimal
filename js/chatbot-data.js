window.CHATBOT_TREE_DATA = {
  "welcomeMessage": "¡Hola! 👋 Te damos la bienvenida a **VitaAnimal**. Soy tu asistente virtual guiado y estoy aquí para ayudarte a evaluar la salud o conducta de tu compañero peludo o exótico.",
  "disclaimer": "⚠️ **Aviso legal**: Este asistente ofrece orientación preventiva basada en síntomas comunes y NO sustituye una consulta o diagnóstico veterinario profesional.",
  "startNode": "pet_type",
  "nodes": {
    "pet_type": {
      "message": "Para comenzar, por favor selecciona el tipo de mascota:",
      "options": [
        { "text": "🐶 Perro", "next": "dog_symptoms" },
        { "text": "🐱 Gato", "next": "cat_symptoms" },
        { "text": "🦜 Ave o Mascota Exótica", "next": "exotic_symptoms" },
        { "text": "📋 Consulta General / Vacunación", "next": "routine_check" }
      ]
    },

    "dog_symptoms": {
      "message": "Entendido, vamos a evaluar a tu perro 🐶. ¿Cuál es el síntoma o motivo principal de consulta?",
      "options": [
        { "text": "🤢 Vómitos o Diarrea", "next": "dog_vomit_diarrhea" },
        { "text": "🦴 Cojera o Dificultad para Caminar", "next": "dog_limping" },
        { "text": "🥣 Pérdida de Apetito / Decaimiento", "next": "dog_loss_appetite" },
        { "text": "🐾 Rascado Intenso / Caída de Pelo", "next": "dog_skin_issue" },
        { "text": "⚡ Convulsiones o Dificultad Respiratoria", "next": "dog_emergency" }
      ]
    },

    "dog_vomit_diarrhea": {
      "message": "¿Con qué frecuencia se presentan los vómitos o diarrea y notas presencia de sangre o letargo grave?",
      "options": [
        { "text": "🟢 Ha sido 1 o 2 veces, mantiene buen ánimo y bebe agua", "next": "res_dog_vomit_mild" },
        { "text": "🔴 Es recurrente (más de 3 veces), con sangre o mucha debilidad", "next": "res_dog_vomit_severe" }
      ]
    },

    "res_dog_vomit_mild": {
      "urgency": "Baja",
      "urgencyColor": "success",
      "message": "### 🟢 Evaluación: Urgencia Baja\n\nSi tu perro ha vomitado una o dos veces pero mantiene buen ánimo y no tiene fiebre:\n\n- **Consejo inmediato**: Ofrece dieta blanda (pechuga de pollo hervida sin sal con arroz blanco) en porciones pequeñas.\n- Mantén agua fresca disponible para evitar deshidratación.\n- Monitorea por 24 horas. Si empeora o persiste, programa una consulta.",
      "action": "Agendar Cita Preventiva"
    },

    "res_dog_vomit_severe": {
      "urgency": "Alta",
      "urgencyColor": "danger",
      "message": "### 🔴 Evaluación: Urgencia Alta / Alerta\n\nLos vómitos o diarreas frecuentes con deshidratación o presencia de sangre pueden indicar deshidratación severa, intoxicación o gastroenteritis aguda.\n\n- **Acción inmediata**: Retira la comida sólida y no automediques.\n- **Recomendación**: Acude a Urgencias Veterinarias VitaAnimal a la brevedad.",
      "action": "Agendar Consulta de Urgencia"
    },

    "dog_limping": {
      "message": "¿Tu perro sufrió algún golpe/caída reciente o la cojera apareció de manera repentina?",
      "options": [
        { "text": "🟡 Apareció gradualmente o tras mucho ejercicio", "next": "res_dog_limp_mild" },
        { "text": "🔴 Fue por un traumatismo/atropello o no puede apoyar la pata", "next": "res_dog_limp_severe" }
      ]
    },

    "res_dog_limp_mild": {
      "urgency": "Media",
      "urgencyColor": "warning",
      "message": "### 🟡 Evaluación: Urgencia Media\n\nLa cojera progresiva o posterior al ejercicio puede deberse a un esguince muscular, inflamación articular o problema ligamentoso.\n\n- **Consejo inmediato**: Mantén a tu perro en reposo estricto y evita paseos largos o saltos.\n- No administres analgésicos humanos (como ibuprofeno o paracetamol), ya que son altamente tóxicos para las mascotas.",
      "action": "Agendar Cita Médica"
    },

    "res_dog_limp_severe": {
      "urgency": "Alta",
      "urgencyColor": "danger",
      "message": "### 🔴 Evaluación: Urgencia Alta\n\nLa incapacidad para apoyar el miembro tras un traumatismo sugiere una posible fractura, luxación o lesión articular severa.\n\n- Inmoviliza en lo posible el transporte y acude a nuestra clínica para rayos X y valoración por ortopedia.",
      "action": "Solicitar Atención Prioritaria"
    },

    "dog_loss_appetite": {
      "message": "¿Hace cuánto tiempo tu perro no come o muestra decaimiento?",
      "options": [
        { "text": "🟢 Solo hoy (menos de 24 horas)", "next": "res_dog_appetite_mild" },
        { "text": "🔴 Más de 48 horas sin comer ni beber agua", "next": "res_dog_appetite_severe" }
      ]
    },

    "res_dog_appetite_mild": {
      "urgency": "Baja",
      "urgencyColor": "success",
      "message": "### 🟢 Evaluación: Urgencia Baja\n\nUna pérdida de apetito pasajera puede deberse a cambios de clima, estrés o indiscreción alimentaria leve.\n\n- Intenta ofrecerle un alimento húmedo muy apetecible.\n- Si transcurren más de 24h sin comer, será necesario un examen clínico.",
      "action": "Agendar Valoración"
    },

    "res_dog_appetite_severe": {
      "urgency": "Alta",
      "urgencyColor": "danger",
      "message": "### 🔴 Evaluación: Urgencia Alta\n\nMás de 48 horas de inapetencia en perros provoca riesgo de debilidad marcada y alteraciones metabólicas.\n\n- Se requiere análisis de sangre y chequeo general para descartar infecciones u organopatías.",
      "action": "Agendar Consulta Inmediata"
    },

    "dog_skin_issue": {
      "urgency": "Media",
      "urgencyColor": "warning",
      "message": "### 🟡 Evaluación: Urgencia Media\n\nEl rascado constante, enrojecimiento o caída de pelaje suele estar asociado a dermatitis alérgica, pulgas, hongos o sarna.\n\n- **Recomendación**: Evita rascado excesivo colocando un collar isabelino si es necesario.\n- Agenda una consulta de dermatología veterinaria en VitaAnimal para raspado cutáneo y tratamiento específico.",
      "action": "Agendar Cita Dermatológica"
    },

    "dog_emergency": {
      "urgency": "Alta",
      "urgencyColor": "danger",
      "message": "### 🚨 URGENCIA VETERINARIA CRÍTICA 🚨\n\nLas convulsiones, encías pálidas/azuladas, asfixia o colapso representan una emergencia médica que amenaza la vida.\n\n- Por favor trasládate inmediatamente a nuestro centro médico o llama a nuestra línea directa de emergencias 24/7: **(01) 800-VITA-911**.",
      "action": "Llamar a Emergencias Directo"
    },

    "cat_symptoms": {
      "message": "Entendido, cuidemos de tu gato 🐱. ¿Qué síntoma está manifestando?",
      "options": [
        { "text": "🚽 Dificultad para Orinar / Va mucho a la caja", "next": "cat_urinary" },
        { "text": "🤮 Vómitos de Pelo o Comida", "next": "cat_vomit" },
        { "text": "🙈 Se esconde, decaído o agresivo repentinamente", "next": "cat_behavior" },
        { "text": "👁️ Ojos rojos, secreción o estornudos", "next": "cat_respiratory" }
      ]
    },

    "cat_urinary": {
      "urgency": "Alta",
      "urgencyColor": "danger",
      "message": "### 🔴 Evaluación: Urgencia Alta / Crítica Felina\n\nSi un gato maúlla de dolor en la caja de arena, se lame excesivamente la zona genital o NO logra orinar, puede sufrir de **Síndrome Urológico Felino (SUF) o Obstrucción Uretral**.\n\n- **¡Atención!**: La obstrucción uretral en gatos es mortal en 24-48 horas si no se sondean.\n- Acude de inmediato a Urgencias de VitaAnimal.",
      "action": "Agendar Atención de Urgencia Felina"
    },

    "cat_vomit": {
      "message": "¿El vómito contiene solo bolas de pelo o ocurre repetidamente con comida/bilis?",
      "options": [
        { "text": "🟢 Esporádico con bola de pelo u ocasional", "next": "res_cat_hairball" },
        { "text": "🔴 Varios vómitos seguidos en pocas horas", "next": "res_cat_vomit_severe" }
      ]
    },

    "res_cat_hairball": {
      "urgency": "Baja",
      "urgencyColor": "success",
      "message": "### 🟢 Evaluación: Urgencia Baja\n\nLos felinos eliminan bolas de pelo de forma natural ocasionalmente.\n\n- **Consejo**: Cepilla su pelaje diariamente y utiliza pasta de malta felina para favorecer el tránsito intestinal.",
      "action": "Agendar Chequeo Felino"
    },

    "res_cat_vomit_severe": {
      "urgency": "Alta",
      "urgencyColor": "danger",
      "message": "### 🔴 Evaluación: Urgencia Alta\n\nVómitos frecuentes en gatos provocan deshidratación rápida y pueden deberse a cuerpos extraños ingeridos (hilos, juguetes) o falla renal.",
      "action": "Agendar Consulta de Urgencia"
    },

    "cat_behavior": {
      "urgency": "Media",
      "urgencyColor": "warning",
      "message": "### 🟡 Evaluación: Urgencia Media\n\nLos gatos son maestros en ocultar el dolor. El aislamiento repentino, agresividad al tacto o dejar de acicalarse es la forma felina de expresar malestar físico.\n\n- Te recomendamos una revisión general con nuestra especialista en medicina felina en ambiente libre de estrés (Cat-Friendly).",
      "action": "Agendar Consulta Cat-Friendly"
    },

    "cat_respiratory": {
      "urgency": "Media",
      "urgencyColor": "warning",
      "message": "### 🟡 Evaluación: Urgencia Media\n\nLos estornudos frecuentes y lagañas en felinos suelen estar asociados a **Herpesvirus Felino o Calicivirus** (Gripe Felina).\n\n- Limpia sus ojos suavemente con suero fisiológico.\n- Requiere evaluación veterinaria para tratamiento antibiótico o colirios específicos.",
      "action": "Agendar Consulta Felina"
    },

    "exotic_symptoms": {
      "message": "Para aves, conejos, roedores u otros exóticos 🦜🐰, la atención debe ser especializada. ¿Cuál es la consulta?",
      "options": [
        { "text": "🐰 Conejo / Cobaya dejó de comer o defecar", "next": "res_exotic_gi_stasis" },
        { "text": "🦜 Ave erizada, en el suelo de la jaula o con alas caídas", "next": "res_bird_sick" },
        { "text": "🐢 Chequeo general de nutrición y hábitat", "next": "res_exotic_routine" }
      ]
    },

    "res_exotic_gi_stasis": {
      "urgency": "Alta",
      "urgencyColor": "danger",
      "message": "### 🔴 Evaluación: Urgencia Alta (Estasis Gastrointestinal)\n\nUn conejo o cobaya que pasa más de 12 horas sin comer ni defecar entra en **Estasis Intestinal**, una emergencia grave.\n\n- No esperes. Manténlo abrigado y acude inmediatamente con nuestro veterinario de animales exóticos.",
      "action": "Agendar Urgencia Exóticos"
    },

    "res_bird_sick": {
      "urgency": "Alta",
      "urgencyColor": "danger",
      "message": "### 🔴 Evaluación: Urgencia Alta\n\nLas aves disimulan su enfermedad hasta estar muy graves. Permanece erizada o en el piso de la jaula indica debilidad extrema.\n\n- Proporciónale calor moderado y ambiente silencioso. Trasládala en caja oscura cubierta a nuestra clínica.",
      "action": "Agendar Consulta de Aves"
    },

    "res_exotic_routine": {
      "urgency": "Baja",
      "urgencyColor": "success",
      "message": "### 🟢 Evaluación: Consulta de Rutina\n\nLos animales exóticos requieren un manejo ambiental, de iluminación y dieta muy preciso para mantenerse sanos.\n\n- Te orientaremos en dietas equilibradas, enriquecimiento ambiental y desparasitación.",
      "action": "Agendar Cita para Exóticos"
    },

    "routine_check": {
      "message": "¡Excelente inversión en la salud de tu mascota! 🩺 ¿En qué servicio de rutina estás interesado?",
      "options": [
        { "text": "💉 Esquema de Vacunación y Desparasitación", "next": "res_routine_vac" },
        { "text": "🦷 Limpieza Dental Ultrasónica", "next": "res_routine_dental" },
        { "text": "✂️ Peluquería y Estética Canina/Felina", "next": "res_routine_grooming" },
        { "text": "🔍 Chequeo Médico General / Senior", "next": "res_routine_checkup" }
      ]
    },

    "res_routine_vac": {
      "urgency": "Baja",
      "urgencyColor": "success",
      "message": "### 🟢 Vacunación y Desparasitación\n\nMantener al día el calendario de vacunas protege a tu mascota contra rabia, parvovirus, moquillo, leucemia felina y parásitos transmisibles.\n\n- Incluye revisión clínica general antes de la aplicación.",
      "action": "Agendar Vacunación"
    },

    "res_routine_dental": {
      "urgency": "Baja",
      "urgencyColor": "success",
      "message": "### 🟢 Odontología y Limpieza Dental\n\nLa acumulación de sarro provoca mal aliento y pérdida de piezas dentales. Realizamos profiIaxis dental con ultrasonido bajo monitoreo anestésico seguro.",
      "action": "Agendar Limpieza Dental"
    },

    "res_routine_grooming": {
      "urgency": "Baja",
      "urgencyColor": "success",
      "message": "### 🟢 Spa y Peluquería Canina/Felina\n\nServicio de baño dermatológico, corte higiénico o de raza, vaciado de glándulas anales y corte de uñas con estilistas certificados.",
      "action": "Reservar Cita de Spa"
    },

    "res_routine_checkup": {
      "urgency": "Baja",
      "urgencyColor": "success",
      "message": "### 🟢 Chequeo Médico Preventivo\n\nRecomendado al menos 1 vez al año (o cada 6 meses en mascotas mayores de 7 años). Incluye auscultación, revisión palpebral, dental y palpación abdominal.",
      "action": "Agendar Chequeo Preventivo"
    }
  }
};
