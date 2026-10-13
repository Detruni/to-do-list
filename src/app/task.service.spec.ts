import { TestBed } from '@angular/core/testing';
import { validateTask } from './task';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    localStorage.clear();
    service = TestBed.inject(TaskService);
  });

  it('ajoute une tâche non faite', () => {
    service.add('Réviser Angular', '', '');
    expect(service.tasks().length).toBe(1);
    expect(service.tasks()[0].done).toBe(false);
  });

  it('coche puis supprime une tâche', () => {
    service.add('Faire le TP', '', '');
    const id = service.tasks()[0].id;
    service.toggle(id);
    expect(service.tasks()[0].done).toBe(true);
    service.remove(id);
    expect(service.tasks().length).toBe(0);
  });
});

describe('validateTask', () => {
  it('refuse un titre trop court', () => {
    expect(validateTask('  a  ', '').title).not.toBe('');
  });

  it('refuse une date passée', () => {
    expect(validateTask('Titre', '2000-01-01').dueDate).not.toBe('');
  });

  it('accepte une tâche valide', () => {
    expect(validateTask('Titre', '')).toEqual({ title: '', dueDate: '' });
  });
});
