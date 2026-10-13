export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string; // format YYYY-MM-DD
  done: boolean;
  createdAt: string;
  updatedAt: string;
}

// Date du jour au format YYYY-MM-DD (en heure locale)
export function today(): string {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${month}-${day}`;
}

// Renvoie les messages d'erreur du formulaire (vide si tout est bon)
export function validateTask(title: string, dueDate: string) {
  const errors = { title: '', dueDate: '' };
  if (title.trim().length < 3) {
    errors.title = 'Le titre doit contenir au moins 3 caractères.';
  }
  if (dueDate && dueDate < today()) {
    errors.dueDate = "La date d'échéance ne peut pas être dans le passé.";
  }
  return errors;
}
